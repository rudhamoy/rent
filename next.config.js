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
    SMTP_FROM_NAME: "Rentmeroom",

    mapbox_key: 'pk.eyJ1IjoicmVudG1lcm9vbSIsImEiOiJja3oxYnp6OGowMHIzMndvZG04ZWl0MWExIn0.rkqimVUoF4Mu1rURwq5iQQ',

    NEXT_PUBLIC_GOOGLE_ANALYTICS: 'G-HRLB2EJ8L1'
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}

