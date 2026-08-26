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
          "**4 in-house engineers and a consultant · $2M+ budget across comp, software and services**",
        ],
        linkedinIntro: "At-home fertility company, sperm testing and freezing, around 20 people. Reported to the CEO, later the President. On the executive leadership team. 4 in-house engineers and a consultant, on a $2M+ annual budget across comp, software and services.",
        bullets: [
          {
            resume: "Cut a low six figures out of the annual technology budget by consolidating platforms, renegotiating with vendors, and pulling resource usage out of the code and CI/CD",
            linkedin: "Cut a low six figures out of the annual technology budget by migrating to new products, consolidating platforms, negotiating hard with vendors, and pulling resource usage out of the code, the platforms and CI/CD",
          },
          {
            resume: "Replaced a home-grown checkout and payments system with Vendure. The goals were HIPAA compliance and scalability rather than a conversion play, and it moved us onto a much richer feature set",
            linkedin: "Replaced a home-grown checkout and payments system with Vendure, an open-source e-commerce platform. The goals were HIPAA compliance and scalability rather than a conversion play, and it moved us from a very legacy system, no pun intended, onto a much richer feature set",
          },
          {
            resume: "Drove an org-wide architecture roadmap to connect systems that had grown up separately: marketing site, product quiz, client dashboard, clinical front and back ends, e-commerce, and data",
            linkedin: "Created and drove an org-wide technology architecture roadmap to support and better integrate systems that had grown up separately: a customer-facing website, the product quiz system, the client dashboard for post-test or freeze, clinical front and back ends, e-commerce, and the data platforms",
          },
          {
            resume: "Stood up BI (Metabase, Equals), pipelines (Segment), and product analytics (PostHog) so we could answer revenue and product questions and read A/B results without guessing",
            linkedin: "Stood up real BI tooling (Metabase, Equals), data pipelines (Segment) and product analytics (PostHog) so we could measure site and revenue performance, answer business and product questions quickly, and read the results of A/B experiments without guessing",
          },
          {
            resume: "Moved the marketing site off WordPress onto Remix/React Router and Payload, page by page, so design could optimize each one as it went",
            linkedin: "Replaced most of the old WordPress marketing pages with a modern platform (Remix/React Router, Payload CMS) so we could launch pages, test ideas and measure them faster. We went page by page so design and UX could optimize each one as it moved onto the new stack",
          },
        ],
      },
    ],
  };
