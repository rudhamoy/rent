module.exports = {
  reactStrictMode: true,
  swcMinify: false,
  env: {
    MONGO_DB_URI: "mongodb+srv://rudhamoy:skateboard123@cluster0.zlick.mongodb.net/rentmeroom?retryWrites=true&w=majority",
    CLOUDINARY_CLOUD_NAME: "yomah",
    CLOUDINARY_API_KEY: "677573329917884",
    CLOUDINARY_API_SECRET: "z9yP0mbkXFVE4t40EiXZpS0sYsM",

    SMTP_HOST: "gmail",
    SMTP_USER: "rentmeroominfo@gmail.com",
    SMTP_PASSWORD: "Skateboard@123",
    SMTP_FROM_NAME: "Rentmeroom"
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}

