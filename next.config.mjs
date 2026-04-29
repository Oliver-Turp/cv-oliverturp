/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['puppeteer', 'puppeteer-core'],
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/contact", destination: "/", permanent: true },
      {
        source: "/Oliver Turp Resume_Optimised.pdf",
        destination: "/",
        permanent: true,
      },
      {
        source: "/Civil Engineering Degree.pdf",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
