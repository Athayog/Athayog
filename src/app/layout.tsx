import '@/styles/global.css'
import theme from '@/styles/theme'
import Navbar from '@/components/_header'
import Footer from '@/components/_footer'
import { repositoryName } from '@/prismicio'
import NextTopLoader from 'nextjs-toploader'
import { Josefin_Sans, Montserrat } from 'next/font/google'
import { PrismicPreview } from '@prismicio/next'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { SnackbarProvider } from '@/components/SnackbarProvider'
import { GoogleTagManager } from '@next/third-parties/google'
import WhatsAppWidget from '@/components/WhatsApp'

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className={`${josefin.variable} ${monsterrat.variable}`}>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <meta name="google-site-verification" content="MFdD5TUc66yWX-w0hwFHmVkJWyt8BAkzk-g3jR4KLlo" />
                <GoogleTagManager gtmId="GTM-N4LH3M3" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '1011750923226651');
                fbq('track', 'PageView');
            `,
                    }}
                />
                <noscript>
                    <img
                        height="1"
                        width="1"
                        style={{ display: 'none' }}
                        src="https://www.facebook.com/tr?id=1011750923226651&ev=PageView&noscript=1"
                    />
                </noscript>
            </head>
            <body >
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <SnackbarProvider>
                            <CssBaseline />
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
            <PrismicPreview repositoryName={repositoryName} />
        </html>
    )
}
