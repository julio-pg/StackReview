export interface Creator {
  name: string;
  username: string;
  avatar: string;
  expertise: string;
  bio: string;
}

export interface Stack {
  id: string;
  title: string;
  description: string;
  rating: number;
  // reviews: number;
  tags: string[];
  creator: Creator;
}
