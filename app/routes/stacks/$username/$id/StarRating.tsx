import { Star } from "lucide-react";
import { cn } from "~/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  onChange?: (rating: number) => void;
  readonly?: boolean;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  onChange,
  readonly = false,
}: StarRatingProps) {
  const stars = Array.from({ length: maxRating }, (_, i) => i + 1);
  const sizeClass = sizeClasses[size];

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          className={cn(
            "focus:outline-none transition-colors",
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
          )}
          onClick={() => !readonly && onChange?.(star)}
          disabled={readonly}
        >
          <Star
            className={cn(
              sizeClass,
              star <= rating
                ? "fill-yellow-500 text-yellow-500"
                : "fill-muted text-muted"
            )}
          />
        </button>
      ))}
    </div>
  );
}
