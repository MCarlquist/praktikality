import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "swqhluhrkwdgcqsewskk.storage.supabase.co",
        pathname: "/storage/v1/object/public/company-logos/**",
      },
      {
        protocol: "https",
        hostname: "swqhluhrkwdgcqsewskk.supabase.co",
        pathname: "/storage/v1/object/sign/company-logos/**",
      },
    ],
  },
};

export default nextConfig;
