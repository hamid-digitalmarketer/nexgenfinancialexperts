"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone, ChevronDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { site, primaryNav } from "@/lib/site";
import { services } from "@/lib/services";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <div className="container-site flex h-16 items-center justify-between gap-4 md:h-20">
        <Link href="/" className="flex shrink-0 items-center" aria-label="NexGen Financial Experts — home">
          <Image
            src={site.logo}
            alt={site.logoAlt}
            width={176}
            height={56}
            priority
            className="h-9 w-auto md:h-11"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex lg:items-center lg:gap-1" aria-label="Primary">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[560px] grid-cols-2 gap-1 p-2">
                    <Link
                      href="/services"
                      className="col-span-2 mb-1 rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-brand-navy hover:bg-accent"
                    >
                      All Services Overview
                    </Link>
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="rounded-md px-3 py-2 text-sm text-foreground/85 hover:bg-accent hover:text-accent-foreground"
                      >
                        {s.shortTitle}
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/about">About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/insights">Insights &amp; Updates</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/contact">Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-primary"
            aria-label={`Call us at ${site.phone}`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.phone}
          </a>
          <Button asChild className="bg-primary hover:bg-brand-magenta-dark">
            <Link href="/contact">Schedule a Consultation</Link>
          </Button>
        </div>

        {/* Mobile nav */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={site.phoneHref}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-brand-navy"
            aria-label={`Call us at ${site.phone}`}
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <Image src={site.logo} alt={site.logoAlt} width={176} height={56} className="h-9 w-auto" />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4 pb-8" aria-label="Mobile">
                {primaryNav.map((item) =>
                  item.label === "Services" ? (
                    <div key="services-mobile" className="mt-1">
                      <Link
                        href="/services"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between rounded-md px-3 py-3 text-base font-semibold text-brand-navy hover:bg-secondary"
                      >
                        Services <ChevronDown className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <div className="ml-3 flex flex-col border-l border-border pl-3">
                        {services.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            onClick={() => setOpen(false)}
                            className="rounded-md px-2 py-2.5 text-sm text-foreground/80 hover:bg-secondary hover:text-foreground"
                          >
                            {s.shortTitle}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`rounded-md px-3 py-3 text-base font-semibold ${
                        pathname === item.href
                          ? "text-primary"
                          : "text-brand-navy hover:bg-secondary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                )}
                <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
                  <Button asChild className="bg-primary hover:bg-brand-magenta-dark">
                    <Link href="/contact" onClick={() => setOpen(false)}>
                      Schedule a Consultation
                    </Link>
                  </Button>
                  <a
                    href={site.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-md border border-border px-3 py-2.5 text-sm font-semibold text-brand-navy"
                  >
                    <MessageCircle className="h-4 w-4 text-brand-blue" aria-hidden="true" />
                    WhatsApp {site.whatsapp}
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
