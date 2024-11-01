/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: true, //process.env.NODE_ENV === "development",
  register: true,
});

const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./src/lib/utils/imageLoader.ts",
  },
  env: {
    PISTON_API_URL: process.env.PISTON_API_URL,
  },
  webpack: (config, { isServer }) => {
    // Monaco Editor webpack config
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        "crypto": false,
      };
    }

    return config;
  },
};

module.exports = withPWA(nextConfig);