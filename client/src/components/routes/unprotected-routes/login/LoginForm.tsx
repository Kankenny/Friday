import { isAxiosError } from "axios"

// Hooks
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

// Components
import RouterLink from "../../../ui/RouterLink"
import RHFPasswordField from "../../../ui/rhf/RHFPasswordField"
import RHFInputField from "../../../ui/rhf/RHFInputField"
import Alert from "../../../ui/mui/Alert"

// Reducers
import { login } from "../../../../lib/store/slices/auth-slice/authSlice"

// Services
import authAPI from "../../../../lib/services/axios-instances/authAPI"

// Validators
import { zodResolver } from "@hookform/resolvers/zod"
import {
  loginFormSchema,
  loginFormType,
} from "../../../../../../common/validations/loginFormValidator"

// Types
type Props = {
  successMessage?: string
}

const LoginForm = ({ successMessage }: Props) => {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<loginFormType>({
    resolver: zodResolver(loginFormSchema),
  })

  useEffect(() => {
    setFocus("username")
  }, [setFocus])

  const [error, setError] = useState("")

  const loginUserHandler = async (formData: loginFormType) => {
    try {
      const { data } = await authAPI.post("/login", formData)

      if (!data.ok) {
        setError(data.message)
        return
      }

      setError("")
      dispatch(login({ token: data.data.token, _id: data.data.user._id }))
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
        onSubmit={handleSubmit(loginUserHandler)}
      >
        <RHFInputField
          label="username"
          register={register("username")}
          error={errors.username?.message}
        />
        <RHFPasswordField
          label="password"
          register={register("password")}
          error={errors.password?.message}
          twClasses="w-full"
        />
        <RouterLink
          routerLinkText="Forgot Password?"
          twClasses="text-xs ml-auto text-secondary"
          to="/forgot-password"
        />
        <LoginButton />
      </form>
      {error && <Alert severity="error" message={error} />}
      {successMessage && !error && (
        <Alert severity="success" message={successMessage} />
      )}
      <RegisterLink />
    </div>
  )
}

export default LoginForm

const LoginButton = () => {
  return (
    <button
      className={`p-4 text-secondary bg-tertiary rounded-lg duration-200 hover:bg-black hover:text-primary ease-in-out font-semibold text-md hover:text-main`}
      type="submit"
    >
      Log In
    </button>
  )
}

const RegisterLink = () => {
  return (
    <div className="text-center w-full flex flex-col p-2 md:flex-row space-x-0 md:space-x-2 justify-center mx-auto text-sm text-secondary">
      <h1>Don't have an account yet?</h1>
      <RouterLink
        routerLinkText="Register here"
        to="/register"
        twClasses="text-secondary"
      />
    </div>
  )
}
