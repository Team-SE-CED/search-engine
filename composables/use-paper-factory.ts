// composables/usePaper.ts
import {
  searchAndFilterPapers,
  updateResearchPapersByLastKeyword,
} from "~/server/factories/paper-filter.factory";
import type { PaperUI } from "~/types/research-paper-ui";

export function usePaperFactory() {
  function filterPapersFactory(
    suggestions: PaperUI[],
    searchQuery: string,
    selectedFilter: string,
    selectedYear?: string
  ) {
    const filteredPaper = searchAndFilterPapers(
      suggestions,
      searchQuery,
      selectedFilter,
      selectedYear
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
    filterPapersFactory,
    filterLastKeyword,
  };
}
