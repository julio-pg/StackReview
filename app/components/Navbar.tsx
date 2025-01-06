import { Link } from "@remix-run/react";
import GoogleSignupButton from "./GoogleSignupButton";
import { useUserStore } from "~/store/userStore/userStore";
import GoogleLoginButton from "./GoogleLoginButton";
import { UserNav } from "./UserNav";

// TODO: add categories dropdown
export default function Navbar() {
  const { user } = useUserStore();
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="flex h-16 items-center px-4">
        <div className="flex gap-6 md:gap-10">
          <Link className="flex items-center space-x-2" to="/">
            <img
              src="/stackReviewLogo-mini.png"
              alt="logo"
              className="w-10 h-10"
            />
            <h2 className="font-bold">StackReview</h2>
          </Link>
          <nav className="hidden gap-6 md:flex">
            {/* <a
              className="flex items-center text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
              href="#features"
            >
              Features
            </a> */}
            <Link
              className="flex items-center text-lg font-medium transition-colors hover:text-primary"
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
            <UserNav
              avatar={user?.avatar}
              id={user.id}
              name={user.name}
              username={user.username}
            />
          ) : (
            <div className="flex gap-3 ">
              <GoogleLoginButton />
              <GoogleSignupButton />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
