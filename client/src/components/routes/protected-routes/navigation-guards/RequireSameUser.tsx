// Hooks
import { useLocation, Outlet, Navigate, useParams } from "react-router-dom"
import { useTypedSelector } from "../../../../lib/hooks/redux-hook/useTypedSelector"

const RequireSameUser = () => {
  const { username: currentUsername } = useTypedSelector(
    (state) => state.sameProfile
  )
  const { username: pathUsername } = useParams()
  const isSameUser = currentUsername === pathUsername

  const location = useLocation()

  return isSameUser ? (
    <Outlet />
  ) : (
    <Navigate
      to={`/users/${pathUsername}/followers`}
      state={{ from: location }}
      replace
    />
  )
}

export default RequireSameUser
