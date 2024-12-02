import { useUserStore } from "~/store/userStore/userStore";
import AxiosInstance from "./axios";
import { Creator } from "~/store/userStore/types";

export async function signInWithGoogle(token: string): Promise<Creator> {
  try {
    const response = await AxiosInstance.post("/stacks/signin", {
      credential: token,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user with google:", error);
    throw error;
  }
}

export const loginWithGoogle = async () => {
  const { setUser } = useUserStore.getState();
  try {
    const credential = localStorage.getItem("credential");
    if (credential) {
      const response = await AxiosInstance.post("/stacks/login", {
        credential,
      });

      const user = response.data;
      setUser(user);
    }
  } catch (error) {
    console.error("Error initializing user store:", error);
  }
};
