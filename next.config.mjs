/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['img.youtube.com', 'images.prismic.io', 'athayog.cdn.prismic.io', 'images.unsplash.com'],
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
