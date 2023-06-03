import PrivacyTipIcon from "@mui/icons-material/PrivacyTip"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

export default function PasswordStrengthTooltip() {
  return (
    <Tooltip
      title="Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be a minimum of 8 characters long"
      className="opacity-40 mb-4"
    >
      <IconButton>
        <PrivacyTipIcon />
      </IconButton>
    </Tooltip>
  )
}
