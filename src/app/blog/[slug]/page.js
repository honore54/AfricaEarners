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

function markdownToHtml(markdown) {
  if (!markdown) return ''
  
  let html = markdown
  
  // Remove frontmatter if any leaked through
  html = html.replace(/^---[\s\S]*?---\n/m, '')
  
  // Headers
  html = html.replace(/^#### (.*$)/gm, '<h4>$1</h4>')
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>')
  
  // Bold and italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  
  // Code
  html = html.replace(/`(.*?)`/g, '<code>$1</code>')
  
  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr/>')
  
  // Process lists — collect consecutive list items
  const lines = html.split('\n')
  const result = []
  let inUl = false
  let inOl = false
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const ulMatch = line.match(/^[-*+] (.*)$/)
    const olMatch = line.match(/^\d+\. (.*)$/)
    
    if (ulMatch) {
      if (!inUl) { result.push('<ul>'); inUl = true }
      if (inOl) { result.push('</ol>'); inOl = false }
      result.push(`<li>${ulMatch[1]}</li>`)
    } else if (olMatch) {
      if (!inOl) { result.push('<ol>'); inOl = true }
      if (inUl) { result.push('</ul>'); inUl = false }
      result.push(`<li>${olMatch[1]}</li>`)
    } else {
      if (inUl) { result.push('</ul>'); inUl = false }
      if (inOl) { result.push('</ol>'); inOl = false }
      result.push(line)
    }
  }
  if (inUl) result.push('</ul>')
  if (inOl) result.push('</ol>')
  
  html = result.join('\n')
  
  // Wrap paragraphs — lines that are not already HTML tags
  const finalLines = html.split('\n')
  const final = []
  let buffer = []
  
  for (const line of finalLines) {
    const trimmed = line.trim()
    if (!trimmed) {
      if (buffer.length > 0) {
        const text = buffer.join(' ').trim()
        if (text && !text.startsWith('<')) {
          final.push(`<p>${text}</p>`)
        } else if (text) {
          final.push(text)
        }
        buffer = []
      }
    } else if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || 
               trimmed.startsWith('<ol') || trimmed.startsWith('<li') ||
               trimmed.startsWith('</') || trimmed.startsWith('<hr')) {
      if (buffer.length > 0) {
        const text = buffer.join(' ').trim()
        if (text && !text.startsWith('<')) {
          final.push(`<p>${text}</p>`)
        } else if (text) {
          final.push(text)
        }
        buffer = []
      }
      final.push(trimmed)
    } else {
      buffer.push(trimmed)
    }
  }
  
  if (buffer.length > 0) {
    const text = buffer.join(' ').trim()
    if (text && !text.startsWith('<')) {
      final.push(`<p>${text}</p>`)
    } else if (text) {
      final.push(text)
    }
  }
  
  return final.join('\n')
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const allPosts = getAllPosts()
  const related = allPosts
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3)

  const htmlContent = markdownToHtml(post.content)

  return (
    <>
      <Navbar />
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
            publisher: { '@type': 'Organization', name: 'AfriEarners' },
          })
        }}
      />

      <div className="article-hero">
        <div className="container">

          {/* Breadcrumb */}
          <nav style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '32px', paddingTop: '20px' }}>
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
          <img src={post.image} alt={post.title} className="article-hero-image" />

          {/* Top AdSense slot */}
          <div className="ad-slot">Advertisement</div>

          {/* Article body — full markdown rendered */}
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Bottom AdSense slot */}
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
              Browse more articles and find your perfect way to earn money online.
            </p>
            <Link href="/blog" className="btn-primary">Explore All Articles →</Link>
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