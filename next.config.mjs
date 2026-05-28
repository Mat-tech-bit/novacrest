/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Tell Next.js NOT to bundle these Node.js-native packages via webpack.
  // This fixes the "Cannot read properties of undefined (reading 'call')" error
  // that occurs when cloudinary is imported inside a Server Action.
  serverExternalPackages: ["cloudinary"],
}

export default nextConfig
