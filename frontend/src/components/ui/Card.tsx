import React from "react";

type Props = {
  children: React.ReactNode;
  twClasses?: string;
};

const Card = ({ children, twClasses }: Props) => {
  return <div className={`rounded-lg shadow-lg ${twClasses}`}>{children}</div>;
};

export default Card;
