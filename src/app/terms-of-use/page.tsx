import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for the NexGen Financial Experts website — acceptable use, content disclaimers, and limitations of liability.",
  alternates: { canonical: "/terms-of-use" },
};

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Terms of Use" }]} />
      <section className="section-pad">
        <div className="container-site max-w-3xl">
          <h1 className="font-display text-4xl font-semibold text-brand-navy">Terms of Use</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: October 31, 2026</p>

          <div className="prose-article mt-8 space-y-8 text-[1rem] leading-7">
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">1. Acceptance</h2>
              <p className="mt-3">
                By accessing this website, you agree to these terms. If you do not agree, please do
                not use the site. These terms govern the website only; client engagements are
                governed by separate written agreements.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">2. Educational Content, Not Professional Advice</h2>
              <p className="mt-3">
                Content on this website — including articles, FAQs, and service descriptions — is
                general information for business owners. It is not individualized tax, legal,
                accounting, or audit advice, and it does not create a professional relationship.
                Rules change and vary by jurisdiction; consult a qualified professional about your
                specific situation before acting.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">3. Acceptable Use</h2>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Do not submit false, misleading, or third-party confidential information through our forms.</li>
                <li>Do not attempt to disrupt, probe, or gain unauthorized access to the website or its systems.</li>
                <li>Do not use automated tools to scrape, spam, or overload the website.</li>
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">4. Intellectual Property</h2>
              <p className="mt-3">
                The site&apos;s text, design, logo, and graphics belong to {site.name} or its
                licensors. You may quote short excerpts with attribution and a link; any other
                reproduction requires written permission.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">5. Third-Party Links</h2>
              <p className="mt-3">
                We link to resources we believe are useful (for example, map services and our
                public social profiles). We do not control third-party sites and are not
                responsible for their content or policies.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">6. Limitation of Liability</h2>
              <p className="mt-3">
                The website is provided &quot;as is&quot; without warranties of any kind. To the
                fullest extent permitted by law, {site.name} is not liable for decisions made or
                actions taken in reliance on website content. Nothing here limits liability that
                cannot be limited under Florida law.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">7. Governing Law</h2>
              <p className="mt-3">
                These terms are governed by the laws of the State of Florida, without regard to
                conflict-of-law rules.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy">8. Contact</h2>
              <p className="mt-3">
                Questions about these terms? Contact us at {site.phone} or {site.email}.
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Note: This draft is prepared for business-owner review with qualified legal counsel
                before final adoption.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
