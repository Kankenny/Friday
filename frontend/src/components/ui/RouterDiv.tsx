import React from "react";
import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  to: string;
};

const RouterDiv = ({ children, to }: Props) => {
  return (
    <Link to={to}>
      <div>{children}</div>
    </Link>
  );
};

export default RouterDiv;
