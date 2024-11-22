import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Star } from "lucide-react";
import { Link } from "@remix-run/react";
import { Stack } from "./types";

interface StackCreatorProps {
  stack: Stack;
}

export function StackCreator({ stack }: StackCreatorProps) {
  return (
    <Link to={`/stacks/${stack.id}`}>
      <Card className="overflow-hidden cursor-pointer">
        <div className="p-6 space-y-6">
          {/* Stack Info */}
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
          </div>

          {/* Creator Profile */}
          <div className="pt-6 border-t border-border/60">
            <div className="flex items-start gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={stack.creator.avatar}
                  alt={stack.creator.name}
                />
                <AvatarFallback>{stack.creator.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold">
                      {stack.creator.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      @{stack.creator.username}
                    </p>
                  </div>
                  <Button variant="secondary" size="sm">
                    Follow
                  </Button>
                </div>
                <Badge variant="secondary" className="mt-2">
                  {stack.creator.expertise}
                </Badge>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {stack.creator.bio}
                </p>
              </div>
            </div>
            {/* <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
              <ThumbsUp className="w-4 h-4" />
              <span>{stack.reviews} reviews</span>
            </div> */}
          </div>
        </div>
      </Card>
    </Link>
  );
}
