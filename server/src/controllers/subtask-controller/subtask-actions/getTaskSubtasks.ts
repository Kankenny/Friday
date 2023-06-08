// Dependencies
import { Request, Response } from "express"

// Models
import PostModel from "../../../models/Post"
import TaskModel from "../../../models/Task"

export const getTaskSubtasks = async (req: Request, res: Response) => {
  // Extract postId and taskId from the request query
  const { postId, taskId } = req.query
  if (!postId || !taskId) {
    return res
      .status(400)
      .json({ message: "Bad Request!", data: null, ok: false })
  }

  try {
    // Check if post exists
    const existingPost = await PostModel.findById(postId)
    if (!existingPost) {
      return res
        .status(404)
        .json({ message: "Post not found!", data: null, ok: false })
    }

    // Check if the task exists
    const existingTask = await TaskModel.findById(taskId)
    if (!existingTask) {
      return res
        .status(404)
        .json({ message: "Post not found!", data: null, ok: false })
    }

    // Check if there are subtasks
    const subtasks = existingTask.subtasks
    if (!subtasks || subtasks.length === 0) {
      return res
        .status(404)
        .json({ message: "Subtasks not found!", data: null, ok: false })
    }

    res.status(200).json({
      message: "Subtasks successfully fetched!",
      data: subtasks,
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
