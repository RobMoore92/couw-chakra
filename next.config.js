const withPWA = require("next-pwa");
const prod = process.env.NODE_ENV === "production";
module.exports = withPWA({
  pwa: {
    disable: !prod,
    dest: "public",
  },
  reactStrictMode: true,
  images: {
    domains: ["cdn.pixabay.com", "firebasestorage.googleapis.com"],
  },
});
