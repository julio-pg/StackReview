import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { signUpWithGoogle } from "~/services/signup";
import { useUserStore } from "~/store/userStore/userStore";
import { Button } from "./ui/button";

export default function GoogleSignupButton() {
  const { setUser } = useUserStore();
  const handleSignupSuccess = (
    response: Omit<CodeResponse, "error" | "error_description" | "error_uri">
  ) => {
    // console.log("Login Success:", response);
    // Send token to your server for verification and authentication.
    const token = response.code!;
    signUpWithGoogle(token)
      .then(async (user) => {
        const userString = JSON.stringify(user);
        localStorage.setItem("loginData", userString);
        setUser(user);
        axios.post(`${import.meta.env.VITE_HOST_URL}/api/auth`, {
          userId: user.id,
        });
      })
      .catch((error) => {
        console.error("Error storing token in local storage:", error);
      });
  };

  const signUp = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (response) => handleSignupSuccess(response),
    onError: (error) => console.log(error),
  });
  return <Button onClick={() => signUp()}>Sign Up</Button>;
}
