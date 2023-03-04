import React from "react";

type Props = {
  href: string;
  linkText: string;
};

const StyledLink = ({ href, linkText }: Props) => {
  return <a href="https://mddlknntt.monday.com/boards/4007749836">Our Monday board</a>;
};

export default StyledLink;
