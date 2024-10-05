import { Box, Divider, List, ListItem, Stack, Typography } from '@mui/material'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Refund Policy | Athayog',
    description: 'Athayog Refund Policy',
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
                    REFUND POLICY
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
                            Certain aspects of the service may be provided for a
                            fee or other charges. If you elect to use paid
                            aspects of the service, you agree to the terms of
                            sale, pricing, payment and billing policies
                            applicable to such fees and charges. Athayog Living
                            may add new services for additional fees and
                            charges, or amend the same for existing services, at
                            any time in its sole discretion.
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
                            You may cancel your service or course at any time;
                            however, there are no refunds for cancellation. In
                            the event that Athayog Living suspends or terminates
                            your account or this agreement, you understand and
                            agree that you shall receive no refund or exchange
                            for any unused time on a subscription, any license
                            or subscription fees for any portion of the service,
                            any content or data associated with your account, or
                            for anything else.
                        </Typography>

                        <ol style={{ fontSize: '18px' }}>
                            <li>
                                At Athayog Living, we have a clear ‘No Refund
                                Policy’. Once yoga centre membership/course is
                                purchased online on our platform, there will be
                                no refund. Thus, the buyer is advised to make an
                                informed decision while making a purchase on our
                                platform.
                            </li>
                            <li>
                                Membership once purchased is not transferable
                            </li>
                            <li>
                                Please note that Athayog Living&apos;s decision
                                on any refund & cancellation policy shall be
                                final & binding.
                            </li>
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
                            Membership/Course cancellation received before said
                            service has been used you may be eligible a full
                            refund. Cancellations received after the stated
                            deadline will not be eligible for a refund.
                        </Typography>
                        <Typography sx={{ fontSize: '18px' }}>
                            Cancellations will be accepted via phone or e-mail,
                            and must be received by the stated cancellation
                            deadline. In addition:
                        </Typography>
                        <ol style={{ fontSize: '18px' }}>
                            <li>
                                All refund requests must be made by the member
                                or credit card holder.
                            </li>
                            <li>
                                Refund requests must include the name of the
                                member and/or transaction number.
                            </li>
                            <li>
                                Refunds will be credited back to the original
                                credit card used for payment.
                            </li>
                        </ol>
                        <Typography sx={{ fontSize: '18px' }}>
                            We will also notify you of the approval or rejection
                            of your refund. If you are approved, then your
                            refund will be processed, and a credit will
                            automatically be applied to your credit card or
                            original method of payment, within a certain 5 - 10
                            Buisness Days
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
                            If you haven’t received a refund yet, first check
                            your bank account again. Then contact your credit
                            card company, it may take some time before your
                            refund is officially posted.
                        </Typography>

                        <Typography sx={{ fontSize: '18px' }}>
                            Next contact your bank. There is often some
                            processing time before a refund is posted. If you’ve
                            done all of this and you still have not received
                            your refund yet, please contact us at
                            info@athayogliving.com.
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default Privacy
