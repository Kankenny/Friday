// Dependencies
import { Response } from "express"
import mongoose from "mongoose"

// Models
import CommentModel from "../../models/Comment"
import UserModel from "../../models/User"
import PostModel from "../../models/Post"

// Validators
import createCommentSchema from "../../lib/validations/comment/createCommentValidator"

// Types
import JWTRequest from "../../lib/types/JWTRequestType"

export const createComment = async (req: JWTRequest, res: Response) => {
  // Validate body using the create comment schema
  try {
    createCommentSchema.parse(req.body)
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      message: "Invalid create comment data!",
      data: null,
      ok: false,
    })
  }

  // Extract comment information from the request body
  const { comment } = req.body

  // Extract postId and commenterId from the request params
  const { postId, commenterId } = req.params

  // Extract id from token
  const { _idFromToken } = req.user

  // Determine if id from token and commenter id matches
  if (commenterId !== _idFromToken) {
    return res
      .status(400)
      .json({ message: "Invalid Credentials!", data: null, ok: false })
  }

  try {
    // Check if commenter exists
    const existingCommenter = await UserModel.findById(commenterId)
    if (!existingCommenter) {
      return res
        .status(404)
        .json({ message: "User does not exist!", data: null, ok: false })
    }

    // Check if post exists
    const existingPost = await PostModel.findById(postId)
    if (!existingPost) {
      return res
        .status(404)
        .json({ message: "Post does not exist!", data: null, ok: false })
    }

    // Determine if the user has appropriate visibility on the post
    const postCreator = await UserModel.findById(existingPost.creatorId)

    const isCreator = new mongoose.Types.ObjectId(commenterId).equals(
      postCreator!._id
    )
    const isPublic = existingPost.visibility === "public"
    const isCollaborator = existingPost.authorizedUsers.some((user) =>
      user._id.equals(commenterId)
    )
    const isCommentorFollowingTheCreator = existingCommenter.following.some(
      (user) => user._id.equals(postCreator!._id)
    )

    const isAuthorizedToComment =
      isCreator || isPublic || isCollaborator || isCommentorFollowingTheCreator
    if (!isAuthorizedToComment) {
      return res
        .status(400)
        .json({ message: "Unauthorized request!", data: null, ok: false })
    }

    // Create new comment
    const newComment = new CommentModel({
      comment,
      commenterId,
      postId,
    })
    await newComment.save()

    res.status(200).json({
      message: "Comment successfully created!",
      data: newComment,
      ok: true,
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: "Internal server error!", data: null, ok: false })
  }
}
