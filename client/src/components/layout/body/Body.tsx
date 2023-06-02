import React from "react";

type Props = {
  children: React.ReactNode;
};

const Body = ({ children }: Props) => {
  return <main className="min-h-screen bg-main flex flex-col">{children}</main>;
};

export default Body;
