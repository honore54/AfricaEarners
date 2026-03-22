import Navbar from '../../components/Navbar'
import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — AfriEarners',
  description: 'AfriEarners Privacy Policy. How we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://afriearners.vercel.app'

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '120px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: '780px', paddingBottom: '80px' }}>

          <div className="section-label">Legal</div>
          <h1 className="section-title" style={{ marginBottom: '8px' }}>Privacy Policy</h1>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '48px' }}>
            Last updated: March 22, 2026
          </p>

          <div className="article-content">
            <p>
              At AfriEarners (<strong>{siteUrl}</strong>), we are committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website. Please read this policy carefully.
            </p>

            <h2>Information We Collect</h2>
            <p>We may collect information in the following ways:</p>
            <ul>
              <li>
                <strong>Log Data:</strong> When you visit our site, our servers automatically record
                information including your IP address, browser type, referring pages, and time spent on pages.
              </li>
              <li>
                <strong>Cookies:</strong> We use cookies to enhance your experience. You can instruct
                your browser to refuse all cookies or to indicate when a cookie is being sent.
              </li>
              <li>
                <strong>Contact Form:</strong> If you contact us, we collect your name, email address,
                and message content solely to respond to your inquiry.
              </li>
            </ul>

            <h2>Google AdSense and Advertising</h2>
            <p>
              We use Google AdSense to display advertisements on our website. Google, as a third-party
              vendor, uses cookies to serve ads based on a user's prior visits to our website or other
              websites. Google's use of advertising cookies enables it and its partners to serve ads
              to our users based on their visit to our site and/or other sites on the Internet.
            </p>
            <p>
              You may opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
                Google Ads Settings
              </a>. You can also opt out by visiting{' '}
              <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
                www.aboutads.info
              </a>.
            </p>

            <h2>Google Analytics</h2>
            <p>
              We use Google Analytics to understand how visitors interact with our website. Google Analytics
              collects information such as how often users visit the site, what pages they visit, and what
              other sites they used prior to visiting. We use this information solely to improve our website.
              Google Analytics collects only the IP address assigned to you on the date you visit this site.
              We do not combine the information collected through Google Analytics with personally
              identifiable information.
            </p>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Operate and improve our website and content</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Monitor and analyze usage and trends</li>
              <li>Display relevant advertisements through Google AdSense</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Third-Party Services</h2>
            <p>
              Our website may contain links to third-party websites, including Payoneer, Upwork, Fiverr,
              and others. We have no control over the content and privacy practices of those sites and
              are not responsible for their privacy policies.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our website is not directed to children under the age of 13. We do not knowingly collect
              personally identifiable information from children under 13. If you are a parent or guardian
              and believe your child has provided us with personal information, please contact us
              immediately so we can delete it.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement reasonable security measures to protect your information. However, no method
              of transmission over the Internet or electronic storage is 100% secure. While we strive
              to use commercially acceptable means to protect your information, we cannot guarantee
              its absolute security.
            </p>

            <h2>Your Rights</h2>
            <p>
              You have the right to access, update, or delete the information we hold about you.
              If you wish to exercise any of these rights, please contact us at the email address
              provided on our <Link href="/contact">Contact page</Link>.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page with an updated date. We encourage you
              to review this Privacy Policy periodically.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us via our{' '}
              <Link href="/contact">Contact page</Link> or email us at afriearners@gmail.com.
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
            <Link href="/disclaimer">Disclaimer</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
