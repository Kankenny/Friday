/* eslint-disable @typescript-eslint/no-non-null-assertion */
// Hooks
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { login } from "../../../../lib/store/slices/auth-slice/authSlice"

// Components
import RouterLink from "../../../ui/RouterLink"
import RHFPasswordField from "../../../ui/rhf/RHFPasswordField"
import RHFInputField from "../../../ui/rhf/RHFInputField"
import Alert from "../../../ui/mui/Alert"

// Validators
import { zodResolver } from "@hookform/resolvers/zod"
import {
  loginFormSchema,
  loginFormType,
} from "../../../../../../common/validations/loginFormValidator"

// Types
type Props = {
  registeredSuccessfullyMessage?: string
}

const LoginForm = ({ registeredSuccessfullyMessage }: Props) => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
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
  const [success, setSuccess] = useState("")

  const loginUserHandler = (data: loginFormType) => {
    const payload = data

    const loginUser = async () => {
      const response = await fetch(
        `http://localhost:${
          import.meta.env.VITE_BACKEND_SERVER_PORT
        }/api/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        }
      )

      const data = await response.json()

      if (!data.ok) {
        setError(data.message)
        setSuccess("")
        return
      }

      setError("")
      setSuccess(data.data.message)
      dispatch(login(data.data.token))
      navigate("/app", { replace: true })
    }
    loginUser()
  }

  return (
    <div className="p-10">
      <form
        className="flex flex-col space-y-5 gap-5"
        onSubmit={handleSubmit(loginUserHandler)}
      >
        <RHFInputField
          label="username"
          register={register("username")}
          error={errors.username?.message}
        />
        <div className="flex flex-col">
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
        </div>
        <LoginButton />
      </form>
      {error && <Alert severity="error" message={error} />}
      {success ||
        (registeredSuccessfullyMessage && (
          <Alert
            severity="success"
            message={success || registeredSuccessfullyMessage}
          />
        ))}
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
