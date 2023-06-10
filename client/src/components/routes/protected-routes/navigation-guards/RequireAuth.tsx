// Hooks
import { useLocation, Outlet, Navigate } from "react-router-dom"
import { useTypedSelector } from "../../../../lib/hooks/redux-hook/useTypedSelector"

const RequireAuth = () => {
  const { isLoggedIn } = useTypedSelector((state) => state.auth)

  const location = useLocation()

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth
