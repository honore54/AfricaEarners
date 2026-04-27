#!/usr/bin/env node
const fs   = require('fs')
const path = require('path')
const https = require('https')

const GROQ_API_KEY       = process.env.GROQ_API_KEY
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY
const POSTS_DIR          = path.join(process.cwd(), 'posts')

const TOPIC_BANK = [
  { title: "How to Make Money Online in 2026: 15 Proven Methods", keyword: "make money online 2026", category: "make-money" },
  { title: "How to Start Freelancing with No Experience in 2026", keyword: "start freelancing no experience", category: "freelancing" },
  { title: "Best Ways to Make Passive Income Online in 2026", keyword: "passive income online 2026", category: "make-money" },
  { title: "How to Make Money on Fiverr: Complete Beginner Guide", keyword: "make money fiverr beginner", category: "freelancing" },
  { title: "How to Earn Money from YouTube Without Showing Your Face", keyword: "earn youtube without showing face", category: "social-media" },
  { title: "Best Websites to Find Remote Work from Home in 2026", keyword: "remote work from home websites 2026", category: "freelancing" },
  { title: "How to Start a Blog and Make Money in 2026", keyword: "start blog make money 2026", category: "blogging" },
  { title: "How to Make Money with Google AdSense: Complete Guide", keyword: "make money google adsense guide", category: "blogging" },
  { title: "How to Sell Digital Products Online and Earn Passive Income", keyword: "sell digital products online", category: "ecommerce" },
  { title: "How to Make Money with Affiliate Marketing for Beginners", keyword: "affiliate marketing beginners 2026", category: "make-money" },
  { title: "Best Freelance Skills That Pay the Most in 2026", keyword: "highest paying freelance skills 2026", category: "freelancing" },
  { title: "How to Get Clients on Upwork: Step by Step Guide", keyword: "get clients upwork guide", category: "freelancing" },
  { title: "How to Make Money as a Web Developer in 2026", keyword: "make money web developer 2026", category: "tech" },
  { title: "How to Build and Monetize a Website from Scratch", keyword: "build monetize website scratch", category: "blogging" },
  { title: "How to Make Money on TikTok: Complete Guide 2026", keyword: "make money tiktok 2026", category: "social-media" },
  { title: "How to Start Dropshipping for Beginners in 2026", keyword: "dropshipping beginners 2026", category: "ecommerce" },
  { title: "How to Make Money with AI Tools in 2026", keyword: "make money ai tools 2026", category: "tech" },
  { title: "Best Side Hustles That Actually Make Real Money in 2026", keyword: "best side hustles 2026", category: "make-money" },
  { title: "How to Make Money Selling Courses Online in 2026", keyword: "sell courses online 2026", category: "ecommerce" },
  { title: "How to Get a Remote Developer Job in 2026", keyword: "remote developer job 2026", category: "tech" },
  { title: "Best Programming Languages to Learn for High Salary 2026", keyword: "best programming languages salary 2026", category: "tech" },
  { title: "How to Receive International Payments as a Freelancer", keyword: "receive international payments freelancer", category: "payments" },
  { title: "Payoneer vs Wise: Which is Better for Freelancers 2026", keyword: "payoneer vs wise freelancers 2026", category: "payments" },
  { title: "How to Monetize Your Twitter X Account in 2026", keyword: "monetize twitter x account 2026", category: "social-media" },
  { title: "How to Make Money on Instagram in 2026 Full Guide", keyword: "make money instagram 2026", category: "social-media" },
  { title: "How to Make Money with a Newsletter in 2026", keyword: "make money newsletter 2026", category: "social-media" },
  { title: "How to Make Money with Print on Demand in 2026", keyword: "print on demand money 2026", category: "ecommerce" },
  { title: "Best Niches for Blogging That Make Real Money in 2026", keyword: "best niches blogging money 2026", category: "blogging" },
  { title: "How to Become a Successful Freelance Writer in 2026", keyword: "freelance writer success 2026", category: "freelancing" },
  { title: "How to Receive Payoneer Payments in Rwanda Step by Step", keyword: "payoneer rwanda guide", category: "payments" },
  { title: "Best Freelance Websites That Pay in Dollars for Africans", keyword: "freelance websites dollars africa", category: "freelancing" },
  { title: "How to Make Money as a Software Developer in Africa", keyword: "software developer income africa", category: "tech" },
  { title: "How to Get Remote Jobs from Africa in 2026", keyword: "remote jobs africa 2026", category: "freelancing" },
  { title: "How to Earn Dollars Online from Rwanda in 2026", keyword: "earn dollars online rwanda", category: "make-money" },
  { title: "Top Online Jobs for Students in Africa in 2026", keyword: "online jobs students africa", category: "make-money" },
  { title: "How to Start a Profitable Blog from Africa in 2026", keyword: "profitable blog africa", category: "blogging" },
  { title: "Fiverr vs Upwork Which Platform is Better in 2026", keyword: "fiverr vs upwork comparison", category: "freelancing" },
  { title: "How to Make 500 Dollars Per Month Online as a Beginner", keyword: "500 dollars per month online", category: "make-money" },
  { title: "How to Write SEO Articles That Rank on Google in 2026", keyword: "write seo articles google", category: "blogging" },
  { title: "How to Build a SaaS Product and Make Money in 2026", keyword: "build saas product income", category: "tech" },
  { title: "How to Make Money with Canva in 2026", keyword: "make money canva 2026", category: "tech" },
  { title: "How to Find High-Paying Clients as a Freelancer in Africa", keyword: "high paying freelance clients africa", category: "freelancing" },
  { title: "Best AI Tools for Freelancers to Make More Money in 2026", keyword: "ai tools freelancers 2026", category: "tech" },
  { title: "How to Start a Faceless YouTube Channel and Earn in 2026", keyword: "faceless youtube channel earn 2026", category: "social-media" },
  { title: "How to Make Money with Stock Photography in 2026", keyword: "make money stock photography 2026", category: "make-money" },
  { title: "How to Become a Virtual Assistant and Earn Online", keyword: "virtual assistant earn online", category: "freelancing" },
  { title: "How to Make Money Translating Documents Online", keyword: "make money translating online", category: "freelancing" },
  { title: "How to Use ChatGPT to Make Money Online in 2026", keyword: "chatgpt make money online 2026", category: "tech" },
  { title: "How to Make Money with Notion Templates in 2026", keyword: "make money notion templates 2026", category: "make-money" },
  { title: "Best Ways to Make Money as a Student in Africa 2026", keyword: "make money student africa 2026", category: "make-money" },
  { title: "How to Get Paid to Write Articles Online in 2026", keyword: "get paid write articles online", category: "blogging" },
  { title: "How to Make Money with Podcast in 2026", keyword: "make money podcast 2026", category: "social-media" },
  { title: "How to Build a Personal Brand and Make Money Online", keyword: "personal brand make money online", category: "make-money" },
  { title: "How to Make Money Flipping Domain Names in 2026", keyword: "make money flipping domains 2026", category: "make-money" },
  { title: "How to Earn Money as a Graphic Designer in Africa", keyword: "earn money graphic designer africa", category: "freelancing" },
  { title: "How to Make Money with Pinterest in 2026", keyword: "make money pinterest 2026", category: "social-media" },
  { title: "How to Start a Shopify Store from Africa in 2026", keyword: "shopify store africa 2026", category: "ecommerce" },
  { title: "How to Make Money with Data Entry Jobs Online", keyword: "data entry jobs online money", category: "freelancing" },
  { title: "How to Make Money as a Social Media Manager in 2026", keyword: "social media manager income 2026", category: "social-media" },
  { title: "How to Invest and Grow Money Online from Africa", keyword: "invest grow money online africa", category: "make-money" },
  { title: "How to Grow a YouTube Channel Fast in 2026", keyword: "grow youtube channel fast", category: "social-media" },
  { title: "How to Use Wise to Send and Receive Money Internationally", keyword: "wise international money transfer", category: "payments" },
]

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function getRandomTopics(count = 6) {
  const existing = fs.existsSync(POSTS_DIR)
    ? fs.readdirSync(POSTS_DIR).map(f => f.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx?$/, ''))
    : []
  const available = TOPIC_BANK.filter(t => !existing.includes(slugify(t.title)))
  const shuffled  = available.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

function httpsPost(hostname, path, body, headers) {
  return new Promise((resolve, reject) => {
    const bodyStr = JSON.stringify(body)
    const req = https.request({
      hostname, path, method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(bodyStr), ...headers }
    }, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => { try { resolve(JSON.parse(data)) } catch { resolve({ raw: data }) } })
    })
    req.on('error', reject)
    req.write(bodyStr)
    req.end()
  })
}

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'AfriEarners/1.0' } }, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => { try { resolve(JSON.parse(data)) } catch { resolve({}) } })
    }).on('error', reject)
  })
}

async function generateArticle(topic) {
  console.log(`  📝 Writing: ${topic.title}`)

  const prompt = `You are an expert content writer for AfriEarners.com — a practical guide for Africans earning money online.

Write a complete, helpful, human-quality article about: "${topic.title}"
Target keyword: "${topic.keyword}"
Audience: Africans and Rwandans who want to earn money online

CRITICAL WRITING RULES:
- Use the target keyword naturally — only 2-3 times maximum in the entire article
- NEVER repeat the keyword excessively or unnaturally
- Write like a knowledgeable human journalist, not a robot
- Use varied sentence lengths — mix short punchy sentences with longer explanatory ones
- Include specific, real examples, platforms, and dollar amounts
- Be honest about challenges, not just opportunities
- Total length: 1200-1500 words

ARTICLE STRUCTURE:
Write an engaging opening paragraph (no heading) that hooks the reader and includes the keyword once naturally.

## Why This Matters for Africans
2-3 paragraphs explaining the African context — what makes this topic specifically relevant to people in Rwanda, Kenya, Nigeria etc. Include real payment methods that work in Africa.

## What You Need to Get Started
A practical intro paragraph followed by a clear bullet list of requirements with brief explanations.

## Step-by-Step Guide
At least 6 numbered steps, each with 2-3 sentences of real, actionable explanation.

## Realistic Earnings to Expect
Honest earnings breakdown:
- Beginner (0-6 months): realistic range
- Intermediate (6-18 months): realistic range  
- Advanced (18+ months): realistic range
Include context about why earnings vary.

## 5 Tips That Actually Work
5 specific, actionable tips as numbered list. Each tip needs 2 sentences of real explanation.

## Mistakes Most Beginners Make
4 common mistakes as bullet points with brief explanation of how to avoid each.

## Tools You Will Actually Need
5 specific tools with one sentence each explaining why it matters.

## Start Today
A motivating but honest conclusion paragraph with one specific first action to take.

Write the full article now in clean markdown. No placeholders. Real content only.`

  const response = await httpsPost(
    'api.groq.com',
    '/openai/v1/chat/completions',
    {
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: 'You are an expert human content writer. Write naturally with varied sentence structure. Never stuff keywords. Write complete, helpful content.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 4000,
      temperature: 0.75
    },
    { 'Authorization': `Bearer ${GROQ_API_KEY}` }
  )

  const content = response.choices?.[0]?.message?.content || ''
  if (!content || content.length < 500) {
    console.log(`  ⚠️  Short: ${content.length} chars`)
    return null
  }

  const firstPara = content.replace(/^##.*/gm, '').replace(/\*\*/g, '').trim().substring(0, 158)

  return {
    title:           topic.title,
    metaDescription: firstPara,
    content,
    tags:            [topic.category, 'earn-online', 'africa'],
    readTime:        Math.ceil(content.split(' ').length / 200) + ' min read',
    excerpt:         firstPara.substring(0, 200)
  }
}

async function fetchImage(topic) {
  const defaults = {
    'tech':         'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=85',
    'freelancing':  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=85',
    'make-money':   'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=1200&q=85',
    'blogging':     'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=85',
    'payments':     'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=85',
    'social-media': 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=85',
    'ecommerce':    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=85',
    'crypto':       'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1200&q=85',
  }
  if (!UNSPLASH_ACCESS_KEY) return defaults[topic.category] || defaults['make-money']
  try {
    const q    = encodeURIComponent(topic.keyword.split(' ').slice(0, 3).join(' '))
    const data = await httpsGet(`https://api.unsplash.com/search/photos?query=${q}&per_page=5&orientation=landscape&content_filter=high&client_id=${UNSPLASH_ACCESS_KEY}`)
    const photos = (data.results || []).filter(p => p.width >= 1000)
    if (photos.length > 0) {
      const photo = photos[Math.floor(Math.random() * Math.min(3, photos.length))]
      return photo.urls.regular + '&w=1200&q=85'
    }
    return defaults[topic.category] || defaults['make-money']
  } catch {
    return defaults[topic.category] || defaults['make-money']
  }
}

function saveArticle(topic, article, imageUrl) {
  const slug     = slugify(article.title || topic.title)
  const date     = new Date().toISOString().split('T')[0]
  const filename = `${date}-${slug}.mdx`
  const filepath = path.join(POSTS_DIR, filename)

  if (fs.existsSync(filepath)) { console.log(`  ⏭️  Exists: ${filename}`); return null }

  const tags = Array.isArray(article.tags) ? article.tags.join('", "') : topic.category
  const mdx  = `---
title: "${(article.title || topic.title).replace(/"/g, "'")}"
date: "${date}"
slug: "${slug}"
description: "${(article.metaDescription || '').replace(/"/g, "'").substring(0, 158)}"
category: "${topic.category}"
tags: ["${tags}"]
image: "${imageUrl}"
readTime: "${article.readTime || '7 min read'}"
keyword: "${topic.keyword}"
author: "AfriEarners Team"
excerpt: "${(article.excerpt || '').replace(/"/g, "'").substring(0, 200)}"
---

${article.content}
`
  if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true })
  fs.writeFileSync(filepath, mdx, 'utf8')
  console.log(`  ✅ Saved: ${filename} (${article.content.length} chars)`)
  return filename
}

async function main() {
  console.log('\n🚀 AfriEarners Article Engine')
  if (!GROQ_API_KEY) { console.error('❌ GROQ_API_KEY not set'); process.exit(1) }

  const topics = getRandomTopics(6)
  console.log(`📋 Generating ${topics.length} articles...\n`)

  const results = []
  for (const topic of topics) {
    try {
      const article  = await generateArticle(topic)
      if (!article) continue
      const imageUrl = await fetchImage(topic)
      const filename = saveArticle(topic, article, imageUrl)
      if (filename) results.push(filename)
      await new Promise(r => setTimeout(r, 1500))
    } catch (err) {
      console.error(`  ❌ Failed: ${topic.title} — ${err.message}`)
    }
  }

  console.log(`\n✅ Done! ${results.length} new articles generated`)
  console.log('📁 Push to GitHub to deploy\n')
}

main().catch(console.error)
