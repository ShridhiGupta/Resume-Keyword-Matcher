/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Use 'standalone' for Docker deployments
  // For Netlify, the @netlify/plugin-nextjs handles everything automatically
  output: process.env.NETLIFY === 'true' ? undefined : 'standalone',
}

module.exports = nextConfig
