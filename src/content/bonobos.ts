import type { Job } from "../types.ts";

/**
 * Bonobos (Walmart)
 * March 2018 - October 2018 to January 2015 - August 2016
 * Director of Engineering, Engineering Manager, Principal Engineer II
 */
export const bonobos: Job = {
    company: "Bonobos (Walmart)",
    descriptor: "~$150M men's apparel brand, acquired by Walmart 2017",
    totalDuration: "3 years 10 months",
    roles: [
      {
        title: "Director of Engineering",
        time: {
          range: "March 2018 - October 2018",
          duration: "8 months",
          location: "Greater New York City Area",
        },
        resumeMode: "full",
        scope: [
          "Reported to the CEO · **17 in-house engineers** across 2 product engineering teams and a 3-person SRE team, plus 2 offshore QA",
        ],
        linkedinIntro: "Around $150M men's apparel brand, acquired by Walmart in 2017. Reported to the CEO. Led the Engineering team: 17 in-house engineers across 2 product engineering teams and a 3-person Site Reliability team handling bug triage and tech debt, plus 2 offshore QA engineers.",
        bullets: [
          {
            resume: "Led engineering for the post-acquisition Walmart integration: security, compliance, breach run books, infrastructure",
            linkedin: "Led the engineering side of the post-acquisition Walmart integration, which included compliance and security work, documentation and run books for security and data breaches, and the infrastructure migration and support",
          },
          {
            resume: "Completed PCI Level 1 compliance on the engineering side of the DSS with an external auditor",
            linkedin: "Completed PCI Level 1 compliance on the engineering side of the DSS with an external auditor",
          },
          {
            resume: "Built a merchandising admin to schedule hundreds of SKUs across category pages, and put site search on Elasticsearch",
            linkedin: "Built a backend administrative tool so Merchandising could manage, surface and schedule the availability of hundreds of SKUs across our category pages",
          },
          {
            linkedin: "Implemented on-site product search powered by Elasticsearch",
          },
          {
            linkedin: "Added support for bundled discounts and the backend management for them",
          },
          {
            linkedin: "Revamped the on-site navigation",
          },
          {
            linkedin: "Hired engineering consultants to increase end-to-end test coverage with Cypress.io",
          },
          {
            linkedin: "Prepared and executed load testing to scale for the holidays",
          },
          {
            linkedin: "Supported NetSuite ERP efforts between Dell Boomi and our custom e-commerce platform",
          },
          {
            linkedin: "Implemented a system for managing damaged returns with our 3PL",
          },
          {
            linkedin: "Managed the relationship with a digital agency implementing frontend features, including PDP enhancements and an alternate category view focused on products rather than colors",
          },
          {
            linkedin: "Set up an education program for the team with General Assembly",
          },
          {
            linkedin: "Kicked off a project to create a React Native app for use in our retail stores",
          },
        ],
      },
      {
        title: "Engineering Manager",
        time: {
          range: "August 2016 - March 2018",
          duration: "1 year 8 months",
          location: "Greater New York City Area",
        },
        resumeMode: "full",
        scope: [
          "**Team of 5 engineers**, partnering with a UX designer and a product manager",
        ],
        linkedinIntro: "Led a technology initiative team of 5 engineers, partnering with a UX designer and a product manager, to boost new customer acquisition, conversion, and SEO and performance.",
        bullets: [
          {
            resume: "Re-architected the storefront on Node with hybrid client/server rendering (Next.js, React, Redux) and an HTTP caching layer that kept the site up when the API layer was slow or down",
            linkedin: "Improved site performance and SEO by re-architecting our frontend app on Node.js with hybrid client- and server-side rendering, using Next.js, React, Redux, PostCSS/cssnext and CSS Modules. We built an HTTP caching layer into the app for speed and resiliency when the API layer was slow or down",
          },
          {
            resume: "Cut load times 30-40% with lazy loading, image compression, format negotiation by browser, and viewport-aware sizing",
            linkedin: "Cut load times by 30 to 40% with lazy loading below the fold, image compression and format negotiation by browser, and image dimensions optimized by viewport and device type",
          },
          {
            linkedin: "Improved SEO through structured data, fixing canonical URLs, improving page speed, cleaning our sitemap, rendering sold-out product pages rather than 404ing them, and fixing heading structure",
          },
          {
            linkedin: "Completed site-wide ADA AA compliance and socialized how to maintain it across the other teams",
          },
          {
            linkedin: "Built the size, fit and option education experience to help customers pick the right options, including a new backend admin with live previews. All in React and Redux",
          },
          {
            linkedin: "Redesigned the product detail page option picker UX for more up-front visibility of options and availability",
          },
          {
            linkedin: "Added the ShopRunner integration",
          },
          {
            linkedin: "Developed and iterated on a product development workflow for managing our timelines",
          },
        ],
      },
      {
        title: "Principal Engineer II",
        time: {
          range: "January 2015 - August 2016",
          duration: "1 year 8 months",
          location: "New York, NY",
        },
        resumeMode: "full",
        linkedinIntro: "",
        bullets: [
          {
            resume: "Replaced the single-page JavaScript storefront with a server-rendered Rails 4 app for faster response times",
            linkedin: "Architected and implemented a replacement for the user-facing single-page JavaScript app with a hybrid client/server-rendered Rails 4 app, focused on response times and Speed Index",
          },
          {
            linkedin: "Created an asset pipeline on Node, webpack, Babel, ES6 and Immutable.js to replace Rails' built-in pipeline. Sprockets' dependency management was too primitive and upfront, and easier access to npm packages was a big bonus",
          },
          {
            linkedin: "Rewrote our checkout flow in Nuclear.js and React, moving off Backbone.js",
          },
          {
            linkedin: "Migrated our EC2 infrastructure (backend, frontend, Postgres), Redis ElastiCache and app structure to Heroku",
          },
          {
            linkedin: "Implemented a new order item exchange flow using Nuclear.js and React",
          },
          {
            linkedin: "Implemented a new product out-of-stock subscription and notification feature using Redux and React",
          },
          {
            linkedin: "Worked in a DevOps reserve capacity to help manage our infrastructure on AWS and Chef",
          },
        ],
      },
    ],
  };
