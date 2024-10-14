import type { PaperUI } from "~/types/research-paper-ui";
// To save state in one session

export function setSessionData(papers: PaperUI[]) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("researchPaperStored", JSON.stringify(papers));
  }
}

export function getSessionData() {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("researchPaperStored");
  }
  return null;
}
