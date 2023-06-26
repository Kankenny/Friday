// Hooks
import { UseFormRegisterReturn } from "react-hook-form"

// Types
type Props = {
  name: string
  id: string
  options: string[]
  placeholder: string
  register: UseFormRegisterReturn
  error?: string
}

const RHFDropdownField = ({
  name,
  options,
  placeholder = "",
  register,
  error,
  ...rest
}: Props) => {
  return (
    <div className="relative z-0 mb-5 w-full">
      <select
        {...rest}
        id={name}
        {...register}
        className="focus:border-tertiary border-secondary dark:bg-secondary mt-0 block w-full appearance-none rounded-md border-2 bg-blue-50 p-2 px-0 py-3 pl-5 text-sm capitalize focus:outline-none focus:ring-0"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option} className="capitalize">
            {option}
          </option>
        ))}
      </select>
      <label
        htmlFor={name}
        className="-z-1 origin-0 text-secondary absolute left-2 top-3 duration-200 ease-in-out dark:text-white"
      >
        {placeholder}
      </label>
      {error && <p className="text-xs font-semibold text-red-600">{error}</p>}
    </div>
  )
}

export default RHFDropdownField
