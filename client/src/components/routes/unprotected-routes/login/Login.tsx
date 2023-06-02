import Body from "../../../layout/body/Body"
import Card from "../../../ui/Card"
import LoginForm from "./LoginForm"

const Login = () => {
  return (
    <Body>
      <div className="min-h-screen flex flex-col justify-center p-20 container mx-auto">
        <Card twClasses="text-center pt-0">
          <h1 className="text-3xl font-semibold bg-secondary text-main p-5 rounded-t-md">
            Sign in
          </h1>
          <LoginForm />
        </Card>
      </div>
    </Body>
  )
}

export default Login
