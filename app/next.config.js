const withTM = require('next-transpile-modules')([
  // '@blocto/sdk',
  '@project-serum/sol-wallet-adapter',
])
const withInterceptStdout = require('next-intercept-stdout')

const withLinaria = require('next-linaria')

// https://docs.sentry.io/platforms/javascript/guides/nextjs/
const { withSentryConfig } = require('@sentry/nextjs')

const sentryOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

const withSentry =
  process.env.NEXT_PUBLIC_SENTRY_ENABLED === 'true'
    ? withSentryConfig
    : (x) => x

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: ['res.cloudinary.com', 'avatars.ahoy.fund'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  pageExtensions: [
    'page.tsx',
    'page.ts',
    'page.jsx',
    'page.js',
    'page.md',
    'page.mdx',
  ],
  redirects: () => [
    { source: '/bounty', destination: '/bounties', permanent: true },
    { source: '/verify/:uid', destination: '/', permanent: false },
  ],
  sentry: {
    disableClientWebpackPlugin: true,
  },
}

// withTM should always be first
module.exports = withTM(
  withSentry(
    withLinaria(
      withInterceptStdout(config, (text) =>
        text.includes('Duplicate atom key') ? '' : text,
      ),
    ),
    sentryOptions,
  ),
)
