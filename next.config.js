// @ts-check

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
});

module.exports = withPWA({
  images: {
    loader: "custom",
    loaderFile: "./src/lib/utils/imageLoader.ts",
  },
});