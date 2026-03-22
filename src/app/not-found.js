import Link from 'next/link'
import Navbar from '../components/Navbar'

export const metadata = {
  title: '404 — Page Not Found | AfriEarners',
}

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        padding: '20px',
      }}>
        <div>
          <div style={{ fontSize: '80px', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>404</div>
          <h1 style={{ fontSize: '28px', fontFamily: 'var(--font-display)', margin: '16px 0 12px' }}>Page Not Found</h1>
          <p style={{ color: 'var(--muted)', fontSize: '16px', marginBottom: '32px', maxWidth: '400px' }}>
            This page doesn't exist. But there are hundreds of articles about earning money online waiting for you.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn-primary">Go Home →</Link>
            <Link href="/blog" className="btn-secondary">Browse Articles</Link>
          </div>
        </div>
      </div>
    </>
  )
}
