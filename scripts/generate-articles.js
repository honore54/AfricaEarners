#!/usr/bin/env node
/**
 * AfriEarners — Article Generation Engine v3
 * Uses Groq API (FREE + FAST) — llama-3.3-70b-versatile
 * + Unsplash for images (FREE)
 */

const fs = require('fs')
const path = require('path')
const https = require('https')

const GROQ_API_KEY = process.env.GROQ_API_KEY
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY
const POSTS_DIR = path.join(process.cwd(), 'posts')

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
  { title: "How to Make Money as a Mobile App Developer in 2026", keyword: "make money mobile app developer 2026", category: "tech" },
  { title: "How to Receive International Payments as a Freelancer", keyword: "receive international payments freelancer", category: "payments" },
  { title: "Payoneer vs Wise: Which is Better for Freelancers 2026", keyword: "payoneer vs wise freelancers 2026", category: "payments" },
  { title: "How to Monetize Your Twitter X Account in 2026", keyword: "monetize twitter x account 2026", category: "social-media" },
  { title: "How to Make Money on Instagram in 2026 Full Guide", keyword: "make money instagram 2026", category: "social-media" },
  { title: "How to Make Money with a Newsletter in 2026", keyword: "make money newsletter 2026", category: "social-media" },
  { title: "How to Make Money with Print on Demand in 2026", keyword: "print on demand money 2026", category: "ecommerce" },
  { title: "Best Niches for Blogging That Make Real Money in 2026", keyword: "best niches blogging money 2026", category: "blogging" },
  { title: "How to Become a Successful Freelance Writer in 2026", keyword: "freelance writer success 2026", category: "freelancing" },
  { title: "How to Receive Payoneer Payments in Rwanda Step by Step", keyword: "payoneer rwanda guide", category: "payments" },
  { title: "Best Freelance Websites That Pay in Dollars for Africans", keyword: "freelance websites pay dollars africans", category: "freelancing" },
  { title: "How to Make Money as a Software Developer in Africa", keyword: "software developer make money africa", category: "tech" },
  { title: "How to Get Remote Jobs from Africa in 2026", keyword: "remote jobs from africa 2026", category: "freelancing" },
  { title: "How to Earn Dollars Online from Rwanda in 2026", keyword: "earn dollars online rwanda 2026", category: "make-money" },
  { title: "Top Online Jobs for Students in Africa in 2026", keyword: "online jobs students africa 2026", category: "make-money" },
  { title: "How to Start a Profitable Blog from Africa in 2026", keyword: "profitable blog africa 2026", category: "blogging" },
  { title: "Fiverr vs Upwork Which Platform is Better in 2026", keyword: "fiverr vs upwork 2026", category: "freelancing" },
  { title: "How to Make 500 Dollars Per Month Online as a Beginner", keyword: "make 500 per month online beginner", category: "make-money" },
  { title: "How to Find High Paying Clients as a Freelancer", keyword: "find high paying clients freelancer", category: "freelancing" },
  { title: "How to Write SEO Articles That Rank on Google in 2026", keyword: "write seo articles rank google 2026", category: "blogging" },
  { title: "Best Free Tools Every Freelancer Needs in 2026", keyword: "free tools freelancer 2026", category: "freelancing" },
  { title: "How to Make Money Translating Documents Online", keyword: "make money translating online", category: "make-money" },
  { title: "How to Build a SaaS Product and Make Money in 2026", keyword: "build saas product money 2026", category: "tech" },
  { title: "How to Get Paid Brand Deals as a Small Creator", keyword: "brand deals small creator", category: "social-media" },
  { title: "How to Make Money with Stock Photography in 2026", keyword: "make money stock photography 2026", category: "make-money" },
  { title: "How to Grow a YouTube Channel Fast in 2026", keyword: "grow youtube channel fast 2026", category: "social-media" },
  { title: "How Rwandan Developers Are Getting Hired by US Companies", keyword: "rwandan developers hired us companies", category: "tech" },
  { title: "Best VPNs for Rwanda and Africa in 2026", keyword: "best vpn rwanda africa 2026", category: "tech" },
  { title: "How to Use Wise to Send and Receive Money Internationally", keyword: "wise international money transfer guide", category: "payments" },
]

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function getRandomTopics(count = 6) {
  const shuffled = [...TOPIC_BANK].sort(() => Math.random() - 0.5)
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
    https.get(url, { headers: { 'User-Agent': 'AfriEarners-Bot/1.0' } }, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => { try { resolve(JSON.parse(data)) } catch { resolve({}) } })
    }).on('error', reject)
  })
}

async function generateArticle(topic) {
  console.log(`  📝 Writing: ${topic.title}`)

  const prompt = `You are a world-class SEO content writer. Write a complete, detailed, helpful article for AfriEarners.com.

TOPIC: ${topic.title}
FOCUS KEYWORD: "${topic.keyword}"
AUDIENCE: Global audience — anyone worldwide wanting to earn money online
LENGTH: Write at least 1200 words of real, complete content

CRITICAL: Write EVERY section in FULL. No placeholders. No "coming soon". Real, helpful content only.

Write the article in this exact structure:

Start with an engaging opening paragraph that includes the focus keyword and tells readers what they will learn.

## What Is ${topic.title.split(':')[0]} and Why It Matters
Write 2-3 full paragraphs explaining this topic clearly.

## What You Need to Get Started
Write a full paragraph introduction then list requirements as bullet points with explanations.

## Step-by-Step Guide
Write at least 6 numbered steps. Each step needs 2-3 sentences of real explanation.

## How Much Can You Realistically Earn
Write honest earnings with context. Include beginner, intermediate, and advanced ranges.

## 5 Tips to Succeed Faster
Write 5 specific tips as numbered list with 2 sentences each.

## Common Mistakes to Avoid
Write 4 common mistakes as bullet points with explanation of why and how to avoid.

## Best Tools and Resources
List 5 specific tools with one sentence explaining each.

## Your Next Step
Write a motivating conclusion paragraph with one specific action to take today.

Write the full article now in markdown format. Use ## for headings, **bold** for emphasis, numbered lists and bullet points where appropriate.`

  const response = await httpsPost(
    'api.groq.com',
    '/openai/v1/chat/completions',
    {
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are an expert content writer who writes complete, detailed, helpful articles. Never write placeholder text. Always write full, complete content.'
        },
        { role: 'user', content: prompt }
      ],
      max_tokens: 4000,
      temperature: 0.7
    },
    { 'Authorization': `Bearer ${GROQ_API_KEY}` }
  )

  const content = response.choices?.[0]?.message?.content || ''

  if (!content || content.length < 100) {
    console.log(`  ⚠️  Short response: ${content.length} chars`)
    console.log('  Error:', JSON.stringify(response.error || response).substring(0, 200))
    return null
  }

  // Generate meta description from first 160 chars of content
  const firstPara = content.replace(/^##.*/gm, '').replace(/\*\*/g, '').trim().substring(0, 158)
  
  return {
    title: topic.title,
    metaDescription: firstPara.substring(0, 158),
    content: content,
    tags: [topic.category, 'make-money-online', 'earn-online', '2026'],
    readTime: Math.ceil(content.split(' ').length / 200) + ' min read',
    excerpt: firstPara.substring(0, 200)
  }
}

async function fetchImage(topic) {
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
  if (!UNSPLASH_ACCESS_KEY || UNSPLASH_ACCESS_KEY === 'your_unsplash_key_here') {
    return defaults[topic.category] || defaults['make-money']
  }
  try {
    const q = encodeURIComponent(topic.keyword.split(' ').slice(0, 3).join(' '))
    const data = await httpsGet(`https://api.unsplash.com/search/photos?query=${q}&per_page=1&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`)
    return data.results?.[0]?.urls?.regular || defaults[topic.category] || defaults['make-money']
  } catch {
    return defaults[topic.category] || defaults['make-money']
  }
}

function saveArticle(topic, article, imageUrl) {
  const slug = slugify(article.title || topic.title)
  const date = new Date().toISOString().split('T')[0]
  const filename = `${date}-${slug}.mdx`
  const filepath = path.join(POSTS_DIR, filename)
  if (fs.existsSync(filepath)) { console.log(`  ⏭️  Already exists: ${filename}`); return null }
  const tags = Array.isArray(article.tags) ? article.tags.join('", "') : topic.category
  const mdxContent = `---
title: "${(article.title || topic.title).replace(/"/g, "'")}"
date: "${date}"
slug: "${slug}"
description: "${(article.metaDescription || '').replace(/"/g, "'").substring(0, 158)}"
category: "${topic.category}"
tags: ["${tags}"]
image: "${imageUrl}"
readTime: "${article.readTime || '8 min read'}"
keyword: "${topic.keyword}"
author: "AfriEarners Team"
excerpt: "${(article.excerpt || '').replace(/"/g, "'").substring(0, 200)}"
---

${article.content}
`
  if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true })
  fs.writeFileSync(filepath, mdxContent, 'utf8')
  console.log(`  ✅ Saved: ${filename} (${article.content.length} chars)`)
  return filename
}

async function main() {
  console.log('\n🚀 AfriEarners Article Engine v3 — Powered by Groq')
  console.log('====================================================')
  if (!GROQ_API_KEY) {
    console.error('❌ GROQ_API_KEY not set.')
    console.error('   Get yours FREE at: console.groq.com')
    process.exit(1)
  }
  const topics = getRandomTopics(6)
  console.log(`\n📋 Generating ${topics.length} complete articles...\n`)
  const results = []
  for (const topic of topics) {
    try {
      const article = await generateArticle(topic)
      if (!article) { console.log(`  ⏭️  Skipping ${topic.title}`); continue }
      const imageUrl = await fetchImage(topic)
      const filename = saveArticle(topic, article, imageUrl)
      if (filename) results.push(filename)
      await new Promise(r => setTimeout(r, 1000))
    } catch (err) {
      console.error(`  ❌ Failed: ${topic.title} — ${err.message}`)
    }
  }
  console.log(`\n====================================================`)
  console.log(`✅ Done! Generated ${results.length} new articles`)
  console.log(`📁 Push to GitHub to auto-deploy on Vercel`)
  console.log('====================================================\n')
}

main().catch(console.error)