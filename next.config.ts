import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  output: 'standalone',
  turbopack: {
    // ...
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'none'",
          },
        ],
      },
    ];
  },
}
 
export default nextConfig
