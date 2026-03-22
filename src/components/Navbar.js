'use client'
import Link from 'next/link'

const CATEGORIES = [
  { slug: 'make-money', label: 'Make Money' },
  { slug: 'freelancing', label: 'Freelancing' },
  { slug: 'tech', label: 'Tech & Dev' },
  { slug: 'blogging', label: 'Blogging' },
  { slug: 'payments', label: 'Payments' },
  { slug: 'social-media', label: 'Social Media' },
  { slug: 'ecommerce', label: 'E-Commerce' },
  { slug: 'crypto', label: 'Crypto' },
]

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="logo">
          Afri<span>Earners</span>
        </Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/blog">Articles</Link></li>
          {CATEGORIES.slice(0, 3).map(c => (
            <li key={c.slug}><Link href={`/blog?category=${c.slug}`}>{c.label}</Link></li>
          ))}
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        <Link href="/blog" className="nav-cta">Start Earning →</Link>
      </div>
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', paddingBottom: '32px', borderBottom: '1px solid var(--border)' }}>
          <div>
            <div className="logo" style={{ marginBottom: '10px' }}>Afri<span style={{color:'var(--accent)'}}>Earners</span></div>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7 }}>
              Real ways Africans earn dollars online. Based in Kigali, Rwanda. 🌍
            </p>
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Content</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {CATEGORIES.map(c => (
                <Link key={c.slug} href={`/blog?category=${c.slug}`} style={{ fontSize: '13px', color: 'var(--muted)', transition: 'color 0.2s' }}>{c.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Site</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[['/', 'Home'], ['/blog', 'All Articles'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([href, label]) => (
                <Link key={href} href={href} style={{ fontSize: '13px', color: 'var(--muted)', transition: 'color 0.2s' }}>{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Legal</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[['/privacy-policy', 'Privacy Policy'], ['/disclaimer', 'Disclaimer'], ['/terms', 'Terms of Service']].map(([href, label]) => (
                <Link key={href} href={href} style={{ fontSize: '13px', color: 'var(--muted)', transition: 'color 0.2s' }}>{label}</Link>
              ))}
            </div>
          </div>
        </div>
        <div style={{ paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '13px', color: 'var(--muted)' }}>© 2026 AfriEarners. All rights reserved.</p>
          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>
            This site uses Google AdSense. See our <Link href="/privacy-policy" style={{ color: 'var(--accent)' }}>Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </footer>
  )
}
