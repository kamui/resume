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
    "CTO / VP Engineering / Head of Engineering",
    "Build 0-1 products, modernize platforms, grow teams from 3 to 30+",
    "Health, e-commerce, retail",
  ],
  location: "Brooklyn, NY",
  contacts: [
    {
      text: "jack@jackchu.com",
    },
    {
      text: "917-720-7123",
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
    "Startup engineering leader. I build engineering organizations, usually product and design alongside them, and ship the product while doing it. CTO or VP at four companies over the last eight years, reporting to the CEO. At Away I grew the tech org from 3 consultants to 30+ on a $9M+ budget; at Modern Age I built it from zero to 21 and launched in six months. I still code: most recently an AI gifting product at Fête, built AI-first with Claude and GPT-5. Mostly e-commerce and omnichannel retail, more recently health and wellness (HIPAA, EHR, Rx).",
  about: [
    "Engineering leader for startups, usually building the team and the product at the same time. CTO or VP at four companies over the last eight years, reporting to the CEO: grew Away's tech org from 3 consultants to 30+ on a $9M+ budget, and built Modern Age's product, engineering, design and IT from zero to 21 and launched it in six months. Most of my career has been going 0-1 and doing more with less. I still code: most recently an AI gifting product at Fête, and running the engineering org on Claude and ChatGPT.",
    "Mostly e-commerce, more recently health and wellness, and mostly businesses with physical stores or clinics as well as a website. I have built and scaled engineering, product, design and IT functions, owned technology budgets up to $9M, and sat on the executive leadership team at four companies.",
    "What I am good at: going from nothing to a working product with a small team, then building the org that keeps shipping it. Hiring. Architecture decisions that survive contact with a roadmap change. Getting technology costs under control without stalling delivery. Staying close enough to the code to know whether an estimate is real.",
  ],
  earlierLede:
    "Software engineer and tech lead across e-commerce, publishing and social platforms. Detail on LinkedIn.",
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
