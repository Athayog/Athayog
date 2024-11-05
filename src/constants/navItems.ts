export interface NavItem {
    label: string
    path?: string
    type: 'nav' | 'menu'
    children?: NavItem[]
}

export const navItems: NavItem[] = [
    { label: 'Home', path: '/', type: 'nav' },
    { label: 'Who We Are', path: '/about-us', type: 'nav' },
    {
        label: 'What We Offer',
        type: 'menu',
        path: '/what-we-offer',
        children: [
            { label: 'Group Class', path: '/group-classes', type: 'nav' },
            {
                label: 'Personal Training',
                path: '/personal-session',
                type: 'nav',
            },
            { label: 'Workshop', path: '/workshops', type: 'nav' },
            { label: 'Yoga Therapy', path: '/yoga-therapy', type: 'nav' },
            {
                label: 'Yoga Academy',
                type: 'menu',
                path: '/yoga-academy',
                children: [
                    { label: 'Residential', path: '/residential', type: 'nav' },
                    {
                        label: 'Non Residential',
                        path: '/non-residential',
                        type: 'nav',
                    },
                    { label: 'TTC Online', path: '/ttc-online', type: 'nav' },
                ],
            },
            { label: 'Excursion / Picnics', path: '/picnics', type: 'nav' },
            { label: 'PCOS Yoga', path: '/pcos-yoga', type: 'nav' },
            { label: 'Weight Loss Program', path: '/weight-loss-program', type: 'nav' },
        ],
    },
    {
        label: 'Others',
        type: 'menu',
        path: '/Others',
        children: [{ label: 'Career', path: '/career', type: 'nav' }],
    },
    { label: 'Contact Us', path: '/contact-us', type: 'nav' },
]
