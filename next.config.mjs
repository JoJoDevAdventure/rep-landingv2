import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(process.cwd(), "src");
    config.resolve.alias["@/components"] = path.resolve(process.cwd(), "src/components");
    return config;
  },
};

export default nextConfig;