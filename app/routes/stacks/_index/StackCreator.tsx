import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Card } from "~/components/ui/card";
import { MessageSquareMore, Star, Trash2 } from "lucide-react";
import { Form, Link, useLocation } from "@remix-run/react";
import { Stack } from "./types";

interface StackCreatorProps {
  stack: Stack;
}

export function StackCreator({ stack }: StackCreatorProps) {
  const location = useLocation();
  return (
    <Card className="overflow-hidden cursor-pointer hover-card">
      <div className="p-6 space-y-6">
        {/* Stack Info */}
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <Link to={`/stacks/${stack.creator.username}/${stack.id}`}>
              <h3 className="text-2xl font-semibold">{stack.title}</h3>
            </Link>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
              <span className="font-medium">{stack.rating}</span>
              {location.pathname === "/dashboard" && (
                <Form action="destroy" method="post">
                  <input
                    className="hidden"
                    name="stackId"
                    value={stack.id}
                    readOnly
                  />
                  <input
                    className="hidden"
                    name="userId"
                    value={stack.creator.id}
                    readOnly
                  />
                  <button type="submit" className="hover:text-red-500">
                    <Trash2 />
                  </button>
                </Form>
              )}
            </div>
          </div>
          <p className="text-secondary-foreground">
            {stack.description.split("", 36).join("")} ...
          </p>
          <div className="flex flex-wrap gap-2 capitalize">
            <Badge variant="secondary">{stack.category}</Badge>
          </div>
        </div>

        {/* Creator Profile */}
        <div className="pt-6 border-t border-border/60">
          <div className="flex items-start gap-4">
            <Link
              to={{
                pathname: `/profile/${stack.creator.username}`,
              }}
            >
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={stack.creator.avatar}
                  alt={stack.creator.name}
                />
                <AvatarFallback>{stack.creator.name[0]}</AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold">
                    {stack.creator.name}
                  </h4>
                  <p className="text-sm">@{stack.creator.username}</p>
                </div>
                {/* <Button variant="secondary" size="sm">
                    Follow
                  </Button> */}
              </div>
              <Badge variant="secondary" className="mt-2">
                {stack.creator.expertise}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 text-sm text-primary-foreground">
            <MessageSquareMore className="w-4 h-4" />
            <span>{stack.reviews.length} reviews</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
