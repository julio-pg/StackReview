import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { StackCreator } from "./StackCreator";

const userStacks = [
  {
    title: "Modern Web Development Stack",
    description:
      "A comprehensive stack for building scalable web applications with the latest technologies.",
    rating: 4.9,
    reviews: 1234,
    tags: ["Web Development", "Full Stack", "React", "Node.js"],
    creator: {
      name: "Edgar Oganesyan",
      username: "Techsource",
      avatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&q=80",
      expertise: "Tech Expert",
      bio: "With over 1M followers, and knowledge on every aspect of tech, a better name might be TechCyborg.",
    },
  },
  {
    title: "Mobile App Development Stack",
    description:
      "Complete stack for building cross-platform mobile applications with React Native.",
    rating: 4.7,
    reviews: 856,
    tags: ["Mobile", "React Native", "Cross Platform"],
    creator: {
      name: "Edgar Oganesyan",
      username: "Techsource",
      avatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&q=80",
      expertise: "Tech Expert",
      bio: "With over 1M followers, and knowledge on every aspect of tech, a better name might be TechCyborg.",
    },
  },
  {
    title: "Data Science Toolkit",
    description:
      "Essential tools and libraries for data analysis and machine learning projects.",
    rating: 4.8,
    reviews: 723,
    tags: ["Data Science", "Python", "Machine Learning"],
    creator: {
      name: "Edgar Oganesyan",
      username: "Techsource",
      avatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&q=80",
      expertise: "Tech Expert",
      bio: "With over 1M followers, and knowledge on every aspect of tech, a better name might be TechCyborg.",
    },
  },
];

export default function UserStacks() {
  return (
    <div className=" bg-background px-4 py-8 mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Your Stacks</h1>
          <p className="text-muted-foreground mt-2">
            Manage and create your technology stacks
          </p>
        </div>
        <Button size="lg" className="gap-2">
          <Plus className="w-4 h-4" /> Create Stack
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userStacks.map((stack, index) => (
          <StackCreator key={index} stack={stack} />
        ))}
      </div>

      {userStacks.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-muted rounded-lg p-8 max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-2">No stacks yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first stack to share your favorite technology
              combinations with the community.
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> Create Your First Stack
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
