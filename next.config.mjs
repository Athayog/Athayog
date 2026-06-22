/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
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
            {
                source: '/yoga-day-26',
                destination: '/',
                permanent: false,
            },
            {
                source: '/yoga-day-26/:path*',
                destination: '/',
                permanent: false,
            },
        ]
    },
}

export default nextConfig
