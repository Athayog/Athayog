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
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            {...props}
        />
    )
}

export default ResponsiveImage
