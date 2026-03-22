import Link from 'next/link'
import Navbar from '../../components/Navbar'
import { getAllPosts } from '../../lib/posts'

export const metadata = {
  title: 'All Articles — Earn Money Online from Africa',
  description: 'Browse all articles on making money online from Africa. Freelancing, blogging, apps, payments and more.',
}

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

export default async function BlogPage({ searchParams }) {
  const params = await searchParams
  const category = params?.category || ''
  const all = getAllPosts()
  const posts = category ? all.filter(p => p.category === category) : all

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '100px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div style={{ padding: '40px 0 32px' }}>
            <div className="section-label">📚 Knowledge Base</div>
            <h1 className="section-title">
              {category ? CATEGORIES.find(c => c.slug === category)?.label || category : 'All Articles'}
            </h1>
            <p className="section-desc">{posts.length} articles — updated 3 times daily, every day.</p>
          </div>

          <div className="categories">
            <Link href="/blog" className={`cat-pill ${!category ? 'active' : ''}`}>All ({all.length})</Link>
            {CATEGORIES.map(c => {
              const count = all.filter(p => p.category === c.slug).length
              return (
                <Link key={c.slug} href={`/blog?category=${c.slug}`} className={`cat-pill ${category === c.slug ? 'active' : ''}`}>
                  {c.label} {count > 0 && `(${count})`}
                </Link>
              )
            })}
          </div>

          <div className="ad-slot">Advertisement</div>

          {posts.length === 0 ? (
            <div className="no-posts">
              <h3>No articles yet in this category</h3>
              <p>Check back soon — new articles are published 3 times daily!</p>
              <div style={{ marginTop: '24px' }}><Link href="/blog" className="btn-secondary">Browse All Articles</Link></div>
            </div>
          ) : (
            <div className="articles-grid" style={{ marginBottom: '60px' }}>
              {posts.map((post, i) => (
                <Link href={`/blog/${post.slug}`} key={post.slug} className="article-card stagger-item">
                  <img src={post.image} alt={post.title} className="card-image" loading={i < 4 ? 'eager' : 'lazy'} />
                  <div className="card-body">
                    <span className="card-category">{post.category?.replace(/-/g, ' ')}</span>
                    <h2 className="card-title">{post.title}</h2>
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
          <div className="ad-slot" style={{ marginBottom: '60px' }}>Advertisement</div>
        </div>
      </div>
      <footer className="footer">
        <div className="container footer-inner">
          <p className="footer-copy">© 2026 AfriEarners. All rights reserved.</p>
          <div className="footer-links">
            <Link href="/">Home</Link><Link href="/about">About</Link>
            <Link href="/privacy-policy">Privacy</Link><Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
