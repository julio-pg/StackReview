import { cn } from "~/lib/utils";
import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";

type props = {
  sections: {
    id: string;
    title: string;
    content: string[];
  }[];
};
export function TableOfContents({ sections }: props) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66%" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div className="hidden lg:block">
      <div className="sticky top-16 p-6 border rounded-lg">
        <h3 className="font-semibold">On this page</h3>
        <nav className="mt-4">
          <ul className="space-y-3 text-sm">
            {sections.map((section) => (
              <li key={section.id}>
                <Link
                  to={{ hash: `#${section.id}` }}
                  className={cn(
                    "block text-muted-foreground hover:text-foreground transition-colors",
                    activeSection === section.id &&
                      "text-foreground font-medium"
                  )}
                >
                  {section.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
