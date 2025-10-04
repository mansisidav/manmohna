/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com", // Add any external image domains here
      "example.com",                 // add more if needed
    ],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
