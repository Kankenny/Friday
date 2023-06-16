// Dependencies
import { Response } from "express"
import mongoose from "mongoose"

// Models
import CommentModel from "../../../models/Comment"
import UserModel from "../../../models/User"
import PostModel from "../../../models/Post"

// Validators
import createCommentSchema from "../../../lib/validations/comment/createCommentValidator"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

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
  const { body } = req.body

  // Extract postId  from the request query
  const { postId } = req.query

  // Extract id from token
  const { _idFromToken } = req.user

  try {
    // Check if commenter exists
    const existingCommenter = await UserModel.findById(_idFromToken)
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

    const isCreator = new mongoose.Types.ObjectId(_idFromToken).equals(
      postCreator!._id
    )
    const isPublic = existingPost.visibility === "public"
    const isCollaborator = existingPost.authorizedUsers.some((user) =>
      user._id.equals(_idFromToken)
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
      body,
      commenterId: _idFromToken,
      commenterUsername: existingCommenter.username,
      postId,
    })
    await newComment.save()

    // Update comments field of post
    existingPost.comments.push(newComment._id)
    await existingPost.save()

    // Update comments field of user
    existingCommenter.comments.push(newComment._id)
    await existingCommenter.save()

    res.status(200).json({
      message: "Comment successfully created!",
      data: { newComment, user: existingCommenter },
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
