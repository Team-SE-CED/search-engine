import { useAuthorStore } from "~/server/stores/research-author-store";
import type { Author } from "~/types/research-author-server";

export function useAuthor() {
  const authorStore = useAuthorStore();

  async function getAuthor() {
    try {
      const response = await fetch("/api/get-authors");
      if (!response.ok) {
        const errorMessage = `API responded with status: ${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
      }
      const data = await response.json();
      const author = data as Author[];

      authorStore.setAuthorStores(author);

      return author;
    } catch (error) {
      console.error(
        `${error}. Unable to fetch research authors at this time. Please try again later.`
      );
      return [];
    }
  }

  return { getAuthor };
}
