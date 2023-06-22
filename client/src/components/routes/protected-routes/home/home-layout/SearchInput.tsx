import { useForm } from "react-hook-form"
import {
  searchFormSchema,
  searchFormType,
} from "../../../../../lib/validations/searchValidator"
import { zodResolver } from "@hookform/resolvers/zod"
import RHFInputField from "../../../../ui/rhf/RHFInputField"
import { useDispatch } from "react-redux"
import { queryTimeline } from "../../../../../lib/store/slices/timeline-slice/timelineSlice"

const SearchInput = () => {
  const { handleSubmit, register } = useForm<searchFormType>({
    resolver: zodResolver(searchFormSchema),
  })

  const dispatch = useDispatch()
  const handleSearchSubmit = (formData: searchFormType) => {
    dispatch(queryTimeline(formData.query))
  }

  return (
    <form onSubmit={handleSubmit(handleSearchSubmit)}>
      <RHFInputField
        register={register("query")}
        label="Search"
        twClasses="w-36"
      />
    </form>
  )
}

export default SearchInput
