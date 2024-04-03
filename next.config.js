/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  basePath:
    process.env.NODE_ENV === "production" ? "/icecoldnugrape" : undefined,
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/icecoldnugrape" : undefined,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
