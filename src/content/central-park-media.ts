import type { Job } from "../types.ts";

/**
 * Central Park Media
 * 2000 - 2006
 * Web Developer
 */
export const centralParkMedia: Job = {
    company: "Central Park Media",
    roles: [
      {
        title: "Web Developer",
        time: {
          range: "2000 - 2006",
        },
        resumeMode: "earlier",
        earlier: {
          years: "2000 - 2006",
          company: "Central Park Media",
          title: "Web Developer",
        },
        linkedinIntro: "Development and maintenance of e-commerce web apps, CMS web apps and marketing websites for Japanese animation and Asian cult video products.",
        bullets: [
          {
            linkedin: "Developed a cross-site, themeable e-commerce web application in ColdFusion and MS Access, the first for the company, which had previously relied on other e-tailers for online sales. Later iterations used the cf_objects framework, which simulated OOP in ColdFusion, and eventually moved the datastore to MySQL",
          },
          {
            linkedin: "Added a coupon system to the e-commerce application, letting the business offer free shipping, $X off $Y, a free product with a purchase, or a percentage off an order",
          },
          {
            linkedin: "Added a DVD pre-order feature to the e-commerce application",
          },
          {
            linkedin: "Designed and developed a CMS for AnimeOne.com in ColdFusion, which gave away free multimedia including wallpapers, video clips and streaming video",
          },
          {
            linkedin: "Created dozens of one-off web applications in ColdFusion for questionnaires, surveys and contests",
          },
          {
            linkedin: "Designed marketing websites for new product releases",
          },
          {
            linkedin: "Served as editor for a monthly web newsletter called AniMail",
          },
          {
            linkedin: "Took on a server administrator role when we moved from a managed Windows 2003 Server host to a Linux platform",
          },
        ],
      },
    ],
  };
