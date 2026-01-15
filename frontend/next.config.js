/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Use 'standalone' for Docker, 'export' for Netlify static hosting
  // For Netlify, set NEXT_PUBLIC_NETLIFY=true in environment variables
  output: process.env.NEXT_PUBLIC_NETLIFY === 'true' ? 'export' : 'standalone',
  // Disable image optimization for static export
  images: {
    unoptimized: process.env.NEXT_PUBLIC_NETLIFY === 'true',
  },
}

module.exports = nextConfig
