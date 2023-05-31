import React, { useContext, useEffect } from "react"
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { AppStyle } from './app-style'
import './app.css'
import { HomeView } from '../modules'
import LoadingContextProvider from "store2/loading-context-provider"

export const App = () => {
   
    return (
        <ThemeProvider theme={AppStyle}>
            <LoadingContextProvider>

                <Router>
                    <HomeView />
                </Router>
            </LoadingContextProvider>

        </ThemeProvider>
    )

}