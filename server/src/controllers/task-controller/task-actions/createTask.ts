// Dependencies
import { Response } from "express"
import mongoose from "mongoose"

// Models
import PostModel from "../../../models/Post"
import TaskModel from "../../../models/Task"

// Validators
import createTaskSchema from "../../../lib/validations/task/createTaskValidator"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

export const createTask = async (req: JWTRequest, res: Response) => {
  // Extract postId from the request query
  const postId = req.query.postId
  if (!postId) {
    return res
      .status(400)
      .json({ message: "Bad Request!", data: null, ok: false })
  }

  // Validate body using the create task schema
  try {
    createTaskSchema.parse(req.body)
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
    // Check for the existence of the post
    const existingPost = await PostModel.findById(postId)
    if (!existingPost) {
      return res
        .status(404)
        .json({ message: "Post not found!", data: null, ok: false })
    }

    // Check if the user who is creating the task is authorized to do so
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
    const newTask = new TaskModel({
      title,
      progress: "untouched",
      postId,
    })

    await newTask.save()

    res
      .status(200)
      .json({ message: "Tasks successfully created!", data: newTask, ok: true })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error, data: null, ok: false })
  }
}
