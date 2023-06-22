import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { createComment } from "../../../../lib/store/slices/post-detail-slice/postDetailSlice"

import createCommentSchema, {
  createCommentType,
} from "../../../../../../server/src/lib/validations/comment/createCommentValidator"
import StyledButton from "../../StyledButton"
import commentAPI from "../../../../lib/services/axios-instances/commentAPI"
import RHFInputField from "../../rhf/RHFInputField"
import { PostType } from "../../../../lib/types/primitive-types/PostType"
import { useTypedSelector } from "../../../../lib/hooks/redux-hook/useTypedSelector"

type Props = {
  post: PostType
}

const CommentInput = ({ post }: Props) => {
  const { _id: authUserId } = useTypedSelector((state) => state.sameProfile)
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
      const { data } = await commentAPI.post(`/?postId=${post._id}`, formData)
      data.data.newComment.commenterId = data.data.user
      dispatch(createComment(data.data.newComment))
      reset()
    } catch (err) {
      console.error(err)
    }
  }

  const isCurrUserAuthorized =
    post.authorization === "public" ||
    (post.authorization === "private" &&
      post.authorizedUsers.includes(authUserId)) ||
    post.creatorId === authUserId

  return (
    <form className="my-10" onSubmit={handleSubmit(handleCreateComment)}>
      <RHFInputField
        label={`${
          isCurrUserAuthorized
            ? "Write a comment..."
            : "You are not authorized to comment"
        }`}
        register={register("body")}
        error={errors.body?.message}
        twClasses={`text-main ${isCurrUserAuthorized && "cursor-not-allowed"}`}
        readonly={!isCurrUserAuthorized}
      />
      <StyledButton
        buttonText="Submit Comment"
        type="submit"
        twClasses="bg-tertiary text-xl font-semibold py-4 px-6 w-full"
        disabled={!isCurrUserAuthorized}
      />
    </form>
  )
}

export default CommentInput
