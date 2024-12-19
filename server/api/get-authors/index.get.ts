import { Paper } from "~/types/research-paper-server";
import { getResearchPaperUseCase } from "~/server/use-case/get-paper";
import { getAuthorsUseCase } from "~/server/use-case/get-author";
import { Author } from "~/types/research-author-server";

export default defineEventHandler(async () => {
  const data = await getAuthorsUseCase();
  const response = data as Author[];

  return response;
});
