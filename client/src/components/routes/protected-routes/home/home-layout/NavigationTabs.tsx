import { useState } from "react"
import { Tab, Tabs } from "@mui/material"
import { useNavigate } from "react-router-dom"

const NavigationTabs = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState("timeline")

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const handleTimelineClick = () => {
    navigate("/app/timeline")
  }

  const handleWorkspaceClick = () => {
    navigate("/app/workspace")
  }

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      TabIndicatorProps={{
        className: "bg-tertiary",
      }}
      className="border-b"
    >
      <Tab
        value="timeline"
        label="Timeline"
        className={`font-semibold text-md ${
          value === "timeline" ? "text-tertiary" : "text-secondary"
        }`}
        onClick={handleTimelineClick}
      />
      <Tab
        value="workspace"
        label="Workspace"
        className={`font-semibold text-md ${
          value === "workspace" ? "text-tertiary" : "text-secondary"
        }`}
        onClick={handleWorkspaceClick}
      />
    </Tabs>
  )
}

export default NavigationTabs
