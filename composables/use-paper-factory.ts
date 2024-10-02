// composables/usePaper.ts
import {
  searchAndFilterPapersByTitle,
  updateResearchPapersByLastKeyword,
} from "~/server/factories/paper-filter.factory";
import type { PaperUI } from "~/types/research-paper-ui";

export function usePaperFactory() {
  const { setSuggestedPaperStore } = usePaperStores();

  function filterAndStorePapersByTitle(
    suggestions: PaperUI[],
    searchQuery: string
  ) {
    const filteredPaper = searchAndFilterPapersByTitle(
      suggestions,
      searchQuery
    );

    setSuggestedPaperStore(filteredPaper);

    return filteredPaper;
  }

  function filterLastKeyword(
    searchQuery: string,
    researchPapers: PaperUI[],
    showSuggestions: boolean
  ) {
    return updateResearchPapersByLastKeyword(
      searchQuery,
      researchPapers,
      showSuggestions
    );
  }

  return {
    filterPapers: filterAndStorePapersByTitle,
    filterLastKeyword,
  };
}
