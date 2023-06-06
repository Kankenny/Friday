// Dependencies
import { Request, Response } from "express"
import mongoose from "mongoose"

// Models
import PostModel from "../models/Post"
import TaskModel from "../models/Task"
import SubtaskModel from "../models/Subtask"

// Validators
import createSubtaskSchema from "../lib/validations/subtask/createSubtaskValidator"
import updateSubtaskProgressSchema from "../lib/validations/subtask/updateSubtaskProgressValidator"

// Types
import JWTRequest from "../lib/types/JWTRequestType"

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
    console.log(error)
    return res.status(500).json({ message: error, data: null, ok: false })
  }
}

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

export const changeSubtaskProgress = async (req: JWTRequest, res: Response) => {
  try {
    // Validate body using the update subtask progress schema
    updateSubtaskProgressSchema.parse(req.body)

    // Extract progress payload from the request body
    const { progress, subtaskId } = req.body

    // Extract postId and taskId from the request query
    const { postId, taskId } = req.query
    if (!postId || !taskId) {
      return res.status(400).json({
        message: "Bad Request!",
        data: null,
        ok: false,
      })
    }

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

    // Check if subtask exists
    const existingSubtask = await SubtaskModel.findById(subtaskId)
    if (!existingSubtask) {
      return res.status(404).json({
        message: "Subtask not found!",
        data: null,
        ok: false,
      })
    }

    // Check if the user who is updating the subtask is authorized to do so
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

    // Update subtask progress
    existingSubtask.progress = progress
    await existingSubtask.save()

    res.status(200).json({
      message: "Task progress updated successfully!",
      data: existingSubtask,
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

export const deleteSubtask = async (req: JWTRequest, res: Response) => {
  try {
    // Extract subtaskId from the request query
    const subtaskId = req.query.subtaskId
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

    if (!isOwner || !isCollaborator) {
      return res
        .status(400)
        .json({ message: "Unauthorized request!", data: null, ok: false })
    }

    // Delete the subtask
    await SubtaskModel.deleteOne({ _id: subtaskId })

    res.status(200).json({
      message: "Subtask deleted successfully!",
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
