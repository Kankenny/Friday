// Dependencies
import { Response } from "express"
import mongoose from "mongoose"

// Models
import PostModel from "../../../models/Post"
import TaskModel from "../../../models/Task"
import SubtaskModel from "../../../models/Subtask"

// Validators
import createSubtaskSchema from "../../../lib/validations/subtask/createSubtaskValidator"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

export const createSubtask = async (req: JWTRequest, res: Response) => {
  // Extract postId from the request query
  const { postId, taskId } = req.query
  if (!postId || !taskId) {
    return res
      .status(400)
      .json({ message: "Bad Request!", data: null, ok: false })
  }

  // Validate body using the create task schema
  try {
    createSubtaskSchema.parse(req.body)
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      message: "Invalid register form data!",
      data: null,
      ok: false,
    })
  }

  // Extract payload from the body
  const { title } = req.body

  try {
    // Check if post exists
    const existingPost = await PostModel.findById(postId)
    if (!existingPost) {
      return res
        .status(404)
        .json({ message: "Post not found!", data: null, ok: false })
    }

    // Check if post exists
    const existingTask = await TaskModel.findById(taskId)
    if (!existingTask) {
      return res
        .status(404)
        .json({ message: "Task not found!", data: null, ok: false })
    }

    // Check if the user who is creating the subtask is authorized to do so
    const { _idFromToken } = req.user
    const objectId = new mongoose.Types.ObjectId(_idFromToken)
    const isOwner = existingPost.creatorId!.equals(objectId)
    const isCollaborator = existingPost.authorizedUsers.some((userId) =>
      userId.equals(objectId)
    )
    if (!isOwner || !isCollaborator) {
      return res
        .status(400)
        .json({ message: "Unauthorized request!", data: null, ok: false })
    }

    // Create new task
    const newSubtask = new SubtaskModel({
      title,
      progress: "untouched",
      taskId,
    })

    await newSubtask.save()

    res.status(200).json({
      message: "Subtask successfully created!",
      data: newSubtask,
      ok: true,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error, data: null, ok: false })
  }
}
