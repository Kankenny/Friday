// Hooks
import { useTypedSelector } from "../../../lib/hooks/redux-hook/useTypedSelector"

// Components
import RouterDiv from "../../ui/RouterDiv"
import RouterLink from "../../ui/RouterLink"
import Logo from "../../ui/Logo"
import NotificationMenu from "./authenticated-components/NotificationIcon"
import AvatarMenu from "./authenticated-components/AvatarMenu"

const Header = () => {
  const { isLoggedIn } = useTypedSelector((state) => state.auth)

  return (
    <header className="bg-secondary w-full">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        <RouterDiv to={!isLoggedIn ? "/" : "/app/timeline"}>
          <Logo />
        </RouterDiv>
        {isLoggedIn ? <AuthenticatedHeader /> : <UnauthenticatedHeader />}
      </div>
    </header>
  )
}

export default Header

const UnauthenticatedHeader = () => {
  return (
    <nav className="space-x-4 hidden md:block">
      <RouterLink to="/app" routerLinkText="Home" twClasses="text-lg" />
      <RouterLink to="/login" routerLinkText="Login" twClasses="text-lg" />
      <RouterLink
        to="/playground"
        routerLinkText="Playground"
        twClasses="text-lg"
      />
    </nav>
  )
}

const AuthenticatedHeader = () => {
  return (
    <nav className="space-x-4 hidden md:flex md:items-center">
      <RouterLink to="/app" routerLinkText="Home" twClasses="text-lg" />
      <NotificationMenu options={["test"]} />
      <AvatarMenu />
    </nav>
  )
}
