import { useLocation } from "react-router-dom"
import Body from "../../../layout/body/Body"
import Card from "../../../ui/Card"
import LoginForm from "./LoginForm"

const Login = () => {
  const location = useLocation()
  const successMessage = location.state?.successMessage

  return (
    <Body>
      <div className="mx-auto flex min-h-screen w-3/4 flex-col justify-center p-10 lg:w-[50em]">
        <Card twClasses="text-center pt-0">
          <h1 className="bg-secondary text-main rounded-t-md p-5 text-3xl font-semibold">
            Sign in
          </h1>
          <LoginForm successMessage={successMessage} />
        </Card>
      </div>
    </Body>
  )
}

export default Login
