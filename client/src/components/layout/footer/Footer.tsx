// Hooks
import { useTypedSelector } from "../../../lib/hooks/redux-hook/useTypedSelector"

// Components
import Logo from "../../ui/Logo"
import RouterDiv from "../../ui/RouterDiv"
import RouterLink from "../../ui/RouterLink"

const Footer = () => {
  const { isLoggedIn } = useTypedSelector((state) => state.auth)

  return (
    <footer className="bg-secondary w-full p-4 space-y-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 text-center md:text-left">
        {isLoggedIn ? <AuthenticatedFooter /> : <UnauthenticatedFooter />}
        <div>
          <RouterDiv to={!isLoggedIn ? "/" : "/app/timeline"}>
            <Logo />
          </RouterDiv>
        </div>
      </div>
    </footer>
  )
}

export default Footer

const UnauthenticatedFooter = () => {
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

const AuthenticatedFooter = () => {
  return (
    <nav className="flex flex-col md:flex-row gap-4 items-center">
      <RouterLink to="/app" routerLinkText="Home" twClasses="text-lg" />
    </nav>
  )
}
