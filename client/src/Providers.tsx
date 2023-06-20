// Dependencies
import React from "react"
import { Provider } from "react-redux"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

// Providers
import { BrowserRouter as Router } from "react-router-dom"
import { StyledEngineProvider } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"

// Global Context
import store from "./lib/store/store"

type Props = {
  children: React.ReactNode
}

const Providers = ({ children }: Props) => {
  return (
    <StyledEngineProvider injectFirst>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider store={store}>
          <Router>{children}</Router>
        </Provider>
      </LocalizationProvider>
    </StyledEngineProvider>
  )
}

export default Providers
