/** @type {import('next').NextConfig} */
import nextPWA from 'next-pwa';
const nextConfig = {};

const withPWA = nextPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
//   register: true,
  scope: '/src/app',
  sw: '/src/service/index.ts',
  images: {
    domains: ['drive.usercontent.google.com'],
  },
})

export default withPWA(nextConfig);
