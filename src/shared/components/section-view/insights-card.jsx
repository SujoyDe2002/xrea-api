import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import { SectionCard } from "."
import { buttonStyle, cardImageContainer, homeCardDes, homeCardHeading1, imageBox } from "app"
import { useHistory } from "react-router-dom";


export const InsightCard = ({ children }) => {
    let history = useHistory();
    const goToPricing = () => {
      history.push("/pricing");
    }
    return (
        <SectionCard >
            <>
                <Grid container spacing={"1.2rem"}>

                    <Grid item xs={12} md={3}>
                        <Stack sx={cardImageContainer}>
                            <Box sx={imageBox}>

                                <img
                                    src="/playground_assets/piechart.svg"
                                    alt="image5144"
                                    className="frame-homepagewiththesearchbarandthetotallistofclu-image3"
                                />
                            </Box>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={9}>
                        <div >
                            <Typography sx={homeCardHeading1}>
                                View Insights, Not 100’s of Disparate Data Points
                            </Typography>
                            <Typography sx={homeCardDes}>
                                We take pertinent demand and supply data, and apply econometric techniques and real estate expertise to deliver decision-ready insights.
                            </Typography>
                            <Typography sx={homeCardDes}>
                                We’ve aggregated the highest quality data and applied our algorithms on nearly every city and zip-code in the United States.
                            </Typography>
                        </div>
                        <Stack mt={1} flexDirection={"row"} justifyContent={"right"}>
                            <Button sx={buttonStyle} variant='contained' onClick={goToPricing}> Learn More</Button>
                        </Stack>

                    </Grid>
                </Grid>

            </>
        </SectionCard>

    )
}