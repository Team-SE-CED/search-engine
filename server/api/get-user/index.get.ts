import { User } from "~/types/user";
import { getUserDataUseCase } from "~/server/use-case/get-user";

export default defineEventHandler(async (event) => {
  const data = await getUserDataUseCase();
  const response = data as User[];

  return response;
})
