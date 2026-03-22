import Navbar from '../../components/Navbar'
import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service — AfriEarners',
  description: 'AfriEarners Terms of Service. Rules governing use of our website and content.',
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '120px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: '780px', paddingBottom: '80px' }}>

          <div className="section-label">Legal</div>
          <h1 className="section-title" style={{ marginBottom: '8px' }}>Terms of Service</h1>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '48px' }}>
            Last updated: March 22, 2026
          </p>

          <div className="article-content">
            <p>
              By accessing and using AfriEarners, you accept and agree to be bound by the terms
              and provisions of this agreement.
            </p>

            <h2>Use of Content</h2>
            <p>
              All content published on AfriEarners — including articles, guides, and images — is
              the intellectual property of AfriEarners unless otherwise stated. You may not reproduce,
              distribute, or republish our content without written permission. Sharing links to our
              articles is always welcome and encouraged.
            </p>

            <h2>User Conduct</h2>
            <p>When using our website, you agree not to:</p>
            <ul>
              <li>Use the site for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the website</li>
              <li>Transmit any harmful, offensive, or disruptive content</li>
              <li>Misrepresent your identity or affiliation</li>
            </ul>

            <h2>Disclaimer of Warranties</h2>
            <p>
              This website is provided on an "as is" and "as available" basis without any warranties
              of any kind, either express or implied. AfriEarners does not warrant that the website
              will be uninterrupted, error-free, or free of viruses.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              AfriEarners shall not be liable for any indirect, incidental, special, consequential,
              or punitive damages resulting from your use of, or inability to use, this website or
              its content.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective
              immediately upon posting to the website. Your continued use of the site after any
              changes constitutes your acceptance of the new terms.
            </p>

            <h2>Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with applicable laws.
              Any disputes shall be subject to the exclusive jurisdiction of competent courts.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms? Contact us via our{' '}
              <Link href="/contact">Contact page</Link>.
            </p>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="container footer-inner">
          <p className="footer-copy">© 2026 AfriEarners — Helping Africa earn dollars online 🌍</p>
          <div className="footer-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/disclaimer">Disclaimer</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
