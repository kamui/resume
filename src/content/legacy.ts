import type { Job } from "../types.ts";

/**
 * Legacy
 * January 2024 - June 2025
 * VP of Technology
 */
export const legacy: Job = {
    company: "Legacy",
    descriptor: "At-home fertility, sperm testing and freezing, ~20 people",
    roles: [
      {
        title: "VP of Technology",
        time: {
          range: "January 2024 - June 2025",
          duration: "1 year 6 months",
          location: "New York City Metropolitan Area",
        },
        resumeMode: "full",
        scope: [
          "Reported to the CEO, later the President · Executive leadership team",
          "**Team of 8 engineers at the start; 4 engineers and a consultant after downsizing (4 engineers plus 3 consultants for most of the tenure) · $2M+ budget across comp, software and services**",
        ],
        note: "Role eliminated, with other executive roles, when the board chose profitability over a new funding round",
        linkedinIntro: "At-home fertility company, sperm testing and freezing, around 20 people. Reported to the CEO, later the President. On the executive leadership team. Team of 8 engineers at the start; 4 engineers and a consultant after downsizing (4 engineers plus 3 consultants for most of the tenure), on a $2M+ annual budget across comp, software and services.",
        linkedinNotes: [
          "The role was eliminated, along with other executive roles, when the board chose to push the company to profitability in 2025 rather than fund a new round.",
        ],
        bullets: [
          {
            resume: "Cut $100K+ a year in technology spend by consolidating platforms, renegotiating vendors, and trimming CI/CD usage",
            linkedin: "Cut $100K+ a year out of the technology budget by migrating to new products, consolidating platforms, negotiating hard with vendors, and pulling resource usage out of the code, the platforms and CI/CD",
          },
          {
            resume: "De-risked the clinical platform, a hand-built EC2 server nobody knew how to rebuild: mapped its dependencies and moved it to Elastic Beanstalk so we could recover and scale it",
            linkedin: "De-risked the main clinical platform. It ran on a single hand-built EC2 instance with no reproducible setup, so if it went down nobody knew how to rebuild it. We worked out every dependency it needed and moved it to Elastic Beanstalk, so we could recover it and scale it",
          },
          {
            resume: "Replaced an inadequate home-grown e-commerce platform, including checkout and payments, with Vendure, an open-source platform we heavily customized, for HIPAA compliance, scale, and a richer feature set",
            linkedin: "Replaced an inadequate home-grown e-commerce platform, including checkout and payments, with Vendure, an open-source platform we heavily customized, for HIPAA compliance, scale, and a richer feature set",
          },
          {
            linkedin: "Created and drove an org-wide technology architecture roadmap to support and better integrate systems that had grown up separately: a customer-facing website, the product quiz system, the client dashboard for post-test or freeze, clinical front and back ends, e-commerce, and the data platforms",
          },
          {
            resume: "Stood up BI (Metabase, Equals), pipelines (Segment), and product analytics (PostHog) so we could answer revenue and product questions and read A/B results without guessing",
            linkedin: "Stood up real BI tooling (Metabase, Equals), data pipelines (Segment) and product analytics (PostHog) so we could measure site and revenue performance, answer business and product questions quickly, and read the results of A/B experiments without guessing",
          },
          {
            resume: "Moved the website off WordPress: Remix and Payload for the core frontend and e-commerce pages, Webflow for marketing landing pages, so we could launch, test and measure pages faster",
            linkedin: "Moved the website off WordPress: Remix and Payload for the core frontend and e-commerce pages, Webflow for marketing landing pages, so we could launch, test and measure pages faster",
          },
          {
            resume: "Shifted the team from building and running everything in-house to managed platforms, so engineers could focus on the core product",
          },
        ],
      },
    ],
  };
