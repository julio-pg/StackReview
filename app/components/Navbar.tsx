import { Layers } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "@remix-run/react";
import GoogleLoginButton from "./GoogleLoginButton";
import { useUserStore } from "~/store/userStore/userStore";

export default function Navbar() {
  const { user } = useUserStore();

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
          {/* <Button>Get Started</Button> */}
          {user ? (
            <Link to="/dashboard">
              <Avatar>
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user?.name[0]}</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <GoogleLoginButton />
          )}
        </div>
      </div>
    </header>
  );
}
