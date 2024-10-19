import React from 'react'
import { PrismicRichText, JSXMapSerializer } from '@prismicio/react'
import { RTNode } from '@prismicio/types'
import { RichTextField } from '@prismicio/client'

interface RichTextProps {
    slice: {
        primary: {
            title: RichTextField
        }
    }
    color?: string
    textPart: string
}

// Custom serializer to detect and style specific text with a custom color
const createCustomSerializer = (color: string, textPart: string): JSXMapSerializer => ({
    paragraph: ({ children }) => {
        return (
            <p>
                {children.map((child, index) => {
                    // Ensure child is a string and contains "special text"
                    if (typeof child === 'string' && (child as string).includes(textPart)) {
                        // Split text and insert colored span for "special text"
                        return (
                            <span key={index}>
                                {(child as string).split(textPart).map((part: string, i: React.Key | null | undefined, array: string[]) => (
                                    <React.Fragment key={i}>
                                        {part}
                                        {i !== undefined ? (
                                            <span
                                                style={{
                                                    color: color,
                                                }}
                                            >
                                                {textPart}
                                            </span>
                                        ) : null}
                                    </React.Fragment>
                                ))}
                            </span>
                        )
                    }

                    return child
                })}
            </p>
        )
    },
})

const RichTextComponent: React.FC<RichTextProps> = ({ slice, color = '#478605', textPart }) => {
    // Create the custom serializer using the passed color
    const customSerializer = createCustomSerializer(color, textPart)

    return <PrismicRichText field={slice.primary.title} components={customSerializer} />
}

export default RichTextComponent
