// Dependencies
import { Response } from "express"

// Models
import PostModel from "../../../models/Post"
import UserModel from "../../../models/User"
import TaskModel from "../../../models/Task"
import SubtaskModel from "../../../models/Subtask"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

export const deletePost = async (req: JWTRequest, res: Response) => {
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

    // Check if the user that is deleting the post is the owner
    const isOwner = existingPost.creatorId!.equals(existingUser._id)

    if (!isOwner) {
      return res
        .status(400)
        .json({ message: "Unauthorized request!", data: null, ok: false })
    }

    // Delete the post and the tasks and subtasks included in the post
    await PostModel.deleteOne({ _id: postId })
    await TaskModel.deleteMany({ postId })
    await SubtaskModel.deleteMany({ taskId: { $in: existingPost.tasks } })

    res.status(200).json({
      message: "Post successfully deleted!",
      data: null,
      ok: true,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: `Failed to delete post!: ${err}`,
      data: null,
      ok: false,
    })
  }
}
