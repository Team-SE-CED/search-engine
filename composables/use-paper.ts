import { researchPaperFactory } from "~/server/factories/research-paper.factory";
// import { useItemStore } from "~/server/stores/research-paper";
import type { Paper } from "~/server/types/research-paper-server";
// const { setPaperStores } = useItemStore();

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

    // setPaperStores();

    return paperFactory;
  }

  return { getResearchPaper };
}
