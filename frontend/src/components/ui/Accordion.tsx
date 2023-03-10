import React, { useState } from "react";

type Props = {
  title: string;
  children: React.ReactNode;
};

const Accordion = ({ title, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-secondary rounded-md overflow-hidden mb-4">
      <div
        className="bg-main px-4 py-3 flex justify-between items-center cursor-pointer"
        onClick={toggleAccordion}
      >
        <h2 className="text-lg font-medium">{title}</h2>
        <svg
          className={`${
            isOpen ? "transform rotate-180" : ""
          } h-7 w-7 text-secondary  duration-300 ease-in-out`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div
        className={`${
          isOpen
            ? "max-h-screen duration-300 ease-in"
            : "max-h-0 duration-300 ease-out"
        } overflow-hidden`}
      >
        <div className="px-4 py-3">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
