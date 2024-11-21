import { json } from "@remix-run/node";
import { StackCreator } from "./StackCreator";

export const loader = () => {
  return json({});
};

export default function Stacks() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Creator Stacks</h2>
          <p className="text-muted-foreground text-lg">
            Discover the tools and technologies trusted by industry leaders
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {popularStacks.map((stack) => (
            <StackCreator key={stack.title} stack={stack} />
          ))}
        </div>
      </div>
    </section>
  );
}

const popularStacks = [
  {
    title: "Modern Web Stack",
    description:
      "Next.js 14, TypeScript, and Tailwind CSS for scalable web applications.",
    rating: 4.9,
    reviews: 1234,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
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
    title: "Full-Stack JavaScript",
    description:
      "Modern full-stack development with Node.js, Express, and React.",
    rating: 4.8,
    reviews: 856,
    tags: ["Node.js", "Express", "React", "MongoDB"],
    creator: {
      name: "Marques Brownlee",
      username: "MKBHD",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&q=80",
      expertise: "Tech Expert",
      bio: 'Known as "The best tech reviewer on the planet." That\'s hard to top.',
    },
  },
  {
    title: "Content Creator Stack",
    description:
      "Ultimate tech stack for content creators and digital media professionals.",
    rating: 4.7,
    reviews: 2156,
    tags: ["Adobe CC", "DaVinci Resolve", "Final Cut Pro", "OBS"],
    creator: {
      name: "Peter McKinnon",
      username: "petermckinnon",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&q=80",
      expertise: "Film & Photography Pro",
      bio: "Check out the gear behind YouTube's biggest Photographer. Grab a cup of coffee and stay awhile.",
    },
  },
];
