import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployment
  output: 'standalone'
}

export default withNextIntl(nextConfig)
