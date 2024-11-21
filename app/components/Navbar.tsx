import { Button } from "~/components/ui/button";
import { Layers, Github } from "lucide-react";

export default function Navbar() {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur ">
      <div className="container flex h-16 items-center px-4">
        <div className="flex gap-6 md:gap-10">
          <a className="flex items-center space-x-2" href="/">
            <Layers className="h-6 w-6" />
            <span className="font-bold">StackReview</span>
          </a>
          <nav className="hidden gap-6 md:flex">
            <a
              className="flex items-center text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
              href="#features"
            >
              Features
            </a>
            <a
              className="flex items-center text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
              href="#stacks"
            >
              Stacks
            </a>
            <a
              className="flex items-center text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
              href="#pricing"
            >
              Pricing
            </a>
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Github className="h-5 w-5" />
          </Button>
          <Button variant="secondary">Sign In</Button>
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  );
}
