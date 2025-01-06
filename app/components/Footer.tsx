import { Link } from "@remix-run/react";
const footerLinks = {
  product: [
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
  ],
  categories: [
    { name: "Programming", href: "/stacks?category=programming" },
    { name: "Design", href: "/stacks?category=design" },
    { name: "Marketing", href: "/stacks?category=marketing" },
    { name: "Business", href: "/stacks?category=business" },
  ],
  legal: [
    { name: "Privacy", href: "privacy" },
    { name: "Terms", href: "terms" },
    { name: "License", href: "license" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container px-4 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center space-x-2">
              <img
                src="/stackReviewLogo-mini.png"
                alt="logo"
                className="w-6 h-6"
              />
              <h2 className="font-bold">StackReview</h2>
            </div>
            <p className="mt-4 text-muted-foreground">
              Discover and share the best tech stacks for your next project.
              Join our community of developers making informed technology
              choices.
            </p>
          </div>
          <FooterLink title="Product" links={footerLinks.product} />
          <FooterLink title="Categories" links={footerLinks.categories} />
          {/* <FooterLink title="Company" links={footerLinks.company} /> */}
          <FooterLink title="Legal" links={footerLinks.legal} />
        </div>
        <div className="mt-16 border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} StackReview. All rights reserved.
          </p>
          <ul className="flex space-x-6 mt-4 md:mt-0">
            {footerLinks.legal.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              to={link.href}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
