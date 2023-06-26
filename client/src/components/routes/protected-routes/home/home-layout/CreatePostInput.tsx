import { zodResolver } from "@hookform/resolvers/zod"
import Card from "../../../../ui/Card"
import RHFInputField from "../../../../ui/rhf/RHFInputField"
import { useForm } from "react-hook-form"
import { SetStateAction, useEffect, useState } from "react"
import {
  createPostSchema,
  createPostType,
} from "../../../../../../../common/validations/post/createPostValidator"
import StyledButton from "../../../../ui/StyledButton"
import RHFDropdownField from "../../../../ui/rhf/RHFDropdownField"
import { VISIBILITIES } from "../../../../../lib/constants/Visibilities"
import { AUTHORIZATIONS } from "../../../../../lib/constants/Authorizations"
import { CATEGORIES } from "../../../../../lib/constants/Categories"
import { isAxiosError } from "axios"
import postAPI from "../../../../../lib/services/axios-instances/postAPI"
import Alert from "../../../../ui/mui/Alert"
import { useDispatch } from "react-redux"
import { createPost } from "../../../../../lib/store/slices/timeline-slice/timelineSlice"
import CancelIcon from "@mui/icons-material/Cancel"

type Props = {
  setIsCreating: React.Dispatch<SetStateAction<boolean>>
}

const CreatePostInput = ({ setIsCreating }: Props) => {
  const dispatch = useDispatch()
  const [error, setError] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<createPostType>({
    resolver: zodResolver(createPostSchema),
  })

  useEffect(() => {
    setFocus("title")
  }, [setFocus])

  const handleCreatePost = async (formData: createPostType) => {
    try {
      const { data } = await postAPI.post("/", formData)

      dispatch(createPost(data.data))
      setIsCreating(false)
      setError("")
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data.message)
      }
    }
  }

  return (
    <Card twClasses="relative p-5 border border-secondary space-y-2">
      <CancelIcon
        className="absolute right-2 top-2 cursor-pointer select-none text-red-500"
        onClick={() => setIsCreating(false)}
      />
      <form onSubmit={handleSubmit(handleCreatePost)}>
        <RHFInputField
          label="Title"
          register={register("title")}
          error={errors.title?.message}
        />
        <div className="flex gap-5">
          <RHFDropdownField
            id="Visibility"
            name="Visibility"
            placeholder="Visibility"
            options={VISIBILITIES}
            register={register("visibility")}
            error={errors.visibility?.message}
          />
          <RHFDropdownField
            id="Authorization"
            name="Authorization"
            placeholder="Authorization"
            options={AUTHORIZATIONS}
            register={register("authorization")}
            error={errors.authorization?.message}
          />
          <RHFDropdownField
            id="Category"
            name="Category"
            placeholder="Category"
            options={CATEGORIES}
            register={register("category")}
            error={errors.category?.message}
          />
        </div>
        <StyledButton
          buttonText="Submit"
          type="submit"
          onClick={handleSubmit(handleCreatePost)}
        />
      </form>
      {error && <Alert severity="error" message={error} />}
    </Card>
  )
}

export default CreatePostInput
