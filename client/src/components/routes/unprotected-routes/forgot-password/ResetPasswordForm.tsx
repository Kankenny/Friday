// Hooks
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"

// Components
import RHFPasswordField from "../../../ui/rhf/RHFPasswordField"
import Alert from "../../../ui/mui/Alert"

// Services
import authAPI from "../../../../lib/services/axios-instances/authAPI"
import { isAxiosError } from "axios"

// Validators
import {
  resetPasswordFormSchema,
  resetPasswordFormType,
} from "../../../../../../common/validations/resetPasswordFormValidator"
import { zodResolver } from "@hookform/resolvers/zod"

// Types
type Props = {
  username: string
}

const ResetPasswordForm = ({ username }: Props) => {
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<resetPasswordFormType>({
    resolver: zodResolver(resetPasswordFormSchema),
  })

  useEffect(() => {
    setFocus("newPassword")
  }, [setFocus])

  const resetPasswordHandler = async (formData: resetPasswordFormType) => {
    try {
      const { data } = await authAPI.post("/reset-password", {
        ...formData,
        username,
      })

      navigate("/login", {
        state: { successMessage: data.message },
      })
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data.message)
      }
    }
  }

  return (
    <div className="p-10">
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(resetPasswordHandler)}
      >
        <h1 className="text-center text-sm mb-10">Reset your password</h1>
        <RHFPasswordField
          label="New Password"
          register={register("newPassword")}
          error={errors.newPassword?.message}
        />
        <RHFPasswordField
          label="Confirm Password"
          register={register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        <SubmitButton />
        {error && <Alert severity="error" message={error} />}
      </form>
    </div>
  )
}

export default ResetPasswordForm

const SubmitButton = () => {
  return (
    <button
      className={`w-full mt-4 p-4 rounded-lg duration-200 hover:bg-secondary ease-in-out bg-tertiary text-secondary hover:text-main font-bold text-sm dark:bg-secondary dark:hover:bg-tertiary`}
      type="submit"
    >
      Reset Password
    </button>
  )
}
