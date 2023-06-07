// Dependencies
import { Response } from "express"
import mongoose from "mongoose"

// Models
import PostModel from "../../../models/Post"
import TaskModel from "../../../models/Task"

// Validators
import updateTaskProgressSchema from "../../../lib/validations/task/updateTaskProgressValidator"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

export const changeTaskProgress = async (req: JWTRequest, res: Response) => {
  try {
    // Validate body using the update task progress schema
    updateTaskProgressSchema.parse(req.body)

    // Extract progress payload from the request body
    const { progress } = req.body

    // Check if post exists
    const postId = req.query.postId
    if (!postId) {
      return res.status(400).json({
        message: "Bad Request!",
        data: null,
        ok: false,
      })
    }

    const existingPost = await PostModel.findById(postId)
    if (!existingPost) {
      return res.status(404).json({
        message: "Post not found!",
        data: null,
        ok: false,
      })
    }

    // Check if task exists
    const taskId = req.query.taskId
    if (!taskId) {
      return res.status(400).json({
        message: "Bad Request!",
        data: null,
        ok: false,
      })
    }

    const existingTask = await TaskModel.findById(taskId)
    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found!",
        data: null,
        ok: false,
      })
    }

    // Check if the user who is updating the task is authorized to do so
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

    // Update task progress
    existingTask.progress = progress
    await existingTask.save()

    res.status(200).json({
      message: "Task progress updated successfully!",
      data: existingTask,
      ok: true,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Internal server error",
      data: null,
      ok: false,
    })
  }
}
