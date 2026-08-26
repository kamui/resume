import type { Job } from "../types.ts";

/**
 * International Masters Publishers
 * January 2009 - October 2009
 * Software Engineer
 */
export const internationalMasters: Job = {
    company: "International Masters Publishers",
    roles: [
      {
        title: "Software Engineer",
        time: {
          range: "January 2009 - October 2009",
        },
        resumeMode: "earlier",
        earlier: {
          years: "2009",
          company: "International Masters Publishers",
          title: "Software Engineer",
        },
        linkedinIntro: "Development of a photo book, card and print e-commerce web application (hoorray.com) and a cooking recipe web application (cookingvillage.com).",
        bullets: [
          {
            linkedin: "Designed and developed the architecture and usability of the e-commerce photo book application",
          },
          {
            linkedin: "Wrote the authentication component with Spring Security",
          },
          {
            linkedin: "Developed the order checkout process, including address and payment validation on both server and client, converting guest orders and projects to a registered user if they logged in at checkout, and generating order receipts and emails",
          },
          {
            linkedin: "Wrote the mailer interface used to interact with Lyris ListManager for sending emails and subscribing or unsubscribing users from mailing lists",
          },
          {
            linkedin: "Wrote the messaging notification component that let the application send unobtrusive notifications as a bar at the top of the page. Built with progressive enhancement in mind, so it worked whether or not the user had JavaScript enabled",
          },
          {
            linkedin: "Created an internal recipe tool in Groovy on Grails for importing recipes from XML, editing recipe data and uploading recipe images",
          },
          {
            linkedin: "Applied a new theme to Cooking Village, removing Flash components and replacing them with JavaScript and AJAX alternatives for recipe viewing, registration and recipe creation",
          },
          {
            linkedin: "Built an internal Groovy on Grails application for the photo book app on top of the existing MySQL database. It allowed previewing photo book XML payloads and PDFs generated from PDFLib, viewing real-time orders and user registrations, and it eventually became a customer service tool for communicating problems and discrepancies directly with customers",
          },
          {
            linkedin: "Maintained the legacy photo book application written in Java with Spring and Hibernate",
          },
          {
            linkedin: "Wrote Groovy scripts that used an email inbox as a job queue to identify orders that were not processed correctly or never reached the printer, and let the user resend, reprocess, or display the payload XML for examination",
          },
        ],
      },
    ],
  };
