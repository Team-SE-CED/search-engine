import type { Paper } from "~/server/types/research-paper";

export function usePaper() {
  async function getResearchPaper() {
    const response = await fetch("/api/get-research-paper"); // GET method by default
    if (!response.ok) {
      throw new Error("Failed to fetch research paper");
    }
    const data = await response.json();
    const paper = data as Paper[];

    return paper;
  }

  async function getFilteredResearchPaper() {
    const response = await fetch("/api/get-filtered-paper"); // GET method by default
    if (!response.ok) {
      throw new Error("Failed to fetch research paper");
    }
    const data = await response.json();
    const filteredPaper = data as Paper[];

    return filteredPaper;
  }

  return { getResearchPaper, getFilteredResearchPaper };
}
