// Service definitions — content recovered from the original NexGen Financial
// Experts website (WordPress pages, June 2025 / verified live in Oct 2026),
// edited for clarity and readability. Business claims mirror the recovered
// originals; no new credentials, licenses, or results were invented.

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string; // lucide icon name used by the UI layer
  summary: string; // card blurb
  heroTitle: string;
  heroIntro: string[]; // intro paragraphs
  offerings: { title: string; text: string }[];
  audienceTitle: string;
  audience: string[];
  whyTitle: string;
  why: string[];
  faqs: ServiceFaq[];
  seo: { title: string; description: string };
}

export const services: Service[] = [
  {
    slug: "cpa-services",
    title: "CPA Services",
    shortTitle: "CPA Services",
    icon: "BadgeCheck",
    summary:
      "Expert accounting, reporting, and tax compliance support for every type of business — from startups to established companies.",
    heroTitle: "CPA Services for Every Business",
    heroIntro: [
      "Whether you're a startup, a corporation, or a freelancer — we've got your numbers covered. At NexGen, our CPA services are built to support every type of business, big or small.",
      "We provide expert advice, organized reporting, and tax compliance tailored to your industry. Our goal is to make your finances easier to manage, so you can focus on growth. From day-to-day accounting to long-term strategy, we handle it all with precision.",
    ],
    offerings: [
      {
        title: "Tax Filing & Compliance",
        text: "We handle complex tax filings for all business types, so you stay compliant, confident, and stress-free.",
      },
      {
        title: "Monthly Financial Reporting",
        text: "We prepare detailed reports that show how your business is performing. Track progress and make informed decisions.",
      },
      {
        title: "Audit Preparation & Representation",
        text: "Need to prepare for an audit? We prepare you for it and support you through the process with organized records and guidance.",
      },
    ],
    audienceTitle: "Who Counts on Our CPAs?",
    audience: [
      "Established business owners",
      "Startups and first-time founders",
      "E-commerce sellers and dropshippers",
      "Medical and wellness practices",
      "Real estate investors and developers",
      "Digital agencies and consultants",
      "Restaurant and retail operators",
      "Non-profits and community organizations",
    ],
    whyTitle: "Why Businesses Prefer NexGen CPAs",
    why: [
      "Tailored services for all business sizes",
      "Clear communication and timely support",
      "Always up to date on changing tax laws",
      "Full-service CPA support under one roof",
      "Scalable solutions that grow with you",
    ],
    faqs: [
      {
        q: "Do you work with businesses outside Fort Lauderdale?",
        a: "Yes. While our office is in Fort Lauderdale, we support clients across Florida and in multiple states, including businesses that operate remotely.",
      },
      {
        q: "How often will I receive financial reports?",
        a: "Most clients receive monthly financial statements, but reporting frequency is tailored to your needs — quarterly and custom schedules are available.",
      },
      {
        q: "Can you take over from my previous accountant?",
        a: "Yes. We manage the handover process, review your prior records, and flag anything that needs correction before moving forward.",
      },
    ],
    seo: {
      title: "CPA Services in Fort Lauderdale, FL | NexGen Financial Experts",
      description:
        "CPA services for startups, corporations, and freelancers: tax filing & compliance, monthly financial reporting, and audit preparation. Fort Lauderdale, FL.",
    },
  },
  {
    slug: "business-accounting-bookkeeping",
    title: "Business Accounting & Bookkeeping",
    shortTitle: "Accounting & Bookkeeping",
    icon: "BookOpenCheck",
    summary:
      "Clean books, organized records, and clear reports — monthly bookkeeping, reconciliations, and year-end close handled for you.",
    heroTitle: "Business Accounting & Bookkeeping",
    heroIntro: [
      "Managing finances takes time, focus, and accuracy. That's why we make it simple and stress-free.",
      "At NexGen, we turn complicated numbers into clear insights. We deliver fast, organized, and affordable accounting solutions that help you stay compliant, manage cash flow, and make smarter business decisions. With us, you can focus on growth — not spreadsheets. From startups to growing companies, we're here for every stage of your journey.",
    ],
    offerings: [
      {
        title: "Monthly Bookkeeping",
        text: "We track and record all business transactions, so you get clean, up-to-date records every month.",
      },
      {
        title: "Business Tax Preparation",
        text: "We prepare and file your taxes on time. Avoid penalties and maximize your tax savings.",
      },
      {
        title: "Payroll Management",
        text: "We handle payroll processing, taxes, and reporting. Your employees get paid accurately and on schedule.",
      },
      {
        title: "Bank Reconciliation",
        text: "We match your bank statements with your books, so your numbers are always verified and balanced.",
      },
      {
        title: "Financial Reporting",
        text: "We create custom financial statements for your business. These reports help you plan, grow, and secure investments.",
      },
      {
        title: "Expense & Income Tracking",
        text: "We monitor where your money comes from and where it goes, so you control costs and improve profitability.",
      },
      {
        title: "Sales Tax Compliance",
        text: "We calculate and file your sales tax returns. You stay compliant with local and state tax laws.",
      },
      {
        title: "Year-End Close Services",
        text: "We finalize your accounts at year-end. Be ready for tax season with zero stress.",
      },
    ],
    audienceTitle: "Who We Help",
    audience: [
      "Business owners across all industries",
      "Growing startups and scale-ups",
      "E-commerce brands",
      "Real estate companies",
      "Consultants and agencies",
      "Restaurants and hospitality businesses",
      "Health and wellness providers",
      "Construction and trade services",
    ],
    whyTitle: "Why Work With NexGen",
    why: [
      "Accounting can feel overwhelming — with NexGen, it doesn't have to be",
      "We handle the numbers while you build the business of your dreams",
      "Organized books that support smarter, faster decisions",
      "Affordable solutions sized to your business",
    ],
    faqs: [
      {
        q: "Do I need to switch accounting software?",
        a: "Not necessarily. We work with the records and tools you already use and will recommend changes only when they clearly save you time or money.",
      },
      {
        q: "Can you clean up books that are months behind?",
        a: "Yes. Catch-up and cleanup bookkeeping is one of our most common engagements. We reconstruct records, reconcile accounts, and bring your books current.",
      },
      {
        q: "How do you keep my financial data secure?",
        a: "We collect and share files only through secure, limited-access channels, and we never request sensitive credentials through public forms or email.",
      },
    ],
    seo: {
      title: "Business Accounting & Bookkeeping | Fort Lauderdale | NexGen",
      description:
        "Monthly bookkeeping, bank reconciliation, payroll, financial reporting, sales tax, and year-end close for businesses in Fort Lauderdale and beyond.",
    },
  },
  {
    slug: "tax-advisory-planning-services",
    title: "Tax Advisory & Planning Services",
    shortTitle: "Tax Advisory & Planning",
    icon: "Landmark",
    summary:
      "Year-round tax strategy — planning, compliance, return review, and quarterly guidance that keeps you ahead of deadlines.",
    heroTitle: "Tax Advisory & Planning Services",
    heroIntro: [
      "At NexGen, we turn complex tax rules into clear, workable strategies for your business. Our team helps you stay ahead — not behind — on taxes.",
      "We guide you through every step of tax planning. From saving more to avoiding surprises, we make sure your tax strategy works all year. We don't just file returns — we build plans designed to manage your tax position. With us, your business stays compliant, efficient, and financially strong.",
    ],
    offerings: [
      {
        title: "Business Tax Strategy",
        text: "We design custom tax strategies that match your goals, so you stay prepared all year round.",
      },
      {
        title: "Tax Compliance Services",
        text: "We help you meet local, state, and federal tax laws. Avoid penalties and stay audit-ready at all times.",
      },
      {
        title: "Tax Return Review & Optimization",
        text: "We review your past returns to find missed savings opportunities, then help you plan for better results going forward.",
      },
      {
        title: "Quarterly & Annual Tax Planning",
        text: "We plan ahead for every tax deadline, so you're never caught off guard.",
      },
    ],
    audienceTitle: "Who Typically Needs Tax Planning?",
    audience: [
      "Growing businesses with changing income",
      "Owners preparing for a major purchase or expansion",
      "Companies operating in multiple states",
      "Businesses recovering from past filing issues",
      "Founders who want proactive guidance instead of year-end surprises",
    ],
    whyTitle: "Why It Matters",
    why: [
      "Tax planning is not a one-time task — it's a year-round discipline",
      "Proactive planning beats reactive scrambling at filing deadlines",
      "Clear strategy reduces both tax risk and administrative stress",
      "Every recommendation is tailored to your actual goals and numbers",
    ],
    faqs: [
      {
        q: "Is tax planning only for large companies?",
        a: "No. Business owners at many income levels benefit from planning — especially when income, staff count, or locations change.",
      },
      {
        q: "When should we start tax planning?",
        a: "Ideally at the start of your fiscal year. Early planning leaves room for strategy; late planning leaves only paperwork.",
      },
      {
        q: "Can you review returns filed by someone else?",
        a: "Yes. We review prior returns for errors, missed deductions, and compliance gaps, and we advise on whether an amended return is warranted.",
      },
    ],
    seo: {
      title: "Tax Advisory & Planning Services | NexGen Financial Experts",
      description:
        "Year-round business tax strategy, compliance, return review, and quarterly planning from NexGen Financial Experts in Fort Lauderdale, FL.",
    },
  },
  {
    slug: "business-tax-filing-preparation",
    title: "Business Tax Filing & Preparation",
    shortTitle: "Tax Filing & Preparation",
    icon: "FileCheck2",
    summary:
      "Accurate federal, state, and multi-state business tax returns — filed on time, with 1099 support and amended-return help.",
    heroTitle: "Business Tax Filing & Preparation",
    heroIntro: [
      "Tax deadlines don't wait — and neither should your business. At NexGen, we help you file on time and stress-free.",
      "Whether you're a startup or a growing business, accurate tax filing matters. We prepare your returns, keep you compliant, and help you take advantage of every deduction you're legally entitled to. Forget the guesswork, avoid penalties, and get back to business faster. You focus on growth — we'll handle the forms.",
    ],
    offerings: [
      {
        title: "Federal & State Business Tax Filing",
        text: "We prepare and file your tax returns correctly and on time. No delays, no surprises — just peace of mind.",
      },
      {
        title: "Multi-State & Local Tax Compliance",
        text: "Doing business in multiple states? We manage filings for every jurisdiction where you operate.",
      },
      {
        title: "1099 & Contractor Filing Support",
        text: "We prepare and file 1099s for freelancers and vendors, so you stay clear with the IRS and your contractors.",
      },
      {
        title: "Amended Returns & Corrections",
        text: "Made a mistake last year? We fix it fast and help protect your business while recovering missed deductions.",
      },
    ],
    audienceTitle: "Who We Serve",
    audience: [
      "Solo professionals and freelancers",
      "Small and mid-sized businesses",
      "Multi-location and franchise operators",
      "Businesses with prior filing issues",
      "Companies transitioning between accountants",
    ],
    whyTitle: "Why Businesses Trust Us With Filings",
    why: [
      "We serve businesses of all shapes and sizes — because tax laws don't discriminate",
      "We understand industry-specific tax needs and adjust accordingly",
      "Accuracy, compliance, and year-round support come standard",
      "Deadlines tracked proactively, never discovered late",
    ],
    faqs: [
      {
        q: "What documents do I need for business tax preparation?",
        a: "Typically your books or financial statements, prior-year returns, payroll records, and details of major transactions. We'll give you a tailored checklist before we start.",
      },
      {
        q: "What happens if I missed a filing deadline?",
        a: "Contact us as soon as possible. We assess penalties and interest, prepare any late or amended filings, and set up a plan to keep future deadlines on track.",
      },
      {
        q: "Do you handle both federal and Florida state filings?",
        a: "Yes — federal, Florida, and other states where your business has filing obligations.",
      },
    ],
    seo: {
      title: "Business Tax Filing & Preparation | Fort Lauderdale | NexGen",
      description:
        "Federal, state, and multi-state business tax filing, 1099 support, and amended returns — accurate and on time, from NexGen Financial Experts.",
    },
  },
  {
    slug: "llc-s-corp-tax-structuring",
    title: "LLC & S-Corp Tax Structuring",
    shortTitle: "LLC & S-Corp Structuring",
    icon: "GitCompareArrows",
    summary:
      "Entity selection made simple — LLC vs. S-Corp comparison, tax-savings analysis, Form 2553 elections, and ongoing compliance.",
    heroTitle: "LLC & S-Corp Tax Structuring",
    heroIntro: [
      "Choosing the right structure can save you thousands. At NexGen, we help you compare, choose, and file the best fit — LLC or S-Corp.",
      "Whether you're starting fresh or switching your setup, our team makes it easy to decide. We explain tax benefits, handle the paperwork, and keep your business fully compliant. With the right structure, you keep more of what you earn.",
    ],
    offerings: [
      {
        title: "Entity Comparison & Guidance",
        text: "We break down LLC vs. S-Corp in plain English, so you understand the real pros and cons for your situation.",
      },
      {
        title: "Tax Savings Strategy",
        text: "We model potential savings based on your actual income and plans, so you don't leave money on the table.",
      },
      {
        title: "S-Corp Election Filing",
        text: "We file Form 2553 for your S-Corp election — correctly and on time. No confusion, no missed deadlines.",
      },
      {
        title: "Ongoing Compliance Support",
        text: "We help you maintain your S-Corp or LLC throughout the year, so there are no IRS surprises down the road.",
      },
    ],
    audienceTitle: "Perfect for These Types of Businesses",
    audience: [
      "Solo founders and independent contractors",
      "Professional services firms",
      "Growing businesses with rising profits",
      "Owners currently paying self-employment tax on all earnings",
      "Anyone unsure whether their current entity still fits",
    ],
    whyTitle: "Why Structure Matters",
    why: [
      "There's no one-size-fits-all answer when it comes to business entities",
      "The right choice depends on your income, goals, and future plans",
      "Structure affects self-employment tax, payroll, bookkeeping, and compliance",
      "Decisions should fit you — not just the IRS rulebook",
    ],
    faqs: [
      {
        q: "What is the main difference between an LLC and an S-Corp?",
        a: "An LLC is a legal structure; an S-Corp is a tax election. S-Corp treatment can reduce self-employment tax for profitable owners, but adds payroll and compliance requirements. We model the numbers for your specific situation.",
      },
      {
        q: "When is the S-Corp election deadline?",
        a: "Form 2553 generally must be filed within the first two months and 15 days of the tax year the election should take effect. If you've missed the window, ask us about late-election relief provisions.",
      },
      {
        q: "Can I change my structure later?",
        a: "Yes — businesses change structure as they grow. We help you evaluate timing, tax impact, and required filings.",
      },
    ],
    seo: {
      title: "LLC & S-Corp Tax Structuring | NexGen Financial Experts",
      description:
        "LLC vs. S-Corp comparison, tax-savings modeling, Form 2553 election filing, and ongoing entity compliance from NexGen Financial Experts.",
    },
  },
  {
    slug: "crypto-tax-advisory-services",
    title: "Crypto Tax Advisory Services",
    shortTitle: "Crypto Tax Advisory",
    icon: "Bitcoin",
    summary:
      "Clear, compliant crypto tax reporting — capital gains, DeFi & staking income, NFTs, mining, and airdrops handled correctly.",
    heroTitle: "Crypto Tax Advisory Services",
    heroIntro: [
      "Crypto moves fast. So do tax rules. Our job is to make your crypto taxes clear, legal, and as efficient as possible.",
      "Whether you trade, mine, stake, or hold, crypto comes with tax responsibilities. We track your transactions, calculate your gains, and help you file correctly. No more panic at tax time — just confidence, compliance, and clarity.",
    ],
    offerings: [
      {
        title: "Capital Gains Calculation",
        text: "We track your buys, sells, swaps, and transfers, so you pay what you owe — and don't overpay.",
      },
      {
        title: "DeFi & Staking Income Reporting",
        text: "Earned rewards from staking or DeFi lending? We calculate it and report it where the IRS expects it.",
      },
      {
        title: "NFT Tax Guidance",
        text: "Bought, sold, or created NFTs? We help you report them properly and protect your earnings.",
      },
      {
        title: "Mining & Airdrop Income Tracking",
        text: "We handle complex records and apply tax rules correctly — no more manual spreadsheets.",
      },
    ],
    audienceTitle: "Who We Help",
    audience: [
      "Active traders and long-term holders",
      "DeFi users and liquidity providers",
      "NFT creators and collectors",
      "Miners and airdrop recipients",
      "Businesses accepting or holding crypto",
    ],
    whyTitle: "Why NexGen for Crypto Taxes",
    why: [
      "IRS attention on digital assets is increasing — accurate reporting matters",
      "We cover everything from DeFi to NFTs, with real humans, not bots",
      "We bring order to fragmented exchange and wallet records",
      "We explain the rules in plain language so you can plan, not panic",
    ],
    faqs: [
      {
        q: "Do I owe taxes on every crypto trade?",
        a: "In the U.S., selling, swapping, or spending crypto is generally a taxable event. Moving crypto between your own wallets usually isn't. We review your activity and classify it correctly.",
      },
      {
        q: "What records do I need to provide?",
        a: "Exchange transaction histories, wallet addresses, and any DeFi or staking platform exports. We help you collect and reconcile everything.",
      },
      {
        q: "I have past years of unreported crypto activity. What should I do?",
        a: "Don't ignore it. We help you reconstruct past transactions and evaluate the appropriate correction path, including amended returns where warranted.",
      },
    ],
    seo: {
      title: "Crypto Tax Advisory Services | NexGen Financial Experts",
      description:
        "Crypto tax reporting for traders, DeFi, staking, NFTs, mining, and airdrops — accurate calculations and IRS-compliant filing from NexGen.",
    },
  },
  {
    slug: "real-estate-accounting-bookkeeping",
    title: "Real Estate Accounting & Bookkeeping",
    shortTitle: "Real Estate Accounting",
    icon: "Building2",
    summary:
      "Property-level reporting, depreciation, and rental bookkeeping for investors, flippers, and portfolio owners.",
    heroTitle: "Real Estate Accounting & Bookkeeping",
    heroIntro: [
      "Managing properties is complex — your books shouldn't be. We simplify real estate accounting so you stay focused on deals, tenants, and growth.",
      "From rental income tracking to expense management, we handle it all. Our team helps you stay compliant, manage taxes, and see profit clearly with smart bookkeeping. So whether you're flipping houses or holding long-term, your finances stay in top shape.",
    ],
    offerings: [
      {
        title: "Property-Specific Reporting",
        text: "Know which properties are profitable and which need attention. We give you clear, itemized reports.",
      },
      {
        title: "Real Estate Tax Prep",
        text: "From 1099s to depreciation, we handle tax filing for real estate. You focus on deals — we file smart.",
      },
      {
        title: "Bookkeeping for Flips & Rentals",
        text: "Whether you're flipping houses or holding long-term, we track every dollar. Know your numbers before your next move.",
      },
    ],
    audienceTitle: "Who We Help",
    audience: [
      "Individual landlords and rental investors",
      "House flippers and developers",
      "Property management companies",
      "Short-term rental (STR) operators",
      "Commercial real estate investors",
    ],
    whyTitle: "Why It Matters",
    why: [
      "Real estate accounting isn't just numbers — it's strategy",
      "Clean, property-level books make financing and refinancing easier",
      "Depreciation and cost segregation decisions need accurate records",
      "From single properties to multi-unit portfolios, the discipline is the same",
    ],
    faqs: [
      {
        q: "Can you track income and expenses per property?",
        a: "Yes. Property-level (and even unit-level) reporting is standard in our real estate bookkeeping so you always know what each asset earns.",
      },
      {
        q: "Do you handle short-term rental accounting?",
        a: "Yes — including platform payouts (Airbnb, Vrbo), occupancy taxes where applicable, and expense allocation.",
      },
      {
        q: "How do you handle depreciation?",
        a: "We record depreciation correctly on your books and coordinate the tax treatment with your tax filings, flagging opportunities worth reviewing with your tax advisor.",
      },
    ],
    seo: {
      title: "Real Estate Accounting & Bookkeeping | NexGen Financial Experts",
      description:
        "Property-specific reporting, real estate tax prep, and bookkeeping for flips, rentals, and portfolios — NexGen Financial Experts, Fort Lauderdale.",
    },
  },
  {
    slug: "ecommerce-tax-accounting",
    title: "eCommerce Tax & Accounting",
    shortTitle: "eCommerce Tax & Accounting",
    icon: "ShoppingCart",
    summary:
      "Multi-channel bookkeeping for online sellers — sales tax across states, inventory & COGS, and marketplace reconciliation.",
    heroTitle: "eCommerce Tax & Accounting",
    heroIntro: [
      "Selling online is fast — but the taxes? Not so much. At NexGen, we make your eCommerce finances simple, smooth, and stress-free.",
      "From sales tax to multi-platform reporting, we've got your back. You sell on Shopify, Amazon, Etsy, or anywhere else — we track every cent. Let us handle the numbers, so you can focus on orders, marketing, and growth. Tax season won't sneak up on you again.",
    ],
    offerings: [
      {
        title: "Sales Tax Filing Across States",
        text: "We track and file taxes in every state where you have obligations. No penalties, no confusion — just compliance.",
      },
      {
        title: "Inventory & COGS Tracking",
        text: "We track what you buy, sell, and ship. Know your profit down to the penny.",
      },
      {
        title: "Marketplace Accounting",
        text: "We reconcile Amazon, Shopify, Etsy and other platform payouts into clean, organized books. One dashboard, full clarity.",
      },
    ],
    audienceTitle: "Who We Help",
    audience: [
      "Shopify, Amazon, and Etsy sellers",
      "Direct-to-consumer brands",
      "Dropshipping businesses",
      "Multi-channel retailers",
      "Subscription box companies",
    ],
    whyTitle: "Why eCommerce Needs Specialist Accounting",
    why: [
      "eCommerce accounting is different — more platforms, more rules, more moving parts",
      "Economic nexus rules mean sales tax obligations can appear without a physical presence",
      "Inventory and COGS drive your real margins — they deserve accurate tracking",
      "We bring calm to your eCom chaos",
    ],
    faqs: [
      {
        q: "Do I have to collect sales tax in states where I have no store?",
        a: "Possibly. Many states require out-of-state sellers to collect tax once they pass economic nexus thresholds (sales or transaction counts). We help you determine where you're obligated.",
      },
      {
        q: "Can you work directly in my platforms?",
        a: "Yes. We reconcile payouts and fees from major marketplaces and integrate them into your accounting system.",
      },
      {
        q: "How do you handle inventory accounting?",
        a: "We track purchases, COGS, and inventory valuation in line with your accounting method, and reconcile inventory levels to your books.",
      },
    ],
    seo: {
      title: "eCommerce Tax & Accounting | Shopify, Amazon & Etsy | NexGen",
      description:
        "Multi-state sales tax, inventory & COGS tracking, and marketplace accounting for Shopify, Amazon, and Etsy sellers — NexGen Financial Experts.",
    },
  },
  {
    slug: "startup-fractional-cfo-services",
    title: "Startup & Fractional CFO Services",
    shortTitle: "Fractional CFO",
    icon: "TrendingUp",
    summary:
      "Executive-level financial leadership without the full-time cost — forecasting, cash flow strategy, and investor reporting.",
    heroTitle: "Startup & Fractional CFO Services",
    heroIntro: [
      "Startups need sharp numbers and smarter decisions — not just spreadsheets. At NexGen, our CFO support is flexible, fast, and founder-friendly.",
      "We act like your in-house CFO, minus the full-time cost. From funding to forecasting, we guide your finances every step of the way. You stay focused on building — we handle the money side with clarity and control. No fluff. Just financial leadership that scales with your growth.",
    ],
    offerings: [
      {
        title: "Financial Forecasting & Modeling",
        text: "We build clear financial projections to guide your decisions. Plan your next move with confidence.",
      },
      {
        title: "Cash Flow Strategy & Management",
        text: "We help you control your cash in and cash out. Never run out of fuel when it matters most.",
      },
      {
        title: "Investor Reporting & Pitch Support",
        text: "Need clean numbers for funding rounds? We prepare the data so you can present with clarity, not confusion.",
      },
    ],
    audienceTitle: "Who We Work With",
    audience: [
      "Pre-seed and seed-stage startups",
      "Bootstrapped founders who need senior finance insight",
      "Companies preparing to raise capital",
      "Businesses scaling past their informal systems",
      "Founders who want financial leadership without a six-figure hire",
    ],
    whyTitle: "Why Fractional CFO",
    why: [
      "You don't need a full-time CFO to make smart financial moves",
      "Fractional leadership brings executive-level insight without the executive salary",
      "Strategy, funding, growth planning, and cash flow — covered as you scale",
      "Flexible engagements that grow with you",
    ],
    faqs: [
      {
        q: "How is a fractional CFO different from an accountant?",
        a: "Accountants keep your records accurate and compliant. A fractional CFO uses those numbers to drive strategy — pricing, hiring, fundraising, and cash-flow decisions.",
      },
      {
        q: "How many hours per month does an engagement usually need?",
        a: "It depends on your stage. Some founders need a few hours a month; others need weekly involvement. We size the engagement to your needs.",
      },
      {
        q: "Can you help us prepare for a funding round?",
        a: "Yes — we prepare financial models, KPIs, and data rooms that give investors confidence in your numbers.",
      },
    ],
    seo: {
      title: "Startup & Fractional CFO Services | NexGen Financial Experts",
      description:
        "Fractional CFO services for startups: forecasting, cash flow strategy, and investor reporting — executive financial leadership without the full-time cost.",
    },
  },
  {
    slug: "financial-advisory-for-startups",
    title: "Financial Advisory for Startups",
    shortTitle: "Startup Advisory",
    icon: "Rocket",
    summary:
      "Build a strong financial foundation from day one — budgeting, cash-flow discipline, and investor readiness.",
    heroTitle: "Financial Advisory for Startups",
    heroIntro: [
      "Starting a business is exciting — but your finances must be solid from day one. At NexGen, we help startups build a strong financial foundation that supports growth.",
      "We offer guidance, tools, and strategies that save money and avoid costly mistakes. From budgeting to investor readiness, our experts make sure your startup is financially smart. With us, you stay focused on growth — while we handle the numbers.",
    ],
    offerings: [
      {
        title: "Startup Budgeting & Forecasting",
        text: "We help you plan every dollar before you spend it, so you stay in control and make better decisions.",
      },
      {
        title: "Cash Flow Management",
        text: "We track and plan your cash to avoid shortfalls, so you grow without running dry.",
      },
      {
        title: "Business Structure & Registration Guidance",
        text: "We help you choose the right setup for long-term success and support the registration process.",
      },
      {
        title: "Investor Readiness",
        text: "We get your financials organized and your metrics clear, so you're ready when opportunity knocks.",
      },
    ],
    audienceTitle: "Who We Help",
    audience: [
      "First-time founders",
      "Side projects becoming real companies",
      "Founders raising their first outside capital",
      "Startups hiring employees for the first time",
      "Teams that need finance structure without finance overhead",
    ],
    whyTitle: "Why Early Financial Discipline Wins",
    why: [
      "Launching takes more than passion — it needs proper financial direction",
      "Early mistakes compound; early systems compound too",
      "Clean books make every future decision cheaper and faster",
      "Investors trust founders who know their numbers",
    ],
    faqs: [
      {
        q: "When should a startup hire financial help?",
        a: "Earlier than most founders think. Even a few hours a month of structured guidance prevents expensive cleanup later.",
      },
      {
        q: "Can you help us incorporate?",
        a: "We guide the structure decision and the registration process, and coordinate with your attorney or registered agent for legal filings.",
      },
      {
        q: "Do you work with pre-revenue startups?",
        a: "Yes. Budgeting and runway planning matter most before revenue arrives.",
      },
    ],
    seo: {
      title: "Financial Advisory for Startups | NexGen Financial Experts",
      description:
        "Startup budgeting, forecasting, cash-flow management, entity guidance, and investor readiness — financial advisory from NexGen Financial Experts.",
    },
  },
  {
    slug: "audit-services",
    title: "Audit Services",
    shortTitle: "Audit Services",
    icon: "ShieldCheck",
    summary:
      "Independent audit support, internal audits, and audit readiness — thorough, organized, and compliance-focused.",
    heroTitle: "Audit Services",
    heroIntro: [
      "An audit shouldn't be a fire drill. We help organizations prepare for, undergo, and learn from audits with organized records and clear processes.",
      "From regulated audits to internal reviews, our team evaluates controls, tests processes, and helps you present financial information that stands up to scrutiny.",
    ],
    offerings: [
      {
        title: "Audit Preparation & Support",
        text: "We organize records, reconcile balances, and prepare schedules so external audits proceed smoothly and on schedule.",
      },
      {
        title: "Internal Audits",
        text: "We evaluate your processes and controls, identify gaps, and recommend practical improvements that strengthen the business.",
      },
      {
        title: "Compliance & Voluntary Audits",
        text: "We support voluntary, charity, and compliance-driven audit needs where organizations benefit from independent financial review.",
      },
    ],
    audienceTitle: "Who We Help",
    audience: [
      "Businesses facing their first external audit",
      "Non-profits and community organizations",
      "Companies strengthening internal controls",
      "Organizations with lender or investor audit requirements",
      "Teams recovering from disorganized records",
    ],
    whyTitle: "Why Audit Readiness Matters",
    why: [
      "Audits reward preparation — organized records mean lower cost and less stress",
      "Internal reviews catch small problems before they become expensive ones",
      "Strong controls build trust with lenders, investors, and boards",
      "Findings become improvements, not setbacks, when handled proactively",
    ],
    faqs: [
      {
        q: "What's the difference between an internal and external audit?",
        a: "An external audit is performed by an independent auditor, often for regulators, lenders, or donors. An internal audit is a management-driven review of controls and processes. We support both.",
      },
      {
        q: "How far in advance should we prepare for an audit?",
        a: "Ideally 2–3 months. But if your audit is sooner, we prioritize the schedules and reconciliations that matter most.",
      },
      {
        q: "Can you fix issues found in a prior audit?",
        a: "Yes. We translate audit findings into a remediation plan and help you implement and document the fixes.",
      },
    ],
    seo: {
      title: "Audit Services — Audit Prep & Internal Audit | NexGen",
      description:
        "Audit preparation, internal audits, and compliance-focused audit support for businesses and non-profits — NexGen Financial Experts, Fort Lauderdale.",
    },
  },
  {
    slug: "payroll-services",
    title: "Payroll Services",
    shortTitle: "Payroll Services",
    icon: "Users",
    summary:
      "Accurate, on-time payroll with tax withholding, filings, and reporting handled end to end.",
    heroTitle: "Payroll Services",
    heroIntro: [
      "Payroll is one of those functions that must simply work — every run, every employee, every deadline. Mistakes cost trust, and late filings cost money.",
      "We handle payroll processing, employment tax withholding and filings, and reporting, so your team gets paid accurately and on schedule while you stay compliant.",
    ],
    offerings: [
      {
        title: "Payroll Processing",
        text: "We run your payroll accurately and on schedule — salaries, hourly wages, overtime, and bonuses.",
      },
      {
        title: "Payroll Tax Withholding & Filing",
        text: "Federal, state, and local payroll taxes withheld, deposited, and filed on time.",
      },
      {
        title: "Payroll Reporting & Records",
        text: "Clear payroll registers, journal entries, and year-end forms (W-2s and 1099s) prepared without the scramble.",
      },
    ],
    audienceTitle: "Who We Help",
    audience: [
      "Small businesses with their first employees",
      "Growing teams across multiple states",
      "Companies using S-Corp payroll for owners",
      "Organizations mixing employees and contractors",
      "Businesses switching payroll providers",
    ],
    whyTitle: "Why Outsource Payroll",
    why: [
      "Payroll errors damage employee trust faster than almost anything else",
      "Late deposits and filings trigger penalties that are entirely avoidable",
      "Outsourcing frees your team from a repetitive, high-stakes admin task",
      "Payroll integrates with your books, keeping records consistent",
    ],
    faqs: [
      {
        q: "How often should payroll be run?",
        a: "Common schedules are weekly, bi-weekly, or semi-monthly. We help you choose a schedule that fits your cash flow and state requirements.",
      },
      {
        q: "Do you handle year-end W-2s and 1099s?",
        a: "Yes. We prepare and issue year-end wage statements and contractor forms on time.",
      },
      {
        q: "Can you take over payroll from another provider mid-year?",
        a: "Yes. We map year-to-date figures, verify tax deposits, and continue the year without gaps.",
      },
    ],
    seo: {
      title: "Payroll Services | Fort Lauderdale | NexGen Financial Experts",
      description:
        "Payroll processing, tax withholding and filing, and year-end reporting for small businesses — NexGen Financial Experts, Fort Lauderdale, FL.",
    },
  },
  {
    slug: "tax-accounting",
    title: "Tax & Accounting Services in Fort Lauderdale",
    shortTitle: "Tax & Accounting (Fort Lauderdale)",
    icon: "MapPin",
    summary:
      "Local tax and accounting services for Fort Lauderdale businesses — compliance made easy and reporting made clear.",
    heroTitle: "Tax & Accounting Services in Fort Lauderdale",
    heroIntro: [
      "At NexGen Financial Experts, we offer trusted tax and accounting services in Fort Lauderdale. We make your financial life easier, more accurate, and fully compliant.",
      "NexGen offers reliable tax and accounting services tailored to your needs. We help you stay compliant, organized, and financially strong. From accurate bookkeeping to smart tax planning, NexGen supports your financial growth. Let us handle the numbers while you grow your business.",
    ],
    offerings: [
      {
        title: "Simplified Finances",
        text: "We organize your records, so you don't have to stress about numbers ever again.",
      },
      {
        title: "Tax Compliance Made Easy",
        text: "Our experts handle your taxes with full accuracy and on-time filing.",
      },
      {
        title: "Clear Reporting",
        text: "We give you clean financial reports to help you make smart business decisions.",
      },
    ],
    audienceTitle: "Serving Fort Lauderdale & South Florida",
    audience: [
      "Businesses on and around Sunrise Blvd and downtown Fort Lauderdale",
      "Companies across Broward County",
      "South Florida startups and professional practices",
      "E-commerce and real estate businesses operating statewide",
      "Out-of-state owners with Florida entities",
    ],
    whyTitle: "Why Local Matters",
    why: [
      "Florida tax rules, filings, and deadlines have their own quirks — local experience helps",
      "Meetings are easy when your accountant is around the corner",
      "We understand the South Florida business landscape, from hospitality to real estate",
      "National-quality standards with neighborhood accessibility",
    ],
    faqs: [
      {
        q: "Where is your office located?",
        a: "1975 East Sunrise Blvd, Suite 705, Fort Lauderdale, FL 33304 — on Sunrise Blvd, easily reachable from downtown and the beach side.",
      },
      {
        q: "Do you only serve clients in Fort Lauderdale?",
        a: "No — we serve clients across Florida and in multiple states, but Fort Lauderdale is our home base.",
      },
      {
        q: "Can I meet in person?",
        a: "Yes. Schedule an appointment by phone or through our contact form and we'll arrange a meeting at our office or virtually.",
      },
    ],
    seo: {
      title: "Tax & Accounting Services in Fort Lauderdale | NexGen Financial Experts",
      description:
        "Trusted tax and accounting services in Fort Lauderdale, FL — bookkeeping, tax planning, compliance, and clear reporting from NexGen Financial Experts.",
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
