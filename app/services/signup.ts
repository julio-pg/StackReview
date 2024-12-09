import AxiosInstance from "./axios";
import { Creator } from "~/store/userStore/types";

export async function signUpWithGoogle(token: string): Promise<Creator> {
  try {
    const response = await AxiosInstance.post("/stacks/signup", {
      credential: token,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user with google:", error);
    throw error;
  }
}

export const loginWithGoogle = async (token: string) => {
  try {
    const response = await AxiosInstance.post("/stacks/login", {
      credential: token,
    });

    return response.data;
  } catch (error) {
    console.error("Error initializing user store:", error);
  }
};
