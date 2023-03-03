import React from "react";
type Props = {
  onClick: () => void;
  buttonText: string;
};
const StyledButton = ({ onClick, buttonText }: Props) => {
  return (
    <button
      className="bg-secondary text-main rounded-xl text-center text-base px-4 py-2"
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};
export default StyledButton;
