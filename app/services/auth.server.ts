import { Authenticator } from "remix-auth";
import { GoogleStrategy } from "@curvenote/remix-auth-google";
import { Creator } from "~/store/userStore/types";
import { loginWithGoogle } from "./logIn";

export const authenticator = new Authenticator<Creator>();

const googleStrategy = new GoogleStrategy(
  {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
    redirectURI: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
  },
  async ({ tokens }) => {
    // Get the user data from your DB or API using the tokens and profile
    const user = await loginWithGoogle(tokens.accessToken());
    return user!;
  }
);

authenticator.use(googleStrategy);
