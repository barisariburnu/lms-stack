import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // See: <https://webpack.js.org/configuration/resolve/#resolveconditionnames>
    config.resolve.conditionNames?.unshift("bun");
    return config;
  },
};

export default nextConfig;
