import type { Job } from "../types.ts";

/**
 * SourceMedia
 * June 2006 - January 2009
 * Software Engineer
 */
export const sourcemedia: Job = {
    company: "SourceMedia",
    roles: [
      {
        title: "Software Engineer",
        time: {
          range: "June 2006 - January 2009",
        },
        resumeMode: "earlier",
        earlier: {
          years: "2006 - 2009",
          company: "SourceMedia",
          title: "Software Engineer",
        },
        linkedinIntro: "Development of content management systems used across multiple financial publications, plus maintenance and development of around 20 legacy content sites.",
        bullets: [
          {
            linkedin: "Built a content management system from the ground up with a team, using Spring MVC, Hibernate and MySQL on Apache Tomcat. A complete rewrite of an existing CMS. Wrote the data models, Hibernate validations, service implementations, multi-action controllers, extensive test coverage, and the JSP views with Spring form tags",
          },
          {
            linkedin: "Wrote client-side validation, dynamic form elements and reordering for quizzes and polls in jQuery, and used jQuery for AJAXified polls",
          },
          {
            linkedin: "Maintained the legacy CMS for dozens of sites written in ColdFusion MX on the front end with a PHP, Firebird and MySQL backend on Windows 2003 Server. Bug fixes, new features, DoubleClick ad integration and Lyris mailing list integration",
          },
          {
            linkedin: "Built a quiz system providing Continuing Education Credits to subscribers, along with a customer service application to manage results and reprocessing",
          },
          {
            linkedin: "Designed and developed a web app that let corporate executives add and edit their company survey data for an annual directory publication. It also exported that data into a format readable by QuarkXPress, and later Adobe InDesign",
          },
        ],
      },
    ],
  };
