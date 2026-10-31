import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Handshake, ShieldCheck, Target } from "lucide-react";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SectionHeading, CtaBanner } from "@/components/site/section-blocks";
import { Testimonials } from "@/components/site/testimonials";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — Your Partner in Financial Growth",
  description:
    "Learn about NexGen Financial Experts, a Fort Lauderdale finance firm providing tailored audit, tax advisory, and business consulting services built on trust, transparency, and transformation.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About NexGen Financial Experts",
    description:
      "A Fort Lauderdale team delivering audit, tax advisory, and business consulting built on trust, transparency, and transformation.",
    url: "/about",
  },
};

const whyItems = [
  "Experienced professionals with a deep understanding of global and local regulations.",
  "Customized strategies built around your business goals.",
  "End-to-end solutions — from audits and tax planning to consulting and compliance.",
  "Transparent communication and reliable reporting.",
  "Dedicated client support that ensures peace of mind.",
];

const values = [
  {
    icon: ShieldCheck,
    title: "Trust",
    text: "We do what we say we will do, and we tell you what you need to hear — not just what is easy.",
  },
  {
    icon: Target,
    title: "Transparency",
    text: "Clear scopes, clear pricing, clear reporting. You always know where your engagement stands.",
  },
  {
    icon: Handshake,
    title: "Transformation",
    text: "Our goal is measurable improvement in your financial clarity, compliance, and confidence.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "About" }]} />

      {/* Hero */}
      <section className="bg-brand-navy py-14 md:py-20" aria-labelledby="about-hero">
        <div className="container-site">
          <p className="eyebrow text-brand-blue">About Us</p>
          <h1 id="about-hero" className="mt-2 max-w-3xl font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
            Your Partner in Financial Growth
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/75 md:text-lg md:leading-8">
            Professional Financial Strategies Built for You — end-to-end support for every
            financial challenge, from our office in Fort Lauderdale.
          </p>
        </div>
      </section>

      {/* Intro + story */}
      <section className="section-pad" aria-labelledby="story">
        <div className="container-site grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="eyebrow">{site.name}</p>
            <h2 id="story" className="mt-2 font-display text-3xl font-semibold text-brand-navy md:text-4xl">
              Financial Clarity Is the Foundation of Every Successful Business
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-foreground/85">
              <p>
                At {site.name}, we believe that financial clarity is the foundation of every
                successful business. Based in Fort Lauderdale, we are a team of dedicated
                professionals offering tailored Audit, Tax Advisory, and Business Consulting
                services designed to help businesses thrive in an ever-changing financial world.
              </p>
              <p>
                With years of collective experience, our mission is simple — to deliver trust,
                transparency, and transformation. We don&apos;t just balance books; we build
                confidence. From small enterprises to established corporations, NexGen is your
                strategic partner in achieving sustainable growth and long-term financial success.
              </p>
            </div>
            <Button asChild className="mt-8 bg-primary hover:bg-brand-magenta-dark">
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
            <Image
              src="/images/hero-finance.jpg"
              alt="NexGen Financial Experts works with clients to build financial clarity"
              width={1280}
              height={853}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="section-pad bg-secondary/60" aria-labelledby="journey">
        <div className="container-site">
          <SectionHeading
            eyebrow="Our Story"
            title="Who We Are"
            align="left"
          />
          <div className="mt-6 max-w-3xl space-y-4 text-base leading-8 text-foreground/85">
            <p>
              {site.name} was founded with a vision to redefine how businesses approach financial
              management. We saw too many companies struggling with outdated practices and complex
              compliance requirements — and we knew there was a better way.
            </p>
            <p>
              That&apos;s why we built a firm grounded in innovation, ethics, and personalized
              attention. Today, our clients across various industries rely on NexGen for accurate
              insights, efficient solutions, and a proactive approach that keeps them ahead of the
              curve.
            </p>
          </div>

          <h3 className="mt-10 font-display text-2xl font-semibold text-brand-navy">Why Choose NexGen?</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {whyItems.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-sm leading-6 text-foreground/85">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mission + values */}
      <section className="section-pad" aria-labelledby="mission">
        <div className="container-site">
          <SectionHeading eyebrow="Our Mission" title="Empowering Businesses With Reliable Financial Guidance" />
          <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-8 text-foreground/85">
            At {site.name}, our mission is to empower businesses with reliable financial guidance,
            data-driven insights, and strategic foresight that drive meaningful results. We are
            dedicated to helping every client achieve sustainable growth by turning financial
            challenges into opportunities — ensuring that each decision is grounded in clarity,
            confidence, and long-term success.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border border-border bg-card p-6 text-center shadow-sm">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-primary">
                  <v.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-brand-navy">{v.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <CtaBanner />
    </>
  );
}
