import type { User } from "~/types/user";
export function useUser() {
  async function getUser() {
    try {
      const response = await fetch("/api/get-user");
      if (!response.ok) {
        const errorMessage = `API responded with status: ${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
      }
      const data = await response.json();
      const user = data as User[];

    } catch (error) {
      console.error(
        `${error}. Unable to fetch research papers at this time. Please try again later.`
      );
      return [];
    }
  }

  return { getUser };
}
