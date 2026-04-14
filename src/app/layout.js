import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://africa-earners.vercel.app'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'AfriEarners — Earn Dollars Online from Africa',
    template: '%s | AfriEarners'
  },
  description: 'Real, proven ways for Africans to earn money online. Freelancing, blogging, apps, Twitter monetization, Payoneer guides and more.',
  keywords: ['make money online africa', 'earn dollars rwanda', 'freelancing africa', 'online jobs rwanda', 'payoneer rwanda', 'remote jobs africa'],
  authors: [{ name: 'AfriEarners Team', url: siteUrl }],
  creator: 'AfriEarners',
  publisher: 'AfriEarners',
  category: 'finance',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'AfriEarners',
    title: 'AfriEarners — Earn Dollars Online from Africa',
    description: 'Real, proven ways for Africans to earn money online.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'AfriEarners' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@afriearners',
    creator: '@afriearners',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'RXhOMJ8rXHLeAMct1d0MBTmTUun7ggrTNjsTIliAqiE',
  },
  alternates: {
    canonical: siteUrl,
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AfriEarners',
  url: siteUrl,
  description: 'Helping Africans earn dollars online through freelancing, blogging, and tech.',
  foundingLocation: { '@type': 'Place', name: 'Kigali, Rwanda' },
  sameAs: [],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AfriEarners',
  url: siteUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/blog?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={siteUrl} />
        <meta name="theme-color" content="#060811" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-V7L9NMMGX2" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-V7L9NMMGX2');
            `
          }}
        />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5287640072959856"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        {children}
      </body>
    </html>
  )
}