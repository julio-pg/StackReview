import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Star, Code2, Zap, ThumbsUp } from "lucide-react";
import { Link } from "@remix-run/react";
import { useUserStore } from "~/store/userStore/userStore";

export const meta: MetaFunction = () => {
  return [
    { title: "Stack Review" },
    {
      name: "description",
      content:
        "Discover, review, and create the ideal tech stack for your next project. Join thousands of developers making informed technology choices.",
    },
  ];
};

export default function App() {
  const { user } = useUserStore();
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
            <div className="grid md:grid-cols-3 gap-8">
              {popularStacks.map((stack) => (
                <Card
                  key={stack.title}
                  className="p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-semibold">{stack.title}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                        <span className="font-medium">{stack.rating}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{stack.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {stack.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{stack.reviews} reviews</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
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

const popularStacks = [
  {
    title: "MERN Stack",
    description:
      "MongoDB, Express.js, React, and Node.js - Full-stack JavaScript development.",
    rating: 4.8,
    reviews: 1234,
    tags: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    title: "JAMstack",
    description:
      "JavaScript, APIs, and Markup - Modern web development architecture.",
    rating: 4.7,
    reviews: 856,
    tags: ["Next.js", "Netlify", "Headless CMS"],
  },
  {
    title: "T3 Stack",
    description:
      "TypeScript, tRPC, and Tailwind - Type-safe full-stack development.",
    rating: 4.9,
    reviews: 2156,
    tags: ["TypeScript", "tRPC", "Tailwind", "Next.js"],
  },
];
