// Dependencies
import { Response } from "express"

// Models
import CommentModel from "../../../models/Comment"
import PostModel from "../../../models/Post"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

export const deleteComment = async (req: JWTRequest, res: Response) => {
  try {
    // Extract commentId and commenterId from the request params
    const { commentId } = req.params

    // Extract id from token
    const { _idFromToken } = req.user

    // Extract postId from the request query
    const { postId } = req.query

    // Check if the comment exists
    const existingComment = await CommentModel.findById(commentId)
    if (!existingComment) {
      return res.status(404).json({
        message: "Comment does not exist!",
        data: null,
        ok: false,
      })
    }

    // Check if post exists
    const existingPost = await PostModel.findById(postId)
    if (!existingPost) {
      return res
        .status(404)
        .json({ message: "Post does not exist!", data: null, ok: false })
    }

    // Check if the commenter is the owner of the comment
    const isOwner = existingComment.commenterId!.equals(_idFromToken)
    if (!isOwner) {
      return res.status(403).json({
        message: "You cannot delete a comment that is not yours!",
        data: null,
        ok: false,
      })
    }

    // Delete the comment
    await CommentModel.findByIdAndDelete(commentId)

    // Update comments field of post
    existingPost.comments = existingPost.comments.filter(
      (comment) => !comment._id.equals(commentId)
    )
    await existingPost.save()

    res.status(200).json({
      message: "Comment successfully deleted!",
      data: null,
      ok: true,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error!",
      data: null,
      ok: false,
    })
  }
}
