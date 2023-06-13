import { useState } from "react"
import StyledButton from "../../../../ui/StyledButton"
import CreatePostInput from "../home-layout/CreatePostInput"
import WorkspacePosts from "./WorkspacePosts"

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
      <WorkspacePosts />
    </div>
  )
}

export default Workspace
