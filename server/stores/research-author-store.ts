import { defineStore } from "pinia";
import { ref } from "vue";
import { Author } from "~/types/research-author-server";
import { getSessionData, setSessionData } from "~/utils/sessionStorage";

export const useAuthorStore = defineStore("authors", () => {
  const researchAuthors = ref<Author[]>([]);
  const suggestedPapers = ref<Author[]>([]);
  const isAuthorMode = ref(false);

  const getSession = getSessionData();

  if (getSession !== null) {
    suggestedPapers.value = JSON.parse(getSession);
  }

  function getAuthorStores() {
    return researchAuthors.value;
  }

  function setAuthorStores(authors: Author[]) {
    researchAuthors.value = authors;
  }

  function setSuggestedAuthorStores(suggestions: Author[]) {
    suggestedPapers.value = suggestions;

    if (suggestions === null) return;
  }

  function getSuggestedAuthorStores() {
    return suggestedPapers.value;
  }

  function setIsAuthorMode(isAuthorModeReceived: boolean) {
    isAuthorMode.value = isAuthorModeReceived;
  }
  function getIsAuthorMode(): boolean {
    return isAuthorMode.value;
  }

  return {
    getAuthorStores,
    setAuthorStores,
    setSuggestedAuthorStores,
    getSuggestedAuthorStores,
    setIsAuthorMode,
    getIsAuthorMode,
  };
});
