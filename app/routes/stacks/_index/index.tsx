import { getAllStacks } from "~/services/Stacks/Stacks";
import { StackCreator } from "./StackCreator";
import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const stacks = await getAllStacks(Number(page || 1), 9);
  if (!stacks) {
    throw new Response("Not Found", { status: 404 });
  }
  return { stacks };
};

export function ErrorBoundary() {
  try {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <h1 className="text-4xl font-bold mb-4">Stacks Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The stacks you&apos;re looking for don&apos;t exist or have been
          removed.
        </p>
      </div>
    );
  } catch (error) {
    console.error("Error in ErrorBoundary:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
        <p className="text-muted-foreground">Please try again later</p>
      </div>
    );
  }
}

export default function Stacks() {
  const { stacks } = useLoaderData<typeof loader>();
  const totalPages = stacks.metadata.totalPages;
  const currentPage = stacks.metadata.page;
  const nextPage = stacks.metadata.next?.page;
  const prevPage = stacks.metadata.previous?.page;
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Creator Stacks</h2>
          <p className="text-muted-foreground text-lg">
            Discover the tools and technologies trusted by industry leaders
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {stacks?.data.map((stack) => (
            <StackCreator key={stack.title} stack={stack} />
          ))}
        </div>
        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    to={{ pathname: "/stacks", search: `?page=${prevPage}` }}
                  />
                </PaginationItem>
              )}
              {Array(totalPages)
                .fill(0)
                .map((_item, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      to={{
                        pathname: "/stacks",
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
                  to={{ pathname: "/stacks", search: `?page=${nextPage}` }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </section>
  );
}
