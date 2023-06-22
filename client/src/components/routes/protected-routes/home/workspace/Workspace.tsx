import { useState } from "react"
import StyledButton from "../../../../ui/StyledButton"
import CreatePostInput from "../home-layout/CreatePostInput"
import WorkspacePosts from "./WorkspacePosts"
import SearchInput from "../home-layout/SearchInput"

const Workspace = () => {
  const [isCreating, setIsCreating] = useState(false)

  return (
    <div className="w-full space-y-10">
      <div className="flex justify-between items-center">
        <StyledButton
          buttonText={`${!isCreating ? "New Post" : "Cancel"}`}
          onClick={() => setIsCreating(!isCreating)}
        />
        <SearchInput />
      </div>
      {isCreating && <CreatePostInput setIsCreating={setIsCreating} />}
      <WorkspacePosts />
    </div>
  )
}

export default Workspace
