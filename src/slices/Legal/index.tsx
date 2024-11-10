import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { Box, Divider, Stack, Typography } from '@mui/material'

/**
 * Props for `Privacy`.
 */
export type PrivacyProps = SliceComponentProps<Content.PrivacySlice>

/**
 * Component for "Privacy" Slices.
 */
const Privacy = ({ slice }: PrivacyProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            {slice.variation === 'default' && (
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
                                textTransform: 'uppercase',
                                fontSize: {
                                    xs: '32px',
                                    md: '48px',
                                },
                            }}
                        >
                            {slice.primary.title}
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
                                    When you purchase sevice from our firm, as part of the buying and selling process, we collect the personal information you give us such as your name, address and
                                    email address.
                                </Typography>

                                <Typography sx={{ fontSize: '18px' }}>
                                    When you browse our website, we also automatically receive your computer’s internet protocol (IP) address in order to provide us with information that helps us
                                    learn about your browser and operating system.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    Email marketing (if applicable): With your permission, we may send you emails about our store, new products and other updates.
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
                                <Typography sx={{ fontSize: '18px', fontWeight: '700' }}>How do you get my consent?</Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we
                                    imply that you consent to our collecting it and using it for that specific reason only.
                                </Typography>

                                <Typography sx={{ fontSize: '18px' }}>
                                    If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an
                                    opportunity to say no.
                                </Typography>
                                <Typography sx={{ fontSize: '18px', fontWeight: '700' }}>How do I withdraw my consent?</Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information,
                                    at anytime, by contacting us at
                                    <span style={{ fontWeight: '700' }}> info@athayogliving.com</span> or mailing us at:
                                    <span style={{ fontWeight: '700' }}> No.3293, 1st floor, 12th main, HAL 2nd stage, Indiranagar, Bengaluru, Karnataka - 560038</span>{' '}
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
                                <Typography sx={{ fontSize: '18px' }}>We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service</Typography>
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
                                    We use Razorpay for processing payments. We/Razorpay do not store your card data on their servers. The data is encrypted through the Payment Card Industry Data
                                    Security Standard (PCI-DSS) when processing payment. Your purchase transaction data is only used as long as is necessary to complete your purchase transaction.
                                    After that is complete, your purchase transaction information is not saved.
                                </Typography>

                                <Typography sx={{ fontSize: '18px' }}>
                                    Our payment gateway adheres to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa,
                                    MasterCard, American Express and Discover.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    PCI-DSS requirements help ensure the secure handling of credit card information by our store and its service providers.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>For more insight, you may also want to read terms and conditions of razorpay on https://razorpay.com</Typography>
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
                                    In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services
                                    they provide to us.
                                </Typography>

                                <Typography sx={{ fontSize: '18px' }}>
                                    However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the
                                    information we are required to provide to them for your purchase-related transactions.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these
                                    providers.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    In particular, remember that certain providers may be located in or have facilities that are located in a different jurisdiction than either you or us. So if you
                                    elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the
                                    jurisdiction(s) in which that service provider or its facilities are located.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    Once you leave our store’s website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website’s
                                    Terms of Service.
                                </Typography>
                                <Typography sx={{ fontSize: '18px', fontWeight: '700' }}>Links</Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    When you click on links on our store, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to
                                    read their privacy statements.
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
                                    To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused,
                                    accessed, disclosed, altered or destroyed.
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
                                <Typography sx={{ fontSize: '18px' }}>We use cookies to maintain the session of your user. It is not used to personally identify you on other websites.</Typography>
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
                                    By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your
                                    state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
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
                                    We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their
                                    posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we
                                    collect, how we use it, and under what circumstances, if any, we use and/or disclose it.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.
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
                                    If you would like to: access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information contact our
                                    Privacy Compliance Officer at info@athayogliving.com or by mail at No.3293, 1st floor, 12th main, HAL 2nd stage, Indiranagar, Bengaluru, Karnataka - 560038
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            )}
            {slice.variation === 'refund' && (
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
                                textTransform: 'uppercase',
                                fontSize: {
                                    xs: '32px',
                                    md: '48px',
                                },
                            }}
                        >
                            {slice.primary.title}
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
                                OVERVIEW
                            </Typography>
                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>
                                    Certain aspects of the service may be provided for a fee or other charges. If you elect to use paid aspects of the service, you agree to the terms of sale, pricing,
                                    payment and billing policies applicable to such fees and charges. Athayog Living may add new services for additional fees and charges, or amend the same for
                                    existing services, at any time in its sole discretion.
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
                                CANCELLATION
                            </Typography>
                            {/* Second */}
                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>
                                    You may cancel your service or course at any time; however, there are no refunds for cancellation. In the event that Athayog Living suspends or terminates your
                                    account or this agreement, you understand and agree that you shall receive no refund or exchange for any unused time on a subscription, any license or subscription
                                    fees for any portion of the service, any content or data associated with your account, or for anything else.
                                </Typography>

                                <ol style={{ fontSize: '18px' }}>
                                    <li>
                                        At Athayog Living, we have a clear ‘No Refund Policy’. Once yoga centre membership/course is purchased online on our platform, there will be no refund. Thus,
                                        the buyer is advised to make an informed decision while making a purchase on our platform.
                                    </li>
                                    <li>Membership once purchased is not transferable</li>
                                    <li>Please note that Athayog Living&apos;s decision on any refund & cancellation policy shall be final & binding.</li>
                                </ol>
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
                                REFUNDS (if applicable)
                            </Typography>
                            {/* Second */}
                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>
                                    Membership/Course cancellation received before said service has been used you may be eligible a full refund. Cancellations received after the stated deadline will
                                    not be eligible for a refund.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    Cancellations will be accepted via phone or e-mail, and must be received by the stated cancellation deadline. In addition:
                                </Typography>
                                <ol style={{ fontSize: '18px' }}>
                                    <li>All refund requests must be made by the member or credit card holder.</li>
                                    <li>Refund requests must include the name of the member and/or transaction number.</li>
                                    <li>Refunds will be credited back to the original credit card used for payment.</li>
                                </ol>
                                <Typography sx={{ fontSize: '18px' }}>
                                    We will also notify you of the approval or rejection of your refund. If you are approved, then your refund will be processed, and a credit will automatically be
                                    applied to your credit card or original method of payment, within a certain 5 - 10 Buisness Days
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
                                LATE OR MISSING REFUNDS (if applicable)
                            </Typography>

                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>
                                    If you haven’t received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is
                                    officially posted.
                                </Typography>

                                <Typography sx={{ fontSize: '18px' }}>
                                    Next contact your bank. There is often some processing time before a refund is posted. If you’ve done all of this and you still have not received your refund yet,
                                    please contact us at info@athayogliving.com.
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            )}
            {slice.variation === 'termsAndConditions' && (
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
                                textTransform: 'uppercase',
                                fontSize: {
                                    xs: '32px',
                                    md: '48px',
                                },
                            }}
                        >
                            {slice.primary.title}
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
                                OVERVIEW
                            </Typography>
                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>
                                    This website is operated by Athayog Living. Throughout the site, the terms “we”, “us” and “our” refer to Athayog Living. Athayog Living offers this website,
                                    including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and
                                    notices stated here.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of
                                    Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to
                                    all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms
                                    of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of
                                    Service are considered an offer, acceptance is expressly limited to these Terms of Service.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms
                                    of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our
                                    website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes
                                    constitutes acceptance of those changes.
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
                                ONLINE STORE TERMS
                            </Typography>
                            {/* Second */}
                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>
                                    By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of
                                    majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
                                </Typography>

                                <Typography sx={{ fontSize: '18px' }}>
                                    You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but
                                    not limited to copyright laws).
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>You must not transmit any worms or viruses or any code of a destructive nature.</Typography>
                                <Typography sx={{ fontSize: '18px' }}>A breach or violation of any of the Terms will result in an immediate termination of your Services.</Typography>
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
                                GENERAL CONDITIONS
                            </Typography>
                            {/* Second */}
                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>We reserve the right to refuse service to anyone for any reason at any time.</Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and
                                    (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over
                                    networks.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the
                                    website through which the service is provided, without express written permission by us.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.
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
                                ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION
                            </Typography>

                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>
                                    We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general
                                    information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more
                                    timely sources of information. Any reliance on the material on this site is at your own risk.
                                </Typography>

                                <Typography sx={{ fontSize: '18px' }}>
                                    This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the
                                    right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to
                                    monitor changes to our site.
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
                                MODIFICATIONS TO THE SERVICE AND PRICES
                            </Typography>

                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>Prices for our products are subject to change without notice.</Typography>

                                <Typography sx={{ fontSize: '18px' }}>
                                    We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
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
                                PRODUCTS OR SERVICES
                            </Typography>

                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>
                                    Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to
                                    return or exchange only according to our Return Policy.
                                </Typography>

                                <Typography sx={{ fontSize: '18px' }}>
                                    We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your
                                    computer monitor&apos;s display of any color will be accurate.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise this
                                    right on a case-by-case basis. We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product
                                    pricing are subject to change at anytime without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for
                                    any product or service made on this site is void where prohibited.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any
                                    errors in the Service will be corrected.
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
                                ACCURACY OF BILLING AND ACCOUNT INFORMATION
                            </Typography>

                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>
                                    We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per
                                    order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or
                                    shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone
                                    number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers,
                                    resellers or distributors.
                                </Typography>

                                <Typography sx={{ fontSize: '18px' }}>
                                    You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account
                                    and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as
                                    needed.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>For more detail, please review our Returns/Refund Policy.</Typography>
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
                                OPTIONAL TOOLS
                            </Typography>

                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.</Typography>

                                <Typography sx={{ fontSize: '18px' }}>
                                    You acknowledge and agree that we provide access to such tools ”as is” and “as available” without any warranties, representations or conditions of any kind and
                                    without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    Any use by you of optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve
                                    of the terms on which tools are provided by the relevant third-party provider(s).
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    We may also, in the future, offer new services and/or features through the website (including, the release of new tools and resources). Such new features and/or
                                    services shall also be subject to these Terms of Service.
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
                                THIRD-PARTY LINKS
                            </Typography>

                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>Certain content, products and services available via our Service may include materials from third-parties.</Typography>

                                <Typography sx={{ fontSize: '18px' }}>
                                    Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the
                                    content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials,
                                    products, or services of third-parties.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with
                                    any third-party websites. Please review carefully the third-party&apos;s policies and practices and make sure you understand them before you engage in any
                                    transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party
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
                                USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS
                            </Typography>

                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>
                                    If, at our request, you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions,
                                    proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, &apos;comments&apos;), you agree that we may, at any
                                    time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under
                                    no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.
                                </Typography>

                                <Typography sx={{ fontSize: '18px' }}>
                                    We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion are unlawful, offensive, threatening, libelous,
                                    defamatory, pornographic, obscene or otherwise objectionable or violates any party’s intellectual property or these Terms of Service.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary
                                    right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other
                                    malware that could in any way affect the operation of the Service or any related website. You may not use a false e-mail address, pretend to be someone other than
                                    yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We
                                    take no responsibility and assume no liability for any comments posted by you or any third-party.
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
                                PERSONAL INFORMATION
                            </Typography>

                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>Your submission of personal information through the store is governed by our Privacy Policy.</Typography>
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
                                ERRORS, INACCURACIES AND OMISSIONS
                            </Typography>

                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>
                                    Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product
                                    descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or
                                    omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior
                                    notice (including after you have submitted your order).
                                </Typography>

                                <Typography sx={{ fontSize: '18px' }}>
                                    We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information,
                                    except as required by law. No specified update or refresh date applied in the Service or on any related website, should be taken to indicate that all information in
                                    the Service or on any related website has been modified or updated.
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
                                PROHIBITED USES
                            </Typography>

                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>
                                    In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to
                                    solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local
                                    ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm,
                                    defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to
                                    submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect
                                    the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the personal information of
                                    others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security
                                    features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website
                                    for violating any of the prohibited uses.
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
                                DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY
                            </Typography>

                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>
                                    We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.</Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the
                                    service are (except as expressly stated by us) provided &apos;as is&apos; and &apos;as available&apos; for your use, without any representation, warranties or
                                    conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular
                                    purpose, durability, title, and non-infringement.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    In no case shall Athayog Living our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable
                                    for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost
                                    profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict
                                    liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your
                                    use of the service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of
                                    the use of the service or any content (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility. Because
                                    some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our
                                    liability shall be limited to the maximum extent permitted by law.
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
                                INDEMNIFICATION
                            </Typography>

                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>
                                    You agree to indemnify, defend and hold harmless Athayog Living and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors,
                                    licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys’ fees, made by any
                                    third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the
                                    rights of a third-party.
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
                                SEVERABILITY
                            </Typography>

                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>
                                    In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to
                                    the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall
                                    not affect the validity and enforceability of any other remaining provisions.
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
                                TERMINATION
                            </Typography>

                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>
                                    The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you
                                    no longer wish to use our Services, or when you cease using our site.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this
                                    agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you
                                    access to our Services (or any part thereof).
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
                                ENTIRE AGREEMENT
                            </Typography>

                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>
                                    The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding
                                    between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written,
                                    between you and us (including, but not limited to, any prior versions of the Terms of Service).
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.</Typography>
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
                                GOVERNING LAW
                            </Typography>

                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>
                                    These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India and
                                    jurisdiction of Bengaluru, Karnataka
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
                                CHANGES TO TERMS OF SERVICE
                            </Typography>

                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>You can review the most current version of the Terms of Service at any time at this page.</Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is
                                    your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any
                                    changes to these Terms of Service constitutes acceptance of those changes.
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
                                CONTACT INFORMATION
                            </Typography>

                            <Stack gap="15px" marginTop="20px">
                                <Typography sx={{ fontSize: '18px' }}>Questions about the Terms of Service should be sent to us at info@athayogliving.com.</Typography>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            )}
        </section>
    )
}

export default Privacy
