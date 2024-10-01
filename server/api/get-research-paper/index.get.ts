import { Paper } from "~/server/types/research-paper-server";
import { getResearchPaperUseCase } from "~/server/use-case/get-paper";

export default defineEventHandler(async () => {
  const data = await getResearchPaperUseCase();
  const response = data as Paper[];

  return response;
});
