import { PaperUI } from "~/types/research-paper-ui";

export function searchAndFilterPapers(
  suggestions: PaperUI[],
  searchQuery: string,
  selectedFilter: string | null,
  selectedYear?: string,
  selectedDepartment?: string,
  selectedAbstract?: string
): PaperUI[] {
  if (!selectedFilter) return [];

  const selectedFilterModified = selectedFilter.toLowerCase();

  // Check for the special case of the search query being "#"
  if (searchQuery.trim() === "#") {
    switch (selectedFilterModified) {
      case "department":
        return suggestions.filter((p) => p.department === selectedDepartment);
      case "date":
        return suggestions.filter((p) => {
          const paperYear = new Date(p.date).getFullYear();
          return !isNaN(paperYear) && paperYear.toString() === selectedYear;
        });

      default:
        return suggestions;
    }
  }

  const queryWords = searchQuery.trim().split(" ").filter(Boolean);
  if (queryWords.length === 0) return [];

  const regexWords = queryWords.map((word) => new RegExp(word, "i")); // 'i' for case-insensitive

  switch (selectedFilterModified) {
    case "author":
      return suggestions.filter((p) =>
        regexWords.every((regex) => regex.test(p.author?.toLowerCase() || ""))
      );
    case "title":
      return suggestions.filter((p) =>
        regexWords.every((regex) => regex.test(p.title?.toLowerCase() || ""))
      );
    case "date":
      let filteredPapersYear = suggestions;
      if (selectedYear) {
        filteredPapersYear = suggestions.filter((p) => {
          const paperYear = new Date(p.date).getFullYear().toString();
          return paperYear === selectedYear;
        });
      }

      return filteredPapersYear.filter((p) =>
        regexWords.every((regex) => regex.test(p.title?.toLowerCase() || ""))
      );
    case "department":
      let filteredPapersDepartment = suggestions;
      if (selectedDepartment) {
        filteredPapersDepartment = suggestions.filter((p) => {
          return p.department === selectedDepartment;
        });
      }

      return filteredPapersDepartment.filter((p) =>
        regexWords.every((regex) => regex.test(p.title?.toLowerCase() || ""))
      );
    default:
      return [];
  }
}

export function updateResearchPapersByLastKeyword(
  searchQuery: string,
  researchPapers: PaperUI[],
  showSuggestions: boolean
) {
  const query = searchQuery.trim();

  if (query.endsWith(" ")) {
    const lastWord = query.split(" ").filter(Boolean).pop()?.toLowerCase();

    if (lastWord) {
      const filtered = researchPapers.filter((p) =>
        p.title?.toLowerCase().includes(lastWord || "")
      );

      if (filtered.length > 0) {
        researchPapers = filtered;
      }
    }
  }

  showSuggestions = true;
}
