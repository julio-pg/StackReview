import { Creator } from "~/store/userStore/types";
import { Review } from "../$username/$id/types";

export type CreatorMini = Pick<
  Creator,
  "id" | "avatar" | "name" | "username" | "expertise"
>;
export interface Stack {
  id: string;
  title: string;
  description: string;
  rating: number;
  reviews: Review[];
  category: string;
  creator: CreatorMini;
  technologies: Technology[];
  updatedAt: string;
}
export interface Technology {
  name: string;
  category: string;
  tag: string;
  website: string;
  description: string;
}

export interface Metadata {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  next?: { page: number; limit: number };
  previous?: { page: number; limit: number };
}

export interface StackResponse {
  data: Stack[];
  metadata: Metadata;
}
