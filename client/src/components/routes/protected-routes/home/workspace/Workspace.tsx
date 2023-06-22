import { useState } from "react"
import StyledButton from "../../../../ui/StyledButton"
import CreatePostInput from "../home-layout/CreatePostInput"
import WorkspacePosts from "./WorkspacePosts"

const Workspace = () => {
  const [isCreating, setIsCreating] = useState(false)

  return (
    <div className="w-full space-y-10">
      <StyledButton
        buttonText={`${!isCreating ? "New Post" : "Cancel"}`}
        onClick={() => setIsCreating(!isCreating)}
      />
      {isCreating && <CreatePostInput setIsCreating={setIsCreating} />}
      <WorkspacePosts />
    </div>
  )
}

export default Workspace
