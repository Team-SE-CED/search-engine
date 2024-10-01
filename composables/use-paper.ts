import { researchPaperFactory } from "~/server/factories/research-paper.factory";
import type { Paper } from "~/server/types/research-paper-server";

export function usePaper() {
  async function getResearchPaper() {
    const response = await fetch("/api/get-research-paper"); // GET method by default
    if (!response.ok) {
      throw new Error("Failed to fetch research paper");
    }
    const data = await response.json();
    const paper = data as Paper[];
    const paperFactory =
      researchPaperFactory.toResearchPaperFullResponse(paper);

    return paperFactory;
  }

  return { getResearchPaper };
}
