import { useState } from "react"
import Post from "../../../../ui/post/Post"
import StyledButton from "../../../../ui/StyledButton"
import CreatePostInput from "../home-layout/CreatePostInput"

const Workspace = () => {
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

export default Workspace
