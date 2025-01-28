import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { commitSession, getSession } from "~/services/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.authenticate("google", request);
  // Store user in session or database
  const session = await getSession(request.headers.get("cookie"));
  session.set("creator", user);
  throw redirect("/", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}
