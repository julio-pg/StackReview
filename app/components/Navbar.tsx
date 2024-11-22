import { Button } from "~/components/ui/button";
import { Layers } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "@remix-run/react";

export default function Navbar() {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="flex h-16 items-center px-4">
        <div className="flex gap-6 md:gap-10">
          <Link className="flex items-center space-x-2" to="/">
            <Layers className="h-6 w-6" />
            <span className="font-bold">StackReview</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            {/* <a
              className="flex items-center text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
              href="#features"
            >
              Features
            </a> */}
            <Link
              className="flex items-center text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
              to="/stacks"
            >
              Stacks
            </Link>
            {/* <a
              className="flex items-center text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
              href="#pricing"
            >
              Pricing
            </a> */}
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Button>Sign In</Button>
          {/* <Button>Get Started</Button> */}
          <Link to="/dashboard">
            <Avatar className="w-12 h-12">
              <AvatarImage
                src={
                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&q=80"
                }
                alt={"test"}
              />
              <AvatarFallback>{"test"}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
}
