/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_API_HOST: process.env.SERVER_API_HOST,
  },
}

module.exports = nextConfig
