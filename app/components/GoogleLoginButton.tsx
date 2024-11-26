import { GoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "~/services/Login";

export default function GoogleLoginButton() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLoginSuccess = (response: any) => {
    console.log("Login Success:", response);
    // Send token to your server for verification and authentication.
    const token = response.credential;
    loginWithGoogle(token);
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
