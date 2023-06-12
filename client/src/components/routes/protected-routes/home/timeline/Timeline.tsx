import { useState } from "react"
import StyledButton from "../../../../ui/StyledButton"
import Post from "../../../../ui/post/Post"
import CreatePostInput from "../home-layout/CreatePostInput"

const Timeline = () => {
  const [isCreating, setIsCreating] = useState(false)

  return (
    <div className="w-full space-y-10">
      <StyledButton
        buttonText="New Post"
        onClick={() => setIsCreating(!isCreating)}
        twClasses={isCreating ? "hidden" : ""}
      />
      {isCreating && <CreatePostInput />}
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  )
}

export default Timeline
