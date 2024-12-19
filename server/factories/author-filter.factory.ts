import { Author } from "~/types/research-author-server";

export function searchAndFilterAuthors(
  suggestions: Author[],
  searchQuery: string
): Author[] {
  if (suggestions.length === 0) return [];

  // Special case for "#" query: return all authors
  if (searchQuery.trim() === "#") {
    return suggestions;
  }

  // Trim and split the search query into individual words
  const queryWords = searchQuery.trim().split(" ").filter(Boolean);
  const regexWords = queryWords.map((word) => new RegExp(word, "i")); // 'i' for case-insensitive matching

  // Filter authors where all query words match part of the author's name
  const filteredAuthors = suggestions.filter((author) => {
    const authorName = author.author_name?.toLowerCase() || "";
    return regexWords.every((regex) => regex.test(authorName));
  });

  return filteredAuthors;
}

export function updateAuthorsByLastKeyword(
  searchQuery: string,
  authors: Author[],
  showSuggestions: boolean
): Author[] {
  const query = searchQuery.trim();

  if (query === "#") {
    showSuggestions = true;
    return authors; // Return all authors when the "#" query is entered
  }

  if (query.endsWith(" ")) {
    const lastWord = query.split(" ").filter(Boolean).pop()?.toLowerCase();

    if (lastWord) {
      // Filter authors whose names contain the last word
      const filtered = authors.filter((author) =>
        author.author_name?.toLowerCase().includes(lastWord)
      );

      if (filtered.length > 0) {
        showSuggestions = true;
        return filtered;
      }
    }
  }

  showSuggestions = true;
  return authors;
}
