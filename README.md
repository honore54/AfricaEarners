# AfriEarners 🌍 — Automated Money Blog

> Real ways Africans earn dollars online. Fully automated content engine.

## What This Is

A Next.js blog that **automatically publishes 18 articles per day** using the free Google Gemini API. Designed to rank on Google and earn money through AdSense for the "make money online Africa" niche.

**Tech:** Next.js 14 · Vercel (free) · Google Gemini API (free) · Unsplash API (free) · GitHub Actions (free)

---

## 🚀 Setup in 30 Minutes

### Step 1 — Clone and install
```bash
git clone https://github.com/YOUR_USERNAME/afriearners.git
cd afriearners
npm install
```

### Step 2 — Get your free API keys

**Gemini API (AI content):**
1. Go to https://aistudio.google.com
2. Sign in with Google
3. Click "Get API Key" → "Create API Key"
4. Copy the key

**Unsplash API (images):**
1. Go to https://unsplash.com/developers
2. Create a free account
3. "New Application" → copy Access Key

### Step 3 — Set up environment variables
```bash
cp .env.example .env.local
# Edit .env.local and add your keys
```

### Step 4 — Generate your first articles
```bash
node scripts/generate-articles.js
```

This creates 6 articles in the `/posts` folder. Run it again for 6 more!

### Step 5 — Test locally
```bash
npm run dev
# Open http://localhost:3000
```

### Step 6 — Deploy to Vercel
```bash
# Push to GitHub
git add .
git commit -m "Initial deploy"
git push origin main

# Connect repo to Vercel at vercel.com
# Add environment variables in Vercel dashboard:
# GEMINI_API_KEY, UNSPLASH_ACCESS_KEY, NEXT_PUBLIC_SITE_URL
```

---

## 🤖 Setting Up Automation (GitHub Actions)

The automation runs FREE on GitHub Actions, 3x per day.

### Add secrets to GitHub:
1. Go to your GitHub repo → Settings → Secrets → Actions
2. Add: `GEMINI_API_KEY` (your Gemini key)
3. Add: `UNSPLASH_ACCESS_KEY` (your Unsplash key)

That's it! The `.github/workflows/generate-articles.yml` file handles everything:
- **6:00 AM** Kigali time → 6 morning articles
- **12:00 PM** Kigali time → 6 afternoon articles  
- **6:00 PM** Kigali time → 6 evening articles

Each batch auto-commits to GitHub → Vercel auto-deploys in 30 seconds.

---

## 💰 Adding Google AdSense

1. Apply at https://adsense.google.com
2. Add your site URL
3. Wait for approval (1–14 days)
4. Replace the `<div className="ad-slot">` placeholders in:
   - `src/app/page.js`
   - `src/app/blog/page.js`
   - `src/app/blog/[slug]/page.js`

With your actual AdSense code like:
```html
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
  data-ad-slot="XXXXXXXXXX"
  data-ad-format="auto"
  data-full-width-responsive="true">
</ins>
```

---

## 📁 Project Structure

```
afriearners/
├── posts/                    ← Articles (auto-generated here)
├── scripts/
│   └── generate-articles.js  ← The automation engine
├── src/
│   ├── app/
│   │   ├── page.js           ← Homepage
│   │   ├── blog/page.js      ← Blog listing
│   │   └── blog/[slug]/      ← Individual articles
│   ├── components/
│   │   ├── Navbar.js
│   │   └── GSAPInit.js       ← GSAP animations
│   └── lib/
│       └── posts.js          ← Post reading utilities
├── .github/workflows/
│   └── generate-articles.yml ← Cron automation
├── .env.example              ← Copy to .env.local
└── next-sitemap.config.js    ← Auto sitemap for SEO
```

---

## 📊 Expected Results

| Month | Articles | Traffic | Earnings |
|-------|----------|---------|----------|
| 1–2   | 500–1000 | 0–500/mo | $0 |
| 3–4   | 1500+    | 500–2K/mo | $5–$50 |
| 5–6   | 3000+    | 2K–10K/mo | $50–$300 |
| 7–12  | 6000+    | 10K–50K/mo | $300–$2000 |

---

## 💡 Tips for Faster Growth

1. **Share every article** in Facebook groups, WhatsApp groups, and Twitter
2. **Submit sitemap** to Google Search Console immediately after launch
3. **Post your personal story** — "How I built this blog from Rwanda" gets massive engagement
4. **Add more topics** to the `TOPIC_BANK` in `scripts/generate-articles.js`
5. **Review articles weekly** — occasionally edit the best ones to add personal insights

---

Built with ❤️ in Rwanda 🇷🇼 — Let's make Africa earn!
