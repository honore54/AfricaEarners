#!/usr/bin/env node
/**
 * AfriEarners — Automated Article Generation Engine
 * Uses Google Gemini API (FREE) + Unsplash (FREE)
 * Run: node scripts/generate-articles.js
 * Cron: GitHub Actions runs this 3x daily automatically
 */

const fs = require('fs')
const path = require('path')
const https = require('https')

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY
const POSTS_DIR = path.join(process.cwd(), 'posts')

// ============================================================
// TOPIC BANK — 60 proven high-traffic topics for your niche
// The script picks 6 random ones each run to stay fresh
// ============================================================
const TOPIC_BANK = [
  { title: "How to Earn Money from Twitter Impressions in Africa", keyword: "twitter impressions africa", category: "social-media" },
  { title: "How to Receive Payoneer Payments in Rwanda Step by Step", keyword: "payoneer rwanda", category: "payments" },
  { title: "Best Freelance Websites That Pay in Dollars for Africans", keyword: "freelance websites africa", category: "freelancing" },
  { title: "How to Make Money as a Software Developer in Africa", keyword: "software developer africa earn", category: "tech" },
  { title: "How to Get Your First Client on Upwork from Africa", keyword: "upwork africa first client", category: "freelancing" },
  { title: "Fiverr vs Upwork: Which is Better for African Freelancers", keyword: "fiverr vs upwork africa", category: "freelancing" },
  { title: "How to Start a Blog and Make Money in Rwanda", keyword: "start blog rwanda", category: "blogging" },
  { title: "Google AdSense Approval Tips for African Websites", keyword: "google adsense approval africa", category: "blogging" },
  { title: "How to Earn Dollars Online from Rwanda in 2026", keyword: "earn dollars online rwanda 2026", category: "make-money" },
  { title: "Best Ways to Make Money Online in East Africa", keyword: "make money online east africa", category: "make-money" },
  { title: "How to Use Wise to Receive Money in Rwanda", keyword: "wise money transfer rwanda", category: "payments" },
  { title: "Top Remote Jobs for African Developers in 2026", keyword: "remote jobs african developers 2026", category: "tech" },
  { title: "How to Deploy a Next.js App for Free on Vercel", keyword: "nextjs vercel free deploy", category: "tech" },
  { title: "How to Get Paid on GitHub as an African Developer", keyword: "github sponsors africa", category: "tech" },
  { title: "Best Online Courses That Pay You to Learn in 2026", keyword: "online courses pay to learn 2026", category: "make-money" },
  { title: "How to Build a Mobile App and Earn with Google AdMob", keyword: "google admob earn africa", category: "tech" },
  { title: "How Africans Are Making $1000 Per Month Blogging", keyword: "blogging 1000 dollars africa", category: "blogging" },
  { title: "How to Create a YouTube Channel and Earn in Rwanda", keyword: "youtube channel earn rwanda", category: "social-media" },
  { title: "Best VPNs for Rwanda in 2026 — Reviewed", keyword: "best vpn rwanda 2026", category: "tech" },
  { title: "How to Withdraw Payoneer Money to Bank in Rwanda", keyword: "payoneer withdraw rwanda bank", category: "payments" },
  { title: "Top 10 Skills That Pay the Most Online in Africa", keyword: "highest paying skills online africa", category: "make-money" },
  { title: "How to Start Dropshipping from Rwanda in 2026", keyword: "dropshipping rwanda 2026", category: "ecommerce" },
  { title: "Best Laptops for Developers in Rwanda Under $500", keyword: "best laptops developers rwanda", category: "tech" },
  { title: "How to Earn from TikTok Creativity Program in Africa", keyword: "tiktok creativity program africa", category: "social-media" },
  { title: "How to Find Remote Work as a Junior Developer in Africa", keyword: "remote work junior developer africa", category: "tech" },
  { title: "How to Sell Digital Products Online from Africa", keyword: "sell digital products africa", category: "ecommerce" },
  { title: "Best Internet Providers in Kigali Rwanda 2026", keyword: "best internet kigali rwanda", category: "tech" },
  { title: "How to Open a PayPal Account in Rwanda in 2026", keyword: "paypal account rwanda 2026", category: "payments" },
  { title: "How to Make Money with Google AdSense in Africa", keyword: "google adsense africa earn", category: "blogging" },
  { title: "Top Programming Languages to Learn for High Salary in Africa", keyword: "programming languages high salary africa", category: "tech" },
  { title: "How to Earn Passive Income as a Developer in 2026", keyword: "passive income developer 2026", category: "make-money" },
  { title: "How Rwandan Developers Are Getting Hired by US Companies", keyword: "rwandan developers us companies remote", category: "tech" },
  { title: "How to Build and Sell WordPress Themes from Africa", keyword: "sell wordpress themes africa", category: "ecommerce" },
  { title: "Best Crypto Exchanges Available in Rwanda 2026", keyword: "crypto exchange rwanda 2026", category: "crypto" },
  { title: "How to Start a Newsletter and Make Money in Africa", keyword: "newsletter make money africa", category: "make-money" },
  { title: "How to Create and Sell Online Courses from Rwanda", keyword: "sell online courses rwanda", category: "ecommerce" },
  { title: "How to Get a Job at a Top Tech Company from Africa", keyword: "tech company job africa remote", category: "tech" },
  { title: "Top 5 Coding Bootcamps for Africans in 2026", keyword: "coding bootcamps africa 2026", category: "tech" },
  { title: "How to Start Affiliate Marketing in Africa Step by Step", keyword: "affiliate marketing africa", category: "make-money" },
  { title: "How to Earn from Facebook Reels in Africa 2026", keyword: "facebook reels earn africa 2026", category: "social-media" },
]

// ============================================================
// UTILITIES
// ============================================================
function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function getRandomTopics(count = 6) {
  const shuffled = [...TOPIC_BANK].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'AfriEarners-Bot/1.0' } }, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try { resolve(JSON.parse(data)) }
        catch { resolve(data) }
      })
    }).on('error', reject)
  })
}

function httpsPost(url, body) {
  return new Promise((resolve, reject) => {
    const bodyStr = JSON.stringify(body)
    const urlObj = new URL(url)
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyStr)
      }
    }
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try { resolve(JSON.parse(data)) }
        catch { resolve(data) }
      })
    })
    req.on('error', reject)
    req.write(bodyStr)
    req.end()
  })
}

// ============================================================
// STEP 1 — Generate article with FREE Gemini API
// ============================================================
async function generateArticle(topic) {
  console.log(`  📝 Writing: ${topic.title}`)

  const prompt = `You are a senior SEO content strategist and expert blogger writing for AfriEarners.com — a trusted website helping Africans earn money online.

Your article must pass Google's Helpful Content System, E-E-A-T standards (Experience, Expertise, Authoritativeness, Trustworthiness), and be approved for Google AdSense.

TOPIC: ${topic.title}
FOCUS KEYWORD: ${topic.keyword}
AUDIENCE: Young professionals, developers, students in Rwanda and East Africa
TONE: Friendly, honest, practical — like a knowledgeable mentor
LENGTH: 1100-1500 words of GENUINE, ORIGINAL, HELPFUL content

STRICT SEO REQUIREMENTS:
- Focus keyword "${topic.keyword}" must appear in: first paragraph, at least one H2, naturally 4-6 times total
- Every H2 must be a complete, descriptive phrase (not just "Introduction")
- Include specific, realistic numbers and examples
- Do NOT make exaggerated income claims — be honest about timelines
- Write for real people solving real problems, not just for search engines
- Include at least one specific example relevant to Rwanda or East Africa
- Content must be 100% original, not copied from anywhere

ADSENSE COMPLIANCE (CRITICAL):
- No adult content, gambling references, or violence
- No misleading "get rich quick" promises
- Include honest disclaimers where appropriate (e.g. "results vary")
- Content must be advertiser-friendly and suitable for all ages
- No copyright violations — all content must be original

REQUIRED STRUCTURE:
1. Opening paragraph (hook + focus keyword + what reader will learn)
2. ## [Descriptive H2 about the main topic]
3. ## Step-by-Step: How to Get Started
4. ## Realistic Earnings: What to Expect
5. ## Common Mistakes Africans Make (and How to Avoid Them)
6. ## Practical Tips for Rwanda and East Africa
7. ## Conclusion: Your Next Step

IMPORTANT: Return ONLY a valid JSON object — no markdown backticks, no extra text before or after:
{
  "title": "SEO-optimized article title with focus keyword",
  "metaDescription": "150-160 characters including focus keyword, compelling and accurate",
  "content": "full article in clean markdown — use ## for H2, **bold** for emphasis, - for lists",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "readTime": "X min read",
  "excerpt": "2-3 sentence summary of the article for social sharing"
}`

  const response = await httpsPost(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    { contents: [{ parts: [{ text: prompt }] }] }
  )

  const raw = response.candidates?.[0]?.content?.parts?.[0]?.text || ''
  const cleaned = raw.replace(/```json|```/g, '').trim()

  try {
    return JSON.parse(cleaned)
  } catch {
    // If JSON parse fails, build a basic structure from raw text
    return {
      title: topic.title,
      metaDescription: `Learn how to ${topic.keyword} with this complete guide for Africans.`,
      content: cleaned,
      tags: [topic.category, 'africa', 'make-money-online'],
      readTime: '6 min read'
    }
  }
}

// ============================================================
// STEP 2 — Fetch matching image from FREE Unsplash API
// ============================================================
async function fetchImage(topic) {
  if (!UNSPLASH_ACCESS_KEY || UNSPLASH_ACCESS_KEY === 'your_unsplash_key_here') {
    // Fallback to a relevant default image if no Unsplash key
    const defaults = {
      'tech': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200',
      'freelancing': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
      'make-money': 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=1200',
      'blogging': 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200',
      'payments': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200',
      'social-media': 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200',
      'ecommerce': 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200',
      'crypto': 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1200',
    }
    return defaults[topic.category] || defaults['make-money']
  }

  try {
    const searchQuery = encodeURIComponent(topic.keyword.split(' ').slice(0, 3).join(' '))
    const data = await httpsGet(
      `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=1&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`
    )
    return data.results?.[0]?.urls?.regular || 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=1200'
  } catch {
    return 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=1200'
  }
}

// ============================================================
// STEP 3 — Save article as MDX file
// ============================================================
function saveArticle(topic, article, imageUrl) {
  const slug = slugify(article.title || topic.title)
  const date = new Date().toISOString().split('T')[0]
  const filename = `${date}-${slug}.mdx`
  const filepath = path.join(POSTS_DIR, filename)

  // Skip if article already exists
  if (fs.existsSync(filepath)) {
    console.log(`  ⏭️  Already exists: ${filename}`)
    return null
  }

  const tags = Array.isArray(article.tags) ? article.tags.join('", "') : 'africa, make-money-online'

  const mdxContent = `---
title: "${(article.title || topic.title).replace(/"/g, "'")}"
date: "${date}"
slug: "${slug}"
description: "${(article.metaDescription || '').replace(/"/g, "'")}"
category: "${topic.category}"
tags: ["${tags}"]
image: "${imageUrl}"
readTime: "${article.readTime || '6 min read'}"
keyword: "${topic.keyword}"
author: "AfriEarners Team"
---

${article.content || ''}
`

  if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true })
  fs.writeFileSync(filepath, mdxContent, 'utf8')
  console.log(`  ✅ Saved: ${filename}`)
  return filename
}

// ============================================================
// MAIN — Run the full pipeline
// ============================================================
async function main() {
  console.log('\n🚀 AfriEarners Article Generation Engine')
  console.log('==========================================')

  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    console.error('❌ GEMINI_API_KEY not set. Add it to your .env file.')
    console.error('   Get yours FREE at: aistudio.google.com')
    process.exit(1)
  }

  const topics = getRandomTopics(6)
  console.log(`\n📋 Generating ${topics.length} articles...\n`)

  const results = []

  for (const topic of topics) {
    try {
      const article = await generateArticle(topic)
      const imageUrl = await fetchImage(topic)
      const filename = saveArticle(topic, article, imageUrl)
      if (filename) results.push(filename)
      // Small delay to be respectful to the API
      await new Promise(r => setTimeout(r, 1500))
    } catch (err) {
      console.error(`  ❌ Failed: ${topic.title} — ${err.message}`)
    }
  }

  console.log(`\n==========================================`)
  console.log(`✅ Done! Generated ${results.length} new articles`)
  console.log(`📁 Saved to: ./posts/`)
  console.log(`🌐 Push to GitHub to auto-deploy on Vercel`)
  console.log('==========================================\n')
}

main().catch(console.error)
