import { researchPaperFactory } from "~/server/factories/research-paper.factory";
import { useItemStore } from "~/server/stores/research-paper-store";
import type { Paper } from "~/server/types/research-paper-server";

export function usePaper() {
  const itemStore = useItemStore();

  async function getResearchPaper() {
    try {
      const response = await fetch("/api/get-research-paper");
      if (!response.ok) {
        const errorMessage = `API responded with status: ${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
      }
      const data = await response.json();
      const paper = data as Paper[];
      const paperFactory = researchPaperFactory.convertPapersToPaperUI(paper);

      itemStore.setPaperStores(paperFactory);

      return paperFactory;
    } catch (error) {
      console.error(
        `${error}. Unable to fetch research papers at this time. Please try again later.`
      );
      return [] as Paper[];
    }
  }

  return { getResearchPaper };
}
