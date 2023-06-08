// Dependencies
import { Response } from "express"
import mongoose from "mongoose"

// Models
import PostModel from "../../../models/Post"
import TaskModel from "../../../models/Task"
import SubtaskModel from "../../../models/Subtask"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

export const deleteSubtask = async (req: JWTRequest, res: Response) => {
  try {
    // Extract subtaskId from the request params
    const { subtaskId } = req.params
    if (!subtaskId) {
      return res.status(400).json({
        message: "Bad Request!",
        data: null,
        ok: false,
      })
    }

    // Check if the subtask exists
    const existingSubtask = await SubtaskModel.findById(subtaskId)
    if (!existingSubtask) {
      return res.status(404).json({
        message: "Subtask not found!",
        data: null,
        ok: false,
      })
    }

    // Extract postId from the request query
    const { postId, taskId } = req.query

    // Check if post exists
    const existingPost = await PostModel.findById(postId)
    if (!existingPost) {
      return res.status(404).json({
        message: "Post not found!",
        data: null,
        ok: false,
      })
    }

    // Check if task exists
    const existingTask = await TaskModel.findById(taskId)
    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found!",
        data: null,
        ok: false,
      })
    }

    // Check if the user who is deleting the subtask is authorized to do so
    const { _idFromToken } = req.user
    const objectId = new mongoose.Types.ObjectId(_idFromToken)
    const isOwner = existingPost.creatorId!.equals(objectId)
    const isCollaborator = existingPost.authorizedUsers.some((userId) =>
      userId.equals(objectId)
    )

    if (!isOwner && !isCollaborator) {
      return res
        .status(400)
        .json({ message: "Unauthorized request!", data: null, ok: false })
    }

    // Delete the subtask
    await SubtaskModel.deleteOne({ _id: subtaskId })

    // Update subtasks field of the task
    existingTask.subtasks = existingTask.subtasks.filter(
      (subtask) => !subtask._id.equals(subtaskId)
    )
    await existingTask.save()

    res.status(200).json({
      message: "Subtask deleted successfully!",
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
