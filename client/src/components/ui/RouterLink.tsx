import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

type Props = {
  to: string
  routerLinkText: string
  twClasses?: string
}

const RouterLink = ({ to, routerLinkText, twClasses }: Props) => {
  const location = useLocation()

  const activatedRouterLinkClasses =
    location.pathname.includes(to) && "text-tertiary"

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <Link
      to={to}
      className={`${twClasses} text-main hover:text-tertiary font-bold duration-200 ease-in-out ${activatedRouterLinkClasses}`}
    >
      {routerLinkText}
    </Link>
  )
}

export default RouterLink
