import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `https://nexgenfinancialexperts.com${c.href === "/" ? "" : c.href}` } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="border-b border-border/60 bg-secondary/60">
      <div className="container-site py-3">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          {all.map((c, i) => (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-border" aria-hidden="true" />}
              {c.href && i < all.length - 1 ? (
                <Link href={c.href} className="flex items-center gap-1 hover:text-primary">
                  {i === 0 && <Home className="h-3.5 w-3.5" aria-hidden="true" />}
                  {c.label}
                </Link>
              ) : (
                <span className="font-medium text-brand-navy" aria-current="page">
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
