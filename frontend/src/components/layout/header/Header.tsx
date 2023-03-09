import RouterDiv from "../../ui/RouterDiv"
import RouterLink from "../../ui/RouterLink"

const Header = () => {
  return (
  <header className = "bg-white flex justify-between items-center">
    <RouterDiv to={"/"}>friday</RouterDiv>
    <nav> 
    <div className="space-x-4">
        <RouterLink to="/" routerLinkText="Landing Page" />
        <RouterLink to="/app" routerLinkText="App" />
        <RouterLink to="/playground" routerLinkText="Playground" />
      </div>
    </nav>
  </header>
  )
}

export default Header
