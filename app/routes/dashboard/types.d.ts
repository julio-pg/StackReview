import { Stack } from "../stacks/_index/types";

export type RequestStack = Omit<
  Stack,
  "id" | "updatedAt" | "creator" | "rating" | "reviews"
> & {
  creatorId: string;
};
