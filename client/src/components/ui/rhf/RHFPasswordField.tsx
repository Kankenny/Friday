import { UseFormRegisterReturn } from "react-hook-form"
import usePasswordToggle from "../../../lib/hooks/regular-hooks/usePasswordToggle"

type Props = {
  label: string
  register: UseFormRegisterReturn
  error?: string
  twClasses?: string
}

const RHFPasswordField = ({ label, register, error, twClasses }: Props) => {
  const { icon, inputType } = usePasswordToggle()

  return (
    <div className={`${twClasses} relative`}>
      <input
        type={inputType}
        className="focus:border-tertiary peer h-10 w-full rounded-sm border-b-2 border-gray-300 bg-transparent py-2 text-gray-900 placeholder-transparent focus:outline-none"
        placeholder=""
        id={register.name}
        autoComplete="new-password"
        {...register}
      />
      <label
        htmlFor={register.name}
        className="absolute -top-3.5 left-0  text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
      >
        {label}
      </label>
      <div className="absolute bottom-3 right-0 flex h-full items-center pr-2">
        {icon}
      </div>
      <p className="min-h-[2em] text-left text-xs font-semibold text-red-500">
        {error}
      </p>
    </div>
  )
}

export default RHFPasswordField
