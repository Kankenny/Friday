// Hooks
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"

// Components
import RHFInputField from "../../../ui/rhf/RHFInputField"
import Alert from "../../../ui/mui/Alert"

// Services
import authAPI from "../../../../lib/services/axios-instances/authAPI"
import { isAxiosError } from "axios"

// Validators
import {
  securityAnswerFormSchema,
  securityAnswerFormType,
} from "../../../../../../common/validations/securityAnswerFormValidator"
import { zodResolver } from "@hookform/resolvers/zod"

// Types
type Props = {
  firstName: string
  username: string
  securityQuestion: string
}

const SecurityAnswerForm = ({
  firstName,
  username,
  securityQuestion,
}: Props) => {
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<securityAnswerFormType>({
    resolver: zodResolver(securityAnswerFormSchema),
  })

  useEffect(() => {
    setFocus("securityAnswer")
  }, [setFocus])

  const verifySecurityQAHandler = async (formData: securityAnswerFormType) => {
    try {
      const { data } = await authAPI.post("/verify-security-qa", {
        ...formData,
        username,
      })

      navigate("/reset-password", {
        state: {
          successMessage: data.message,
          firstName,
          username,
        },
      })
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data.message)
      }
    }
  }

  return (
    <div className="p-10">
      <form onSubmit={handleSubmit(verifySecurityQAHandler)}>
        <h1 className="text-center text-sm">
          Enter the answer to your security question:
        </h1>
        <h1 className="font-semibold">{securityQuestion}</h1>
        <RHFInputField
          label="Security Question Answer"
          register={register("securityAnswer")}
          error={errors.securityAnswer?.message}
          twClasses="mt-10"
        />
        <SubmitButton />
        {error && <Alert severity="error" message={error} />}
      </form>
    </div>
  )
}

export default SecurityAnswerForm

const SubmitButton = () => {
  return (
    <button
      className={`w-full mt-4 p-4 rounded-lg duration-200 hover:bg-secondary ease-in-out bg-tertiary text-secondary hover:text-main font-bold text-sm dark:bg-secondary dark:hover:bg-tertiary`}
      type="submit"
    >
      Submit
    </button>
  )
}
