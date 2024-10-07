import { Ref } from "vue";
import { PaperUI } from "~/types/research-paper-ui";

export function searchAndFilterPapersByTitle(
  products: PaperUI[],
  query: string
): PaperUI[] {
  const queryWords = query.trim().toLowerCase().split(" ").filter(Boolean);
  if (queryWords.length === 0) return [];

  return products.filter((p) =>
    queryWords.every((word) => p.title.toLowerCase().includes(word))
  );
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
      // Filter research papers based on the last keyword
      const filtered = researchPapers.filter((p) =>
        p.title.toLowerCase().includes(lastWord)
      );

      if (filtered.length > 0) {
        researchPapers = filtered;
      }
    }
  }

  showSuggestions = true;
}
