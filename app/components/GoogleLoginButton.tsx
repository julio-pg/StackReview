import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect } from "react";
import { signInWithGoogle } from "~/services/signin";
import { useUserStore } from "~/store/userStore/userStore";

export default function GoogleLoginButton() {
  const { setUser } = useUserStore();
  const handleLoginSuccess = (response: CredentialResponse) => {
    // console.log("Login Success:", response);
    // Send token to your server for verification and authentication.
    const token = response.credential!;
    signInWithGoogle(token)
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

  const handleLoginError = () => {
    console.error("Login Failed");
  };

  useEffect(() => {
    const loginData = localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData")!)
      : null;
    if (loginData) {
      setUser(loginData);
    }
  }, []);
  return (
    <div>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
        text="signin_with"
        shape="pill"
        useOneTap={true}
        ux_mode="popup"
      />
    </div>
  );
}
