import { UseFormRegisterReturn } from "react-hook-form"

type Props = {
  label: string
  register: UseFormRegisterReturn
  error?: string
  twClasses?: string
  readonly?: boolean
}

const RHFInputField = ({
  label,
  register,
  error,
  twClasses,
  readonly,
}: Props) => {
  return (
    <div className={`${twClasses} relative`}>
      <input
        type="text"
        className="peer h-10 w-full rounded-sm border-b-2 border-secondary bg-transparent py-2  placeholder-transparent focus:border-tertiary focus:outline-none caret-tertiary"
        placeholder=""
        id={register.name}
        readOnly={readonly}
        {...register}
      />
      <label
        htmlFor={register.name}
        className="absolute -top-3.5 left-0  text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
      >
        {label}
      </label>
      <p className="min-h-[2em] text-xs font-semibold text-red-500 text-left">
        {error}
      </p>
    </div>
  )
}

export default RHFInputField
