import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // allow Next.js Image to optimize assets from Sanity's CDN
    domains: ["cdn.sanity.io"],
    // or, for even tighter control, you can use remotePatterns:
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "cdn.sanity.io",
    //     port: "",
    //     pathname: "/images/**",
    //   },
    // ],
  },
};

export default nextConfig;
