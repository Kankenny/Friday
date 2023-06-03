// Hooks
import useAuthContext from "../../../lib/hooks/context-hooks/useAuthContext"

// Components
import RouterDiv from "../../ui/RouterDiv"
import RouterLink from "../../ui/RouterLink"
import Logo from "../../ui/Logo"

const Header = () => {
  const { isLoggedIn } = useAuthContext()
  return (
    <header className="bg-secondary flex justify-between items-center px-4 py-4">
      <RouterDiv to="/">
        <Logo />
      </RouterDiv>
      {isLoggedIn ? <AuthenticatedHeader /> : <UnauthenticatedHeader />}
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
    <nav className="space-x-4 hidden md:block">
      <RouterLink to="/app" routerLinkText="Home" twClasses="text-lg" />
      <RouterLink to="/profile" routerLinkText="Profile" twClasses="text-lg" />
    </nav>
  )
}
