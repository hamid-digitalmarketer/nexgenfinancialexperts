import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

export default function NotFound() {
  return (
    <section className="section-pad" aria-labelledby="notfound-title">
      <div className="container-site max-w-2xl text-center">
        <Image src={site.logo} alt={site.logoAlt} width={176} height={56} className="mx-auto h-10 w-auto" />
        <p className="mt-8 font-display text-7xl font-semibold text-primary">404</p>
        <h1 id="notfound-title" className="mt-4 font-display text-3xl font-semibold text-brand-navy md:text-4xl">
          This Page Took a Wrong Turn
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist, was moved, or may have been part of
          our previous website. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-primary hover:bg-brand-magenta-dark">
            <Link href="/">
              Back to Home <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/services">
              <Compass className="mr-1 h-4 w-4" aria-hidden="true" /> Browse Services
            </Link>
          </Button>
        </div>

        <div className="mt-10 rounded-xl border border-border bg-card p-6 text-left shadow-sm">
          <p className="text-sm font-semibold text-brand-navy">Popular pages</p>
          <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-muted-foreground hover:text-primary">
                  {s.shortTitle}
                </Link>
              </li>
            ))}
            <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
            <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
          </ul>
          <p className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-sm text-muted-foreground">
            <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
            Prefer to ask a human? Call{" "}
            <a href={site.phoneHref} className="font-semibold text-primary hover:underline">
              {site.phone}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
