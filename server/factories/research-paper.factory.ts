import { PaperUI } from "~/types/research-paper-ui";
import { Paper } from "../../types/research-paper-server";

function convertPapersToPaperUI(paper: Paper[]): PaperUI[] {
  return paper.map((paper) => {
    return {
      id: paper.id,
      date: new Date(paper.created_at).toUTCString(),
      imgUrl: paper.img_url,
      title: paper.title,
      author: paper.author,
      department: paper.department,
      yearPublished: paper.year_published,
      abstract: paper.abstract,
    };
  });
}

export const researchPaperFactory = {
  convertPapersToPaperUI,
};
