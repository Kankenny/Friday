import RouterLink from "../../ui/RouterLink"

const Header = () => {
  return (
  <header className = "bg-white flex justify-between items-center">
    <div className = "font-bold text-xl">friday</div>
    <nav> 
    <div className="space-x-4">
        <RouterLink to="/" routerLinkText="Landing Page" />
        <RouterLink to="/app" routerLinkText="App" />
        <RouterLink to="/404Error" routerLinkText="404 Page" />
        <RouterLink to="/playground" routerLinkText="Playground" />
      </div>
    </nav>
  </header>
  )
}

export default Header
