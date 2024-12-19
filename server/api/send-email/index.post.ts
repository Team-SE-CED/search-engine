import nodemailer, { TransportOptions } from "nodemailer";
import { H3Event } from "h3";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { supabase } from "~/server/db/supabaseClient";

export default defineEventHandler(async (event: H3Event) => {
  // Read the request body and type it appropriately 
  const body = await readBody(event);

  const { email, id } = body;

  if(!email || !id) {
    return { status: 400, body: { error: "Missing required fields." } };
  }

  // Validate body content
  if (!body?.email) {
    return {
      success: false,
      message: "Email address is required.",
    };
  }

  // SMTP Configuration
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST as string,
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER as string,
      pass: process.env.SMTP_PASS as string,
    },
  } as TransportOptions);

  const s3 = new S3Client({
    endpoint: process.env.MINIO_ENDPOINT,
    region: process.env.MINIO_REGION,
    credentials: {
      accessKeyId: process.env.MINIO_ACCESS_KEY || "",
      secretAccessKey: process.env.MINIO_SECRET_KEY || "",
    },
    forcePathStyle: true,
  })

  const fileId = body?.id as string;

  const params = {
    Bucket: process.env.MINIO_BUCKET_NAME || "",
    Key: fileId + ".pdf"
  }

  try {
    const s3Command = new GetObjectCommand(params);
    const s3Response = await s3.send(s3Command);
    

    const fileStream = s3Response.Body as Readable;
    const fileBuffer = await streamToBuffer(fileStream);
    
    const { data: record, error: recordError } = await supabase
      .from("research_papers")
      .select("title") // Select only the `title` field
      .eq("id", id) // Filter by the `id`
      .single();

    if (recordError || !record) {
      throw new Error(`Record with id '${id}' not found: ${recordError?.message}`);
    }

    const fileName = record.title + '.pdf';

    // Sending Email
    await transporter.sendMail({
      from: process.env.SMTP_FROM as string, // Sender address
      to: body.email, // Recipient address
      subject: "Your Request Has Been Approved", // Subject line
      text: "Hello, student. Your request has been approved. Please get your soft copy below. Thank you for using CED-OLIS!", // Plain text body
      html: "<b>Hello, student. Your request has been approved. Please get your soft copy below. Thank you for using CED-OLIS!</b>", // HTML body
      attachments: [
        {
          filename: fileName,
          content: fileBuffer,
          contentType: "application/pdf"
        }
      ]
    });

    return { status: 200, message: "Email sent successfully!" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to send email.",
      error: (error as Error).message,
    };
  }
});

const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk instanceof Buffer ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}
