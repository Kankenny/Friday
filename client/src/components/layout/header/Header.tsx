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
        className={`bg-secondary w-full fixed z-50 duration-500  ${
          isTop
            ? "bg-opacity-100 p-4"
            : "bg-opacity-[90%] backdrop-filter backdrop-blur-sm px-2 py-1"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center ">
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
    <nav className="space-x-4 hidden md:block">
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
    <nav className="space-x-4 hidden md:flex md:items-center">
      <RouterLink to="/timeline" routerLinkText="Home" twClasses="text-lg" />
      <NotificationMenu options={["test"]} />
      <AvatarMenu />
    </nav>
  )
}
