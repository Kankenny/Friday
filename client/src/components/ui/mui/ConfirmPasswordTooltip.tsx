import PrivacyTipIcon from "@mui/icons-material/PrivacyTip"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

export default function ConfirmPasswordTooltip() {
  return (
    <Tooltip
      title="Confirm password must match the password"
      className="opacity-40 mb-4"
    >
      <IconButton>
        <PrivacyTipIcon />
      </IconButton>
    </Tooltip>
  )
}
