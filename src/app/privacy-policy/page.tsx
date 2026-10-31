import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How NexGen Financial Experts collects, uses, and protects information submitted through our website contact form and other channels.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <section className="section-pad">
        <div className="container-site max-w-3xl">
          <h1 className="font-display text-4xl font-semibold text-brand-navy">Privacy Policy</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: October 31, 2026</p>

          <div className="prose-article mt-8 space-y-8 text-[1rem] leading-7">
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">1. Who We Are</h2>
              <p className="mt-3">
                {site.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides
                accounting, tax, audit, and business advisory services from our office at{" "}
                {site.address.full}. This policy explains what information we collect through this
                website, how we use it, and the choices you have.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">2. Information We Collect</h2>
              <p className="mt-3">Through the contact form and similar channels, we collect only what we need to respond to you:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Contact details you provide: name, email address, phone number (optional), and company (optional).</li>
                <li>Your message describing what you need help with, and the service you select.</li>
                <li>Basic technical data associated with your submission (IP address and browser user-agent), kept for security and anti-spam purposes.</li>
              </ul>
              <p className="mt-3">
                We do not ask for — and ask that you never send through this website — passwords,
                bank credentials, tax identification numbers, or confidential financial documents.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">3. How We Use Information</h2>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>To respond to your inquiry and schedule consultations.</li>
                <li>To provide the services you request, where you become a client.</li>
                <li>To protect the website from spam and abuse.</li>
              </ul>
              <p className="mt-3">We do not sell or rent your personal information to third parties.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">4. Cookies &amp; Analytics</h2>
              <p className="mt-3">
                This website uses only the minimal technical storage required for core functionality
                and security. We do not run advertising cookies. If we later add analytics or
                consent-based tracking tools, this policy will be updated and, where required,
                consent will be requested before those tools load.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">5. Sharing &amp; Retention</h2>
              <p className="mt-3">
                Contact submissions are stored securely and accessible only to authorized team
                members. We retain inquiry records for as long as reasonably needed to handle your
                request and comply with professional record-keeping obligations, after which they
                are deleted.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">6. Security</h2>
              <p className="mt-3">
                The website is served over HTTPS. Submissions pass through server-side validation
                and anti-spam checks. No system is perfectly secure; if a security issue affecting
                your information arises, we will notify you as required by applicable law.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">7. Your Rights</h2>
              <p className="mt-3">
                You may ask us to access, correct, or delete the personal information we hold about
                you, subject to legal retention requirements. To make a request, contact us using
                the details below.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">8. Contact</h2>
              <p className="mt-3">
                Questions about this policy? Call {site.phone}, email {site.email}, or write to us
                at {site.address.full}.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">9. Changes</h2>
              <p className="mt-3">
                We may update this policy from time to time. The &quot;last updated&quot; date above
                reflects the current version.
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Note: This draft policy is prepared for business-owner review with qualified legal
                counsel; it describes current intended practices and should be validated against
                the firm&apos;s actual data handling and applicable U.S. state privacy laws before
                final adoption.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
