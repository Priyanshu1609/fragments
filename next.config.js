/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['openseauserdata.com', 'lh3.googleusercontent.com', ],
  },
}

const withTM = require('next-transpile-modules')(['@lifi/widget']);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
}

// Please declare withTM as your last plugin (the outermost one)
module.exports = withTM(nextConfig);
