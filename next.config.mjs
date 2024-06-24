/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      { hostname: "ui-avatars.com", protocol: "https" },
      { hostname: "res.cloudinary.com", protocol: "https" },
    ],
  },
};

export default nextConfig;
