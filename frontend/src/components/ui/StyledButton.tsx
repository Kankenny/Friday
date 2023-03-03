import React from "react";type Props = {
  onClick: () => void;
  buttonText: string;
  };const StyledButton = ({ onClick, buttonText }: Props) => {
  return (
  <button
     className="bg-blue-500 rounded-full text-white text-center text-base px-4 py-2"
     onClick={onClick}
   >
  {buttonText}
  </button>
  );
  };export default StyledButton;