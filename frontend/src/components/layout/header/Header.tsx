import RouterLink from "../../ui/RouterLink"

const Header = () => {
  return (
  <header className = "bg-main flex justify-between items-center">
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
