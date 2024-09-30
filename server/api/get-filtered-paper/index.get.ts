import { Paper } from "~/server/types/research-paper";
import { getFilteredResearchPaperUseCase } from "~/server/use-case/get-paper";

export default defineEventHandler(async (event) => {
  // Call your use case to fetch the research papers
  const data = await getFilteredResearchPaperUseCase();

  // Return the response, assuming it's an array of Paper objects
  const response = data as Paper[];
  return response;
});
