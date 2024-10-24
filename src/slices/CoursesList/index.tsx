import BackgroundColorLayout from '@/components/_shared/BackgroundColorLayout'
import { List, ListItem, Box } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

export type CoursesListProps = SliceComponentProps<Content.CoursesListSlice>

const CoursesList = ({ slice }: CoursesListProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <BackgroundColorLayout background_color={slice.primary.background_color}>
                {slice.variation === 'withImage' && (
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: '20px', md: '100px' } }}>
                        <Box>
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <Box
                                    sx={{
                                        color: '#000',
                                        textAlign: 'left',
                                        alignSelf: 'flex-start',
                                        fontSize: { xs: '32px', md: '52px' },
                                        fontStyle: 'normal',
                                        fontWeight: 700,
                                        lineHeight: { xs: '30px', md: '46px' },
                                        marginBottom: { xs: '10px', md: '30px' },
                                        '&& p': {
                                            margin: 0,
                                            fontSize: { xs: '22px', md: '34px' },
                                            lineHeight: { xs: '30px', md: '46px' },
                                        },
                                    }}
                                >
                                    <PrismicRichText field={slice.primary.title} />
                                </Box>
                                <Box
                                    sx={{
                                        height: { xs: 'auto', md: 'auto' },
                                        width: { xs: '100%', md: '100%' },
                                    }}
                                >
                                    <PrismicNextImage field={slice.primary.image} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    color: '#000',
                                    display: { xs: 'none', md: 'block' },
                                    textAlign: 'left',
                                    alignSelf: 'flex-start',
                                    minWidth: '140px',
                                    fontSize: { xs: '32px', md: '52px' },
                                    fontStyle: 'normal',
                                    fontWeight: 700,
                                    lineHeight: { xs: '30px', md: '46px' },
                                    marginBottom: { xs: '10px', md: '30px' },
                                    '&& p': {
                                        margin: 0,
                                        fontSize: { xs: '22px', md: '34px' },
                                        lineHeight: { xs: '30px', md: '46px' },
                                    },
                                }}
                            >
                                <PrismicRichText field={slice.primary.title} />
                            </Box>
                            <List
                                sx={{
                                    alignSelf: 'flex-start',
                                    listStyleType: 'disc',
                                    marginLeft: { xs: '15px', md: '0' },
                                    color: '#000',
                                    textAlign: 'left',
                                    fontSize: { xs: '18px', md: '34px' },
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    lineHeight: { xs: '28px', md: '64px' },
                                    '&& p': {
                                        margin: 0,
                                        fontSize: { xs: '18px', md: '34px' },
                                        lineHeight: { xs: '28px', md: '64px' },
                                    },
                                }}
                            >
                                {slice.primary.list.map((item, index) => (
                                    <ListItem sx={{ display: 'list-item' }} key={index}>
                                        {item.item}
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        <Box
                            sx={{
                                display: { xs: 'none', md: 'block' },
                                height: { xs: 'auto', md: 'auto' },
                                width: { xs: '100%', md: '100%' },
                            }}
                        >
                            <PrismicNextImage field={slice.primary.image} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                        </Box>
                    </Box>
                )}
                {slice.variation === 'default' && (
                    <Box>
                        <Box
                            sx={{
                                color: '#000',
                                textAlign: 'left',
                                alignSelf: 'flex-start',
                                fontSize: { xs: '32px', md: '52px' },
                                fontStyle: 'normal',
                                fontWeight: 700,
                                lineHeight: { xs: '30px', md: '46px' },
                                marginBottom: { xs: '10px', md: '30px' },
                                '&& p': {
                                    margin: 0,
                                    fontSize: { xs: '22px', md: '34px' },
                                    lineHeight: { xs: '30px', md: '46px' },
                                },
                            }}
                        >
                            <PrismicRichText field={slice.primary.title} />
                        </Box>
                        <List
                            sx={{
                                alignSelf: 'flex-start',
                                listStyleType: 'disc',
                                color: '#000',
                                textAlign: 'left',
                                marginLeft: { xs: '15px', md: '0' },
                                fontSize: { xs: '18px', md: '34px' },
                                fontStyle: 'normal',
                                fontWeight: 500,
                                lineHeight: { xs: '28px', md: '64px' },
                                '&& p': {
                                    margin: 0,
                                    fontSize: { xs: '18px', md: '34px' },
                                    lineHeight: { xs: '28px', md: '64px' },
                                },
                            }}
                        >
                            {slice.primary.list.map((item, index) => (
                                <ListItem sx={{ display: 'list-item' }} key={index}>
                                    {item.item}
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}
                {slice.variation === 'onTwoColumn' && (
                    <>
                        <Box
                            sx={{
                                color: '#000',
                                textAlign: 'left',
                                alignSelf: 'flex-start',
                                fontSize: { xs: '32px', md: '52px' },
                                fontStyle: 'normal',
                                fontWeight: 700,
                                lineHeight: { xs: '30px', md: '46px' },
                                marginBottom: { xs: '10px', md: '30px' },
                                '&& p': {
                                    margin: 0,
                                    fontSize: { xs: '22px', md: '34px' },
                                    lineHeight: { xs: '30px', md: '46px' },
                                },
                            }}
                        >
                            <PrismicRichText field={slice.primary.title} />
                        </Box>
                        <List
                            sx={{
                                alignSelf: 'flex-start',
                                listStyleType: 'disc',
                                color: '#000',
                                textAlign: 'left',
                                fontSize: { xs: '18px', md: '34px' },
                                fontStyle: 'normal',
                                fontWeight: 500,
                                marginLeft: { xs: '15px', md: '0' },
                                lineHeight: { xs: '28px', md: '64px' },
                                columnGap: { xs: '50px', md: '150px' },
                                columns: { xs: 1, md: 2 },
                                ...(slice.primary.devider ? { columnRule: { xs: 'none', md: '2px solid #ccc' } } : {}),
                                '&& p': {
                                    margin: 0,
                                    fontSize: { xs: '18px', md: '34px' },
                                    lineHeight: { xs: '28px', md: '64px' },
                                },
                            }}
                        >
                            {slice.primary.list.map((item, index) => (
                                <ListItem sx={{ display: 'list-item' }} key={index}>
                                    {item.item}
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}
            </BackgroundColorLayout>
        </section>
    )
}

export default CoursesList
