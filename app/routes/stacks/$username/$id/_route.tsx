import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import {
  Calendar,
  ExternalLink,
  // Github,
  // Heart,
  MessageSquare,
  MessageSquareMore,
  Star,
  // Twitter,
} from "lucide-react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Link, redirect, useLoaderData } from "@remix-run/react";
import { createReview, getStackById } from "~/services/Stacks/Stacks";
import ShareButton from "~/components/ShareButton";
import { ReviewSection } from "./ReviewSection";
import { RequestReview } from "./types";

export async function loader({ params }: LoaderFunctionArgs) {
  const stack = await getStackById(params.id!);
  if (!stack) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { stack };
}

export async function action({ request, params }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const newReview: RequestReview = {
      stackId: params.id!,
      rate: Number(formData.get("rate") as string),
      comment: formData.get("comment") as string,
      creatorId: formData.get("creatorId") as string,
    };
    await createReview(newReview);

    return redirect(`/stacks/${params.username!}/${params.id!}`);
  } catch (error) {
    console.error("Error crating review:", error);
    return redirect(`/stacks/${params.username!}/${params.id!}`);
  }
}

export default function StackDetails() {
  const { stack } = useLoaderData<typeof loader>();
  return (
    <div className=" bg-background px-4 py-8 mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{stack.category}</Badge>
          </div>
          <h1 className="text-4xl font-bold">{stack?.title}</h1>
          <p className="text-xl text-muted-foreground">{stack?.description}</p>
        </div>
        <div className="flex gap-3">
          <ShareButton />
          {/* <Button size="lg" className="gap-2">
            <Heart className="w-4 h-4" /> Save Stack
          </Button> */}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Stack Stats */}
          <Card className="p-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                  <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  {stack?.rating}
                </div>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                  <MessageSquareMore className="w-5 h-5" />
                  <div className="text-2xl font-bold">
                    {stack.reviews.length}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Reviews</p>
              </div>
            </div>
          </Card>

          {/* Technologies */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Technologies</h2>
            <div className="space-y-4">
              {stack?.technologies?.map((tech) => (
                <Card key={tech.name} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{tech?.name}</h3>

                        <Badge>{tech?.tag}</Badge>
                      </div>
                      <p className="text-muted-foreground">
                        {tech?.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <a
                          href={tech?.website}
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
                <Link to={`/profile/${stack.creator.id}`}>
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={stack?.creator?.avatar}
                      alt={stack?.creator?.name}
                    />
                    <AvatarFallback>{stack?.creator?.name[0]}</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold">
                    {stack?.creator?.name}
                  </h3>
                  <p className="text-muted-foreground">
                    @{stack?.creator?.username}
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    {stack?.creator?.expertise}
                  </Badge>
                </div>
              </div>

              {/* <div className="flex justify-between text-sm">
                <div>
                  <div className="font-medium">{stack.creator.followers}</div>
                  <div className="text-muted-foreground">Followers</div>
                </div>
                <div>
                  <div className="font-medium">{stack.creator.following}</div>
                  <div className="text-muted-foreground">Following</div>
                </div>
              </div> */}

              <div className="flex gap-3">
                <Button className="w-full">Follow</Button>
                <Button variant="outline" className="w-full">
                  Message
                </Button>
              </div>

              <Separator />

              {/* <div className="flex gap-2">
                {stack?.creator?.github && (
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={`https://github.com/${stack?.creator?.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {stack?.creator?.twitter && (
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={`https://twitter.com/${stack?.creator?.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </div> */}
            </div>
          </Card>

          {/* Stack Info */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Stack Information</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>
                  Last updated {new Date(stack.updatedAt).toDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MessageSquare className="w-4 h-4" />
                <span>Open for community feedback</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <ReviewSection reviews={stack.reviews || []} />
    </div>
  );
}
