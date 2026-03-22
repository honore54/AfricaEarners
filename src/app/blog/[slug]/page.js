import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import { getAllPosts, getPostBySlug } from '../../../lib/posts'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.image }],
      type: 'article',
    },
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const allPosts = getAllPosts()
  const related = allPosts.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 3)

  const htmlContent = post.content
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
    .split('\n\n')
    .map(p => p.startsWith('<h') || p.startsWith('<ul') ? p : `<p>${p}</p>`)
    .join('\n')

  return (
    <>
      <Navbar />
      <div className="article-hero">
        <div className="container">
          <nav style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '32px' }}>
            <Link href="/" style={{ color: 'var(--muted)' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <Link href="/blog" style={{ color: 'var(--muted)' }}>Articles</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <span style={{ color: 'var(--accent)' }}>{post.category?.replace(/-/g, ' ')}</span>
          </nav>

          <div className="article-meta">
            <span className="category">{post.category?.replace(/-/g, ' ').toUpperCase()}</span>
            <span>📅 {post.date}</span>
            <span>⏱️ {post.readTime}</span>
            <span>✍️ {post.author}</span>
          </div>

          <h1 className="article-title">{post.title}</h1>
          <p className="article-desc">{post.description}</p>
          <img src={post.image} alt={post.title} className="article-hero-image" />

          <div className="ad-slot">Advertisement</div>

          <div className="article-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />

          <div className="ad-slot">Advertisement</div>

          {post.tags?.length > 0 && (
            <div style={{ marginTop: '40px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {post.tags.map(tag => (
                <span key={tag} style={{ padding: '4px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', fontSize: '12px', color: 'var(--muted)' }}>#{tag}</span>
              ))}
            </div>
          )}

          <div style={{ marginTop: '48px', padding: '32px', background: 'linear-gradient(135deg, rgba(0,229,160,0.08) 0%, rgba(59,130,246,0.08) 100%)', border: '1px solid rgba(0,229,160,0.2)', borderRadius: '16px', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', marginBottom: '12px' }}>Ready to Start Earning? 🚀</h3>
            <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>Browse more articles and find your perfect way to earn dollars from Africa.</p>
            <Link href="/blog" className="btn-primary">Explore All Articles →</Link>
          </div>

          {related.length > 0 && (
            <div style={{ marginTop: '64px' }}>
              <h2 style={{ fontSize: '22px', fontFamily: 'var(--font-display)', marginBottom: '24px' }}>Related Articles</h2>
              <div className="articles-grid">
                {related.map(r => (
                  <Link href={`/blog/${r.slug}`} key={r.slug} className="article-card">
                    <img src={r.image} alt={r.title} className="card-image" />
                    <div className="card-body">
                      <span className="card-category">{r.category?.replace(/-/g, ' ')}</span>
                      <h3 className="card-title">{r.title}</h3>
                      <div className="card-footer">
                        <span>{r.date}</span>
                        <span className="card-read">{r.readTime} →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div className="ad-slot" style={{ marginTop: '48px' }}>Advertisement</div>
        </div>
      </div>
      <footer className="footer">
        <div className="container footer-inner">
          <p className="footer-copy">© 2026 AfriEarners. All rights reserved.</p>
          <div className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/blog">Articles</Link>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </>
  )
}