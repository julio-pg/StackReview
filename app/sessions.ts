import { createCookieSessionStorage, redirect } from "@remix-run/node"; // or cloudflare/deno

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "stack-review-session",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
      secure: process.env.NODE_ENV === "production",
    },
  });

export { getSession, commitSession, destroySession };

export async function requireUserSession(request: Request) {
  // get the session
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const urlUserId = searchParams.get("userId");

  const cookie = request.headers.get("cookie");
  const session = await getSession(cookie);

  const sessionUserId = session.data.userId;

  // validate the session, `userId` is just an example, use whatever value you
  // put in the session when the user authenticated
  if (!session.has("userId") || urlUserId !== sessionUserId) {
    // if there is no user session or the userId in the url belong to other account, redirect to login
    throw redirect("/");
  }

  return session;
}
