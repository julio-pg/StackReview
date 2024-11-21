import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import {
  BookOpen,
  Code2,
  ExternalLink,
  Github,
  Heart,
  MessageSquare,
  Share2,
  Star,
  ThumbsUp,
  Twitter,
} from "lucide-react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

interface Technology {
  name: string;
  description: string;
  category: string;
  version: string;
  website: string;
  documentation: string;
}

interface Creator {
  name: string;
  username: string;
  avatar: string;
  expertise: string;
  bio: string;
  followers: number;
  following: number;
  github?: string;
  twitter?: string;
}

interface Stack {
  title: string;
  description: string;
  rating: number;
  reviews: number;
  likes: number;
  tags: string[];
  technologies: Technology[];
  creator: Creator;
  lastUpdated: string;
}

export async function loader({ params }: LoaderFunctionArgs): Promise<Stack> {
  // TODO: Replace with actual data fetching
  const stack: Stack = {
    title: params.name || "",
    description:
      "Next.js 14, TypeScript, and Tailwind CSS for scalable web applications.",
    rating: 4.9,
    reviews: 1234,
    likes: 892,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    technologies: [
      {
        name: "Next.js",
        description: "The React Framework for Production",
        category: "Framework",
        version: "14.0.0",
        website: "https://nextjs.org",
        documentation: "https://nextjs.org/docs",
      },
    ],
    creator: {
      name: "Edgar Oganesyan",
      username: "Techsource",
      avatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&q=80",
      expertise: "Tech Expert",
      bio: "With over 1M followers, and knowledge on every aspect of tech, a better name might be TechCyborg.",
      followers: 1200000,
      following: 512,
      github: "https://github.com/techsource",
      twitter: "https://twitter.com/techsource",
    },
    lastUpdated: "2 weeks ago",
  };

  if (!stack) {
    throw new Response("Not Found", { status: 404 });
  }

  return stack;
}

export default function StackDetails() {
  const stack = useLoaderData<typeof loader>();
  return (
    <div className=" bg-background px-4 py-8 mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-2">
            {stack.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl font-bold">{stack.title}</h1>
          <p className="text-xl text-muted-foreground">{stack.description}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="lg" className="gap-2">
            <Share2 className="w-4 h-4" /> Share
          </Button>
          <Button size="lg" className="gap-2">
            <Heart className="w-4 h-4" /> Save Stack
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Stack Stats */}
          <Card className="p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                  <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  {stack.rating}
                </div>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
              <div>
                <div className="text-2xl font-bold">{stack.reviews}</div>
                <p className="text-sm text-muted-foreground">Reviews</p>
              </div>
              <div>
                <div className="text-2xl font-bold">{stack.likes}</div>
                <p className="text-sm text-muted-foreground">Likes</p>
              </div>
            </div>
          </Card>

          {/* Technologies */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Technologies</h2>
            <div className="space-y-4">
              {stack.technologies.map((tech) => (
                <Card key={tech.name} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{tech.name}</h3>
                        <Badge variant="outline">{tech.version}</Badge>
                        <Badge>{tech.category}</Badge>
                      </div>
                      <p className="text-muted-foreground">
                        {tech.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <a
                          href={tech.documentation}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <BookOpen className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <a
                          href={tech.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Creator Profile */}
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={stack.creator.avatar}
                    alt={stack.creator.name}
                  />
                  <AvatarFallback>{stack.creator.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold">
                    {stack.creator.name}
                  </h3>
                  <p className="text-muted-foreground">
                    @{stack.creator.username}
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    {stack.creator.expertise}
                  </Badge>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                {stack.creator.bio}
              </p>

              <div className="flex justify-between text-sm">
                <div>
                  <div className="font-medium">{stack.creator.followers}</div>
                  <div className="text-muted-foreground">Followers</div>
                </div>
                <div>
                  <div className="font-medium">{stack.creator.following}</div>
                  <div className="text-muted-foreground">Following</div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="w-full">Follow</Button>
                <Button variant="outline" className="w-full">
                  Message
                </Button>
              </div>

              <Separator />

              <div className="flex gap-2">
                {stack.creator.github && (
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={stack.creator.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {stack.creator.twitter && (
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={stack.creator.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Stack Info */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Stack Information</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Code2 className="w-4 h-4" />
                <span>Last updated {stack.lastUpdated}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <ThumbsUp className="w-4 h-4" />
                <span>{stack.reviews} developers reviewed this stack</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MessageSquare className="w-4 h-4" />
                <span>Open for community feedback</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
