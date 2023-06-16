import { zodResolver } from "@hookform/resolvers/zod"
import RHFTextareaField from "../../rhf/RHFTextAreaField"
import { useForm } from "react-hook-form"
import { useEffect } from "react"

import createCommentSchema, {
  createCommentType,
} from "../../../../../../server/src/lib/validations/comment/createCommentValidator"
import StyledButton from "../../StyledButton"

const CommentInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<createCommentType>({
    resolver: zodResolver(createCommentSchema),
  })

  useEffect(() => {
    setFocus("body")
  }, [setFocus])

  const handleCreateComment = (formData: createCommentType) => {
    console.log("TEST")
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
