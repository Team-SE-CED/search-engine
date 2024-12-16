import { DateRangeType } from "~/types/date-range";
import { PaperUI } from "~/types/research-paper-ui";

export function searchAndFilterPapers(
  suggestions: PaperUI[],
  searchQuery: string,
  yearRange: DateRangeType,
  selectedDepartments: string[],
  selectedAbstract?: string
): PaperUI[] {
  if (suggestions.length === 0) return [];
  if (searchQuery === "") return [];

  // Special case for the "#" query: return all filtered by year and department
  if (searchQuery.trim() === "#") {
    return suggestions.filter((p) => {
      const paperYear = p.yearPublished;
      const matchesYear =
        !isNaN(paperYear) &&
        paperYear >= yearRange.lowerYear &&
        paperYear <= yearRange.upperYear;
      const matchesDepartment =
        selectedDepartments.length === 0 ||
        selectedDepartments.includes(p.department);

      return matchesYear && matchesDepartment;
    });
  }

  // Trim and split the search query into individual words
  const queryWords = searchQuery.trim().split(" ").filter(Boolean);
  const regexWords = queryWords.map((word) => new RegExp(word, "i")); // 'i' for case-insensitive matching

  // Filter papers based on the year range
  let filteredPapers = suggestions.filter((p) => {
    const paperYear = new Date(p.date).getFullYear();
    return (
      !isNaN(paperYear) &&
      paperYear >= yearRange.lowerYear &&
      paperYear <= yearRange.upperYear
    );
  });

  // Further filter papers based on selected departments
  if (selectedDepartments.length > 0) {
    filteredPapers = filteredPapers.filter((p) =>
      selectedDepartments.includes(p.department)
    );
  }

  // If a search query is provided, filter papers based on query
  if (queryWords.length > 0) {
    filteredPapers = filteredPapers.filter((p) =>
      regexWords.every(
        (regex) =>
          regex.test(p.title?.toLowerCase() || "") ||
          regex.test(p.author?.toLowerCase() || "")
      )
    );
  }

  return filteredPapers;
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
