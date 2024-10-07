import { PaperUI } from "~/types/research-paper-ui";
import { Paper } from "../types/research-paper-server";

function convertPapersToPaperUI(expense: Paper[]): PaperUI[] {
  return expense.map((expense) => {
    return {
      id: expense.id,
      date: new Date(expense.created_at).toUTCString(),
      imgUrl: expense.img_url,
      title: expense.title,
    };
  });
}

export const researchPaperFactory = {
  convertPapersToPaperUI,
};
