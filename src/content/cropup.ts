import type { Job } from "../types.ts";

/**
 * CropUp
 * June 2012 - March 2013
 * Tech Lead
 */
export const cropup: Job = {
    company: "CropUp",
    roles: [
      {
        title: "Tech Lead",
        time: {
          range: "June 2012 - March 2013",
          location: "Brooklyn, NY",
        },
        resumeMode: "earlier",
        earlier: {
          years: "2012 - 2013",
          company: "CropUp",
          title: "Tech Lead",
        },
        linkedinIntro: "Built a JSON RESTful API using Ruby and Sinatra, with features including:",
        linkedinOutro: [
          "We primarily built the API and OAuth 2.0 so we could build a front-end site that consumed the API. The front-end site was mostly static HTML, using AngularJS to create a client dashboard for managing orders and products, while the public-facing shopping site handled placing orders. AngularJS interacted with the user and made requests to the API server for authentication and to work with server resources. The front end was responsive and built mobile-first.",
        ],
        bullets: [
          {
            linkedin: "E-commerce checkout flow",
          },
          {
            linkedin: "Payment integration with Braintree",
          },
          {
            linkedin: "Transaction syncing, refunds and voids",
          },
          {
            linkedin: "Versioning with accept headers",
          },
          {
            linkedin: "Pagination with link headers",
          },
          {
            linkedin: "CORS support",
          },
          {
            linkedin: "OAuth 2.0 provider support along with scope-based authorization",
          },
        ],
      },
    ],
  };
