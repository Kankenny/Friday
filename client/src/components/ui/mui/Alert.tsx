import { Alert as _Alert } from "@mui/material"

type Props = {
  severity: "error" | "warning" | "info" | "success"
  message: string
}

const Alert = ({ severity, message }: Props) => {
  return (
    <_Alert severity={severity} className="text-red-500 my-5 rounded-lg">
      {message}
    </_Alert>
  )
}

export default Alert
