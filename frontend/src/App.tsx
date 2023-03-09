import { Routes, Route } from "react-router-dom"

import LandingPage from "./components/routes/LandingPage"
import Home from "./components/routes/Home"
import Playground from "./components/routes/Playground"
import PageNotFound from "./components/routes/404Page"
import Body from "./components/layout/body/Body"
import Header from "./components/layout/header/Header"

function App() {
  return (
    <>
      <Header/>
      <Body>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/playground" element={<Playground />} />
        </Routes>
      </Body>
      {/* Wrap future content below with Footer */}
    </>
  )
}

export default App
