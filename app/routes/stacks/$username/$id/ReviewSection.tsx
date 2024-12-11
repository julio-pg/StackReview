import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { ReviewCard } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";
import { MessageSquare } from "lucide-react";
import { Review } from "./types";
import { useUserStore } from "~/store/userStore/userStore";
// import { useToast } from "@/hooks/use-toast";

interface ReviewSectionProps {
  reviews: Review[];
}

export function ReviewSection({ reviews: initialReviews }: ReviewSectionProps) {
  const [reviews] = useState<Review[]>(initialReviews);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useUserStore();

  //   rating: number;
  //   comment: string;
  // }) => {
  //   const newReview: Review = {
  //     id: crypto.randomUUID(),
  //     user: {
  //       name: "Current User", // In a real app, this would come from auth
  //       avatar:
  //         "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&q=80",
  //     },
  //     ...reviewData,
  //     createdAt: new Date(),
  //   };

  //   setReviews((prev) => [newReview, ...prev]);
  //   setIsDialogOpen(false);

  // };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Reviews</h2>
          <p className="text-muted-foreground">
            {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" disabled={user ? false : true}>
              <MessageSquare className="w-4 h-4" />
              Write a Review
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
            </DialogHeader>
            <ReviewForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {reviews?.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}

        {reviews?.length === 0 && (
          <div className="text-center py-12 bg-muted/40 rounded-lg">
            <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No reviews yet</h3>
            <p className="text-muted-foreground">
              Be the first to review this stack!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
