// app/routes/auth.google.tsx
import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const loader = () => redirect("/");

export async function action({ request }: ActionFunctionArgs) {
  return await authenticator.authenticate("google", request);
}
