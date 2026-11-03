import type { NextConfig } from "next"
import { config } from "./config/index"

const backendUrl = config.backend.url

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${backendUrl}/api/:path*` },
      {
        source: "/.well-known/:path*",
        destination: `${backendUrl}/.well-known/:path*`,
      },
    ]
  },
}

export default nextConfig
