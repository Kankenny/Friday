import { Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { persistLogin } from "./lib/store/slices/auth-slice/authSlice"
import { setUserDetails } from "./lib/store/slices/same-profile-slice/sameProfileSlice"
import { useTypedSelector } from "./lib/hooks/redux-hook/useTypedSelector"
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
import Timeline from "./components/routes/protected-routes/home/timeline/Timeline"
import Workspace from "./components/routes/protected-routes/home/workspace/Workspace"
import UserPosts from "./components/routes/protected-routes/profile/user-posts/UserPosts"
import SavedPosts from "./components/routes/protected-routes/profile/saved-posts/SavedPosts"
import SharedPosts from "./components/routes/protected-routes/profile/shared-posts/SharedPosts"

// Container Component
import AppContainer from "./AppContainer"
import RequireAuth from "./components/routes/protected-routes/navigation-guards/RequireAuth"
import RequireUnauth from "./components/routes/unprotected-routes/navigation-guards/RequireUnauth"
import ProfileLayout from "./components/routes/protected-routes/profile/layout/ProfileLayout"
import HomeLayout from "./components/routes/protected-routes/home/home-layout/HomeLayout"

// Services
import userAPI from "./lib/services/axios-instances/userAPI"
import timelineAPI from "./lib/services/axios-instances/timelineAPI"
import LikedPosts from "./components/routes/protected-routes/profile/liked-posts/LikedPosts"

function App() {
  const dispatch = useDispatch()
  const { _id } = useTypedSelector((state) => state.auth)

  useEffect(() => {
    dispatch(persistLogin())

    const fetchData = async () => {
      try {
        const userDetailsPromise = userAPI.get(`/${_id}`)
        const userTimelinePromise = timelineAPI.get(`/`)

        const [userDetailsResponse, userTimelineResponse] = await Promise.all([
          userDetailsPromise,
          userTimelinePromise,
        ])

        const userDetails = userDetailsResponse.data.data
        const userTimeline = userTimelineResponse.data.data

        dispatch(setUserDetails(userDetails))
        dispatch(setTimeline(userTimeline))
      } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch user details or user timeline")
      }
    }

    if (_id) {
      fetchData()
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
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/workspace" element={<Workspace />} />
            </Route>
            <Route element={<ProfileLayout />}>
              <Route path="/users/:username" element={<UserPosts />} />
              <Route path="/users/:username/posts" element={<UserPosts />} />
              <Route
                path="/users/:username/saved-posts"
                element={<SavedPosts />}
              />
              <Route
                path="/users/:username/shared-posts"
                element={<SharedPosts />}
              />
              <Route
                path="/users/:username/liked-posts"
                element={<LikedPosts />}
              />
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
