// @ts-check

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
});

module.exports = withPWA({
  images: {
    domains: ["images.unsplash.com"],
  },
});