// Hooks
import { useState, useEffect } from "react"
import { useTypedSelector } from "../../../lib/hooks/redux-hook/useTypedSelector"

// Components
import RouterDiv from "../../ui/RouterDiv"
import RouterLink from "../../ui/RouterLink"
import Logo from "../../ui/Logo"
import NotificationMenu from "./authenticated-components/NotificationIcon"
import AvatarMenu from "./authenticated-components/AvatarMenu"

const Header = () => {
  const { isLoggedIn } = useTypedSelector((state) => state.auth)

  const [isTop, setIsTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsTop(scrollTop === 0)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <header
        className={`bg-secondary fixed z-50 w-full duration-500  ${
          isTop
            ? "bg-opacity-100 p-4"
            : "bg-opacity-[90%] px-2 py-1 backdrop-blur-sm backdrop-filter"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between ">
          <RouterDiv to={!isLoggedIn ? "/" : "/timeline"}>
            <Logo />
          </RouterDiv>
          {isLoggedIn ? <AuthenticatedHeader /> : <UnauthenticatedHeader />}
        </div>
      </header>
      {/* Placeholder element */}
      <div className="h-14"></div>
    </>
  )
}

export default Header

const UnauthenticatedHeader = () => {
  return (
    <nav className="hidden space-x-4 md:block">
      <RouterLink to="/timeline" routerLinkText="Home" twClasses="text-lg" />
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
    <nav className="hidden space-x-4 md:flex md:items-center">
      <RouterLink to="/timeline" routerLinkText="Home" twClasses="text-lg" />
      <NotificationMenu options={["test"]} />
      <AvatarMenu />
    </nav>
  )
}
