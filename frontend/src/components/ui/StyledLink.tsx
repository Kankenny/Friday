type Props = {
  href: string
  linkText: string
}

const StyledLink = ({ href, linkText }: Props) => {
  return (
    <a
      href= {href}
      className="underline text-tertiary hover:duration-200 hover:text-secondary"
    >
      {linkText}
    </a>
  )
}

export default StyledLink
