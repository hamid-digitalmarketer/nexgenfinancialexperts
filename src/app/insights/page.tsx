import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { CtaBanner } from "@/components/site/section-blocks";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Insights & Updates — Practical Guidance for Business Owners",
  description:
    "Educational articles from NexGen Financial Experts on bookkeeping, cash flow forecasting, audit preparation, and business tax topics — practical guidance for business owners.",
  alternates: { canonical: "/insights" },
};

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function InsightsPage() {
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <Breadcrumbs items={[{ label: "Insights & Updates" }]} />

      <section className="bg-brand-navy py-14 md:py-20" aria-labelledby="insights-hero">
        <div className="container-site">
          <p className="eyebrow text-brand-blue">Insights &amp; Updates</p>
          <h1 id="insights-hero" className="mt-2 max-w-3xl font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
            Practical Guidance for Business Owners
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/75 md:text-lg md:leading-8">
            Educational articles on bookkeeping, cash flow, and audit readiness — general
            guidance to help you run a tighter, better-informed business.
          </p>
        </div>
      </section>

      <section className="section-pad" aria-label="Articles">
        <div className="container-site">
          <div className="grid gap-6 md:grid-cols-3">
            {sorted.map((a) => (
              <Link
                key={a.slug}
                href={`/insights/${a.slug}`}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">{a.category}</p>
                <h2 className="mt-2 font-display text-lg font-semibold leading-snug text-brand-navy">{a.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{a.excerpt}</p>
                <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> {formatDate(a.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" aria-hidden="true" /> {a.readMinutes} min read
                  </span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl rounded-lg bg-secondary/70 p-4 text-center text-xs leading-5 text-muted-foreground">
            Articles on this page are general educational content, not individualized tax, legal,
            or accounting advice. Consult a qualified professional about your specific situation
            before making decisions.
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
