import { getAllStacks } from "~/services/Stacks/Stacks";
import { StackCreator } from "./StackCreator";
import { useLoaderData, useNavigate } from "@remix-run/react";
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
import SelectBox from "~/components/SelectBox";
import { FilterIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import DataNotFound from "~/components/DataNotFound";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || 1);
  const category = url.searchParams.get("category") || undefined;
  const rating = url.searchParams.get("rating") || undefined;
  const stacks = await getAllStacks({ page, limit: 9, category, rating });
  if (!stacks) {
    throw new Response("Not Found", { status: 404 });
  }
  return { stacks, category, rating, page };
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
  const { stacks, category, page, rating } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const totalPages = stacks.metadata.totalPages;
  const currentPage = stacks.metadata.page;
  const nextPage = stacks.metadata.next?.page;
  const prevPage = stacks.metadata.previous?.page;
  const categories = ["programming", "design", "marketing", "business"];
  const stars = ["0", "1", "2", "3", "4", "5"];
  const isShowClearButton = Boolean(category || rating);
  return (
    <section className="py-6 bg-background">
      <div className="flex gap-3 items-center ml-6">
        <FilterIcon />
        <div className="flex gap-2">
          <SelectBox
            name="Category"
            items={categories}
            value={category}
            onChange={(value) => {
              navigate({
                pathname: "/stacks",
                search: buildSearchQuery({ page, category: value, rating }),
              });
            }}
          />
          <SelectBox
            name="Rating"
            items={stars}
            format={(v) => v + " Star"}
            value={rating}
            onChange={(value) => {
              navigate({
                pathname: "/stacks",
                search: buildSearchQuery({ page, category, rating: value }),
              });
            }}
          />
          {isShowClearButton && (
            <Button
              variant={"destructive"}
              onClick={() => {
                navigate({
                  pathname: "/stacks",
                  search: buildSearchQuery({ page }),
                });
              }}
            >
              clear
            </Button>
          )}
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Creator Stacks</h2>
          <p className="text-muted-foreground text-lg">
            Discover the tools and technologies trusted by industry leaders
          </p>
        </div>
        {totalPages == 0 && (
          <div className="">
            <DataNotFound title="No stacks found" />
          </div>
        )}
        <div className="grid md:grid-cols-3 gap-8">
          {stacks?.data.map((stack, i) => (
            <StackCreator key={stack.title + i} stack={stack} />
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

function buildSearchQuery({
  page,
  category,
  rating,
}: {
  page: number;
  category?: string;
  rating?: string;
}): string {
  return [
    `page=${page}`,
    category && `category=${category}`,
    rating && `rating=${rating}`,
  ]
    .filter(Boolean) // Remove falsy values (undefined, null, etc.)
    .join("&");
}
