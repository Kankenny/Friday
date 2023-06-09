// Hooks
import { useLocation, Outlet, Navigate } from "react-router-dom"
import useAuthContext from "../../../../lib/hooks/redux-hook/useAuthContext"

const RequireUnauth = () => {
  const { isLoggedIn } = useAuthContext()

  const location = useLocation()

  return !isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  )
}

export default RequireUnauth
