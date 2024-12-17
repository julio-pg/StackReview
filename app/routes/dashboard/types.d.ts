import { Stack } from "../stacks/_index/types";

export type RequestStack = Omit<
  Stack,
  "id" | "updatedAt" | "creator" | "rating" | "reviews"
> & {
  creatorId: string;
};

export type UpdateCreatorRequest = Pick<
  Creator,
  "name" | "username" | "expertise" | "github" | "twitter"
>;

export interface StackErrors {
  title?: string[] | undefined;
  description?: string[] | undefined;
  category?: string[] | undefined;
  technologies?: string[] | undefined;
}

export interface CreatorErrors {
  name?: string[] | undefined;
  username?: string[] | undefined;
  expertise?: string[] | undefined;
  github?: string[] | undefined;
  twitter?: string[] | undefined;
}
