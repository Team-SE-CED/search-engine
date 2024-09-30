import {
  getFilteredResearchPaper,
  getResearchPaper,
} from "../services/paper.service";

export async function getResearchPaperUseCase() {
  const response = await getResearchPaper();

  return response;
}

export async function getFilteredResearchPaperUseCase() {
  const response = await getFilteredResearchPaper();

  return response;
}
