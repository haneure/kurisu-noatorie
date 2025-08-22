import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployment
  output: 'standalone',
  // Skip environment variable validation during build
  env: {
    SKIP_ENV_VALIDATION: 'true'
  }
}

export default withNextIntl(nextConfig)
