import { zodResolver } from "@hookform/resolvers/zod"
import RHFTextareaField from "../../rhf/RHFTextAreaField"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { createComment } from "../../../../lib/store/slices/post-detail-slice/postDetailSlice"

import createCommentSchema, {
  createCommentType,
} from "../../../../../../server/src/lib/validations/comment/createCommentValidator"
import StyledButton from "../../StyledButton"
import commentAPI from "../../../../lib/services/axios-instances/commentAPI"

type Props = {
  postId: string
}

const CommentInput = ({ postId }: Props) => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<createCommentType>({
    resolver: zodResolver(createCommentSchema),
  })

  useEffect(() => {
    setFocus("body")
  }, [setFocus])

  const handleCreateComment = async (formData: createCommentType) => {
    try {
      const { data } = await commentAPI.post(`/?postId=${postId}`, formData)
      data.data.newComment.commenterId = data.data.user
      dispatch(createComment(data.data.newComment))
      reset()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form className="my-10" onSubmit={handleSubmit(handleCreateComment)}>
      <RHFTextareaField
        label="Write a comment..."
        register={register("body")}
        error={errors.body?.message}
        twClasses="text-white"
      />
      <StyledButton
        buttonText="Submit Comment"
        type="submit"
        twClasses="bg-tertiary text-xl font-semibold py-4 px-6 w-full"
      />
    </form>
  )
}

export default CommentInput
