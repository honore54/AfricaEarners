import Link from 'next/link'
import Navbar, { Footer } from '../components/Navbar'
import GSAPInit from '../components/GSAPInit'
import { getAllPosts, CATEGORIES } from '../lib/posts'

export default function Home() {
  const posts = getAllPosts()
  const featured = posts[0]
  const recent = posts.slice(1, 7)

  return (
    <>
      <GSAPInit />
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-tag fade-up">
            🌍 Built for African Earners
          </div>
          <h1 className="fade-up">
            Earn Real <span className="accent">Dollars</span><br />
            From <span className="accent2">Africa.</span>
          </h1>
          <p className="hero-desc fade-up">
            No fluff. No fake gurus. Just real, proven strategies that work for Rwandans
            and Africans to earn in dollars from anywhere — freelancing, blogging, apps, and more.
          </p>
          <div className="hero-actions fade-up">
            <Link href="/blog" className="btn-primary">
              Read Articles →
            </Link>
            <Link href="/blog?category=make-money" className="btn-secondary">
              Make Money Online
            </Link>
          </div>

          {/* Stats */}
          <div className="stats-bar">
            {[
              { num: '540+', label: 'Articles per month' },
              { num: '18', label: 'New articles daily' },
              { num: '100%', label: 'Free to read' },
              { num: '$0', label: 'Cost to start' },
            ].map((s, i) => (
              <div className="stat-item stagger-item" key={i}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADSENSE SLOT — top of content */}
      <div className="container">
        <div className="ad-slot">
          {/* Google AdSense — add your code here after approval */}
          Advertisement
        </div>
      </div>

      {/* FEATURED + RECENT ARTICLES */}
      <section className="section">
        <div className="container">
          <div className="section-label">Latest</div>
          <h2 className="section-title fade-up">Fresh Articles</h2>
          <p className="section-desc fade-up">New content every morning, afternoon and evening — always current, always practical.</p>

          {/* Category filter */}
          <div className="categories fade-up">
            <Link href="/blog" className="cat-pill">All</Link>
            {CATEGORIES.map(c => (
              <Link key={c.slug} href={`/blog?category=${c.slug}`} className="cat-pill">
                {c.label}
              </Link>
            ))}
          </div>

          {posts.length === 0 ? (
            <div className="no-posts">
              <h3>Articles are being generated...</h3>
              <p>Run <code>node scripts/generate-articles.js</code> to publish your first batch!</p>
            </div>
          ) : (
            <div className="articles-grid">
              {/* Featured */}
              {featured && (
                <Link href={`/blog/${featured.slug}`} className="article-card featured stagger-item">
                  <img src={featured.image} alt={featured.title} className="card-image" />
                  <div className="card-body">
                    <span className="card-category">{featured.category?.replace('-', ' ')}</span>
                    <h2 className="card-title">{featured.title}</h2>
                    <p className="card-desc">{featured.description}</p>
                    <div className="card-footer">
                      <span>{featured.date}</span>
                      <span className="card-read">{featured.readTime} →</span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Recent articles */}
              {recent.map((post, i) => (
                <Link href={`/blog/${post.slug}`} key={post.slug} className="article-card stagger-item">
                  <img src={post.image} alt={post.title} className="card-image" />
                  <div className="card-body">
                    <span className="card-category">{post.category?.replace('-', ' ')}</span>
                    <h3 className="card-title">{post.title}</h3>
                    <p className="card-desc">{post.description}</p>
                    <div className="card-footer">
                      <span>{post.date}</span>
                      <span className="card-read">{post.readTime} →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {posts.length > 7 && (
            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <Link href="/blog" className="btn-secondary">View All Articles →</Link>
            </div>
          )}
        </div>
      </section>

      {/* ADSENSE SLOT — mid page */}
      <div className="container">
        <div className="ad-slot">Advertisement</div>
      </div>

      {/* HOW IT HELPS */}
      <section className="section">
        <div className="container">
          <div className="section-label">Why AfriEarners</div>
          <h2 className="section-title fade-up">Built for <span style={{color:'var(--accent)'}}>you</span>, not Americans</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '40px' }}>
            {[
              { icon: '🌍', title: 'Africa-Focused', desc: 'Every article considers Rwandan and African realities — local payments, local challenges, real solutions.' },
              { icon: '💰', title: 'Dollar Earnings', desc: 'We focus on strategies that pay in USD, not local currency. Payoneer, Wise, and global platforms.' },
              { icon: '🤖', title: 'Updated Daily', desc: 'Our AI publishes 18 fresh articles every day. Always current, always relevant to what people search.' },
              { icon: '🛠️', title: 'Developer-Friendly', desc: 'Technical guides built by a developer, for developers. Real code, real tools, real results.' },
            ].map((f, i) => (
              <div key={i} className="stagger-item" style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '28px',
              }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', marginBottom: '10px' }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
