import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { StarRating } from "./StarRating";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Form } from "@remix-run/react";
import { useUserStore } from "~/store/userStore/userStore";

export function ReviewForm() {
  const [rating, setRating] = useState(0);
  const { user } = useUserStore();

  return (
    <Form method="post" className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Your Rating</Label>
        <StarRating rating={rating} onChange={setRating} size="lg" />
        <Input className="hidden" name="rate" value={rating} />
        <Input className="hidden" name="creatorId" value={user?.id} />
      </div>

      <div className="space-y-2">
        <label htmlFor="comment" className="text-sm font-medium">
          Your Review
        </label>
        <Textarea
          id="comment"
          placeholder="Share your experience with this stack..."
          name="comment"
          className="min-h-[120px] resize-none"
        />
      </div>

      <Button type="submit" className="w-full">
        Submit Review
      </Button>
    </Form>
  );
}
