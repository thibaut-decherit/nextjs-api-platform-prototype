/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        let rewrites = [];
        if (process?.env?.NEXT_PUBLIC_API_PROXY_BASE_URL) {
            rewrites.push({
                source: process.env.NEXT_PUBLIC_API_PATH + '/:path*',
                destination:  process.env.NEXT_PUBLIC_API_BASE_URL + process.env.NEXT_PUBLIC_API_PATH + '/:path*',
            });
        }

        return rewrites;
    }
};

module.exports = nextConfig;
