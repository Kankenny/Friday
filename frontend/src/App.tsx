import { Routes, Route } from "react-router-dom"

import LandingPage from "./components/routes/LandingPage"
import Home from "./components/routes/Home"
import Playground from "./components/routes/Playground"
import PageNotFound from "./components/routes/404Page"
import RouterLink from "./components/ui/RouterLink"
import Body from "./components/layout/body/Body"

function App() {
  return (
    <>
      {/* Wrap RouterLinks with Header*/}
      <div className="space-x-4">
        <RouterLink to="/" routerLinkText="Landing Page" />
        <RouterLink to="/app" routerLinkText="App" />
        <RouterLink to="/404Error" routerLinkText="404 Page" />
        <RouterLink to="/playground" routerLinkText="Playground" />
      </div>
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
