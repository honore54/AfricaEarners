import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug } from '../../../lib/posts'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    keywords: [post.keyword, 'africa', 'earn money online', post.category],
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  }
}

export default function ArticlePage({ params }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const allPosts = getAllPosts()
  const related = allPosts
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3)

  return (
    <>
      <Navbar />

      {/* JSON-LD structured data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.description,
            image: post.image,
            datePublished: post.date,
            author: { '@type': 'Organization', name: 'AfriEarners' },
            publisher: {
              '@type': 'Organization',
              name: 'AfriEarners',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://afriearners.vercel.app',
            },
          })
        }}
      />

      <div className="article-hero">
        <div className="container">

          {/* Breadcrumb */}
          <nav style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '32px' }}>
            <Link href="/" style={{ color: 'var(--muted)' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <Link href="/blog" style={{ color: 'var(--muted)' }}>Articles</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <Link href={`/blog?category=${post.category}`} style={{ color: 'var(--accent)' }}>
              {post.category?.replace(/-/g, ' ')}
            </Link>
          </nav>

          {/* Meta */}
          <div className="article-meta">
            <span className="category">{post.category?.replace(/-/g, ' ').toUpperCase()}</span>
            <span>📅 {post.date}</span>
            <span>⏱️ {post.readTime}</span>
            <span>✍️ {post.author}</span>
          </div>

          {/* Title */}
          <h1 className="article-title">{post.title}</h1>
          <p className="article-desc">{post.description}</p>

          {/* Cover image */}
          <img
            src={post.image}
            alt={post.title}
            className="article-hero-image"
          />

          {/* Top AdSense slot */}
          <div className="ad-slot">
            {/* Google AdSense — replace with your ad code */}
            Advertisement
          </div>

          {/* Article body */}
          <div className="article-content">
            <MDXRemote source={post.content} />
          </div>

          {/* Mid AdSense slot */}
          <div className="ad-slot">Advertisement</div>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div style={{ marginTop: '40px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {post.tags.map(tag => (
                <span key={tag} style={{
                  padding: '4px 12px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '20px',
                  fontSize: '12px',
                  color: 'var(--muted)',
                }}>#{tag}</span>
              ))}
            </div>
          )}

          {/* CTA Box */}
          <div style={{
            marginTop: '48px',
            padding: '32px',
            background: 'linear-gradient(135deg, rgba(0,229,160,0.08) 0%, rgba(59,130,246,0.08) 100%)',
            border: '1px solid rgba(0,229,160,0.2)',
            borderRadius: '16px',
            textAlign: 'center'
          }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', marginBottom: '12px' }}>
              Ready to Start Earning? 🚀
            </h3>
            <p style={{ color: 'var(--muted)', marginBottom: '20px', fontSize: '15px' }}>
              Browse more articles and find your perfect way to earn dollars from Africa.
            </p>
            <Link href="/blog" className="btn-primary">
              Explore All Articles →
            </Link>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div style={{ marginTop: '64px' }}>
              <h2 style={{ fontSize: '22px', fontFamily: 'var(--font-display)', marginBottom: '24px' }}>
                Related Articles
              </h2>
              <div className="articles-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
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

          {/* Bottom ad */}
          <div className="ad-slot" style={{ marginTop: '48px' }}>Advertisement</div>
        </div>
      </div>

      <footer className="footer">
        <div className="container footer-inner">
          <p className="footer-copy">© 2026 AfriEarners — Helping Africa earn dollars online 🌍</p>
          <div className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/blog">Articles</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
