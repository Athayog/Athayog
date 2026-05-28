import '@/styles/global.css'
import theme from '@/styles/theme'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import Footer from '@/components/_footer'
import YogaDayBanner from '@/components/Banner/YogaDayBanner'
import { repositoryName } from '@/prismicio'
import NextTopLoader from 'nextjs-toploader'
import { Inter, Josefin_Sans, Montserrat, Playfair_Display } from 'next/font/google'
import { PrismicPreview } from '@prismicio/next'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { SnackbarProvider } from '@/components/SnackbarProvider'
import { GoogleTagManager } from '@next/third-parties/google'

const Navbar = dynamic(() => import('@/components/_header'))
const WhatsAppWidget = dynamic(() => import('@/components/WhatsApp'))

const josefin = Josefin_Sans({
    subsets: ['latin'],
    variable: '--font-josefin',
    display: 'swap',
})

const monsterrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    display: 'swap',
})

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
    style: ['normal', 'italic'],
    weight: ['400', '600'],
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className={`${josefin.variable} ${monsterrat.variable} ${inter.variable} ${playfair.variable}`}>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="preload" href="/images/root/home-bg.png" as="image" />
                <meta name="google-site-verification" content="MFdD5TUc66yWX-w0hwFHmVkJWyt8BAkzk-g3jR4KLlo" />

                <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ''} />
                <Script
                    id="facebook-pixel"
                    strategy="afterInteractive"
                >
                    {`!function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL}');
                    fbq('track', 'PageView');`}
                </Script>
                <noscript>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        height="1"
                        width="1"
                        style={{ display: 'none' }}
                        src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL}&ev=PageView&noscript=1`}
                        alt=""
                    />
                </noscript>
            </head>
            <body >
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <SnackbarProvider>
                            <CssBaseline />
                            <YogaDayBanner />
                            <Navbar />
                            <NextTopLoader />
                            <div id="scroll-target" />
                            {children}
                            <WhatsAppWidget />
                            <Footer />
                        </SnackbarProvider>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
            {process.env.NODE_ENV === 'development' && <PrismicPreview repositoryName={repositoryName} />}
        </html>
    )
}
