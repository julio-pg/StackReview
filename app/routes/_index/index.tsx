import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/ui/button";
import { Code2, Zap } from "lucide-react";
import { Link, useLoaderData } from "@remix-run/react";
import { useUserStore } from "~/store/userStore/userStore";
import { getTopRatedStacks } from "~/services/Stacks/Stacks";
import { StackCreator } from "../stacks/_index/StackCreator";

export const meta: MetaFunction = () => {
  return [
    { title: "Stack Review" },
    {
      name: "description",
      content:
        "Discover, review, and create the ideal tech stack for your next project. Join thousands of developers making informed technology choices.",
    },
    //<-- Open Graph / Facebook -->
    { name: "og:type", content: "website" },
    { name: "og:url", content: "https://stack-review.netlify.app/" },
    { name: "og:title", content: "Stack Review" },
    {
      name: "og:description",
      content:
        "Discover, review, and create the ideal tech stack for your next project. Join thousands of developers making informed technology choices.",
    },
    { name: "og:image", content: "/stack-review-home.png" },
    //<-- Twitter -->
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:url", content: "https://stack-review.netlify.app/" },
    { name: "twitter:title", content: "Stack Review" },
    {
      name: "twitter:description",
      content:
        "Discover, review, and create the ideal tech stack for your next project. Join thousands of developers making informed technology choices.",
    },
    { name: "twitter:image", content: "/stack-review-home.png" },
  ];
};

export async function loader() {
  const popularStacks = await getTopRatedStacks();
  return { popularStacks };
}

export default function App() {
  const { user } = useUserStore();
  const { popularStacks } = useLoaderData<typeof loader>();
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-3xl mx-auto space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                  Build Your Perfect Stack
                </h1>
                <p className="text-xl text-muted-foreground">
                  Discover, review, and create the ideal tech stack for your
                  next project. Join thousands of developers making informed
                  technology choices.
                </p>
              </div>
              <div className="flex gap-4 justify-center">
                <Link to="/stacks">
                  <Button size="lg" className="gap-2">
                    Browse Stacks <Code2 className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Stacks Section */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Most Popular Stacks</h2>
              <p className="text-muted-foreground text-lg">
                Trusted and reviewed by thousands of developers
              </p>
            </div>
            {popularStacks.length === 0 ? (
              <div className="text-2xl">No data available at the moment.</div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {popularStacks?.map((stack) => (
                  <StackCreator key={stack.id} stack={stack} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/50" />
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-2xl mx-auto space-y-8">
              <h2 className="text-5xl font-bold">Create Your Stack</h2>
              <p className="text-xl text-muted-foreground">
                Ready to share your perfect tech stack with the world? Join our
                community and help others make better technology choices.
              </p>
              <Button asChild size="lg" className="gap-2">
                <Link
                  to={{
                    pathname: "/dashboard",
                    search: `?userId=${user?.id}&create_stack=true`,
                  }}
                  replace={true}
                >
                  Create Your Stack <Zap className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
