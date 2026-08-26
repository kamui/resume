import type { Job } from "../types.ts";

/**
 * Mash+Studio
 * January 2014 - August 2014
 * Senior Developer
 */
export const mashStudio: Job = {
    company: "Mash+Studio",
    roles: [
      {
        title: "Senior Developer",
        time: {
          range: "January 2014 - August 2014",
          location: "New York",
        },
        resumeMode: "earlier",
        earlier: {
          years: "2014",
          company: "Mash+Studio",
          title: "Senior Developer",
        },
        linkedinIntro: "Continued supporting the CropUp product, and built a Rails app for Canadian Ford dealerships to manage charity and community test drive events.",
        linkedinNotes: [
          "On CropUp:",
        ],
        bullets: [
          {
            linkedin: "Switched from Sinatra to Grape",
          },
          {
            linkedin: "Started work on switching from Braintree Payments to Stripe",
          },
          {
            linkedin: "Switched the Node.js Express shopping app to Rails",
          },
          {
            linkedin: "Managed event coordination with Ford and the dealerships, including marketing materials, funding, novelty checks and test drive statistics",
            heading: "On the Ford dealership app:",
          },
          {
            linkedin: "Provided online questionnaires for test drivers via tablets",
          },
          {
            linkedin: "Built an import tool to continually import new dealerships via CSV",
          },
        ],
      },
    ],
  };
