// Dependencies
import { Response } from "express"

// Models
import CommentModel from "../../../models/Comment"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

export const deleteComment = async (req: JWTRequest, res: Response) => {
  try {
    // Extract commentId and commenterId from the request params
    const { commentId, deleterId } = req.params

    // Extract id from token
    const { _idFromToken } = req.user

    // Determine if id from token and deleterId from params match
    if (deleterId !== _idFromToken) {
      return res.status(400).json({
        message: "Invalid Credentials!",
        data: null,
        ok: false,
      })
    }

    // Check if the comment exists
    const existingComment = await CommentModel.findById(commentId)
    if (!existingComment) {
      return res.status(404).json({
        message: "Comment does not exist!",
        data: null,
        ok: false,
      })
    }

    // Check if the commenter is the owner of the comment
    const isOwner = existingComment.commenterId!.equals(deleterId)
    if (!isOwner) {
      return res.status(403).json({
        message: "You cannot delete a comment that is not yours!",
        data: null,
        ok: false,
      })
    }

    // Delete the comment
    await CommentModel.findByIdAndDelete(commentId)

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
