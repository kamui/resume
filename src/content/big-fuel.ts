import type { Job } from "../types.ts";

/**
 * Big Fuel Communications LLC
 * March 2011 - June 2012
 * Software Engineer
 */
export const bigFuel: Job = {
    company: "Big Fuel Communications LLC",
    roles: [
      {
        title: "Software Engineer",
        time: {
          range: "March 2011 - June 2012",
          location: "New York, NY",
        },
        resumeMode: "earlier",
        earlier: {
          years: "2011 - 2012",
          company: "Big Fuel Communications",
          title: "Software Engineer",
        },
        linkedinIntro: "Created a Social Media Management System for building and deploying Facebook pages and tabs, in Ruby on Rails and MongoDB. The platform was a single Rails application containing reusable components: surveys, polls, signups, image submissions, image galleries and asset downloads.",
        linkedinNotes: [
          "Facebook tabs could be built quickly from the available components, which were then managed through an admin console. Each tab was essentially a single git repository. Pages were written in any language supported by Tilt (Haml, Sass, CoffeeScript, Slim), and assets used the Rails asset pipeline with Sprockets.",
          "Building pages was deliberately not dumbed down into a drag-and-drop GUI. The idea was to let a developer build anything by hand-coding the HTML, CSS and Ruby, with helpers available to drop in the reusable components.",
          "Tab versions could be scheduled and deployed automatically. The platform server pulled the specified git repo and branch or tag at the scheduled date, compiled assets, uploaded them to S3, then updated the internal cache to reflect the new page.",
        ],
        bullets: [],
      },
    ],
  };
