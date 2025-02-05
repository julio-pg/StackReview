import { Link } from "@remix-run/react";
import { useUserStore } from "~/store/userStore/userStore";
import GoogleLoginButton from "./GoogleLoginButton";
import { UserNav } from "./UserNav";
import { ThemeToggle } from "./ThemeToggle";

// TODO: add categories dropdown

export default function Navbar() {
  const { user } = useUserStore();
  return (
    <header className=" sticky mx-auto w-full border-b border-gray-50/0 ease-in-out flex-none  top-0 transition-[opacity] z-40 scroll backdrop-blur-2xl">
      <div className="w-full mx-auto max-w-7xl">
        <div
          className="flex w-full px-8 py-5 mx-auto
      items-center sm:justify-between justify-center
      md:px-12
      lg:px-32"
        >
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
            <ThemeToggle />
            {user ? (
              <UserNav
                avatar={user?.avatar}
                name={user.name}
                username={user.username}
              />
            ) : (
              <div className="flex gap-3">
                <GoogleLoginButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
