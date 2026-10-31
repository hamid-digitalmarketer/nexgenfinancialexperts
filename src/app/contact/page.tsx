import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SectionHeading } from "@/components/site/section-blocks";
import { ContactForm } from "@/components/site/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us — Schedule a Consultation",
  description:
    "Contact NexGen Financial Experts in Fort Lauderdale: call +1 (954) 306-3823, WhatsApp +1 (954) 770-1568, email paudalus@nexgenfinancialexperts.com, or send a message through our secure form.",
  alternates: { canonical: "/contact" },
};

const channels = [
  {
    icon: Phone,
    label: "Phone",
    value: site.phone,
    href: site.phoneHref,
    hint: "Fastest response during business hours",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: site.whatsapp,
    href: site.whatsappHref,
    hint: "Message us anytime — we reply during business hours",
  },
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    hint: "For inquiries and document coordination",
  },
  {
    icon: MapPin,
    label: "Office",
    value: site.address.full,
    href: "https://www.google.com/maps/search/?api=1&query=1975+East+Sunrise+Blvd+Suite+705+Fort+Lauderdale+FL+33304",
    hint: "Meetings by appointment",
  },
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <section className="bg-brand-navy py-14 md:py-20" aria-labelledby="contact-hero">
        <div className="container-site">
          <p className="eyebrow text-brand-blue">Need Help?</p>
          <h1 id="contact-hero" className="mt-2 max-w-3xl font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
            Contact NexGen Financial Experts Today
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/75 md:text-lg md:leading-8">
            Need expert advice? We&apos;re here to answer your questions and guide your financial
            journey.
          </p>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="form-section">
        <div className="container-site grid items-start gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <h2 id="form-section" className="font-display text-2xl font-semibold text-brand-navy md:text-3xl">
              Tell Us How We Can Help
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Fill out the form below and a member of our team will respond promptly.
            </p>
            <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
              <ContactForm />
            </div>
          </div>

          {/* Contact details */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold text-brand-navy md:text-3xl">
              Reach Us Directly
            </h2>
            <ul className="mt-6 space-y-4">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                      <c.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{c.label}</span>
                      <span className="block text-sm font-semibold text-brand-navy">{c.value}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{c.hint}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-border bg-secondary/60 p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-brand-navy">
                <Clock className="h-4 w-4 text-primary" aria-hidden="true" /> Business Hours
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{site.hours}</p>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                For urgent matters during off hours, leave a WhatsApp message or voicemail and
                we&apos;ll respond on the next business day.
              </p>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-border">
              <iframe
                title={`Map showing the location of ${site.name} at ${site.address.full}`}
                src="https://www.openstreetmap.org/export/embed.html?bbox=-80.1409%2C26.1268%2C-80.1169%2C26.1428&layer=mapnik&marker=26.1348%2C-80.1289"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services teaser */}
      <section className="section-pad bg-secondary/60" aria-labelledby="explore-services">
        <div className="container-site">
          <SectionHeading
            eyebrow="Explore Our Services"
            title="What We Can Do for You"
            subtitle="At NexGen Financial Experts, we provide a full suite of tax, accounting, and advisory services designed to streamline your finances and boost your success."
          />
          <div className="mt-8 grid gap-4 text-center sm:grid-cols-3">
            <a href={site.phoneHref} className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <Phone className="mx-auto h-6 w-6 text-primary" aria-hidden="true" />
              <p className="mt-3 font-semibold text-brand-navy">{site.phone}</p>
              <p className="mt-1 text-xs text-muted-foreground">Call us directly</p>
            </a>
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <MessageCircle className="mx-auto h-6 w-6 text-primary" aria-hidden="true" />
              <p className="mt-3 font-semibold text-brand-navy">{site.whatsapp}</p>
              <p className="mt-1 text-xs text-muted-foreground">WhatsApp us</p>
            </a>
            <a href="mailto:paudalus@nexgenfinancialexperts.com" className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <Mail className="mx-auto h-6 w-6 text-primary" aria-hidden="true" />
              <p className="mt-3 break-all text-sm font-semibold text-brand-navy">{site.email}</p>
              <p className="mt-1 text-xs text-muted-foreground">Email us</p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
