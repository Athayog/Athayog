'use client'
import { Content, KeyTextField, NumberField, SelectField } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { formatToCurrency } from '@/lib/helpers'

/**
 * Props for `PersonalSessionPricing`.
 */
export type PersonalSessionPricingProps = SliceComponentProps<Content.PersonalSessionPricingSlice>

/**
 * Component for "PersonalSessionPricing" Slices.
 */

const AdvantagesBox = ({ course_name, course_days, type, course_price, oldprice }: { course_name: any; course_days: any; type: any; course_price: any; oldprice?: any }) => {
    const getColorType = (type: string) => {
        switch (type) {
            case 'studio':
                return '#519E05'
            case 'onsite':
                return '#3E7A00'
            case 'online':
                return '#284E01'
            default:
                return '#519E05' // default color if type doesn't match
        }
    }

    const COLORTYPE = getColorType(type)
    return (
        <Box
            sx={{
                borderRadius: '12px',
                border: '3px solid ' + COLORTYPE,
                background: '#FFFFFF',
                padding: { xs: '15px 20px', lg: '25px 40px' },
                minWidth: '300px',
                minHeight: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'left',
                alignItems: 'baseline',
                flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)' },
            }}
        >
            <Typography sx={{ fontWeight: '600', fontSize: { xs: '26px', md: '40px' } }}>{course_name}</Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >
                <Typography
                    sx={{
                        marginTop: '10px',
                        fontWeight: '500',
                        fontSize: { xs: '20px', md: '30px' },
                    }}
                >
                    {course_days} Days
                </Typography>
                <Typography
                    sx={{
                        marginTop: '10px',
                        fontWeight: '500',
                        fontSize: { xs: '20px', md: '30px' },
                    }}
                >
                    At: {type}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%', gap: '10px' }}>
                <Typography
                    sx={{
                        marginTop: '10px',
                        fontWeight: '600',
                        fontSize: { xs: '20px', md: '45px' },
                    }}
                >
                    {course_price && formatToCurrency(course_price)}
                </Typography>
                {oldprice && (
                    <Typography sx={{ fontSize: { xs: '18px', md: '24px' }, fontWeight: '400', color: '#606060', textDecoration: 'line-through', marginTop: { xs: '10px', md: '15px' } }}>
                        {formatToCurrency(oldprice)}
                    </Typography>
                )}
            </Box>
        </Box>
    )
}

const getCoursesCategory = (courses: any[]) => {
    return courses.reduce(
        (acc, workshop) => {
            const { type } = workshop
            if (!acc[type]) {
                acc[type] = []
            }
            acc[type].push(workshop)
            return acc
        },
        {} as Record<string, typeof courses>
    )
}

type PersonalSession = {
    course_name: KeyTextField
    course_days: NumberField
    course_price: NumberField
    type: SelectField<'Onsite' | 'Studio' | 'Online'>
    oldprice?: NumberField
}

const PersonalSessionPricing = ({ slice }: PersonalSessionPricingProps): JSX.Element => {
    const [selectedType, setSelectedType] = useState('all')

    const handleTypeChange = (type: string) => {
        setSelectedType(type)
    }

    const courses = getCoursesCategory(slice.primary.courses)
    const allCourses = Object.values(courses).flat()

    const filteredCourses: PersonalSession[] =
        selectedType === 'all'
            ? allCourses.map((course) => course as PersonalSession)
            : slice.primary.courses.filter((course) => course.type === selectedType).map((course) => course as PersonalSession)
    console.log(filteredCourses)
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box
                sx={{
                    background: 'linear-gradient(to bottom, #dffad1, #e5fbd3)',
                    padding: { xs: '40px 20px', lg: '60px 100px' },
                }}
            >
                <Box sx={{ textAlign: 'center', marginBottom: '40px' }}>
                    <Typography
                        sx={{
                            color: '#284E01',
                            fontSize: { xs: '33px', md: '42px' },
                            fontWeight: '700',
                        }}
                    >
                        {slice.primary.title}
                    </Typography>
                    <Box
                        sx={{
                            color: '#000',
                            fontSize: { xs: '18px', md: '30px' },
                            fontWeight: '400',
                        }}
                    >
                        <PrismicRichText field={slice.primary.subtitle} />
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: { xs: 1, lg: 2 },
                        marginBottom: '30px',
                    }}
                >
                    <Button
                        variant={selectedType === 'all' ? 'contained' : 'outlined'}
                        sx={{
                            fontSize: { xs: '13px', md: '36px' },
                            borderRadius: '100px',
                            maxWidth: '200px',
                            backgroundColor: selectedType === 'all' ? '#519E05' : '#FFFFFF',
                            color: selectedType === 'all' ? '#FFFFFF' : '#000000',
                            padding: '5px 40px',
                            textTransform: 'capitalize',
                        }}
                        onClick={() => handleTypeChange('all')}
                    >
                        All
                    </Button>

                    {Object.keys(courses).map((type) => (
                        <Button
                            key={type}
                            variant={selectedType === type ? 'contained' : 'outlined'}
                            sx={{
                                fontSize: { xs: '13px', md: '36px' },
                                borderRadius: '100px',
                                maxWidth: '200px',
                                backgroundColor: selectedType === type ? '#519E05' : '#FFFFFF',
                                color: selectedType === type ? '#FFFFFF' : '#000000',
                                padding: '5px 40px',
                                textTransform: 'capitalize',
                            }}
                            onClick={() => handleTypeChange(type)}
                        >
                            {type}
                        </Button>
                    ))}
                </Box>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            md: 'repeat(2, 540px)',
                        },
                        justifyContent: 'center',
                        gap: '20px',
                        marginTop: { xs: '40px', md: '80px' },
                    }}
                >
                    {filteredCourses.map((item: PersonalSession, index) => (
                        <AdvantagesBox key={index} {...item} />
                    ))}
                </Box>

                <Box
                    sx={{
                        marginTop: '60px',
                        fontSize: { xs: '16px', md: '32px' },
                    }}
                >
                    <PrismicRichText field={slice.primary.terms_and_conditions} />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: { xs: '40px', md: '80px' },
                        width: '100%',
                        flexDirection: 'column',
                        gap: '36px',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        sx={{
                            color: '#000000',
                            textAlign: 'center',
                            fontSize: { xs: '28px', md: '42px' },
                            fontWeight: '700',
                        }}
                    >
                        {slice.primary.contact_us_label}
                    </Typography>
                    <PrismicNextLink field={slice.primary.enquire_now_button_link}>
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: '100px',
                                height: '56px',
                                fontSize: '24px',
                                padding: '20px 40px',
                                maxWidth: 'content',
                            }}
                        >
                            {slice.primary.enquire_now_button_text}
                        </Button>
                    </PrismicNextLink>

                    <Box
                        sx={{
                            display: 'flex',
                            borderRadius: '130px',
                            backgroundColor: '#dbf6d1',
                            padding: '16px',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <PrismicNextImage field={slice.primary.enquire_note_image} />
                        <Typography sx={{ fontSize: { xs: '16px', md: '20px' } }}>{slice.primary.enquire_note_text}</Typography>
                    </Box>
                </Box>
            </Box>
        </section>
    )
}

export default PersonalSessionPricing
