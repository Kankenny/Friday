// Dependencies
import { Response } from "express"

// Models
import PostModel from "../../../models/Post"
import UserModel from "../../../models/User"
import TaskModel from "../../../models/Task"
import SubtaskModel from "../../../models/Subtask"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

export const copyPost = async (req: JWTRequest, res: Response) => {
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
    const existingPost = await PostModel.findById(postId).populate("tasks")
    if (!existingPost) {
      return res
        .status(400)
        .json({ message: "Post not found!", data: null, ok: false })
    }

    // Create a new post object with copied fields
    const newPost = new PostModel({
      title: existingPost.title,
      creatorId: existingUser._id,
      creatorUsername: existingUser.username,
      color: existingPost.color,
      category: existingPost.category,
      visibility: existingPost.visibility,
      upvotes: 0,
      downvotes: 0,
      authorization: existingPost.authorization,
      authorizedUsers: [],
      upvotedBy: [],
      downvotedBy: [],
      tasks: [],
      comments: [],
    })

    // Copy tasks and subtasks from the existing post

    for (const taskId of existingPost.tasks) {
      const taskToBeCopied = await TaskModel.findById(taskId).populate(
        "subtasks"
      )
      if (!taskToBeCopied) continue
      const newTask = new TaskModel({
        title: taskToBeCopied.title,
        progress: taskToBeCopied.progress,
        postId: newPost._id,
        subtasks: [],
      })

      for (const subtaskId of taskToBeCopied.subtasks) {
        const subtaskToBeCopied = await SubtaskModel.findById(subtaskId)
        if (!subtaskToBeCopied) continue
        const newSubtask = new SubtaskModel({
          title: subtaskToBeCopied.title,
          progress: subtaskToBeCopied.progress,
          taskId: newTask._id,
        })
        await newSubtask.save()
        newTask.subtasks.push(newSubtask._id)
      }

      await newTask.save()
      newPost.tasks.push(newTask._id)
    }

    // Save the new post
    await newPost.save()

    // Update existing users post field
    existingUser.posts.push(newPost._id)
    await existingUser.save()

    return res.status(200).json({
      message: "Post successfully copied!",
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
