import { Typography } from '@mui/material'
import { RichTextField } from '@prismicio/client'
import { JSXMapSerializer, PrismicRichText, PrismicLink } from '@prismicio/react'

export const richTextComponents: JSXMapSerializer = {
    label: ({ node, children }) => {
        if (node.data.label === 'codespan') {
            return <code>{children}</code>
        }
    },
    heading1: ({ children }) => (
        <Typography variant="h1" sx={{ fontWeight: '700', fontSize: { xs: '22px', md: '60px' }, lineHeigth: '60px' }}>
            {children}
        </Typography>
    ),
    heading2: ({ children }) => (
        <Typography variant="h2" sx={{ fontWeight: '700', fontSize: '50px', lineHeigth: '60px' }}>
            {children}
        </Typography>
    ),
    heading3: ({ children }) => (
        <Typography variant="h3" sx={{ fontWeight: '700', fontSize: '40px', lineHeigth: '60px' }}>
            {children}
        </Typography>
    ),
    paragraph: ({ children }) => <p>{children}</p>,
    hyperlink: ({ children, node }) => <PrismicLink field={node.data}>{children}</PrismicLink>,
}

interface RichTextProps {
    field: RichTextField
}

export const RichTextBlog = ({ field }: RichTextProps) => {
    return <PrismicRichText field={field} components={richTextComponents} />
}
