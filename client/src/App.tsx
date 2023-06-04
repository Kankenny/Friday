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
import Register from "./components/routes/unprotected-routes/register/Register"
import ForgotPassword from "./components/routes/unprotected-routes/forgot-password/ForgotPassword"
import SecurityAnswer from "./components/routes/unprotected-routes/forgot-password/SecurityAnswer"

// Container Component
import AppContainer from "./AppContainer"
import ResetPassword from "./components/routes/unprotected-routes/forgot-password/ResetPassword"
import Profile from "./components/routes/protected-routes/profile/Profile"

function App() {
  return (
    <AppContainer>
      <Header />
      <Body>
        <Routes>
          {/* Unprotected Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/security-answer" element={<SecurityAnswer />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/playground" element={<Playground />} />
          {/* Protected Routes */}
          <Route path="/profile" element={<Profile />} />

          {/* Catch-all  Routes */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Body>
      <Footer />
    </AppContainer>
  )
}

export default App
