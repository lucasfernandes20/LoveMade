import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "i.scdn.co",
      "i.ytimg.com",
      "i9.ytimg.com",
      "firebasestorage.googleapis.com",
    ],
  },
};

export default nextConfig;
