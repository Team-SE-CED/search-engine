import { authorService } from "../services/authors.service";

export async function getAuthorsUseCase() {
  const response = await authorService.getAuthors();

  return response;
}
