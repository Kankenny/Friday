// Hooks
import useAuthContext from "../../../lib/hooks/context-hooks/useAuthContext"

// Components
import Logo from "../../ui/Logo"
import RouterDiv from "../../ui/RouterDiv"
import RouterLink from "../../ui/RouterLink"

const Footer = () => {
  const { isLoggedIn } = useAuthContext()
  return (
    <footer className="text-white bg-secondary justify-between items-center p-4 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 text-center md:text-left">
        {isLoggedIn ? <AuthenticatedHeader /> : <UnauthenticatedHeader />}
        <div>
          <RouterDiv to="/">
            <Logo />
          </RouterDiv>
        </div>
      </div>
    </footer>
  )
}

export default Footer

const UnauthenticatedHeader = () => {
  return (
    <nav className="flex flex-col md:flex-row gap-4 items-center">
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
    <nav className="flex flex-col md:flex-row gap-4 items-center">
      <RouterLink to="/app" routerLinkText="Home" twClasses="text-lg" />
      <RouterLink to="/profile" routerLinkText="Profile" twClasses="text-lg" />
    </nav>
  )
}
