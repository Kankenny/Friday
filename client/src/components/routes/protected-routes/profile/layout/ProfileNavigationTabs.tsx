import { useEffect, useState } from "react"
import { Tab, Tabs } from "@mui/material"
import { useLocation, useNavigate, useParams } from "react-router-dom"
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

  const handleSharedPostsClick = () => {
    navigate(
      `/users/${isSameUser ? sameUserUsername : otherUserUsername}/shared-posts`
    )
  }

  const handleLikedPostsClick = () => {
    navigate(
      `/users/${isSameUser ? sameUserUsername : otherUserUsername}/liked-posts`
    )
  }

  const { pathname } = useLocation()
  const leafPath = pathname.split("/")[pathname.split("/").length - 1]
  useEffect(() => {
    if (leafPath === "posts") setValue("user posts")
    else if (leafPath === "liked-posts") setValue("liked posts")
  }, [leafPath])

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
      {isSameUser && (
        <Tab
          value="saved posts"
          label="Saved Posts"
          className={`font-semibold text-md ${
            value === "saved posts" ? "text-tertiary" : "text-secondary"
          }`}
          onClick={handleSavedPostsClick}
        />
      )}
      // appending the tab below to the one above doesn't work as MUI's
      implementation of the Tabs component doesn't accept the ReactNode
      (children) prop
      {isSameUser && (
        <Tab
          value="shared posts"
          label="Shared Posts"
          className={`font-semibold text-md ${
            value === "shared posts" ? "text-tertiary" : "text-secondary"
          }`}
          onClick={handleSharedPostsClick}
        />
      )}
      (
      <Tab
        value="liked posts"
        label="Liked Posts"
        className={`font-semibold text-md ${
          value === "liked posts" ? "text-tertiary" : "text-secondary"
        }`}
        onClick={handleLikedPostsClick}
      />
      )
    </Tabs>
  )
}

export default HomeNavigationTabs
