import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  Music2,
  Star,
} from "lucide-react";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto bg-brand-navy text-white/85">
      <div className="container-site py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex rounded-lg bg-white px-3 py-2" aria-label="NexGen Financial Experts — home">
              <Image src={site.logo} alt={site.logoAlt} width={176} height={56} className="h-9 w-auto" />
            </Link>
            <p className="mt-4 text-sm leading-6 text-white/70">
              Practical accounting, tax, audit, and advisory support for businesses —
              from our office in Fort Lauderdale to clients across Florida and beyond.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="NexGen Financial Experts on Facebook" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-primary">
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="NexGen Financial Experts on Instagram" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-primary">
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="NexGen Financial Experts on LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-primary">
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="NexGen Financial Experts on TikTok" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-primary">
                <Music2 className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={site.social.yelp} target="_blank" rel="noopener noreferrer" aria-label="NexGen Financial Experts on Yelp" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-primary">
                <Star className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Footer services">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.slice(0, 8).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-white/70 transition-colors hover:text-white">
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="font-semibold text-brand-blue transition-colors hover:text-white">
                  View all services →
                </Link>
              </li>
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Footer company links">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/" className="text-white/70 hover:text-white">Home</Link></li>
              <li><Link href="/about" className="text-white/70 hover:text-white">About Us</Link></li>
              <li><Link href="/services" className="text-white/70 hover:text-white">Services</Link></li>
              <li><Link href="/insights" className="text-white/70 hover:text-white">Insights &amp; Updates</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-white">Contact</Link></li>
              <li><Link href="/privacy-policy" className="text-white/70 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms-of-use" className="text-white/70 hover:text-white">Terms of Use</Link></li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h3>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=1975+East+Sunrise+Blvd+Suite+705+Fort+Lauderdale+FL+33304"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white"
                >
                  {site.address.full}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                <a href={site.phoneHref} className="text-white/70 hover:text-white">{site.phone}</a>
              </li>
              <li className="flex gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                  WhatsApp {site.whatsapp}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className="break-all text-white/70 hover:text-white">{site.email}</a>
              </li>
            </ul>
            <p className="mt-4 text-xs leading-5 text-white/50">{site.hours}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/55 sm:flex-row">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>
            <Link href="/privacy-policy" className="hover:text-white">Privacy</Link>
            <span className="mx-2" aria-hidden="true">·</span>
            <Link href="/terms-of-use" className="hover:text-white">Terms</Link>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Fort Lauderdale, Florida</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
