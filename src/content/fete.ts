import type { Job } from "../types.ts";

/**
 * Fête
 * November 2025 - May 2026
 * Chief Technology Officer
 */
export const fete: Job = {
    company: "Fête",
    descriptor: "Early-stage gifting startup",
    roles: [
      {
        title: "Chief Technology Officer",
        time: {
          range: "November 2025 - May 2026",
          duration: "7 months",
          location: "New York City Metropolitan Area",
        },
        resumeMode: "full",
        scope: [
          "Reported to the CEO, later the President · Executive leadership team",
          "**Team of 6**: in-house VP of Product, consultant design lead, offshore product/project manager, 3 offshore engineers",
        ],
        note: "Role ended when the company pivoted from building custom product to an off-the-shelf e-commerce platform",
        linkedinIntro: "Reported to the CEO, later the President. On the executive leadership team. Team of 6: an in-house VP of Product, a product design lead on contract, an offshore product and project manager, and 3 offshore engineers.",
        linkedinNotes: [
          "The role ended when the company pivoted away from building a custom digital product and moved to an off-the-shelf e-commerce platform.",
        ],
        bullets: [
          {
            resume: "Built an AI gift recommendation product behind an LLM gateway. Not a chatbot, but a guided flow: budget, giver, recipient and relationship in; products from across the web, the reasoning, and a draft gift note out",
            linkedin: "Built an AI gifting recommendation product. Not a chatbot, but a wizard that collects your budget, who's giving, who's receiving, and the relationship between them, then returns products from across the internet with the reasoning, ideas for how to present the gift, and a draft gift note. Ran it through an LLM gateway so we could swap prompts and models as we tested",
          },
          {
            resume: "Ran the build AI-first: a custom headless Shopify stack in TypeScript and Node.js (React, TanStack Start, Mantine, Nest.js, Sanity, Drizzle, Postgres, Redis), most of it written with Claude Opus and GPT-5 agents through OpenCode",
            linkedin: "Built a custom headless Shopify stack in TypeScript and Node.js: React, TanStack Start, and Mantine on the front end, with Nest.js, the Sanity CMS API, Drizzle ORM, Postgres and Redis behind it, multiplexing Shopify and CMS data through to the front end. Most of it written with Claude Opus and GPT-5 through the OpenCode/OpenChamber harness",
          },
          {
            resume: "Set architecture and roadmaps through three business models: B2B gifting, B2C gifting, then an e-commerce magazine",
            linkedin: "Set technology architecture requirements and roadmaps across three different business models as the company moved from B2B gifting to B2C gifting to a tech-forward e-commerce magazine",
          },
          {
            linkedin: "Hired the team: a VP of Product, a product design lead on contract, and a small group of offshore engineers to build the various product directions",
          },
          {
            resume: "Hired the product, design and engineering group, and handed the IT setup I'd stood up to a managed service provider",
            linkedin: "Sourced a Managed Service Provider in Manhattan to take over the IT setup I had stood up, and mentored an associate employee into running the day-to-day IT work",
          },
        ],
      },
    ],
  };
