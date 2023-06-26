type Props = {
  href: string
  linkText: string
  [key: string]: any
}

const StyledLink = ({ href, linkText, ...rest }: Props) => {
  return (
    <a
      href={href}
      className="text-tertiary hover:text-secondary underline ease-in-out hover:duration-200"
      {...rest}
    >
      {linkText}
    </a>
  )
}

export default StyledLink
