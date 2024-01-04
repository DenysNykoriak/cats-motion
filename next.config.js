/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "cdn2.thecatapi.com" }],
  },
  outputFileTracingExcludes: {
    "*": ["public/cached-cats/**/*.webp"],
  },
};

module.exports = nextConfig;
