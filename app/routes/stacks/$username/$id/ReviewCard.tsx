import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card } from "~/components/ui/card";
import { StarRating } from "./StarRating";
import { formatDistanceToNow } from "date-fns";
import { Review } from "./types";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <Avatar>
          <AvatarImage src={review.creator.avatar} alt={review.creator.name} />
          <AvatarFallback>{review.creator.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold">{review.creator.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <StarRating rating={review.rate} readonly size="sm" />
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(review.createdAt, { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
          <p className="mt-2 text-muted-foreground whitespace-pre-wrap">
            {review.comment}
          </p>
        </div>
      </div>
    </Card>
  );
}
