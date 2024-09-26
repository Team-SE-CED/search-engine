import { getResearchPaper } from "../services/paper.service";

export async function getResearchPaperUseCase() {
  const response = await getResearchPaper();

  return response;
}
