import { UseFormRegisterReturn } from "react-hook-form"

type Props = {
  label: string
  register: UseFormRegisterReturn
  error?: string
  twClasses?: string
}

const RHFTextareaField = ({ label, register, error, twClasses }: Props) => {
  return (
    <div className={`${twClasses} relative`}>
      <textarea
        className="focus:border-tertiary peer h-32 w-full rounded-sm border-2 border-gray-300 bg-transparent p-2 placeholder-transparent focus:outline-none"
        placeholder=""
        id={register.name}
        {...register}
      />
      <label
        htmlFor={register.name}
        className="peer-focus:text-tertiary absolute -top-7 left-2  text-sm transition-all peer-placeholder-shown:top-2  peer-placeholder-shown:text-base peer-focus:-top-7 peer-focus:text-sm"
      >
        {label}
      </label>
      <p className="min-h-[2em] text-left text-xs font-semibold text-red-500">
        {error}
      </p>
    </div>
  )
}

export default RHFTextareaField
