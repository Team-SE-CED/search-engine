import { useItemStore } from "~/server/stores/research-paper-store";
import type { PaperUI } from "~/types/research-paper-ui";

export function usePaperStores() {
  const itemStore = useItemStore();

  async function getPaperStore() {
    const response = itemStore.getPaperStores();

    return response as PaperUI[];
  }

  async function setPaperStore(papers: PaperUI[]) {
    itemStore.setPaperStores(papers);
  }

  function setSuggestedPaperStore(suggestions: PaperUI[]) {
    itemStore.setSuggestedPaperStores(suggestions);
  }

  function getSuggestedPaperStore() {
    const response = itemStore.getSuggestedPaperStores();

    return response as PaperUI[];
  }

  return {
    getPaperStore,
    setPaperStore,
    setSuggestedPaperStore,
    getSuggestedPaperStore,
  };
}
