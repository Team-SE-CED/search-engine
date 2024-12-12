import { userDataService } from "../services/user.service";

export async function getUserDataUseCase() {
    const response = await userDataService.getUser();
    return response;
  }