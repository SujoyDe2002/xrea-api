// import { Grid } from '@mui/material'
// import React from 'react'
// import './frame-homepagewiththesearchbarandthetotallistofclu.css'
// import SectionCard from './SectionCard'
// import { Link } from 'react-router-dom'

import { Box, Grid, Stack, Typography } from "@mui/material"
import { SectionCard } from "."
import { Link } from "react-router-dom"
import { InfoSearch, cardImageContainer, homeCardDes, homeCardHeading1, imageBox, infoCardImageGrid, infoDes, savedSeacrhCriteria } from "app"

export const InfoCard = ({ children }) => {
  return (
    <SectionCard >
      <>
        <Grid container spacing={0}>
          <Grid item xs={12} md={9}>
            <Box >
              <Typography sx={homeCardHeading1}>
                Instantly Characterize Markets using XREA’s breakthrough algorithms, knowledge base and AI technology.
              </Typography>
              <Box sx={{ display: { xs: "none", md: "block" } }}>

                <Typography sx={InfoSearch}>
                  Try some sample searches:
                </Typography>

                <div >
                  <div className="frame-homepagewiththesearchbarandthetotallistofclu-emptystatesuggestion_custom">
                    <Typography sx={savedSeacrhCriteria} >
                      <span>

                        <Link to={{
                          pathname: "/search", state: {
                            id: 1

                          }
                        }}>
                          Young Professionals and Couples with Young Kids analysis for
                          Peoria, IL
                        </Link>
                      </span>
                    </Typography>
                    {/* </div>
                <div className="frame-homepagewiththesearchbarandthetotallistofclu-emptystatesuggestion_custom"> */}
                    <Typography sx={savedSeacrhCriteria} >
                      <Link to={{
                        pathname: "/search", state: { id: 2 }
                      }}>
                        <span>All Uses for Peoria, IL</span>
                      </Link>
                    </Typography>
                  </div>
                  <div className="frame-homepagewiththesearchbarandthetotallistofclu-emptystatesuggestion_custom">
                    <Typography sx={savedSeacrhCriteria} >
                      <span>
                        <Link to={{
                          pathname: "/search", state: { id: 3 }
                        }}>
                          Young Professionals and Couples with Young Kids analysis in
                          multiple locations
                        </Link>
                      </span>
                    </Typography>
                  </div>
                </div>
              </Box>
              <Box sx={{ display: { xs: "block", md: "none" } }}>
                <Typography sx={infoDes}>
                  We take pertinent demand and supply data, and apply econometric techniques and real estate expertise to deliver decision-ready insights.
                </Typography>
                <Typography sx={infoDes}>
                  We’ve aggregated the highest quality data and applied our algorithms on nearly every city and zip-code in the United States.
                </Typography>
              </Box>
            </Box>

          </Grid>
          <Grid sx={infoCardImageGrid} item md={3}>

            <Stack sx={cardImageContainer}>
              <Box sx={imageBox}>

                <img
                  src="/playground_assets/search.svg"
                  alt="image3124"
                  className="frame-homepagewiththesearchbarandthetotallistofclu-image3 align_right"
                />
              </Box>
            </Stack>
          </Grid>


        </Grid>

      </>
    </SectionCard>

  )
}
