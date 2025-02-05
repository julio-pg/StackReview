import { Authenticator } from "remix-auth";
import { OAuth2Strategy } from "remix-auth-oauth2";
import { Creator } from "~/store/userStore/types";
import { loginWithGoogle } from "./logIn";

export const authenticator = new Authenticator<Creator>();

const googleStrategy = new OAuth2Strategy(
  {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth",
    tokenEndpoint: "https://oauth2.googleapis.com/token",
    redirectURI: `${
      import.meta.env.VITE_GOOGLE_REDIRECT_URI
    }/auth/google/callback`,
    scopes: ["openid", "email", "profile"], // optional
  },
  async ({ tokens }) => {
    const user = await loginWithGoogle(tokens.idToken());
    return user!;
  }
);

authenticator.use(googleStrategy, "google");
