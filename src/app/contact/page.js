import Navbar from '../../components/Navbar'
import Link from 'next/link'

export const metadata = {
  title: 'Contact AfriEarners — Get In Touch',
  description: 'Contact the AfriEarners team. We welcome questions, suggestions, article requests, and partnership inquiries.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '120px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: '680px', paddingBottom: '80px' }}>

          <div className="section-label">Get In Touch</div>
          <h1 className="section-title" style={{ marginBottom: '12px' }}>Contact Us</h1>
          <p style={{ color: 'var(--muted)', fontSize: '16px', marginBottom: '48px' }}>
            We read every message. Whether you have a question, want to suggest a topic,
            or just want to say hello — reach out.
          </p>

          {/* Contact Form */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '36px',
          }}>
            <form
              action="https://formsubmit.co/afriearners@gmail.com"
              method="POST"
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              {/* FormSubmit honeypot anti-spam */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="New message from AfriEarners contact form" />
              <input type="hidden" name="_next" value="https://afriearners.vercel.app/contact?sent=true" />

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '8px', fontWeight: 500 }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Jean Pierre"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border2)',
                    borderRadius: '8px',
                    color: 'var(--text)',
                    fontSize: '15px',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '8px', fontWeight: 500 }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border2)',
                    borderRadius: '8px',
                    color: 'var(--text)',
                    fontSize: '15px',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '8px', fontWeight: 500 }}>
                  Subject
                </label>
                <select
                  name="subject"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border2)',
                    borderRadius: '8px',
                    color: 'var(--text)',
                    fontSize: '15px',
                    outline: 'none',
                  }}
                >
                  <option value="general">General Question</option>
                  <option value="article">Article Request</option>
                  <option value="correction">Content Correction</option>
                  <option value="partnership">Partnership / Advertising</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '8px', fontWeight: 500 }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Write your message here..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border2)',
                    borderRadius: '8px',
                    color: 'var(--text)',
                    fontSize: '15px',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ alignSelf: 'flex-start', border: 'none', cursor: 'pointer' }}
              >
                Send Message →
              </button>
            </form>
          </div>

          {/* Alternative contact */}
          <div style={{ marginTop: '40px', padding: '24px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', marginBottom: '12px' }}>Other Ways to Reach Us</h3>
            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.8 }}>
              📧 Email: <strong style={{ color: 'var(--text)' }}>afriearners@gmail.com</strong><br />
              🌍 Location: Kigali, Rwanda<br />
              ⏱️ Response time: Within 24–48 hours
            </p>
          </div>

        </div>
      </div>
      <footer className="footer">
        <div className="container footer-inner">
          <p className="footer-copy">© 2026 AfriEarners — Helping Africa earn dollars online 🌍</p>
          <div className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/privacy-policy">Privacy</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
