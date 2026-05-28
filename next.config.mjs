/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,
    poweredByHeader: false,
    images: {
        formats: ['image/webp', 'image/avif'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
            },
            {
                protocol: 'https',
                hostname: 'images.prismic.io',
            },
            {
                protocol: 'https',
                hostname: 'athayog.cdn.prismic.io',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    experimental: {
        optimizePackageImports: ['@mui/material', '@mui/icons-material', 'date-fns'],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        })

        return config
    },
    async redirects() {
        return [
            {
                source: '/ld/sound-meditation-yoga-indiranagar',
                destination: '/',
                permanent: false,
            },
        ]
    },
}

export default nextConfig
