import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Button } from "./components/ui/button";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "./components/ui/toaster";
import { useEffect } from "react";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap",
  },
  { rel: "icon", href: "/stackReviewLogo-mini.png" },
  { rel: "manifest", href: "/manifest.json" },
];

export function ErrorBoundary() {
  try {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <h1 className="text-4xl font-bold mb-4">Stack Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The stack you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link to="/stacks">
          <Button variant="outline">Return to Stacks</Button>
        </Link>
      </div>
    );
  } catch (error) {
    console.error("Error in ErrorBoundary:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
        <p className="text-muted-foreground">Please try again later</p>
      </div>
    );
  }
}
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <Navbar />
          {children}
          <Footer />
          <ScrollRestoration />
          <Scripts />
          <Toaster />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js").then(
        (registration) => {
          console.log(
            "ServiceWorker registration successful",
            registration.scope
          );
        },
        (err) => {
          console.log("ServiceWorker registration failed: ", err);
        }
      );
    });
  }
}
export default function App() {
  useEffect(() => {
    registerServiceWorker();
  }, []);
  return <Outlet />;
}
