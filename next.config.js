/** @type {import('next').NextConfig} */

const nextConfig = {
		reactStrictMode: false,
		// distDir: 'dist',
		// output: 'standalone',
		// images: {
		//   domains: ['next.testsofts.com'], // Add your domain here
		// },
}

const withNextIntl = require('next-intl/plugin')(
		'./src/i18n.ts'
);

module.exports = withNextIntl(nextConfig);