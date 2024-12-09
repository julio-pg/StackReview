import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect } from "react";
import { loginWithGoogle } from "~/services/signup";
import { useUserStore } from "~/store/userStore/userStore";
import { Button } from "./ui/button";

export default function GoogleLoginButton() {
  const { setUser } = useUserStore();
  const handleLoginSuccess = (
    response: Omit<CodeResponse, "error" | "error_description" | "error_uri">
  ) => {
    // console.log("Login Success:", response);
    // Send token to your server for verification and authentication.
    const token = response.code!;
    loginWithGoogle(token)
      .then(async (user) => {
        const userString = JSON.stringify(user);
        localStorage.setItem("loginData", userString);
        setUser(user);
        axios.post(`${import.meta.env.VITE_HOST_URL}/api/auth`, {
          userId: user.id,
        });
      })
      .catch((error) => {
        console.error("Error Login with google:", error);
      });
  };

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (response) => handleLoginSuccess(response),
    onError: (error) => console.log(error),
  });

  useEffect(() => {
    const loginData = localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData")!)
      : null;
    if (loginData) {
      setUser(loginData);
    }
  }, []);
  return (
    <Button onClick={() => login()} variant={"outline"}>
      Login
    </Button>
  );
}
