import { Button } from "~/components/ui/button";
import { Github, Plus, Twitter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useUserStore } from "~/store/userStore/userStore";
import {
  createStack,
  getAllTechnologies,
  getUserStacks,
} from "~/services/Stacks/Stacks";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { RequestStack } from "../types";
import {
  Link,
  useActionData,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import CreateStackModal from "./CreateStackModal";
import { StackCreator } from "~/routes/stacks/_index/StackCreator";
import { requireUserSession } from "~/sessions";
import { z } from "zod";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserSession(request);
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");
  const page = url.searchParams.get("page");

  const userStacks = await getUserStacks(userId!, Number(page || 1), 9);
  const techs = await getAllTechnologies();
  return { userStacks, techs };
}

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const userData = JSON.parse(formData.get("creator") as string);

    const updates: RequestStack = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      creatorId: userData!.id!,
      technologies: JSON.parse(formData.get("technologies") as string),
    };

    const stackSchema = z.object({
      title: z.string().min(1, "Title is required"),
      description: z.string().min(1, "Description is required"),
      category: z.string().min(1, "Category is required"),
      technologies: z
        .array(
          z.object({
            name: z.string(),
            category: z.string(),
            website: z.string(),
          })
        )
        .nonempty("At least one technology is required"),
    });

    const validationResult = stackSchema.safeParse(updates);
    if (!validationResult.success) {
      console.error("Validation failed:");
      return validationResult.error.formErrors.fieldErrors;
    }
    await createStack(updates);
    return redirect(`/dashboard?userId=${userData!.id!}`);
  } catch (error) {
    const formData = await request.formData();
    const userData = JSON.parse(formData.get("creator") as string);
    console.error("Failed to create stack:", error);
    return redirect(`/dashboard?userId=${userData!.id!}`, {
      headers: {
        "Set-Cookie": "error=true; HttpOnly; Path=/; SameSite=Strict",
      },
    });
  }
};

export default function UserStacks() {
  const [searchParams] = useSearchParams();
  const { user } = useUserStore();
  const { userStacks, techs } = useLoaderData<typeof loader>();
  const formErrors = useActionData<typeof action>();

  const totalPages = userStacks.metadata.totalPages;
  const currentPage = userStacks.metadata.page;
  const nextPage = userStacks.metadata.next?.page;
  const prevPage = userStacks.metadata.previous?.page;

  return (
    <div className=" bg-background px-4 py-8 mx-auto">
      <h1 className="text-4xl font-bold mb-2">Profile</h1>
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="w-32 h-32">
          <AvatarImage src={user?.avatar} alt={"test"} />
          <AvatarFallback>{user?.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">{user?.name}</p>
          {user?.github && (
            <p className="text-muted-foreground flex items-center gap-2">
              <Github className="w-4 h-4" /> @{user?.github}
            </p>
          )}
          {user?.twitter && (
            <p className="text-muted-foreground flex items-center gap-2">
              <Twitter className="w-4 h-4" /> @{user?.twitter}
            </p>
          )}
          <Button variant="outline">Edit Profile</Button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Your Stacks</h1>
          <p className="text-muted-foreground mt-2">
            Manage and create your technology stacks
          </p>
        </div>
        <Link
          to={{
            pathname: "/dashboard",
            search: `?userId=${user?.id}&create_stack=true`,
          }}
          replace={true}
        >
          <Button size="lg" className="gap-2">
            <Plus className="w-4 h-4" /> Create Stack
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userStacks.data.map((stack, index) => (
          <StackCreator key={index} stack={stack} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  to={{
                    pathname: "/dashboard",
                    search: `?userId=${user?.id}&page=${prevPage}`,
                  }}
                />
              </PaginationItem>
            )}
            {Array(totalPages)
              .fill(0)
              .map((_item, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    to={{
                      pathname: "/dashboard",
                      search: `?userId=${user?.id}&page=${index + 1}`,
                    }}
                    isActive={currentPage == index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

            {totalPages > 5 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                to={{
                  pathname: "/dashboard",
                  search: `?userId=${user?.id}&page=${nextPage}`,
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {userStacks.data.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-muted rounded-lg p-8 max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-2">No stacks yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first stack to share your favorite technology
              combinations with the community.
            </p>
            {/* <CreateStackModal /> */}
          </div>
        </div>
      )}
      {searchParams.get("create_stack") && (
        <CreateStackModal errors={formErrors} techs={techs} />
      )}
    </div>
  );
}
