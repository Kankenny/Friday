// Dependencies
import { Response } from "express"

// Models
import PostModel from "../../../models/Post"
import UserModel from "../../../models/User"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

export const downvotePost = async (req: JWTRequest, res: Response) => {
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

    // Check if the user that is downvoting is not the owner of the post
    const isOwner = existingUser.username === existingPost.creatorUsername
    if (isOwner) {
      return res.status(400).json({
        message: "You cannot downvote your own post!",
        data: null,
        ok: false,
      })
    }

    // Check if the user has upvoted the post. If so, remove their upvote
    const hasAlreadyUpvoted = existingPost.upvotedBy.some((userId) =>
      userId.equals(existingUser._id)
    )
    if (hasAlreadyUpvoted) {
      // Remove user's upvote
      existingPost.upvotes -= 1
      const filteredUpvotedBy = existingPost.upvotedBy.filter((userId) =>
        userId.equals(existingUser._id)
      )
      existingPost.upvotedBy = filteredUpvotedBy
    }

    // Check if the user has already downvoted the post
    const hasAlreadyDownvoted = existingPost.downvotedBy.some((userId) =>
      userId.equals(existingUser._id)
    )
    if (hasAlreadyDownvoted) {
      return res.status(400).json({
        message: "You have already downvoted this post!",
        data: null,
        ok: false,
      })
    }

    // Update downvotes
    existingPost.downvotes += 1
    existingPost.downvotedBy.push(existingUser._id)
    await existingPost.save()

    res.status(200).json({
      message: "Post successfully downvoted!",
      data: null,
      ok: true,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: `Failed to downvote post!: ${error}`,
      data: null,
      ok: false,
    })
  }
}
