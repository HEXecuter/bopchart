/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        typescript: {
            ignoreBuildErrors: true,
        },
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.scdn.co'
            }
        ],
    },
}

module.exports = nextConfig
