import { useUserStore } from "~/store/userStore";
import AxiosInstance from "./axios";

export const signInWithGoogle = async (token: string) => {
  try {
    const response = await AxiosInstance.post("/stacks/signin", {
      credential: token,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user with google:", error);
    throw error;
  }
};

export const loginWithGoogle = async () => {
  const { setUser } = useUserStore.getState();
  try {
    const credential = sessionStorage.getItem("credential");
    console.log("loginXD");
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
