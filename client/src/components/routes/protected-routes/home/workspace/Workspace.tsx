import { useState } from "react"
import StyledButton from "../../../../ui/StyledButton"
import CreatePostInput from "../home-layout/CreatePostInput"
import WorkspacePosts from "./WorkspacePosts"
import { useForm } from "react-hook-form"
import {
  searchFormSchema,
  searchFormType,
} from "../../../../../lib/validations/searchValidator"
import { zodResolver } from "@hookform/resolvers/zod"
import RHFInputField from "../../../../ui/rhf/RHFInputField"
import { useDispatch } from "react-redux"
import { queryTimeline } from "../../../../../lib/store/slices/timeline-slice/timelineSlice"

const Workspace = () => {
  const [isCreating, setIsCreating] = useState(false)
  const { handleSubmit, register } = useForm<searchFormType>({
    resolver: zodResolver(searchFormSchema),
  })

  const dispatch = useDispatch()
  const handleSearchSubmit = (formData: searchFormType) => {
    dispatch(queryTimeline(formData.query))
  }

  return (
    <div className="w-full space-y-10">
      <div className="flex justify-between items-center">
        <StyledButton
          buttonText={`${!isCreating ? "New Post" : "Cancel"}`}
          onClick={() => setIsCreating(!isCreating)}
        />
        <form onSubmit={handleSubmit(handleSearchSubmit)}>
          <RHFInputField
            register={register("query")}
            label="Search"
            twClasses="w-36"
          />
        </form>
      </div>
      {isCreating && <CreatePostInput setIsCreating={setIsCreating} />}
      <WorkspacePosts />
    </div>
  )
}

export default Workspace
