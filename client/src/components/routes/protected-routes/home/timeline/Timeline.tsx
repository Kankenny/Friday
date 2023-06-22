import { useState } from "react"
import StyledButton from "../../../../ui/StyledButton"
import CreatePostInput from "../home-layout/CreatePostInput"
import TimelinePosts from "./TimelinePosts"
import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"
import PostSkeletons from "../../../../ui/post/skeleton/PostSkeletons"
import RHFInputField from "../../../../ui/rhf/RHFInputField"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  searchFormSchema,
  searchFormType,
} from "../../../../../lib/validations/searchValidator"
import StyledInput from "../../../../ui/StyledInput"

const Timeline = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const { isLoading } = useTypedSelector((state) => state.timeline)
  const [isCreating, setIsCreating] = useState(false)

  const content = isLoading ? <PostSkeletons /> : <TimelinePosts />

  return (
    <div className="w-full space-y-10">
      <div className="flex justify-between items-center">
        <StyledButton
          buttonText={`${!isCreating ? "New Post" : "Cancel"}`}
          onClick={() => setIsCreating(!isCreating)}
        />
        <StyledInput name="Search" placeholder="Search" type="text" />
      </div>
      {isCreating && <CreatePostInput setIsCreating={setIsCreating} />}
      {content}
    </div>
  )
}

export default Timeline
