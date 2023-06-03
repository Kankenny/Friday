import { Alert as _Alert } from "@mui/material"

type Props = {
  severity: "error" | "warning" | "info" | "success"
  message: string
}

const Alert = ({ severity, message }: Props) => {
  let alertTailwindClasses

  switch (severity) {
    case "error":
      alertTailwindClasses = "text-secondary bg-red-500"
      break
    case "warning":
      alertTailwindClasses = "text-secondary bg-yellow-500"
      break
    case "info":
      alertTailwindClasses = "text-secondary bg-blue-500"
      break
    case "success":
      alertTailwindClasses = "text-secondary bg-green-500"
      break
    default:
      alertTailwindClasses = ""
  }

  return (
    <_Alert
      severity={severity}
      className={`${alertTailwindClasses} my-5 rounded-lg font-semibold`}
    >
      <h1>{message}</h1>
    </_Alert>
  )
}

export default Alert
