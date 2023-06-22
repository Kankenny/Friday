type Props = {
  name: string
  value: string
  type?: "text" | "email" | "password"
  placeholder: string
  twClasses?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const StyledInput = ({
  name,
  type = "text",
  placeholder = "",
  value,
  twClasses,
  onChange,
  ...rest
}: Props) => {
  return (
    <div className={`${twClasses} relative`}>
      <input
        type={type}
        className="peer h-10 w-full rounded-sm border-b-2 border-secondary bg-transparent py-2  placeholder-transparent focus:border-tertiary focus:outline-none caret-tertiary"
        placeholder={placeholder}
        value={value}
        {...rest}
        onChange={onChange}
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
