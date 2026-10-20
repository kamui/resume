import type { Contact, Education } from "../types.ts"

/**
 * Identity, summary and education. Everything on the resume that is not a job.
 *
 * `summary` is the resume's opening paragraph; `about` is the longer
 * LinkedIn About section, which is written differently rather than reused.
 */
export const profile = {
  name: "Jack Chu",
  headline: [
    "CTO / VP Engineering",
    "Build 0-1 products, modernize platforms, grow teams from 3 to 30+",
    "Health, e-commerce, retail",
  ],
  location: "Brooklyn, New York, United States",
  contacts: [
    {
      text: "jack@jackchu.com",
    },
    {
      text: "www.linkedin.com/in/jack-chu",
      note: "(LinkedIn)",
    },
    {
      text: "jackchu.com",
      note: "(Blog)",
    },
  ],
  summary:
    "Most of my career has been in startups, going 0-1 and doing more with less. I build engineering organizations, and usually product and design alongside them. Eighteen years as an engineer and architect, the last twelve on the leadership team reporting to the CEO. I still code: most recently an AI gifting product at Fête, and running the engineering org on Claude and ChatGPT. Mostly e-commerce, more recently health and wellness, and mostly businesses with physical stores or clinics as well as a website.",
  about: [
    "Most of my career has been in startups, going 0-1 and doing more with less. I build engineering organizations, and usually product and design alongside them. Eighteen years as an engineer and architect, the last twelve on the leadership team reporting to the CEO. I still code: most recently an AI gifting product at Fête, and running the engineering org on Claude and ChatGPT.",
    "Mostly e-commerce, more recently health and wellness, and mostly businesses with physical stores or clinics as well as a website. I have built and scaled engineering, product, design and IT functions, owned technology budgets up to $9M, and sat on the executive leadership team at four companies.",
    "What I am good at: going from nothing to a working product with a small team, then building the org that keeps shipping it. Hiring. Architecture decisions that survive contact with a roadmap change. Getting technology costs under control without stalling delivery. Staying close enough to the code to know whether an estimate is real.",
  ],
  earlierLede:
    "Ruby and Rails, Java/Spring, Groovy on Grails, and ColdFusion, across e-commerce, publishing and social platforms. Detail available on request.",
  education: [
    {
      school: "City University of New York-Baruch College",
      division: "Zicklin School of Business",
      degree: "BBA, Computer Information Systems",
      years: "2004 - 2007",
    },
    {
      school: "New York University",
      division: "Polytechnic School of Engineering",
      degree: "Computer Science",
      years: "1997 - 1999",
    },
  ],
}
