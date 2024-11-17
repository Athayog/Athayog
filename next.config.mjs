import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'img.youtube.com',
            'images.prismic.io',
            'athayog.cdn.prismic.io',
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

export default withNextVideo(nextConfig);