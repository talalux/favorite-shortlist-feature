/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ['en', 'th'],
        defaultLocale: 'en',
        localeDetection: false,
      },
    env: {
      BASE_URL: process.env.BASE_URL
    }
};

export default nextConfig;
