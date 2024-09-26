import { Paper } from "~/server/types/research-paper";
import { getResearchPaperUseCase } from "~/server/use-case/get-paper";

export default defineEventHandler(async (event) => {
  // Call your use case to fetch the research papers
  const data = await getResearchPaperUseCase();

  console.log("Research papers fetched");

  // Return the response, assuming it's an array of Paper objects
  const response = data as Paper[];
  return response;
});
