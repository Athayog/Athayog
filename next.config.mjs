/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'img.youtube.com',
            'images.prismic.io',
            'images.unsplash.com',
        ],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        })

        return config
    },
}

export default nextConfig
