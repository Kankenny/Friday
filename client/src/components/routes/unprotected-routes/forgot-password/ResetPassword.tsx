// Hooks
import { useLocation } from "react-router-dom"

// Components
import Body from "../../../layout/body/Body"
import Card from "../../../ui/Card"
import ResetPasswordForm from "./ResetPasswordForm"

const ResetPassword = () => {
  const location = useLocation()
  const firstName = location.state?.firstName
  const username = location.state?.username

  return (
    <Body>
      <div className="mx-auto flex min-h-screen w-3/4 flex-col justify-center p-10 lg:w-[50em]">
        <Card twClasses="text-center pt-0">
          <div className="bg-secondary text-main rounded-t-md p-5 text-3xl font-semibold">
            <h1>Reset Password</h1>
            <h2 className="text-tertiary text-sm font-semibold">
              A few more steps to retrieve your account, {firstName}!
            </h2>
          </div>
          <ResetPasswordForm username={username} />
        </Card>
      </div>
    </Body>
  )
}

export default ResetPassword
