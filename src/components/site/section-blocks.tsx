import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p className={`eyebrow ${dark ? "text-brand-blue" : ""}`}>{eyebrow}</p>
      ) : null}
      <h2
        className={`mt-2 font-display text-3xl font-semibold leading-tight md:text-4xl ${
          dark ? "text-white" : "text-brand-navy"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 text-base leading-7 md:text-lg ${dark ? "text-white/70" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function CtaBanner({
  title = "Take the Next Step Towards Financial Success",
  text = "Tell us about your business and what you need — we'll respond promptly with clear next steps.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-brand-navy" aria-labelledby="cta-banner-title">
      <div className="container-site section-pad">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-brand-blue">Ready to Start?</p>
          <h2 id="cta-banner-title" className="mt-2 font-display text-3xl font-semibold text-white md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-7 text-white/75 md:text-lg">{text}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-primary hover:bg-brand-magenta-dark">
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
            <div className="flex flex-col items-center gap-1 sm:items-start">
              <span className="text-sm text-white/60">or call us at:</span>
              <a
                href={site.phoneHref}
                className="flex items-center gap-2 text-lg font-semibold text-white hover:text-brand-blue"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
