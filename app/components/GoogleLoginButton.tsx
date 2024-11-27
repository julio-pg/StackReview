import { GoogleLogin } from "@react-oauth/google";
import { signInWithGoogle } from "~/services/signin";

export default function GoogleLoginButton() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLoginSuccess = (response: any) => {
    // console.log("Login Success:", response);
    // Send token to your server for verification and authentication.
    const token = response.credential;
    signInWithGoogle(token).then(() => {
      try {
        localStorage.setItem("credential", token);
      } catch (error) {
        console.error("Error storing token in local storage:", error);
      }
    });
  };

  const handleLoginError = () => {
    console.error("Login Failed");
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
        text="signin_with"
        shape="pill"
      />
    </div>
  );
}
