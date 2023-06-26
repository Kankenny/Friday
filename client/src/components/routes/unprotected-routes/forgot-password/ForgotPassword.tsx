// Components
import Body from "../../../layout/body/Body"
import Card from "../../../ui/Card"
import ForgotPasswordForm from "./ForgotPasswordForm"

const ForgotPassword = () => {
  return (
    <Body>
      <div className="mx-auto flex min-h-screen w-3/4 flex-col justify-center p-10 lg:w-[50em]">
        <Card twClasses="text-center pt-0">
          <h1 className="bg-secondary text-main rounded-t-md p-5 text-3xl font-semibold">
            Forgot Password
          </h1>
          <ForgotPasswordForm />
        </Card>
      </div>
    </Body>
  )
}

export default ForgotPassword
