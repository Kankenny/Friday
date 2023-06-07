// Dependencies
import { Request, Response } from "express"

// Models
import PostModel from "../../../models/Post"
import UserModel from "../../../models/User"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

// Validators
import createPostSchema from "../../../lib/validations/post/createPostValidator"

export const createPost = async (req: JWTRequest, res: Response) => {
  try {
    // Validate body using the create post schema
    createPostSchema.parse(req.body)

    // Destructure payload from the request body
    const {
      title,
      creatorId,
      creatorUsername,
      dueDate,
      color,
      category,
      visibility,
      authorization,
    } = req.body

    // Extract decoded token from verifyToken middleware
    const { _idFromToken } = req.user

    // Check if user exists
    const existingUser = await UserModel.findById(_idFromToken)
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials!", data: null, ok: false })
    }

    const newPost = new PostModel({
      title,
      creatorId,
      creatorUsername,
      dueDate,
      color,
      category,
      visibility,
      authorization,
      upvotes: 0,
      downvotes: 0,
      authorizedUsers: [],
      upvotedBy: [],
      downvotedBy: [],
      tasks: [],
      comments: [],
    })

    await newPost.save()

    return res.status(200).json({
      message: "Post successfully created!",
      data: newPost,
      ok: true,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: `Failed to create post!: ${err}`,
      data: null,
      ok: false,
    })
  }
}
