import Logo from "../../ui/Logo"
import RouterDiv from "../../ui/RouterDiv"
import RouterLink from "../../ui/RouterLink"

const Footer = () => {
  return (
    <footer className="text-white bg-secondary justify-between items-center p-4 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 text-center md:text-left">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <RouterLink to="/" routerLinkText="Home" twClasses="text-lg" />
          <RouterLink to="/app" routerLinkText="App" twClasses="text-lg" />
          <RouterLink
            to="/playground"
            routerLinkText="Playground"
            twClasses="text-lg"
          />
        </div>
        <div>
          <RouterDiv to="/app">
            <Logo />
          </RouterDiv>
        </div>
      </div>
      <div className="text-sm text-center md:text-left">
        <p>Copyright ©</p>
      </div>
    </footer>
  )
}

export default Footer
