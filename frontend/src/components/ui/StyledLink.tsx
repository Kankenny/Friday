import React from "react"

type Props = {
  href: string
  linkText: string
}

const StyledLink = ({ href, linkText }: Props) => {
  return (
    <a
      href="https://mddlknntt.monday.com/boards/4007749836"
      className="underline text-tertiary hover:duration-200 hover:text-secondary"
    >
      Our Monday board
    </a>
  )
}

export default StyledLink
