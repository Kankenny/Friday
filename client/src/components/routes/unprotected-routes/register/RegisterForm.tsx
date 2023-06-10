// Hooks
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"

// Components
import Alert from "../../../ui/mui/Alert"
import RouterLink from "../../../ui/RouterLink"
import RHFInputField from "../../../ui/rhf/RHFInputField"
import RHFPasswordField from "../../../ui/rhf/RHFPasswordField"
import RHFDropdownField from "../../../ui/rhf/RHFDropdownField"
import PasswordStrengthTooltip from "../../../ui/mui/PasswordStrengthTooltip"
import ConfirmPasswordTooltip from "../../../ui/mui/ConfirmPasswordTooltip"
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined"
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined"

// Services
import authAPI from "../../../../lib/services/axios-instances/authAPI"

// Validators
import { zodResolver } from "@hookform/resolvers/zod"
import {
  registerFormSchema,
  registerFormType,
} from "../../../../../../common/validations/registerFormValidator"

// Constant Variables
import { QUESTIONS } from "../../../../lib/constants/SecurityQuestions"

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<registerFormType>({
    resolver: zodResolver(registerFormSchema),
  })

  const [error, setError] = useState("")

  useEffect(() => {
    setFocus("firstName")
  }, [setFocus])

  const navigate = useNavigate()

  const registerUserHandler = (formData: registerFormType) => {
    const registerUser = async () => {
      const { data } = await authAPI.post("/register", formData)

      if (!data.ok) {
        setError(data.message)
        return
      }

      navigate("/login", {
        state: { successMessage: data.message },
      })
    }
    registerUser()
  }

  return (
    <div className="p-10">
      <form
        className="flex flex-col gap-5 space-y-5"
        onSubmit={handleSubmit(registerUserHandler)}
      >
        <div className="flex flex-col gap-5 pb-10 border-b-2 border-b-secondary">
          <div className="flex items-center gap-5">
            <Person2OutlinedIcon className="rounded-full bg-tertiary p-2 text-primary h-10 w-auto" />
            <h1 className="font-semibold text-lg">
              Let's Get To Know You Better
            </h1>
          </div>
          <div className="flex justify-between gap-3">
            <RHFInputField
              label="First Name"
              register={register("firstName")}
              error={errors.firstName?.message}
            />
            <RHFInputField
              label="Last Name"
              register={register("lastName")}
              error={errors.lastName?.message}
            />
          </div>
          <RHFInputField
            label="Username"
            register={register("username")}
            error={errors.username?.message}
          />
          <RHFInputField
            label="Email Address"
            register={register("email")}
            error={errors.email?.message}
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <SecurityOutlinedIcon className="rounded-full bg-tertiary p-2 text-primary h-10 w-auto" />
            <h1 className="font-semibold text-lg">Protect Your Account</h1>
          </div>

          <div className="flex">
            <RHFPasswordField
              label="Password"
              register={register("password")}
              error={errors.password?.message}
              twClasses="w-full"
            />
            <PasswordStrengthTooltip />
          </div>
          <div className="flex">
            <RHFPasswordField
              label="Confirm Password"
              register={register("confirmPassword")}
              error={errors.confirmPassword?.message}
              twClasses="w-full"
            />
            <ConfirmPasswordTooltip />
          </div>
          <div className="flex gap-5 items-center">
            <RHFDropdownField
              name="Security Question"
              id="Security Question"
              placeholder="Security Question"
              options={QUESTIONS}
              register={register("securityQuestion")}
              error={errors.securityQuestion?.message}
            />
            <RHFInputField
              label="Security Answer"
              register={register("securityAnswer")}
              error={errors.securityAnswer?.message}
              twClasses="w-full"
            />
          </div>
        </div>
        <RegisterButton />
      </form>
      <div className="text-center  w-full flex flex-col p-2 md:flex-row space-x-0 md:space-x-3 justify-center mx-auto text-sm">
        <h1>Already have an account?</h1>
        <RouterLink
          routerLinkText="Login here"
          to="/login"
          twClasses="text-secondary"
        />
      </div>
      {error && <Alert severity="error" message={error} />}
    </div>
  )
}

export default RegisterForm

const RegisterButton = () => {
  return (
    <button
      className={`p-4 text-secondary bg-tertiary rounded-lg duration-200 hover:bg-black hover:text-main hover:text-primary ease-in-out font-semibold text-md`}
      type="submit"
    >
      Register
    </button>
  )
}
