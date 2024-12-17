import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { deleteStack } from "~/services/Stacks/Stacks";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const stackId = formData.get("stackId") as string;
  const userId = formData.get("userId") as string;

  await deleteStack(stackId!);

  return redirect(
    `/dashboard?userId=${userId}&toastMessage=Record deleted successfully`
  );
};
