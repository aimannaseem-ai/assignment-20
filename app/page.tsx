'use client'

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
//import { supabase } from "@/lib/supabase"
import { supabase } from "../lib/supabase"; // relative path from current file



export default function Home() {
  const [url, setUrl] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [summary, setSummary] = useState("")
  const [urduSummary, setUrduSummary] = useState("")
  const [loading, setLoading] = useState(false)

  const tips = [
    "Small habits lead to big results.",
    "Stay consistent, not perfect.",
    "Read something every day.",
    "Your future is created by what you do today.",
    "One step at a time is progress.",
    "Start now. Get perfect later.",
  ]

  const [randomTip, setRandomTip] = useState("")


  const [recentSummaries, setRecentSummaries] = useState<any[]>([]);

useEffect(() => {
  const fetchSummaries = async () => {
    const { data, error } = await supabase
      .from("summaries")
      .select("id, url, summary_en,summary_ur")
      .order("created_at", { ascending: false })
      .limit(5); //fetch only 5 recent summaries

    if (error) {
      console.error("Error fetching summaries:", error.message);
    } else {
      setRecentSummaries(data || []);
    }
  };

  fetchSummaries();
}, []);


  useEffect(() => {
    const tip = tips[Math.floor(Math.random() * tips.length)]
    setRandomTip(tip)
  }, [])

  const handleSubmit = async () => {

    
  setSubmitted(false)
  setSummary("")
  setUrduSummary("")
  setLoading(true)

  try {
    const res = await fetch("/api/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })

    const contentType = res.headers.get("content-type")

    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text()
      console.error("Received non-JSON:", text.slice(0, 200))
      setSummary("⚠️ Server error: Received HTML instead of JSON")
      setUrduSummary("")
      setSubmitted(true)
      setLoading(false)
      return
    }

    const data = await res.json()

    if (data.success && typeof data.text === "string") {
      // ✅ Clean and store summary
      const cleanText = data.text.replace(/\s+/g, " ").trim()
      setSummary(cleanText)



     
      
     const phraseDict: Record<string, string> = {
          "digital marketing": "ڈیجیٹل مارکیٹنگ",
          "marketing strategy": "مارکیٹنگ کی حکمت عملی",
          "from the ground up": "شروع سے",
          "online marketing": "آن لائن مارکیٹنگ",
          "millennial marketer": "ملینیئل مارکیٹر",
          "keep reading": "پڑھتے رہیں",
          "learn more": "مزید جانیں",
          "hand in hand": "اکٹھے",
          "connect with": "رابطہ کریں",
          "data backed": "اعداد و شمار سے ثابت",
          "we practically grew up together": "ہم تقریباً ساتھ ساتھ بڑے ہوئے"

        }

        const wordDict: Record<string, string> = {
          "an": "ایک",
          "actionable": "عملی",
          "guide": "رہنما",
          "on": "پر",
          "building": "تعمیر",
          "your": "آپ کی",
          "digital": "ڈیجیٹل",
          "marketing": "مارکیٹنگ",
          "strategy": "حکمت عملی",
          "from": "سے",
          "the": "",
          "ground": "زمین",
          "up": "اوپر",
          "as": "بطور",
          "a": "ایک",
          "marketer": "مارکیٹر",
          "i": "میں",
          "can": "سکتا ہوں",
          "tell": "بتا سکتا ہوں",
          "you": "آپ",
          "about": "کے بارے میں",
          "internet": "انٹرنیٹ",
          "nowadays": "آج کل",
          "and": "اور",
          "go": "جاتے ہیں",
          "hand": "ہاتھ",
          "in": "میں",
          "so": "لہٰذا",
          "need": "ضرورت",
          "to": "کرنے کے لیے",
          "know": "جاننا",
          "what": "کیا",
          "is": "ہے",
          "how": "کیسے",
          "use": "استعمال",
          "it": "اسے",
          "if": "اگر",
          "want": "چاہتے ہیں",
          "meet": "ملنے",
          "where": "جہاں",
          "they": "وہ",
          "are": "ہیں",
          "at": "پر",
          "presence": "موجودگی",
          "mind": "ذہن",
          "here": "یہاں",
          "discuss": "بحث کریں",
          "all": "تمام",
          "things": "چیزیں",
          "backed": "مدد یافتہ",
          "by": "سے",
          "data": "اعداد و شمار",
          "report": "رپورٹ",
          "table": "فہرست",
          "contents": "مواد",
          "media": "میڈیا",
          "text": "متن",
          "updated": "تازہ کاری شدہ",
          "quite": "کافی",
          "bit": "تھوڑا بہت",
          "they're": "وہ ہیں",
          "online": "آن لائن",
          "5": "۵",
          "billion": "ارب",
          "globally": "دنیا بھر میں",
          "underscoring": "واضح کرتے ہوئے",
          "together": "اکٹھے",
          "grew": "بڑے ہوئے",
          "practically": "عملی طور پر"
        }

      // 1. Lowercase & clean punctuation
      let text = cleanText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim()

      // 2. Translate phrases
      for (const phrase in phraseDict) {
        const regex = new RegExp(`\\b${phrase}\\b`, "gi")
        text = text.replace(regex, phraseDict[phrase])
      }

      // 3. Translate individual words
      const urduTranslated = text
        .split(" ")
        .map((word: string) => wordDict[word] || word)
        .join(" ")

      setUrduSummary(urduTranslated)
//check

      const { error } = await supabase.from("summaries").insert([
  {
    url,
    summary_en: cleanText,
    summary_ur: urduTranslated,
  },
])

if (error) {
  console.error("Error inserting summary:", error.message)
}


      // ✅ Save to Supabase
      await supabase.from("summaries").insert([
        {
          url,
          summary_en: cleanText,
          summary_ur: urduTranslated,
        },
      ])
    } else {
      setSummary("❌ Failed to fetch summary.")
      setUrduSummary("")
    }

    setSubmitted(true)
    setLoading(false)
  } catch (error: any) {
    console.error("Client scraping error:", error.message)
    setSummary("⚠️ An error occurred while scraping.")
    setUrduSummary("")
    setSubmitted(true)
    setLoading(false)
  }
}


  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-purple-700 via-pink-500 to-indigo-600 text-white flex items-center justify-center px-4 py-12 relative">
      <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-purple-400 opacity-30 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-fuchsia-400 opacity-30 rounded-full blur-3xl z-0" />

      <div className="z-10 w-full max-w-2xl text-center space-y-6">
        <h1 className="mt-10 text-5xl font-extrabold">🧠 Blog Summariser</h1>
        <p className="text-purple-200 text-lg">
          <span className="animate-pulse">Paste. Summarise. Translate.</span>
        </p>

        {/* 🔗 Form */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col sm:flex-row items-center gap-10">
            <div className="relative w-full">
              <Input
                placeholder="https://example.com/blog-post"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-5 text-black bg-white/90 border border-gray-300 focus:border-purple-600 focus:ring-purple-500 rounded-xl px-4 py-2 shadow-sm"
              />
            </div>
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-pink-700 to-purple-600 text-white font-semibold px-6 py-2 rounded-xl hover:scale-105 hover:shadow transition duration-200 flex items-center justify-center gap-2"
            >
              Go <ArrowRightIcon className="w-4 h-4" />
            </Button>
          </div>

          {/* Spinner Below Input */}
          {loading && (
            <div className="flex items-center justify-center mt-4 animate-pulse text-white">
              <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin mr-3" />
              <span className="text-sm font-medium">Generating summary... Please wait.</span>
            </div>
          )}
        </div>

        {/* 📝 Summary Output */}
        {submitted && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 mt-6 rounded-xl space-y-4">
            <div>
              <h2 className="text-xl font-bold mb-1">📝 English Summary</h2>
              <p className="text-white/80 whitespace-pre-line">{summary}</p>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">🇵🇰 Urdu Translation</h2>
              <p className="text-white/80 whitespace-pre-line">{urduSummary}</p>
            </div>
          </div>
        )}

        {/* 💡 Tip of the Day */}
        <div className="mt-8 text-sm italic text-purple-100 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg">
          💡 Tip of the Day: {randomTip}
        </div>

       {/* 📚 Recent Summaries */}
<div className="mt-8 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl">
  <h2 className="text-xl font-bold mb-4 text-white">📚 Recent Summaries</h2>
  {recentSummaries.length > 0 ? (
    <ul className="list-disc list-inside space-y-2 text-white/80 text-left text-sm">
      {recentSummaries.map((summary) => (
        <li key={summary.id}>
          <a
            href={summary.url}
            className="hover:underline text-white/90"
            target="_blank"
            rel="noopener noreferrer"
          >
            {summary.summary_en.slice(0, 80)}...
          </a>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-white/60">No summaries found.</p>
  )}
</div>


        <footer className="mt-6 text-white/60 text-sm">Built by Aiman • Assignment 2</footer>
      </div>
    </main>
  )
}
