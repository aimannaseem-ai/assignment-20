import { NextResponse } from "next/server"
import axios from "axios"
import * as cheerio from "cheerio"
import connectToMongoDB from "@/lib/mongodb";
import Blog from "@/models/Blog";


export async function POST(req: Request) {
  try {
    const { url } = await req.json()
    const apiKey = process.env.SCRAPINGBEE_API_KEY

    if (!url || !apiKey) {
      return NextResponse.json({ success: false, text: "Missing URL or API key." }, { status: 400 })
    }

    const response = await axios.get("https://app.scrapingbee.com/api/v1", {
      params: {
        api_key: apiKey,
        url,
        render_js: true,
      },
    })

    const html = response.data
    const $ = cheerio.load(html)

    let content = ""
    const selectors = [
      '[data-hs-cms-element="body"]',
      "article",
      ".blog-content",
      ".post-content",
      "#main-content",
      "#article-body",
      "main",
    ]

    for (const selector of selectors) {
      const section = $(selector).first()
      const paragraphs = section.find("p").map((_, el) => $(el).text()).get()
      if (paragraphs.length > 3) {
        content = paragraphs.join(" ").replace(/\s+/g, " ").trim()
        break
      }
    }

    if (!content) {
      return NextResponse.json({ success: false, text: "Could not extract article content." }, { status: 500 })
    }

    // ✅ Simulated Summary Logic
    const sentences = content.match(/[^.!?]+[.!?]+/g) || []
    const meaningful = sentences.filter(s => s.split(" ").length > 8).slice(0, 4)
    const summary = meaningful.join(" ").trim()

    return NextResponse.json({ success: true, text: summary })
  } catch (error: any) {
    console.error("Scraping error:", error.message)
    return NextResponse.json({ success: false, text: "Scraping failed." }, { status: 500 })
  }
}
