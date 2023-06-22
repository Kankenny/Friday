type Props = {
  name: string
  type?: "text" | "email" | "password"
  placeholder: string
  twClasses?: string
}

const StyledInput = ({
  name,
  type = "text",
  placeholder = "",
  twClasses,
  ...rest
}: Props) => {
  return (
    <div className={`${twClasses} relative`}>
      <input
        type={type}
        className="peer h-10 w-full rounded-sm border-b-2 border-secondary bg-transparent py-2  placeholder-transparent focus:border-tertiary focus:outline-none caret-tertiary"
        placeholder={placeholder}
        {...rest}
      />
      <label
        htmlFor={name}
        className="absolute -top-3.5 left-0  text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
      >
        {placeholder}
      </label>
    </div>
  )
}

export default StyledInput
