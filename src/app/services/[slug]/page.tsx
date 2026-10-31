import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, MessageCircle, Phone, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { CtaBanner } from "@/components/site/section-blocks";
import { FaqSection } from "@/components/site/testimonials";
import { Button } from "@/components/ui/button";
import { services, getService } from "@/lib/services";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      url: `/services/${service.slug}`,
      type: "website",
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seo.description,
    url: `${site.url}/services/${service.slug}`,
    provider: {
      "@type": "ProfessionalService",
      name: site.name,
      telephone: "+19543063823",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1975 East Sunrise Blvd, Suite 705",
        addressLocality: "Fort Lauderdale",
        addressRegion: "FL",
        postalCode: "33304",
        addressCountry: "US",
      },
    },
    areaServed: [
      { "@type": "City", name: "Fort Lauderdale" },
      { "@type": "State", name: "Florida" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: service.shortTitle }]} />

      {/* Hero */}
      <section className="bg-brand-navy py-14 md:py-20" aria-labelledby="service-hero">
        <div className="container-site">
          <p className="eyebrow text-brand-blue">Comprehensive Financial Solutions</p>
          <h1 id="service-hero" className="mt-2 max-w-3xl font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
            {service.heroTitle}
          </h1>
          <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-white/75 md:text-lg md:leading-8">
            {service.heroIntro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-primary hover:bg-brand-magenta-dark">
              <Link href="/contact">
                Schedule a Consultation <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <a href={site.phoneHref}>
                <Phone className="mr-1 h-4 w-4" aria-hidden="true" /> {site.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="section-pad" aria-labelledby="offerings">
        <div className="container-site">
          <h2 id="offerings" className="font-display text-3xl font-semibold text-brand-navy md:text-4xl">
            What We Deliver
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.offerings.map((o) => (
              <div key={o.title} className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
                <CheckCircle2 className="h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-display text-lg font-semibold text-brand-navy">{o.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{o.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience + why */}
      <section className="section-pad bg-secondary/60" aria-labelledby="audience">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 id="audience" className="flex items-center gap-3 font-display text-2xl font-semibold text-brand-navy md:text-3xl">
              <Users className="h-7 w-7 text-primary" aria-hidden="true" /> {service.audienceTitle}
            </h2>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {service.audience.map((a) => (
                <li key={a} className="flex items-start gap-2.5 rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground/85">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h2 className="font-display text-2xl font-semibold text-brand-navy md:text-3xl">{service.whyTitle}</h2>
            <ul className="mt-5 space-y-3">
              {service.why.map((w) => (
                <li key={w} className="flex items-start gap-3 text-sm leading-6 text-foreground/85">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {w}
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-border pt-5">
              <p className="text-sm text-muted-foreground">
                Prefer to talk it through?{" "}
                <a href={site.phoneHref} className="font-semibold text-primary hover:underline">
                  Call {site.phone}
                </a>{" "}
                or{" "}
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" /> WhatsApp us
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqSection items={service.faqs} title={`${service.shortTitle} — FAQs`} eyebrow="Common Questions" />

      {/* Related services */}
      <section className="section-pad bg-secondary/60" aria-labelledby="related">
        <div className="container-site">
          <h2 id="related" className="font-display text-2xl font-semibold text-brand-navy md:text-3xl">
            Related Services
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                <h3 className="font-display text-lg font-semibold text-brand-navy">{o.shortTitle}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{o.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
