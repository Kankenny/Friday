import React from "react";

type Props = {
  onClick: () => {};
  buttonText: string;
};

const StyledButton = ({ onClick, buttonText }: Props) => {
  return <button onClick={onClick}>{buttonText}</button>;
};

export default StyledButton;
