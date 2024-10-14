import type { PaperUI } from "~/types/research-paper-ui";

export function setSessionData(papers: PaperUI[]) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("itemsStored", JSON.stringify(papers));
  }
}

export function getSessionData() {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("itemsStored");
  }
  return null;
}
