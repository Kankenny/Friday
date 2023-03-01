import React from "react";

type Props = {
  label: string;
  name: string;
  type: "text" | "email" | "password";
  placeholder?: string;
};

const StyledInput = ({
  label,
  name,
  type = "text",
  placeholder,
  ...rest
}: Props) => {
  return (
    <div className="relative z-0 mb-8">
      <input
        {...rest}
        id={name}
        type={type}
        placeholder={placeholder}
        className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 border-gray-200"
      />
      <label
        htmlFor={name}
        className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
      >
        {label}
      </label>
    </div>
  );
};

export default StyledInput;
