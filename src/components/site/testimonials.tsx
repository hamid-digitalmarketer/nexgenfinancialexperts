import { Quote, Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Testimonials carried over from the original NexGen website. They appear on
// the firm's live site and public profiles; owner verification and permission
// to publish are pending and documented in the project QA report.
const testimonials = [
  {
    quote:
      "NexGen Financial Experts transformed our understanding of finance. Their tailored strategies have truly accelerated our growth and positioned us for future success.",
    name: "James Smith",
  },
  {
    quote:
      "The expertise at NexGen is unmatched. They've guided us through complex tax situations and their advice has proven invaluable for our business.",
    name: "Emily Johnson",
  },
  {
    quote:
      "Working with NexGen has been a game changer for us. Their innovative solutions have simplified our financial processes significantly!",
    name: "Michael Brown",
  },
];

export function Testimonials() {
  return (
    <section className="section-pad bg-secondary/60" aria-labelledby="testimonials-title">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">What Our Clients Say</p>
          <h2 id="testimonials-title" className="mt-2 font-display text-3xl font-semibold text-brand-navy md:text-4xl">
            Trusted by Business Owners
          </h2>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              Google Reviews
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              Yelp Reviews
            </span>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <Quote className="h-6 w-6 text-primary/40" aria-hidden="true" />
              <blockquote className="mt-3 flex-1 text-sm leading-6 text-foreground/85">
                {t.quote}
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy text-sm font-semibold text-white"
                >
                  {t.name.charAt(0)}
                </span>
                <span className="text-sm font-semibold text-brand-navy">{t.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection({
  items,
  title = "Frequently Asked Questions",
  eyebrow = "FAQs",
}: {
  items: { q: string; a: string }[];
  title?: string;
  eyebrow?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
  return (
    <section className="section-pad" aria-labelledby="faq-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="faq-title" className="mt-2 font-display text-3xl font-semibold text-brand-navy md:text-4xl">
            {title}
          </h2>
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold text-brand-navy">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-6 text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
