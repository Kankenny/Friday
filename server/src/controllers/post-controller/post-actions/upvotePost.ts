// Dependencies
import { Response } from "express"

// Models
import PostModel from "../../../models/Post"
import UserModel from "../../../models/User"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

export const upvotePost = async (req: JWTRequest, res: Response) => {
  try {
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

    // Check if the user that is upvoting is not the owner of the post
    const isOwner = existingUser.username === existingPost.creatorUsername
    if (isOwner) {
      return res.status(400).json({
        message: "You cannot upvote your own post!",
        data: null,
        ok: false,
      })
    }

    // Check if the user has downvoted the post. If so, remove their downvote
    const hasAlreadyDownvoted = existingPost.downvotedBy.some((userId) =>
      userId.equals(existingUser._id)
    )
    if (hasAlreadyDownvoted) {
      // Remove user's downvote and update upvotes
      existingPost.downvotes -= 1
      const filteredDownvotedBy = existingPost.downvotedBy.filter((userId) =>
        userId.equals(existingUser._id)
      )
      existingPost.downvotedBy = filteredDownvotedBy
    }

    // Check if the user has already upvoted the post
    const hasAlreadyUpvoted = existingPost.upvotedBy.some((userId) =>
      userId.equals(existingUser._id)
    )
    if (hasAlreadyUpvoted) {
      return res.status(400).json({
        message: "You have already upvoted this post!",
        data: null,
        ok: false,
      })
    }

    // Update upvotes
    existingPost.upvotes += 1
    existingPost.upvotedBy.push(existingUser._id)
    await existingPost.save()

    res.status(200).json({
      message: "Post successfully upvoted!",
      data: null,
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
