import { useState } from "react"
import StyledButton from "../../../../ui/StyledButton"
import CreatePostInput from "../home-layout/CreatePostInput"
import TimelinePosts from "./TimelinePosts"
import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"
import PostSkeletons from "../../../../ui/post/skeleton/PostSkeletons"

const Timeline = () => {
  const { isLoading } = useTypedSelector((state) => state.timeline)
  const [isCreating, setIsCreating] = useState(false)

  const content = isLoading ? <PostSkeletons /> : <TimelinePosts />

  return (
    <div className="w-full space-y-10">
      <StyledButton
        buttonText="New Post"
        onClick={() => setIsCreating(!isCreating)}
        twClasses={isCreating ? "hidden" : ""}
      />
      {isCreating && <CreatePostInput />}
      {content}
    </div>
  )
}

export default Timeline
