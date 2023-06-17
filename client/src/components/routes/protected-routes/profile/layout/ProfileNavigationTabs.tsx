import { useState } from "react"
import { Tab, Tabs } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"

const HomeNavigationTabs = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState("user posts")
  const { username: sameUserUsername } = useTypedSelector(
    (state) => state.sameProfile
  )
  const { username: otherUserUsername } = useTypedSelector(
    (state) => state.otherProfile
  )
  const { username: pathUsername } = useParams()
  const isSameUser = pathUsername === sameUserUsername

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const handleUserPostsClick = () => {
    navigate(
      `/users/${isSameUser ? sameUserUsername : otherUserUsername}/posts`
    )
  }

  const handleSavedPostsClick = () => {
    navigate(
      `/users/${isSameUser ? sameUserUsername : otherUserUsername}/saved-posts`
    )
  }

  const handleLikedPostsClick = () => {
    navigate(
      `/users/${isSameUser ? sameUserUsername : otherUserUsername}/liked-posts`
    )
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
        value="user posts"
        label="User Posts"
        className={`font-semibold text-md ${
          value === "user posts" ? "text-tertiary" : "text-secondary"
        }`}
        onClick={handleUserPostsClick}
      />
      <Tab
        value="saved posts"
        label="Saved Posts"
        className={`font-semibold text-md ${
          value === "saved posts" ? "text-tertiary" : "text-secondary"
        }`}
        onClick={handleSavedPostsClick}
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
