import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  BadgeCheck,
  Bitcoin,
  BookOpenCheck,
  Building2,
  FileCheck2,
  GitCompareArrows,
  Landmark,
  MapPin,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SectionHeading, CtaBanner } from "@/components/site/section-blocks";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services — Accounting, Tax, Audit & Advisory",
  description:
    "Explore NexGen Financial Experts' services: CPA services, bookkeeping, tax advisory & planning, business tax filing, LLC & S-Corp structuring, crypto tax, real estate & eCommerce accounting, fractional CFO, audit, and payroll.",
  alternates: { canonical: "/services" },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BadgeCheck,
  BookOpenCheck,
  Landmark,
  FileCheck2,
  GitCompareArrows,
  Bitcoin,
  Building2,
  ShoppingCart,
  TrendingUp,
  Rocket,
  ShieldCheck,
  Users,
  MapPin,
};

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Services" }]} />

      <section className="bg-brand-navy py-14 md:py-20" aria-labelledby="services-hero">
        <div className="container-site">
          <p className="eyebrow text-brand-blue">What We Can Do for You</p>
          <h1 id="services-hero" className="mt-2 max-w-3xl font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
            Comprehensive Financial Solutions
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/75 md:text-lg md:leading-8">
            At NexGen Financial Experts, we provide a full suite of tax, accounting, and advisory
            services designed to streamline your finances and boost your success.
          </p>
        </div>
      </section>

      <section className="section-pad" aria-label="All services">
        <div className="container-site">
          <SectionHeading
            eyebrow="Our Services"
            title="Specialist Support, One Trusted Team"
            subtitle="Every service below is delivered with the same standard: clear communication, organized work, and advice grounded in your actual numbers."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = iconMap[s.icon] ?? Landmark;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 font-display text-xl font-semibold text-brand-navy">{s.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{s.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Not Sure Which Service You Need?"
        text="Describe your situation and we'll point you in the right direction — even if it's not a service we provide."
      />
    </>
  );
}
