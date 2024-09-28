import Image, { ImageProps, StaticImageData } from 'next/image'
import React from 'react'

interface ResponsiveImageProps extends Omit<ImageProps, 'src' | 'alt'> {
    src: StaticImageData | string
    alt: string
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
    src,
    alt,
    ...props
}) => {
    return (
        <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: 'cover' }}
            {...props}
        />
    )
}

export default ResponsiveImage
