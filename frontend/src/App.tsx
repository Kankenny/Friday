import { Routes, Route } from "react-router-dom"

import LandingPage from "./components/routes/LandingPage"
import Home from "./components/routes/Home"
import Playground from "./components/routes/Playground"
import PageNotFound from "./components/routes/404Page"
import RouterLink from "./components/ui/RouterLink"

function App() {
  return (
    <>
      <div className="space-x-4">
        <RouterLink to="/" routerLinkText="Landing Page" />
        <RouterLink to="/app" routerLinkText="App" />
        <RouterLink to="/playground" routerLinkText="Playground" />
        <RouterLink to="*" routerLinkText="404 Page" />
      </div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<Home />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
