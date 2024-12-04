export interface Review {
  stackId: string;

  creator: CreatorMini;

  rate: number;

  comment: string;

  createdAt: Date;
}

export type RequestReview = Omit<Review, "createdAt" | "creator"> & {
  creatorId: string;
};
