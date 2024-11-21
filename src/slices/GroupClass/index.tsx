'use client'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import React from 'react'
import Image from 'next/image'
import { Box, Typography, styled } from '@mui/material'
import RegisterButton from '@/components/elements/button/RegisterButton'
import { SectionContent, SectionPadding } from '@/components/_shared/SectionContainer'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import ContentContainer from '@/components/_shared/ContentContainer'

const Container = styled(Box)(({ theme }) => ({
    marginTop: '0px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
        marginTop: '0px',
    },
}))

const Title = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'colorText',
})<{ colorText?: string }>(({ theme, colorText }) => ({
    fontSize: '48px',
    color: '#303030',
    fontWeight: '700',
    [theme.breakpoints.down('md')]: {
        fontSize: '26px',
    },
    span: {
        color: colorText || '#237306', // Default color if colorText isn't provided
    },
}))

const ImageContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    borderRadius: '358.814px',
    height: '390px',
    margin: '40px auto 0 auto',
    maxWidth: '970px',
    border: '4px solid #F8BCC0',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
        height: '300px',
        margin: '20px auto 0 auto',
    },
    [theme.breakpoints.down('sm')]: {
        height: '200px',
    },
}))

const Description = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    marginTop: '30px',
    maxWidth: '800px',
    fontSize: '24px',
    margin: '30px auto 0 auto',
    [theme.breakpoints.down('md')]: {
        fontSize: '18px',
        margin: '16px auto 0 auto',
    },
}))

const RegisterActionButton = styled(RegisterButton)(({ theme }) => ({
    marginTop: '30px',
    [theme.breakpoints.down('md')]: {
        margin: '13px  auto 0 auto',
        fontSize: '18px',
        height: '50px',
        width: '173px',
    },
}))

/**
 * Props for `GroupClass`.
 */
export type GroupClassProps = SliceComponentProps<Content.GroupClassSlice>

/**
 * Component for "GroupClass" Slices.
 */
const GroupClass = ({ slice }: GroupClassProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <ContentContainer>
                <Container>
                    <Title colorText={slice.primary.title_coloured_color ?? ''}>
                        {slice.primary.title} <span>{slice.primary.title_coloured}</span>
                    </Title>
                    <ImageContainer>
                        <PrismicNextImage field={slice.primary.image} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
                    </ImageContainer>
                    <Description>
                        <PrismicRichText field={slice.primary.description} />
                    </Description>
                    <PrismicNextLink field={slice.primary.button_link}>
                        <RegisterActionButton variant="contained">{slice.primary.button_text}</RegisterActionButton>
                    </PrismicNextLink>
                </Container>
            </ContentContainer>
        </section>
    )
}

export default GroupClass
