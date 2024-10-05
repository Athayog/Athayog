import { Box, Divider, Stack, Typography } from '@mui/material'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Privacy Policy | Athayog',
    description: 'Athayog Privacy Policy',
}

const Privacy = () => {
    return (
        <Box
            sx={{
                padding: '200px 20px 100px 20px',
                background: 'rgb(227, 249, 227)',
            }}
        >
            <Box sx={{ maxWidth: '1440px', margin: '0 auto' }}>
                <Typography
                    sx={{
                        textAlign: 'center',
                        fontWeight: '700',
                        marginBottom: '20px',
                        fontSize: {
                            xs: '32px',
                            md: '48px',
                        },
                    }}
                >
                    PRIVACY POLICY
                </Typography>
                <Divider />

                {/* One */}
                <Box sx={{ padding: ' 20px 0px' }}>
                    <Typography
                        sx={{
                            fontWeight: '700',
                            fontSize: '24px',
                            '&::after': {
                                content: '""',
                                display: 'block',
                                width: '100px',
                                height: '3px',
                                background: '#132500',
                                marginTop: '5px',
                            },
                        }}
                    >
                        WHAT DO WE DO WITH YOUR INFORMATION?{' '}
                    </Typography>
                    <Stack gap="15px" marginTop="20px">
                        <Typography sx={{ fontSize: '18px' }}>
                            When you purchase sevice from our firm, as part of
                            the buying and selling process, we collect the
                            personal information you give us such as your name,
                            address and email address.
                        </Typography>

                        <Typography sx={{ fontSize: '18px' }}>
                            When you browse our website, we also automatically
                            receive your computer’s internet protocol (IP)
                            address in order to provide us with information that
                            helps us learn about your browser and operating
                            system.
                        </Typography>
                        <Typography sx={{ fontSize: '18px' }}>
                            Email marketing (if applicable): With your
                            permission, we may send you emails about our store,
                            new products and other updates.
                        </Typography>
                    </Stack>
                </Box>
                <Box sx={{ padding: ' 20px 0px' }}>
                    <Typography
                        sx={{
                            fontWeight: '700',
                            fontSize: '24px',
                            '&::after': {
                                content: '""',
                                display: 'block',
                                width: '100px',
                                height: '3px',
                                background: '#132500',
                                marginTop: '5px',
                            },
                        }}
                    >
                        CONSENT
                    </Typography>
                    {/* Second */}
                    <Stack gap="15px" marginTop="20px">
                        <Typography
                            sx={{ fontSize: '18px', fontWeight: '700' }}
                        >
                            How do you get my consent?
                        </Typography>
                        <Typography sx={{ fontSize: '18px' }}>
                            When you provide us with personal information to
                            complete a transaction, verify your credit card,
                            place an order, arrange for a delivery or return a
                            purchase, we imply that you consent to our
                            collecting it and using it for that specific reason
                            only.
                        </Typography>

                        <Typography sx={{ fontSize: '18px' }}>
                            If we ask for your personal information for a
                            secondary reason, like marketing, we will either ask
                            you directly for your expressed consent, or provide
                            you with an opportunity to say no.
                        </Typography>
                        <Typography
                            sx={{ fontSize: '18px', fontWeight: '700' }}
                        >
                            How do I withdraw my consent?
                        </Typography>
                        <Typography sx={{ fontSize: '18px' }}>
                            If after you opt-in, you change your mind, you may
                            withdraw your consent for us to contact you, for the
                            continued collection, use or disclosure of your
                            information, at anytime, by contacting us at
                            <span style={{ fontWeight: '700' }}>
                                {' '}
                                info@athayogliving.com
                            </span>{' '}
                            or mailing us at:
                            <span style={{ fontWeight: '700' }}>
                                {' '}
                                No.3293, 1st floor, 12th main, HAL 2nd stage,
                                Indiranagar, Bengaluru, Karnataka - 560038
                            </span>{' '}
                        </Typography>
                    </Stack>
                </Box>
                <Box sx={{ padding: ' 20px 0px' }}>
                    <Typography
                        sx={{
                            fontWeight: '700',
                            fontSize: '24px',
                            '&::after': {
                                content: '""',
                                display: 'block',
                                width: '100px',
                                height: '3px',
                                background: '#132500',
                                marginTop: '5px',
                            },
                        }}
                    >
                        DISCLOSURE
                    </Typography>
                    {/* Second */}
                    <Stack gap="15px" marginTop="20px">
                        <Typography sx={{ fontSize: '18px' }}>
                            We may disclose your personal information if we are
                            required by law to do so or if you violate our Terms
                            of Service
                        </Typography>
                    </Stack>
                </Box>
                <Box sx={{ padding: ' 20px 0px' }}>
                    <Typography
                        sx={{
                            fontWeight: '700',
                            fontSize: '24px',
                            '&::after': {
                                content: '""',
                                display: 'block',
                                width: '100px',
                                height: '3px',
                                background: '#132500',
                                marginTop: '5px',
                            },
                        }}
                    >
                        PAYMENT
                    </Typography>

                    <Stack gap="15px" marginTop="20px">
                        <Typography sx={{ fontSize: '18px' }}>
                            We use Razorpay for processing payments. We/Razorpay
                            do not store your card data on their servers. The
                            data is encrypted through the Payment Card Industry
                            Data Security Standard (PCI-DSS) when processing
                            payment. Your purchase transaction data is only used
                            as long as is necessary to complete your purchase
                            transaction. After that is complete, your purchase
                            transaction information is not saved.
                        </Typography>

                        <Typography sx={{ fontSize: '18px' }}>
                            Our payment gateway adheres to the standards set by
                            PCI-DSS as managed by the PCI Security Standards
                            Council, which is a joint effort of brands like
                            Visa, MasterCard, American Express and Discover.
                        </Typography>
                        <Typography sx={{ fontSize: '18px' }}>
                            PCI-DSS requirements help ensure the secure handling
                            of credit card information by our store and its
                            service providers.
                        </Typography>
                        <Typography sx={{ fontSize: '18px' }}>
                            For more insight, you may also want to read terms
                            and conditions of razorpay on https://razorpay.com
                        </Typography>
                    </Stack>
                </Box>
                <Box sx={{ padding: ' 20px 0px' }}>
                    <Typography
                        sx={{
                            fontWeight: '700',
                            fontSize: '24px',
                            '&::after': {
                                content: '""',
                                display: 'block',
                                width: '100px',
                                height: '3px',
                                background: '#132500',
                                marginTop: '5px',
                            },
                        }}
                    >
                        THIRD-PARTY SERVICES
                    </Typography>

                    <Stack gap="15px" marginTop="20px">
                        <Typography sx={{ fontSize: '18px' }}>
                            In general, the third-party providers used by us
                            will only collect, use and disclose your information
                            to the extent necessary to allow them to perform the
                            services they provide to us.
                        </Typography>

                        <Typography sx={{ fontSize: '18px' }}>
                            However, certain third-party service providers, such
                            as payment gateways and other payment transaction
                            processors, have their own privacy policies in
                            respect to the information we are required to
                            provide to them for your purchase-related
                            transactions.
                        </Typography>
                        <Typography sx={{ fontSize: '18px' }}>
                            For these providers, we recommend that you read
                            their privacy policies so you can understand the
                            manner in which your personal information will be
                            handled by these providers.
                        </Typography>
                        <Typography sx={{ fontSize: '18px' }}>
                            In particular, remember that certain providers may
                            be located in or have facilities that are located in
                            a different jurisdiction than either you or us. So
                            if you elect to proceed with a transaction that
                            involves the services of a third-party service
                            provider, then your information may become subject
                            to the laws of the jurisdiction(s) in which that
                            service provider or its facilities are located.
                        </Typography>
                        <Typography sx={{ fontSize: '18px' }}>
                            Once you leave our store’s website or are redirected
                            to a third-party website or application, you are no
                            longer governed by this Privacy Policy or our
                            website’s Terms of Service.
                        </Typography>
                        <Typography
                            sx={{ fontSize: '18px', fontWeight: '700' }}
                        >
                            Links
                        </Typography>
                        <Typography sx={{ fontSize: '18px' }}>
                            When you click on links on our store, they may
                            direct you away from our site. We are not
                            responsible for the privacy practices of other sites
                            and encourage you to read their privacy statements.
                        </Typography>
                    </Stack>
                </Box>
                <Box sx={{ padding: ' 20px 0px' }}>
                    <Typography
                        sx={{
                            fontWeight: '700',
                            fontSize: '24px',
                            '&::after': {
                                content: '""',
                                display: 'block',
                                width: '100px',
                                height: '3px',
                                background: '#132500',
                                marginTop: '5px',
                            },
                        }}
                    >
                        SECURITY
                    </Typography>
                    {/* Second */}
                    <Stack gap="15px" marginTop="20px">
                        <Typography sx={{ fontSize: '18px' }}>
                            To protect your personal information, we take
                            reasonable precautions and follow industry best
                            practices to make sure it is not inappropriately
                            lost, misused, accessed, disclosed, altered or
                            destroyed.
                        </Typography>
                    </Stack>
                </Box>
                <Box sx={{ padding: ' 20px 0px' }}>
                    <Typography
                        sx={{
                            fontWeight: '700',
                            fontSize: '24px',
                            '&::after': {
                                content: '""',
                                display: 'block',
                                width: '100px',
                                height: '3px',
                                background: '#132500',
                                marginTop: '5px',
                            },
                        }}
                    >
                        COOKIES
                    </Typography>
                    {/* Second */}
                    <Stack gap="15px" marginTop="20px">
                        <Typography sx={{ fontSize: '18px' }}>
                            We use cookies to maintain the session of your user.
                            It is not used to personally identify you on other
                            websites.
                        </Typography>
                    </Stack>
                </Box>
                <Box sx={{ padding: ' 20px 0px' }}>
                    <Typography
                        sx={{
                            fontWeight: '700',
                            fontSize: '24px',
                            '&::after': {
                                content: '""',
                                display: 'block',
                                width: '100px',
                                height: '3px',
                                background: '#132500',
                                marginTop: '5px',
                            },
                        }}
                    >
                        AGE OF CONSENT
                    </Typography>
                    {/* Second */}
                    <Stack gap="15px" marginTop="20px">
                        <Typography sx={{ fontSize: '18px' }}>
                            By using this site, you represent that you are at
                            least the age of majority in your state or province
                            of residence, or that you are the age of majority in
                            your state or province of residence and you have
                            given us your consent to allow any of your minor
                            dependents to use this site.
                        </Typography>
                    </Stack>
                </Box>
                <Box sx={{ padding: ' 20px 0px' }}>
                    <Typography
                        sx={{
                            fontWeight: '700',
                            fontSize: '24px',
                            '&::after': {
                                content: '""',
                                display: 'block',
                                width: '100px',
                                height: '3px',
                                background: '#132500',
                                marginTop: '5px',
                            },
                        }}
                    >
                        CHANGES TO THIS PRIVACY POLICY
                    </Typography>
                    {/* Second */}
                    <Stack gap="15px" marginTop="20px">
                        <Typography sx={{ fontSize: '18px' }}>
                            We reserve the right to modify this privacy policy
                            at any time, so please review it frequently. Changes
                            and clarifications will take effect immediately upon
                            their posting on the website. If we make material
                            changes to this policy, we will notify you here that
                            it has been updated, so that you are aware of what
                            information we collect, how we use it, and under
                            what circumstances, if any, we use and/or disclose
                            it.
                        </Typography>
                        <Typography sx={{ fontSize: '18px' }}>
                            If our store is acquired or merged with another
                            company, your information may be transferred to the
                            new owners so that we may continue to sell products
                            to you.
                        </Typography>
                    </Stack>
                </Box>
                <Box sx={{ padding: ' 20px 0px' }}>
                    <Typography
                        sx={{
                            fontWeight: '700',
                            fontSize: '24px',
                            '&::after': {
                                content: '""',
                                display: 'block',
                                width: '100px',
                                height: '3px',
                                background: '#132500',
                                marginTop: '5px',
                            },
                        }}
                    >
                        QUESTIONS AND CONTACT INFORMATION
                    </Typography>
                    {/* Second */}
                    <Stack gap="15px" marginTop="20px">
                        <Typography sx={{ fontSize: '18px' }}>
                            If you would like to: access, correct, amend or
                            delete any personal information we have about you,
                            register a complaint, or simply want more
                            information contact our Privacy Compliance Officer
                            at info@athayogliving.com or by mail at No.3293, 1st
                            floor, 12th main, HAL 2nd stage, Indiranagar,
                            Bengaluru, Karnataka - 560038
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default Privacy
