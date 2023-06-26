import Body from "../../../layout/body/Body"
import Card from "../../../ui/Card"
import RegisterForm from "./RegisterForm"

const Register = () => {
  return (
    <Body>
      <div className="mx-auto flex min-h-screen w-3/4 flex-col justify-center p-5 md:p-10 lg:w-[50em]">
        <Card twClasses="text-center pt-0">
          <h1 className="bg-secondary text-main rounded-t-md p-5 text-3xl font-semibold">
            Sign up
          </h1>
          <RegisterForm />
        </Card>
      </div>
    </Body>
  )
}

export default Register
