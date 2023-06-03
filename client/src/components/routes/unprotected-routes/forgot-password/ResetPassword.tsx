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
      <div className="min-h-screen flex flex-col justify-center p-10 w-3/4 lg:w-[50em] mx-auto">
        <Card twClasses="text-center pt-0">
          <div className="text-3xl font-semibold bg-secondary text-main p-5 rounded-t-md">
            <h1>Reset Password</h1>
            <h2 className="text-sm font-semibold text-tertiary">
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
