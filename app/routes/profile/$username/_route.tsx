import { Github, Twitter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getSingleUser, getUserStacks } from "~/services/Stacks/Stacks";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { StackCreator } from "~/routes/stacks/_index/StackCreator";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const userName = params.username;
  const page = url.searchParams.get("page");
  const creator = await getSingleUser(userName!);
  const userStacks = await getUserStacks(userName!, Number(page || 1), 9);
  return { userStacks, creator };
}

export default function ProfilePage() {
  const { userStacks, creator } = useLoaderData<typeof loader>();

  const totalPages = userStacks.metadata.totalPages;
  const currentPage = userStacks.metadata.page;
  const nextPage = userStacks.metadata.next?.page;
  const prevPage = userStacks.metadata.previous?.page;
  return (
    <div className=" bg-background px-4 py-8 mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="w-32 h-32">
          <AvatarImage src={creator?.avatar} alt={"test"} />
          <AvatarFallback>{creator?.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">{creator?.name}</p>
          <p className="text-sm text-muted-foreground">@{creator?.username}</p>
          {creator?.github && (
            <p className="text-muted-foreground flex items-center gap-2">
              <Github className="w-4 h-4" /> @{creator?.github}
            </p>
          )}
          {creator?.twitter && (
            <p className="text-muted-foreground flex items-center gap-2">
              <Twitter className="w-4 h-4" /> @{creator?.twitter}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-bold">User Stacks</h2>
          <p className="text-muted-foreground mt-2">
            Explore and manage the technology stacks created by this user
          </p>
        </div>
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
                    pathname: "/profile",
                    search: `?userId=${creator?.id}&page=${prevPage}`,
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
                      pathname: "/profile",
                      search: `?userId=${creator?.id}&page=${index + 1}`,
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
                  pathname: "/profile",
                  search: `?userId=${creator?.id}&page=${nextPage}`,
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
    </div>
  );
}
