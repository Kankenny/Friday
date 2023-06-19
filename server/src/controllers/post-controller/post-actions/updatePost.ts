// Dependencies
import { Response } from "express"

// Models
import PostModel from "../../../models/Post"
import UserModel from "../../../models/User"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

// Validators
import { updatePostSchema } from "../../../../../common/validations/post/updatePostValidator"

export const updatePost = async (req: JWTRequest, res: Response) => {
  try {
    // Validate body using the update post schema
    updatePostSchema.parse(req.body)

    // Destructure payload from the request params
    const { postId } = req.params

    // Extract decoded token from verifyToken middleware
    const { _idFromToken } = req.user

    // Check if user exists
    const existingUser = await UserModel.findById(_idFromToken)
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials!", data: null, ok: false })
    }

    // Check if post exists
    const existingPost = await PostModel.findById(postId)
    if (!existingPost) {
      return res
        .status(400)
        .json({ message: "Post not found!", data: null, ok: false })
    }

    // Check if the user that is updating is the creator of the post
    const isOwner = existingUser.username === existingPost.creatorUsername
    if (!isOwner) {
      return res
        .status(400)
        .json({ message: "Unauthorized request!", data: null, ok: false })
    }

    // Update post
    const fieldsToBeUpdated = req.body
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { $set: { ...fieldsToBeUpdated } },
      { new: true }
    ).populate({
      path: "tasks",
      populate: {
        path: "subtasks",
      },
    })

    return res.status(200).json({
      message: "Post successfully updated!",
      data: updatedPost,
      ok: true,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: `Internal Server Error!: ${error}`,
      data: null,
      ok: false,
    })
  }
}
