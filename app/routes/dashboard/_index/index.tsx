import { Button } from "~/components/ui/button";
import { Github, Pen, Plus, Twitter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useUserStore } from "~/store/userStore/userStore";
import {
  getAllTechnologies,
  getUserStacks,
  handleUpdateCreator,
} from "~/services/Stacks/Stacks";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";

import {
  Link,
  useActionData,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { StackCreator } from "~/routes/stacks/_index/StackCreator";
import { authenticate } from "~/services/session.server";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { useEffect } from "react";
import { toast } from "~/hooks/use-toast";
import { Badge } from "~/components/ui/badge";
import UpdateCreatorModal from "./UpdateCreatorModal";
import { CreatorErrors } from "../types";

export async function loader({ request }: LoaderFunctionArgs) {
  const creator = await authenticate(request);
  const url = new URL(request.url);
  const page = url.searchParams.get("page");

  const userStacks = await getUserStacks(
    creator.username,
    Number(page || 1),
    9
  );
  const techs = await getAllTechnologies();
  return { userStacks, techs };
}

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();

    const { errors, newCreator } = await handleUpdateCreator(formData);
    console.log(newCreator);
    if (errors) {
      return { errors };
    }
    return redirect(`/dashboard?newCreator=${JSON.stringify(newCreator)}`);
  } catch (error) {
    console.error("Failed to create stack:", error);
    return redirect(`/dashboard`, {
      headers: {
        "Set-Cookie": "error=true; HttpOnly; Path=/; SameSite=Strict",
      },
    });
  }
};

export default function UserStacks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, setUser } = useUserStore();
  const { userStacks } = useLoaderData<typeof loader>();
  const formErrors = useActionData<typeof action>();

  const totalPages = userStacks.metadata.totalPages;
  const currentPage = userStacks.metadata.page;
  const nextPage = userStacks.metadata.next?.page;
  const prevPage = userStacks.metadata.previous?.page;

  useEffect(() => {
    const message = searchParams.get("toastMessage");
    const newCreator = searchParams.get("newCreator");
    if (message) {
      toast({
        title: "Success",
        description: message,
      });
      // Remove the query parameter after showing the toast
      searchParams.delete("toastMessage");
      setSearchParams(searchParams);
    } else if (newCreator) {
      localStorage.setItem("loginData", newCreator);
      setUser(JSON.parse(newCreator));
      searchParams.delete("newCreator");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className=" bg-background px-4 py-8 mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="flex flex-col">
          <Avatar className="w-32 h-32">
            <AvatarImage src={user?.avatar} alt={"test"} />
            <AvatarFallback>{user?.name[0]}</AvatarFallback>
          </Avatar>
          <Link
            to={{
              pathname: "/dashboard",
              search: `?edit_creator=true`,
            }}
            replace={true}
          >
            <Button variant="outline">
              <Pen /> Edit Profile
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">{user?.name}</p>
          <p className="text-sm text-muted-foreground">@{user?.username}</p>
          <Badge variant="secondary" className="mt-2">
            {user?.expertise}
          </Badge>
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
        </div>
      </div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-bold">Your Stacks</h2>
          <p className="text-muted-foreground mt-2">
            Manage and create your technology stacks
          </p>
        </div>
        <Link
          to={{
            pathname: "/create",
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
                    search: `?page=${prevPage}`,
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
                      search: `?page=${index + 1}`,
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
                  search: `?page=${nextPage}`,
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
          </div>
        </div>
      )}
      {searchParams.get("edit_creator") && (
        <UpdateCreatorModal errors={formErrors as CreatorErrors} />
      )}
    </div>
  );
}
