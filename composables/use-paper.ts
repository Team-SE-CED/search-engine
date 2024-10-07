import { researchPaperFactory } from "~/server/factories/research-paper.factory";
import { useItemStore } from "~/server/stores/research-paper-store";
import type { Paper } from "~/server/types/research-paper-server";

export function usePaper() {
  const itemStore = useItemStore();

  async function getResearchPaper() {
    const response = await fetch("/api/get-research-paper");
    if (!response.ok) {
      throw new Error("Failed to fetch research paper");
    }
    const data = await response.json();
    const paper = data as Paper[];
    const paperFactory = researchPaperFactory.convertPapersToPaperUI(paper);

    itemStore.setPaperStores(paperFactory);

    return paperFactory;
  }

  return { getResearchPaper };
}
