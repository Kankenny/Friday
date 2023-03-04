import { Link } from "react-router-dom"

type Props = {
  to: string
  routerLinkText: string
  twClasses?: string
}

const RouterLink = ({ to, routerLinkText, twClasses }: Props) => {
  return (
    <Link
      to={to}
      className={`text-secondary hover:text-tertiary duration-100 ${twClasses}`}
    >
      {routerLinkText}
    </Link>
  )
}

export default RouterLink
