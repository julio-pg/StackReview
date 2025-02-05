import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { deleteStack } from "~/services/Stacks/Stacks";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const stackId = formData.get("stackId") as string;

  await deleteStack(stackId!);

  return redirect(`/dashboard?toastMessage=Record deleted successfully`);
};
