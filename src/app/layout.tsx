import { PrismicPreview } from '@prismicio/next'
import { repositoryName } from '@/prismicio'
import { Josefin_Sans } from 'next/font/google'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import NextTopLoader from 'nextjs-toploader'
import Navbar from '@/components/_header'
import theme from '@/styles/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Footer from '@/components/_footer'

const josefin = Josefin_Sans({ subsets: ['latin'] })

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body className={`${josefin.className}`}>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Navbar />
                        <NextTopLoader />
                        <div id="scroll-target" />
                        {children}
                        <Footer />
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
            <PrismicPreview repositoryName={repositoryName} />
        </html>
    )
}
