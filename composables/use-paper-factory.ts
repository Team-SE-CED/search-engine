// composables/usePaper.ts
import {
  searchAndFilterPapers,
  updateResearchPapersByLastKeyword,
} from "~/server/factories/paper-filter.factory";
import type { DateRangeType } from "~/types/date-range";
import type { PaperUI } from "~/types/research-paper-ui";

// Search Engine Algorithm
export function usePaperFactory() {
  function filterPapersFactory(
    suggestions: PaperUI[],
    searchQuery: string,
    selectedYear: DateRangeType,
    selectedDepartment: string[],
    selectedAbstract?: string
  ) {
    const filteredPaper = searchAndFilterPapers(
      suggestions,
      searchQuery,
      selectedYear,
      selectedDepartment,
      selectedAbstract
    );

    console.log("Hey man: " + JSON.stringify(filteredPaper));

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
