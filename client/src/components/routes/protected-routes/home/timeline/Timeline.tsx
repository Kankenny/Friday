import { useState } from "react"
import StyledButton from "../../../../ui/StyledButton"
import CreatePostInput from "../home-layout/CreatePostInput"
import TimelinePosts from "./TimelinePosts"
import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"
import PostSkeletons from "../../../../ui/post/skeleton/PostSkeletons"
import { useForm } from "react-hook-form"
import {
  searchFormSchema,
  searchFormType,
} from "../../../../../lib/validations/searchValidator"
import { zodResolver } from "@hookform/resolvers/zod"
import RHFInputField from "../../../../ui/rhf/RHFInputField"
import { useDispatch } from "react-redux"
import {
  clearQuery,
  queryTimeline,
} from "../../../../../lib/store/slices/timeline-slice/timelineSlice"

const Timeline = () => {
  const { handleSubmit, register, setValue } = useForm<searchFormType>({
    resolver: zodResolver(searchFormSchema),
  })
  const { isLoading, didQuery } = useTypedSelector((state) => state.timeline)
  const [isCreating, setIsCreating] = useState(false)

  const dispatch = useDispatch()
  const handleSearchSubmit = (formData: searchFormType) => {
    if (didQuery) {
      dispatch(clearQuery())
      setValue("query", "")
    } else {
      dispatch(queryTimeline(formData.query))
    }
  }

  const content = isLoading ? <PostSkeletons /> : <TimelinePosts />

  return (
    <div className="w-full space-y-10">
      <div className="flex justify-between items-center">
        <StyledButton
          buttonText={`${!isCreating ? "New Post" : "Cancel"}`}
          onClick={() => setIsCreating(!isCreating)}
        />
        <form
          onSubmit={handleSubmit(handleSearchSubmit)}
          className="flex gap-2 items-center"
        >
          <RHFInputField
            register={register("query")}
            label="Search"
            twClasses="w-36"
          />
          <StyledButton
            buttonText={didQuery ? "Clear" : "Search"}
            type="submit"
            intent="secondary"
          />
        </form>
      </div>
      {isCreating && <CreatePostInput setIsCreating={setIsCreating} />}
      {content}
    </div>
  )
}

export default Timeline
