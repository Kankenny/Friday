import { useState } from "react"
import { Tab, Tabs } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"

const HomeNavigationTabs = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState("timeline")
  const { username } = useTypedSelector((state) => state.sameProfile)

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const handleMyPostsClick = () => {
    navigate(`/users/${username}/my-posts`)
  }

  const handleSharedPostsClick = () => {
    navigate(`/users/${username}/shared-posts`)
  }

  const handleLikedPostsClick = () => {
    navigate(`/users/${username}/liked-posts`)
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
        value="my posts"
        label="My Posts"
        className={`font-semibold text-md ${
          value === "my posts" ? "text-tertiary" : "text-secondary"
        }`}
        onClick={handleMyPostsClick}
      />
      <Tab
        value="shared with me"
        label="Shared with Me"
        className={`font-semibold text-md ${
          value === "shared with me" ? "text-tertiary" : "text-secondary"
        }`}
        onClick={handleSharedPostsClick}
      />
      <Tab
        value="liked posts"
        label="Liked Posts"
        className={`font-semibold text-md ${
          value === "liked posts" ? "text-tertiary" : "text-secondary"
        }`}
        onClick={handleLikedPostsClick}
      />
    </Tabs>
  )
}

export default HomeNavigationTabs
