import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { Stack } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import PageHeading1 from 'shared/utils/page-headings/page-heading1';
import { AppStyle } from 'app';
import ContentWrapper from 'shared/utils/layout/content-wrapper';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const tiers = [
    {
        title: 'Free',
        price: '19',
        description: [
            'Consequat ex proident',
            'Deserunt sit cupidatat',
            'Amet id ea et nisi cillum '
        ],
        buttonText: 'Get started',
        buttonVariant: 'outlined',
        priceTitle: 'Basic'
    },
    {
        title: 'Most popular',
        subheader: 'Most popular',
        price: '59',
        description: [
            'I’m editing text here',
            'Deserunt sit cupidatat adipisicing',
            'Amet id ea et nisi cillum consectetur',
            'Excepteur nisi eiusmod proident',
            'Magna eu anim commodo qui nisif'
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
        priceTitle: 'Essential'
    },
    {
        title: 'Enterprise',
        price: '119',
        description: [
            'Consequat ex proident',
            'Deserunt sit cupidatat',
            'Amet id ea et nisi cillum '
        ],
        buttonText: 'Get started',
        buttonVariant: 'outlined',
        priceTitle: 'Premium'
    },
];
const footers = [
    {
        title: 'Company',
        description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
        title: 'Features',
        description: [
            'Cool stuff',
            'Random feature',
            'Team feature',
            'Developer stuff',
            'Another one',
        ],
    },
    {
        title: 'Resources',
        description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    },
    {
        title: 'Legal',
        description: ['Privacy policy', 'Terms of use'],
    },
];

export const PricingContent = () => {


    return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />

            <Box sx={{
                // background: 'antiquewhite',
                height: 'calc(100% - 100px)',
                // position: 'absolute',
                // top: '87px',
                width: "100%",
                paddingBottom: "32px",
                backgroundColor: AppStyle.palette.common.white
            }}>

                <ContentWrapper>
                    {/* Hero unit */}
                    <Container disableGutters sx={{ pt: 2, pb: 6 }}>
                        {/* to do page heading */}
                        {/* <PageHeading1 /> */}
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            sx={{ fontSize: '3.7vw', lineHeight: '150%' }}
                            gutterBottom
                        >
                            Upgrade your XREA Experience

                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" component="p" sx={{ width: '70%', margin: 'auto', fontSize: {xs:".95rem", md:"1.158vw"} }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                        </Typography>
                    </Container>
                    {/* End hero unit */}
                    <Box sx={{ padding: "24px", maxWidth: "1317px", margin: "auto", padding: '0' }}>
                        <Grid container spacing={0} alignItems="center">
                            {tiers.map((tier) => (
                                // Enterprise card is full width at sm breakpoint
                                <Grid
                                    item
                                    key={tier.title}
                                    xs={12}
                                    // sm={tier.title === 'Enterprise' ? 12 : 6}
                                    // md={tier.title === 'Most popular' ? 5 : 3.5}
                                    // sm={tier.title === 'Enterprise' ? 12 : 6}
                                    md={tier.title === 'Most popular' ? 5 : 3.5}
                                    sx={{
                                        bottom: '16px'
                                    }}
                                >
                                    <Card sx={{
                                        border: tier.title === 'Most popular' ? '2px solid #3478D6' : 'none',
                                        borderRadius: '12px',
                                        height: tier.title === 'Most popular' ? '100%' : '65.47%',
                                        margin: "10px 0"
                                    }}>
                                        <CardHeader
                                            title={tier.title}
                                            // subheader={tier.subheader}
                                            titleTypographyProps={{ align: 'center', fontWeight: '700', color: 'white', fontSize: { md:"1.2vw"} }}
                                            action={tier.title === 'Most popular'}
                                            subheaderTypographyProps={{
                                                align: 'center',

                                            }}
                                            sx={{
                                                backgroundColor: (theme) =>
                                                    theme.palette.mode === 'light'
                                                        ? '#3478D6'
                                                        : theme.palette.grey[700],
                                                display: tier.title === 'Most popular' ? 'visible' : 'none',
                                                fontWeight: '700'
                                            }}
                                        />
                                        <CardContent sx={{
                                            padding: '0', "&:last-child": {
                                                padding: 0
                                            }
                                        }}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'baseline',
                                                    mb: 2,
                                                    padding: '2rem 40px',
                                                    height: { xs: "fit-content", lg: tier.title === 'Most popular' ? '16rem' : '11.5rem' }
                                                }}
                                            >
                                                <Stack>
                                                    <Typography component="h2" variant="h3" sx={{ fontWeight: '700', fontSize:  {xs:"3.78vw", md: tier.title === 'Most popular' ? '2.78vw' : '1.86vw'}, textAlign: "center" }} color="text.primary">
                                                        {tier.priceTitle}
                                                    </Typography>
                                                    <Typography component="h2" variant="h3" sx={{ fontSize: {xs: "4vw", md: tier.title === 'Most popular' ? '4.65vw' : '2.78vw'} , fontWeight: '700' }} color="text.primary">
                                                        ${tier.price + " "}
                                                        <Typography variant="span" sx={{ fontSize: {xs:'4vw', md: "1.5rem"}, fontWeight: '400' }} color="text.secondary">
                                                            /month
                                                        </Typography>
                                                    </Typography>
                                                </Stack>


                                            </Box>
                                            <Box
                                                sx={{
                                                    display: 'block',
                                                    justifyContent: 'center',
                                                    alignItems: 'baseline',
                                                    mb: 2,
                                                    margin: '0',
                                                    padding: '1rem 2rem',
                                                    background: '#F5F5F5',

                                                }}
                                            >
                                                <Stack sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
                                                    {tier.description.map((line) => (

                                                        <Stack sx={{ flexDirection: 'row' }}>

                                                            <Box sx={{ display: 'flex', ml: 1 }}>
                                                                <img className='image' sx={{
                                                                    position: 'relative',
                                                                    top: '16%',
                                                                    scale: '2'
                                                                }} src='/playground_assets/pricing_check.svg' />
                                                            </Box>


                                                            <Typography

                                                                variant="subtitle1"
                                                                align="center"
                                                                key={line}
                                                                sx={{ lineHeight: { xs: '1.75', lg: '2.75' }, fontSize: {xs:".95rem", md:"1.18vw"}, textAlign: 'left', marginLeft: '1rem' }}
                                                            >
                                                                {line}
                                                            </Typography>

                                                        </Stack>


                                                    ))}
                                                </Stack>

                                                <Button
                                                    fullWidth
                                                    variant={tier.buttonVariant}
                                                    sx={{
                                                        padding: '1rem 1.5rem',
                                                        marginTop: '1rem',
                                                        background: tier.title === 'Most popular' ? '#3478D6' : 'rgba(129, 144, 187, 0.2)',
                                                        borderRadius: '8px',
                                                        fontSize: { xs:"0.875rem",  md:".9vw"}
                                                    }}
                                                >
                                                    {tier.buttonText}
                                                </Button>
                                            </Box>

                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </ContentWrapper>

            </Box>


            {/* Footer */}
            {/* <Container
                maxWidth="md"
                component="footer"
                sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    mt: 8,
                    py: [3, 6],
                }}
            >
                <Grid container spacing={4} justifyContent="space-evenly">
                    {footers.map((footer) => (
                        <Grid item xs={6} sm={3} key={footer.title}>
                            <Typography variant="h6" color="text.primary" gutterBottom>
                                {footer.title}
                            </Typography>
                            <ul>
                                {footer.description.map((item) => (
                                    <li key={item}>
                                        <Link href="#" variant="subtitle1" color="text.secondary">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Grid>
                    ))}
                </Grid>
                <Copyright sx={{ mt: 5 }} />
            </Container> */}
            {/* End footer */}
        </React.Fragment >
    );
}
