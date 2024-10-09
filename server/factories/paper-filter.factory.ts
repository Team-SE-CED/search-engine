import { PaperUI } from "~/types/research-paper-ui";

export function searchAndFilterPapers(
  products: PaperUI[],
  query: string,
  selectedFilter: string | null,
  selectedYear?: string,
  selectedDepartment?: string
): PaperUI[] {
  if (!selectedFilter) return [];

  const selectedFilterModified = selectedFilter.toLowerCase();

  const queryWords = query.trim().split(" ").filter(Boolean);
  if (queryWords.length === 0) return [];

  const regexWords = queryWords.map((word) => new RegExp(word, "i")); // 'i' for case-insensitive

  switch (selectedFilterModified) {
    case "author":
      return products.filter((p) =>
        regexWords.every((regex) => regex.test(p.author?.toLowerCase() || ""))
      );
    case "title":
      return products.filter((p) =>
        regexWords.every((regex) => regex.test(p.title?.toLowerCase() || ""))
      );
    case "date":
      let filteredPapersYear = products;
      if (selectedYear) {
        filteredPapersYear = products.filter((p) => {
          const paperYear = new Date(p.date).getFullYear().toString();
          return paperYear === selectedYear;
        });
      }

      return filteredPapersYear.filter((p) =>
        regexWords.every((regex) => regex.test(p.title?.toLowerCase() || ""))
      );
    case "department":
      let filteredPapersDepartment = products;
      if (selectedYear) {
        filteredPapersDepartment = products.filter((p) => {
          return;
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
