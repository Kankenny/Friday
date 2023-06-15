// Hooks
import { useLocation, Outlet, Navigate } from "react-router-dom"
import { useTypedSelector } from "../../../../lib/hooks/redux-hook/useTypedSelector"

const RequireUnauth = () => {
  const { isLoggedIn } = useTypedSelector((state) => state.auth)
  const location = useLocation()

  return !isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/app/workspace" state={{ from: location }} replace />
  )
}

export default RequireUnauth
