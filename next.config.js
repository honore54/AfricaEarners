/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
  },
  pageExtensions: ['js', 'jsx', 'mdx'],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false }
    return config
  },
}
module.exports = nextConfig
