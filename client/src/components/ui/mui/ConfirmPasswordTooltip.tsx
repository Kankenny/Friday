import PrivacyTipIcon from "@mui/icons-material/PrivacyTip"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

export default function ConfirmPasswordTooltip() {
  return (
    <Tooltip
      title="Confirm password must match the password"
      className="mb-4 opacity-40"
    >
      <IconButton>
        <PrivacyTipIcon />
      </IconButton>
    </Tooltip>
  )
}
