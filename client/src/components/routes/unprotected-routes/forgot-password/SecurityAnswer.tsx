// Hooks
import { useLocation } from "react-router-dom"

// Components
import Body from "../../../layout/body/Body"
import Card from "../../../ui/Card"
import SecurityAnswerForm from "./SecurityAnswerForm"

const SecurityAnswer = () => {
  const location = useLocation()
  const firstName = location.state?.firstName
  const username = location.state?.username
  const securityQuestion = location.state?.securityQuestion

  return (
    <Body>
      <div className="mx-auto flex min-h-screen w-3/4 flex-col justify-center p-10 lg:w-[50em]">
        <Card twClasses="text-center pt-0">
          <div className="bg-secondary text-main rounded-t-md p-5 text-3xl font-semibold">
            <h1>Forgot Password</h1>
            <h2 className="text-tertiary text-sm font-semibold">
              Hello there, {firstName}!
            </h2>
          </div>
          <SecurityAnswerForm
            firstName={firstName}
            username={username}
            securityQuestion={securityQuestion}
          />
        </Card>
      </div>
    </Body>
  )
}

export default SecurityAnswer
