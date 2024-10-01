import { Paper } from "../types/research-paper-server";

function toResearchPaperFullResponse(expense: Paper[]) {
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
  toResearchPaperFullResponse,
};
