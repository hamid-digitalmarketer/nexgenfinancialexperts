import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, UserRoundCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { CtaBanner } from "@/components/site/section-blocks";
import { articles, getArticle } from "@/lib/articles";
import { getService } from "@/lib/services";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.seo.title,
    description: article.seo.description,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      title: article.seo.title,
      description: article.seo.description,
      url: `/insights/${article.slug}`,
      type: "article",
      publishedTime: article.date,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const relatedService = getService(article.relatedService);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seo.description,
    datePublished: article.date,
    author: { "@type": "Organization", name: site.name },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/images/nexgen-logo.png` },
    },
    mainEntityOfPage: `${site.url}/insights/${article.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Breadcrumbs items={[{ label: "Insights & Updates", href: "/insights" }, { label: article.category }]} />

      <article className="section-pad">
        <div className="container-site max-w-3xl">
          <p className="eyebrow">{article.category}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-brand-navy md:text-4xl">
            {article.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" aria-hidden="true" /> {formatDate(article.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock3 className="h-4 w-4" aria-hidden="true" /> {article.readMinutes} min read
            </span>
            <span className="flex items-center gap-1.5">
              <UserRoundCheck className="h-4 w-4" aria-hidden="true" /> By the {site.name} team
            </span>
          </div>

          <div className="prose-article mt-10 space-y-8">
            {article.body.map((section, i) => (
              <section key={i}>
                {section.heading ? (
                  <h2 className="mb-3 font-display text-2xl font-semibold text-brand-navy">
                    {section.heading}
                  </h2>
                ) : null}
                <div className="space-y-4">
                  {section.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
                {section.bullets ? (
                  <ul className="mt-4 space-y-2.5">
                    {section.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-3 text-[1.02rem] leading-7 text-foreground/90">
                        <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-lg bg-secondary/70 p-4 text-xs leading-5 text-muted-foreground">
            This article is general educational content, not individualized tax, legal, or
            accounting advice. Tax rules change and vary by jurisdiction — consult a qualified
            professional about your specific situation before making decisions.
          </div>

          {relatedService ? (
            <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">Related service</p>
              <h2 className="mt-2 font-display text-xl font-semibold text-brand-navy">{relatedService.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{relatedService.summary}</p>
              <Button asChild className="mt-4 bg-primary hover:bg-brand-magenta-dark">
                <Link href={`/services/${relatedService.slug}`}>
                  Learn more <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          ) : null}

          <div className="mt-10">
            <Button asChild variant="ghost" className="text-primary hover:text-brand-magenta-dark">
              <Link href="/insights">
                <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" /> Back to Insights &amp; Updates
              </Link>
            </Button>
          </div>
        </div>
      </article>

      <CtaBanner />
    </>
  );
}
