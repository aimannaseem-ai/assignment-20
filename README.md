This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

#  Blog Summariser

A full-stack web application built with **Next.js**, **TypeScript**, **Supabase**, and **MongoDB** that allows users to:

-  Paste a blog URL
-  Scrape and summarise the blog content
-  Translate the summary into **Urdu**
-  Save summaries to **Supabase** (structured data) and **MongoDB** (full content)
-  View recent summaries

---

##  Features

-  URL input to scrape blog text (via ScrapingBee API)
-  English summary generation (static simulated logic)
-  Urdu translation using phrase and word dictionaries
-  Supabase used to store summaries (`summary_en`, `summary_ur`, `url`)
-  MongoDB used to store full blog text
-  Clean UI with **ShadCN** components and **Tailwind CSS**
-  Display of recent 5 unique summaries from Supabase

---

##  Technologies Used

- **Next.js 15 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **ShadCN UI**
- **Supabase**
- **MongoDB (Atlas)**
- **ScrapingBee API**

---

##  Setup Instructions

1. **Clone this repo:**

```bash
git clone https://github.com/aimannaseem/assignement-20.git
cd assignement-20






## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
