import nodemailer, { TransportOptions } from "nodemailer";
import { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  // Read the request body and type it appropriately
  const body = await readBody<{ email: string }>(event);

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

  try {
    // Sending Email
    await transporter.sendMail({
      from: process.env.SMTP_FROM as string, // Sender address
      to: body.email, // Recipient address
      subject: "Hello from Nuxt 3!", // Subject line
      text: "Hello, student. Your request has been approved. Please get your soft copy below.", // Plain text body
      html: "<b>Hello, student. Your request has been approved. Please get your soft copy below.</b>", // HTML body
    });

    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to send email.",
      error: (error as Error).message,
    };
  }
});
