import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // ✅ Allow Sanity image CDN
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
  // ✅ Optional: Enable React strict mode
  reactStrictMode: true,

  // ✅ Optional: Better builds & debugging
  typescript: {
    ignoreBuildErrors: false, // fail build if type errors
  },
  eslint: {
    ignoreDuringBuilds: false, // fail build if lint errors
  },
};

export default nextConfig;
