// Hooks
import { useTypedSelector } from "../../../lib/hooks/redux-hook/useTypedSelector"

// Components
import Logo from "../../ui/Logo"
import RouterDiv from "../../ui/RouterDiv"
import RouterLink from "../../ui/RouterLink"

const Footer = () => {
  const { isLoggedIn } = useTypedSelector((state) => state.auth)

  return (
    <footer className="bg-secondary w-full space-y-8 p-4">
      <div className="container mx-auto flex flex-col items-center justify-between space-y-8 text-center md:flex-row md:space-y-0 md:text-left">
        {isLoggedIn ? <AuthenticatedFooter /> : <UnauthenticatedFooter />}
        <div>
          <RouterDiv to={!isLoggedIn ? "/" : "/timeline"}>
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
    <nav className="flex flex-col items-center gap-4 md:flex-row">
      <RouterLink to="/" routerLinkText="Home" twClasses="text-lg" />
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
    <nav className="flex flex-col items-center gap-4 md:flex-row">
      <RouterLink to="/timeline" routerLinkText="Home" twClasses="text-lg" />
    </nav>
  )
}
