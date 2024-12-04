import { Review } from "../$username/$id/types";

export interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  expertise: string;
  bio: string;
  github: string;
  twitter: string;
}

export interface Stack {
  id: string;
  title: string;
  description: string;
  rating: number;
  reviews: Review[];
  category: string;
  creator: Creator;
  technologies: Technology[];
  updatedAt: string;
}
export interface Technology {
  name: string;
  category: string;
  website: string;
}
