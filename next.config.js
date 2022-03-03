const withPWA = require("next-pwa");
const optimizedImages = require("next-optimized-images");
const prod = process.env.NODE_ENV === "production";
const runtimeCaching = require("next-pwa/cache");
module.exports = withPWA({
  pwa: {
    disable: !prod,
    dest: "public",
  },
  reactStrictMode: true,
  images: {
    loader: "custom",
    path: "images/",
    domains: ["cdn.pixabay.com", "firebasestorage.googleapis.com"],
  },
});
