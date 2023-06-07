// Dependencies
import { Response } from "express"
import mongoose from "mongoose"

// Models
import PostModel from "../../../models/Post"
import TaskModel from "../../../models/Task"
import SubtaskModel from "../../../models/Subtask"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

export const deleteTask = async (req: JWTRequest, res: Response) => {
  try {
    // Extract taskId from the request query
    const taskId = req.query.taskId
    if (!taskId) {
      return res.status(400).json({
        message: "Bad Request!",
        data: null,
        ok: false,
      })
    }

    // Check if the task exists
    const existingTask = await TaskModel.findById(taskId)
    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found!",
        data: null,
        ok: false,
      })
    }

    // Check if the user who is deleting the task is authorized to do so
    const { _idFromToken } = req.user
    const objectId = new mongoose.Types.ObjectId(_idFromToken)
    const postId = existingTask.postId

    const existingPost = await PostModel.findById(postId)
    if (!existingPost) {
      return res.status(404).json({
        message: "Post not found!",
        data: null,
        ok: false,
      })
    }

    // Check if the user who is deleting the task is authorized to do so
    const isOwner = existingPost.creatorId!.equals(objectId)
    const isCollaborator = existingPost.authorizedUsers.some((userId) =>
      userId.equals(objectId)
    )
    if (!isOwner && !isCollaborator) {
      return res
        .status(400)
        .json({ message: "Unauthorized request!", data: null, ok: false })
    }

    // Delete the task and all its subtasks
    await TaskModel.deleteOne({ _id: taskId })
    await SubtaskModel.deleteMany({ taskId })

    // Remove tasks field of the post
    existingPost.tasks = existingPost.tasks.filter(
      (task) => !task._id.equals(existingTask._id)
    )
    await existingPost.save()

    res.status(200).json({
      message: "Task deleted successfully!",
      data: null,
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
