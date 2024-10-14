import { defineStore } from "pinia";
import { ref } from "vue";
import { PaperUI } from "~/types/research-paper-ui";
import { getSessionData, setSessionData } from "~/utils/sessionStorage";

export const useItemStore = defineStore("papers", () => {
  const researchPapers = ref<PaperUI[]>([]);
  const suggestedPapers = ref<PaperUI[]>([]);

  const getSession = getSessionData();
  if (getSession !== null) {
    suggestedPapers.value = JSON.parse(getSession);
  }

  function getPaperStores() {
    return researchPapers.value;
  }

  function setPaperStores(papers: PaperUI[]) {
    researchPapers.value = papers;
  }

  function setSuggestedPaperStores(suggestions: PaperUI[]) {
    suggestedPapers.value = suggestions;

    if (suggestions === null) return;
    setSessionData(suggestions);
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
