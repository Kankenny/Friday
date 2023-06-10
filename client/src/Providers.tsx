// Dependencies
import React from "react"
import { Provider } from "react-redux"

// Providers
import { BrowserRouter as Router } from "react-router-dom"
import { StyledEngineProvider } from "@mui/material"

// Global Context
import store from "./lib/store/store"

type Props = {
  children: React.ReactNode
}

const Providers = ({ children }: Props) => {
  return (
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    </StyledEngineProvider>
  )
}

export default Providers
