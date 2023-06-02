import { Routes, Route } from "react-router-dom"

// Routes
import LandingPage from "./components/routes/unprotected-routes/landing-page/LandingPage"
import Home from "./components/routes/unprotected-routes/home/Home"
import Playground from "./components/routes/unprotected-routes/playground/Playground"
import PageNotFound from "./components/routes/catch-all-routes/404-page/404Page"
import Body from "./components/layout/body/Body"
import Header from "./components/layout/header/Header"
import Footer from "./components/layout/footer/Footer"
import Login from "./components/routes/unprotected-routes/login/Login"

function App() {
  return (
    <>
      <Header />
      <Body>
        <Routes>
          {/* Unprotected Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<Home />} />
          <Route path="/playground" element={<Playground />} />

          {/* Protected Routes */}
          <Route path="/login" element={<Login />} />

          {/* Catch-all  Routes */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Body>
      <Footer />
    </>
  )
}

export default App
