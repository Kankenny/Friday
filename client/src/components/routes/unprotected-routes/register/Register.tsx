import Body from "../../../layout/body/Body"
import Card from "../../../ui/Card"
import RegisterForm from "./RegisterForm"

const Register = () => {
  return (
    <Body>
      <div className="min-h-screen flex flex-col justify-center p-5 md:p-10 w-3/4 lg:w-[50em] mx-auto">
        <Card twClasses="text-center pt-0">
          <h1 className="text-3xl font-semibold bg-secondary text-main p-5 rounded-t-md">
            Sign up
          </h1>
          <RegisterForm />
        </Card>
      </div>
    </Body>
  )
}

export default Register
