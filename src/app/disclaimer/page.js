import Navbar from '../../components/Navbar'
import Link from 'next/link'

export const metadata = {
  title: 'Disclaimer — AfriEarners',
  description: 'AfriEarners earnings disclaimer. Results from online earning strategies vary. Read our full disclaimer.',
}

export default function DisclaimerPage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '120px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: '780px', paddingBottom: '80px' }}>

          <div className="section-label">Legal</div>
          <h1 className="section-title" style={{ marginBottom: '8px' }}>Disclaimer</h1>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '48px' }}>
            Last updated: March 22, 2026
          </p>

          <div className="article-content">

            <h2>Earnings Disclaimer</h2>
            <p>
              The information provided on AfriEarners is for general educational and informational
              purposes only. Any income or earnings examples mentioned on this website are not
              intended to represent or guarantee that anyone will achieve the same or similar results.
            </p>
            <p>
              Individual results will vary based on many factors, including but not limited to your
              background, experience, work ethic, market conditions, and time invested. Making money
              online involves risk and consistent effort. There is no guarantee that you will earn
              any specific amount of money by following the information on this website.
            </p>

            <h2>No Professional Financial Advice</h2>
            <p>
              The content on AfriEarners is not financial, investment, or legal advice. We are
              content creators sharing information based on research and experience. Always do your
              own research and consult qualified professionals before making financial decisions.
            </p>

            <h2>Affiliate Links</h2>
            <p>
              Some articles on AfriEarners may contain affiliate links. This means if you click
              on a link and sign up for a service, we may receive a small commission at no extra
              cost to you. We only recommend products and services we genuinely believe are useful
              to our readers. All affiliate relationships are disclosed within the relevant articles.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              Our website may contain links to external websites. These links are provided for your
              convenience and information only. AfriEarners has no control over the content of those
              sites and accepts no responsibility for them or for any loss or damage that may arise
              from your use of them.
            </p>

            <h2>Accuracy of Information</h2>
            <p>
              While we make every effort to ensure the accuracy of information published on
              AfriEarners, the online earning landscape changes rapidly. Platform rules, payment
              thresholds, and availability of services may change without notice. We recommend
              always verifying current information directly with the relevant platforms.
            </p>

            <h2>Contact</h2>
            <p>
              If you have questions about this disclaimer, please contact us via our{' '}
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
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
