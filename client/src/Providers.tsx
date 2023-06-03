// Dependencies
import React from "react"

// Providers
import { BrowserRouter as Router } from "react-router-dom"
import { StyledEngineProvider } from "@mui/material"
import AuthContextProvider from "./lib/store/AuthContext"

type Props = {
  children: React.ReactNode
}

const Providers = ({ children }: Props) => {
  return (
    <StyledEngineProvider injectFirst>
      <Router>
        <AuthContextProvider>{children}</AuthContextProvider>
      </Router>
    </StyledEngineProvider>
  )
}

export default Providers
