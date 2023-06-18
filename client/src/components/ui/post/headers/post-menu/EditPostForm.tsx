import { zodResolver } from "@hookform/resolvers/zod"
import Card from "../../../../ui/Card"
import RHFInputField from "../../../../ui/rhf/RHFInputField"
import { useForm } from "react-hook-form"
import { SetStateAction, useEffect } from "react"
import {
  updatePostSchema,
  updatePostType,
} from "../../../../../../../common/validations/post/updatePostValidator"
import StyledButton from "../../../../ui/StyledButton"
import RHFDropdownField from "../../../../ui/rhf/RHFDropdownField"
import { VISIBILITIES } from "../../../../../lib/constants/Visibilities"
import { AUTHORIZATIONS } from "../../../../../lib/constants/Authorizations"
import { CATEGORIES } from "../../../../../lib/constants/Categories"
import { isAxiosError } from "axios"
import postAPI from "../../../../../lib/services/axios-instances/postAPI"
import { useDispatch } from "react-redux"
import { PostType } from "../../../../../lib/types/primitive-types/PostType"
import { updatePost } from "../../../../../lib/store/slices/timeline-slice/timelineSlice"
import { setFeedback } from "../../../../../lib/store/slices/feedback-slice/feedbackSlice"

type Props = {
  post: PostType
  setIsEditing: React.Dispatch<SetStateAction<boolean>>
}

const EditPostForm = ({ post, setIsEditing }: Props) => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
  } = useForm<updatePostType>({
    resolver: zodResolver(updatePostSchema),
  })

  useEffect(() => {
    setValue("title", post.title)
    setValue("visibility", post.visibility)
    setValue("authorization", post.authorization)
    setValue("category", post.category)
    setFocus("title")
  }, [
    setValue,
    setFocus,
    post.title,
    post.visibility,
    post.authorization,
    post.category,
  ])

  const handleUpdatePost = async (formData: updatePostType) => {
    try {
      const { data } = await postAPI.put(`/${post._id}`, formData)
      dispatch(updatePost(data.data))
      dispatch(
        setFeedback({ feedbackMessage: data.message, feedbackType: "success" })
      )
      setIsEditing(false)
    } catch (err) {
      if (isAxiosError(err)) {
        dispatch(
          setFeedback({
            feedbackMessage: err.response?.data.message,
            feedbackType: "error",
          })
        )
      } else {
        console.error(err)
      }
    }
  }

  return (
    <Card twClasses="p-5 border border-secondary">
      <form onSubmit={handleSubmit(handleUpdatePost)}>
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
        <StyledButton buttonText="Edit" type="submit" />
      </form>
    </Card>
  )
}

export default EditPostForm
