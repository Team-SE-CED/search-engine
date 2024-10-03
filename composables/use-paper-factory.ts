// composables/usePaper.ts
import {
  searchAndFilterPapersByTitle,
  updateResearchPapersByLastKeyword,
} from "~/server/factories/paper-filter.factory";
import type { PaperUI } from "~/types/research-paper-ui";

export function usePaperFactory() {
  function filterAndStorePapersByTitle(
    suggestions: PaperUI[],
    searchQuery: string
  ) {
    const filteredPaper = searchAndFilterPapersByTitle(
      suggestions,
      searchQuery
    );

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
