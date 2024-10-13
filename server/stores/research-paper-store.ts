import { defineStore } from "pinia";
import { ref } from "vue";
import { PaperUI } from "~/types/research-paper-ui";

export const useItemStore = defineStore("papers", () => {
  const researchPapers = ref<PaperUI[]>([]);
  const suggestedPapers = ref<PaperUI[]>([]);

  function getPaperStores() {
    return researchPapers.value;
  }

  function setPaperStores(papers: PaperUI[]) {
    researchPapers.value = papers;
  }

  function setSuggestedPaperStores(suggestions: PaperUI[]) {
    suggestedPapers.value = suggestions;
  }

  function getSuggestedPaperStores() {
    return suggestedPapers.value;
  }

  return {
    getPaperStores,
    setPaperStores,
    getSuggestedPaperStores,
    setSuggestedPaperStores,
  };
});
