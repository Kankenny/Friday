import React from "react";

type Props = {
  href: string;
  linkText: string;
};

const StyledLink = ({ href, linkText }: Props) => {
  return <a href={href}>{linkText}</a>;
};

export default StyledLink;
