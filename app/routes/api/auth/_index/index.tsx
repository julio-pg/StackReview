import { ActionFunctionArgs } from "@remix-run/node";
import { getSession, commitSession } from "~/sessions";

export async function action({ request }: ActionFunctionArgs) {
  const { userId } = await request.json();

  try {
    // Create a session
    const session = await getSession();
    session.set("userId", userId);
    // Send the cookie back to the client
    return new Response(null, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    console.error("Failed to add cookie", error);
    return new Response("Unauthorized", { status: 401 });
  }
}
