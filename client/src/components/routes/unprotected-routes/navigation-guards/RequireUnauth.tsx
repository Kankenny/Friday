// Hooks
import { useLocation, Outlet, Navigate } from "react-router-dom"
import { useTypedSelector } from "../../../../lib/hooks/redux-hook/useRedux"

const RequireUnauth = () => {
  const { isLoggedIn } = useTypedSelector((state) => state.auth)

  const location = useLocation()

  return !isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  )
}

export default RequireUnauth
