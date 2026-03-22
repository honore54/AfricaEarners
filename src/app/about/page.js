import Navbar from '../../components/Navbar'
import Link from 'next/link'

export const metadata = {
  title: 'About AfriEarners — Our Mission to Help Africa Earn Online',
  description: 'AfriEarners is dedicated to helping Africans, especially Rwandans and East Africans, discover real and proven ways to earn money online in dollars.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '120px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: '780px', paddingBottom: '80px' }}>

          <div className="section-label">Who We Are</div>
          <h1 className="section-title" style={{ marginBottom: '24px' }}>About AfriEarners</h1>

          <div className="article-content">
            <p>
              <strong>AfriEarners</strong> is an independent online publication dedicated to one mission:
              helping Africans — especially developers, students, and young professionals in Rwanda
              and East Africa — discover real, proven, and practical ways to earn money online in dollars.
            </p>

            <h2>Our Story</h2>
            <p>
              AfriEarners was founded by a software developer based in Kigali, Rwanda, who experienced
              firsthand how difficult it is to find trustworthy information about earning online from Africa.
              Most "make money online" content is written for Americans or Europeans — it ignores the
              realities of African payment systems, internet access, and local context.
            </p>
            <p>
              We built AfriEarners to fix that. Every article on this site is written with African
              readers in mind — covering payment methods that actually work in Rwanda, platforms that
              accept African freelancers, and strategies that have been tested by people like you.
            </p>

            <h2>What We Cover</h2>
            <p>Our content covers the following topics in depth:</p>
            <ul>
              <li><strong>Freelancing</strong> — Upwork, Fiverr, Toptal, and getting your first dollar client</li>
              <li><strong>Blogging & AdSense</strong> — Building websites that earn passive income</li>
              <li><strong>Tech & Development</strong> — Remote jobs, selling apps, open source income</li>
              <li><strong>Social Media Monetization</strong> — Twitter/X, YouTube, TikTok, Facebook</li>
              <li><strong>Payments & Banking</strong> — Payoneer, Wise, how to receive and withdraw dollars in Rwanda</li>
              <li><strong>E-Commerce</strong> — Dropshipping, digital products, selling online from Africa</li>
            </ul>

            <h2>Our Editorial Standards</h2>
            <p>
              We are committed to publishing accurate, helpful, and original content. Every article
              on AfriEarners is:
            </p>
            <ul>
              <li>Written to genuinely help our readers, not just rank on Google</li>
              <li>Based on real methods that work for people in Africa</li>
              <li>Updated regularly to reflect current platforms and opportunities</li>
              <li>Free from misleading claims or get-rich-quick promises</li>
            </ul>
            <p>
              We believe in transparency. Some articles may contain affiliate links, which means
              we may earn a small commission if you sign up for a service through our link — at no
              extra cost to you. We only recommend services we believe are genuinely useful.
            </p>

            <h2>Contact Us</h2>
            <p>
              Have a question, suggestion, or want to contribute an article? We would love to hear from you.
              Visit our <Link href="/contact">Contact page</Link> to get in touch.
            </p>

            <p>
              Thank you for being part of the AfriEarners community. Together, we are building
              a generation of Africans who earn in dollars, work from anywhere, and create
              financial freedom for themselves and their families. 🌍
            </p>
          </div>

        </div>
      </div>
      <footer className="footer">
        <div className="container footer-inner">
          <p className="footer-copy">© 2026 AfriEarners — Helping Africa earn dollars online 🌍</p>
          <div className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/blog">Articles</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
