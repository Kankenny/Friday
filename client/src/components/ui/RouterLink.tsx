import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

type Props = {
  to: string
  routerLinkText: string
  twClasses?: string
}

const RouterLink = ({ to, routerLinkText, twClasses }: Props) => {
  const location = useLocation()

  const activatedRouterLinkClasses = location.pathname === to && "text-tertiary"

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <Link
      to={to}
      className={`${twClasses} font-bold text-main hover:text-tertiary ease-in-out duration-200 ${activatedRouterLinkClasses}`}
    >
      {routerLinkText}
    </Link>
  )
}

export default RouterLink
