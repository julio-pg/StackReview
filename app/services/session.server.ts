import { createCookieSessionStorage, redirect } from "@remix-run/node"; // or cloudflare/deno
import { Creator } from "~/store/userStore/types";
type SessionData = { creator: Creator };
type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "stack-review-session",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax",
      secrets: [import.meta.env.VITE_SESSION_SECRET],
      secure: process.env.NODE_ENV === "production",
    },
  });

export { getSession, commitSession, destroySession };

export async function authenticate(request: Request) {
  const session = await getSession(request.headers.get("cookie"));
  const user = session.get("creator");
  if (user) return user;
  // if (returnTo) session.set("returnTo", returnTo);
  throw redirect("/", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}
