export interface Creator {
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
  // reviews: number;
  tags: string[];
  creator: Creator;
  technologies: Technology[];
  updatedAt: string;
}
export interface Technology {
  name: string;
  version: string;
  description: string;
  category: string;
  website: string;
}
