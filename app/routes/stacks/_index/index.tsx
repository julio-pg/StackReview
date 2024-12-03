import { getAllStacks } from "~/services/Stacks/Stacks";
import { StackCreator } from "./StackCreator";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  const stacks = await getAllStacks();
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
          {stacks?.map((stack) => (
            <StackCreator key={stack.title} stack={stack} />
          ))}
        </div>
      </div>
    </section>
  );
}
