import { paperService } from "../services/paper.service";

export async function getResearchPaperUseCase() {
  const response = await paperService.getResearchPaper();

  return response;
}
