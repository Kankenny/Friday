import { Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { persistLogin } from "./lib/store/slices/auth-slice/authSlice"
import { setUserDetails } from "./lib/store/slices/profile-slice/profileSlice"
import { useTypedSelector } from "./lib/hooks/redux-hook/useTypedSelector"
import userAPI from "./lib/services/axios-instances/userAPI"
import { setTimeline } from "./lib/store/slices/timeline-slice/timelineSlice"

// Routes
import LandingPage from "./components/routes/unprotected-routes/landing-page/LandingPage"
import Playground from "./components/routes/unprotected-routes/playground/Playground"
import PageNotFound from "./components/routes/catch-all-routes/404-page/404Page"
import Body from "./components/layout/body/Body"
import Header from "./components/layout/header/Header"
import Footer from "./components/layout/footer/Footer"
import Login from "./components/routes/unprotected-routes/login/Login"
import Register from "./components/routes/unprotected-routes/register/Register"
import ForgotPassword from "./components/routes/unprotected-routes/forgot-password/ForgotPassword"
import SecurityAnswer from "./components/routes/unprotected-routes/forgot-password/SecurityAnswer"
import ResetPassword from "./components/routes/unprotected-routes/forgot-password/ResetPassword"
import Profile from "./components/routes/protected-routes/profile/Profile"
import Timeline from "./components/routes/protected-routes/home/timeline/Timeline"
import Workspace from "./components/routes/protected-routes/home/workspace/Workspace"

// Container Component
import AppContainer from "./AppContainer"
import RequireAuth from "./components/routes/protected-routes/navigation-guards/RequireAuth"
import RequireUnauth from "./components/routes/unprotected-routes/navigation-guards/RequireUnauth"
import ProfileLayout from "./components/routes/protected-routes/profile/layout/ProfileLayout"
import HomeLayout from "./components/routes/protected-routes/home/home-layout/HomeLayout"
import timelineAPI from "./lib/services/axios-instances/timelineAPI"

function App() {
  const dispatch = useDispatch()
  const { _id } = useTypedSelector((state) => state.auth)

  useEffect(() => {
    dispatch(persistLogin())
    const fetchUserDetails = async () => {
      try {
        const { data } = await userAPI.get(`/${_id}`)
        dispatch(setUserDetails(data.data))
      } catch (err) {
        console.log(err)
        throw new Error("Failed to fetch user details")
      }
    }

    const fetchUserTimeline = async () => {
      try {
        const { data } = await timelineAPI.get(`/`)
        dispatch(setTimeline(data.data))
      } catch (err) {
        console.log(err)
        throw new Error("Failed to fetch user timeline")
      }
    }

    if (_id) {
      fetchUserDetails()
      fetchUserTimeline()
    }
  }, [dispatch, _id])

  return (
    <AppContainer>
      <Header />
      <Body>
        <Routes>
          {/* Unprotected Routes */}
          <Route element={<RequireUnauth />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/security-answer" element={<SecurityAnswer />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/playground" element={<Playground />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route element={<HomeLayout />}>
              <Route path="/app" element={<Timeline />} />
              <Route path="/app/workspace" element={<Workspace />} />
            </Route>
            <Route element={<ProfileLayout />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>

          {/* Catch-all  Routes */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Body>
      <Footer />
    </AppContainer>
  )
}

export default App
