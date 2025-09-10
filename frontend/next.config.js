/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['m.media-amazon.com', 'image.tmdb.org'],
  },
  env: {
    CUSTOM_KEY: 'netgram',
  },
}

module.exports = nextConfig