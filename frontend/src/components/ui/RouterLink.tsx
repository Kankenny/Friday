import { Link, useLocation } from "react-router-dom"

type Props = {
  to: string
  routerLinkText: string
  twClasses?: string
}

const RouterLink = ({ to, routerLinkText, twClasses }: Props) => {
  const { pathname } = useLocation()

  const activatedRouterLinkClasses = pathname === to && "text-tertiary"

  return (
    <Link
      to={to}
      className={`text-lg font-bold text-secondary hover:text-tertiary duration-100 ${activatedRouterLinkClasses} ${twClasses}`}
    >
      {routerLinkText}
    </Link>
  )
}

export default RouterLink
