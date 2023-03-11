import RouterDiv from "../../ui/RouterDiv"
import RouterLink from "../../ui/RouterLink"

const Header = () => {
  return (
    <header className="bg-secondary flex justify-between items-center px-4 py-4 rounded-b-lg">
      <RouterDiv to="/">friday</RouterDiv>
      {/* Nav is hidden at the smallest screen but visible when it hits the
      medium(md) breakpoint. We will support mobile view someday using
      this */}
      <nav className="space-x-4 hidden md:block">
        <RouterLink to="/app" routerLinkText="App" />
        <RouterLink to="/playground" routerLinkText="Playground" />
      </nav>
    </header>
  )
}

export default Header
