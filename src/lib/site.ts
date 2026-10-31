// Central site configuration — NexGen Financial Experts
// NAP data recovered from the original website and cross-verified against
// the business's public Yelp and LinkedIn profiles. Flag for final approval.

export const site = {
  name: "NexGen Financial Experts",
  shortName: "NexGen",
  tagline: "Transforming Your Financial Future",
  description:
    "NexGen Financial Experts provides accounting, tax, audit, and business advisory services in Fort Lauderdale, FL — helping businesses stay compliant, make informed decisions, and grow with confidence.",
  url: "https://nexgenfinancialexperts.com",
  email: "paudalus@nexgenfinancialexperts.com",
  phone: "+1 (954) 306-3823",
  phoneHref: "tel:+19543063823",
  whatsapp: "+1 (954) 770-1568",
  whatsappHref: "https://wa.me/19547701568",
  address: {
    street: "1975 East Sunrise Blvd",
    suite: "Suite 705",
    city: "Fort Lauderdale",
    state: "FL",
    zip: "33304",
    country: "USA",
    full: "1975 East Sunrise Blvd, Suite 705, Fort Lauderdale, FL 33304, USA",
  },
  geo: { lat: 26.1348, lng: -80.1289 },
  hours: "Monday – Friday, 9:00 AM – 5:00 PM ET",
  social: {
    facebook: "https://www.facebook.com/nexgenfinancialexperts",
    instagram: "https://www.instagram.com/nexgenfinancialexperts/",
    linkedin: "https://www.linkedin.com/company/nexgenfinancialexperts/",
    tiktok: "https://www.tiktok.com/@nexgenfinancialexperts",
    yelp: "https://www.yelp.com/biz/nexgen-fort-lauderdale-3",
  },
  logo: "/images/nexgen-logo.png",
  logoAlt: "NexGen Financial Experts logo",
} as const;

export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Insights & Updates", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

export const legacyRedirects: { from: string; to: string }[] = [
  { from: "/aboutus", to: "/about" },
  { from: "/blog", to: "/insights" },
  { from: "/home", to: "/" },
  { from: "/sample-page", to: "/" },
];

export const trustNotes = {
  testimonials:
    "Testimonials carried over from the firm's original website and public review profiles; pending owner verification and permission to publish.",
} as const;
