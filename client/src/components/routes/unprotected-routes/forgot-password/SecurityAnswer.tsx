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
      <div className="min-h-screen flex flex-col justify-center p-10 w-3/4 lg:w-[50em] mx-auto">
        <Card twClasses="text-center pt-0">
          <div className="text-3xl font-semibold bg-secondary text-main p-5 rounded-t-md">
            <h1>Forgot Password</h1>
            <h2 className="text-sm font-semibold text-tertiary">
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
