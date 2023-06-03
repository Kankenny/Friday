import RouterDiv from "../../ui/RouterDiv"
import RouterLink from "../../ui/RouterLink"
import Logo from "../../ui/Logo"

const Header = () => {
  return (
    <header className="bg-secondary flex justify-between items-center px-4 py-4">
      <RouterDiv to="/app">
        <Logo />
      </RouterDiv>
      {/* Nav is hidden at the smallest screen but visible when it hits the
      medium(md) breakpoint. We will support mobile view someday using
      this */}
      <nav className="space-x-4 hidden md:block">
        <RouterLink to="/" routerLinkText="Home" twClasses="text-lg" />
        <RouterLink to="/login" routerLinkText="Login" twClasses="text-lg" />
        <RouterLink
          to="/playground"
          routerLinkText="Playground"
          twClasses="text-lg"
        />
      </nav>
    </header>
  )
}

export default Header
