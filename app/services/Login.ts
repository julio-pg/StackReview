import AxiosInstance from "./axios";

export const loginWithGoogle = async (token: string) => {
  try {
    const response = await AxiosInstance.post("/auth/google/signin", {
      credential: token,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user with google:", error);
    throw error;
  }
};
