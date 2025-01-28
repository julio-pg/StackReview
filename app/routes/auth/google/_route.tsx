// app/routes/auth.google.tsx
import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { commitSession, getSession } from "~/services/session.server";

export const loader = () => redirect("/");

export async function action({ request }: ActionFunctionArgs) {
  const user = await authenticator.authenticate("google", request);
  const session = await getSession(request.headers.get("cookie"));
  session.set("id", user.id);
  throw redirect("/", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}
