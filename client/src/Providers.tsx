// Dependencies
import React from "react"

// Providers
import { BrowserRouter as Router } from "react-router-dom"
import { StyledEngineProvider } from "@mui/material"

type Props = {
  children: React.ReactNode
}

const Providers = ({ children }: Props) => {
  return (
    <StyledEngineProvider injectFirst>
      <Router>{children}</Router>
    </StyledEngineProvider>
  )
}

export default Providers
