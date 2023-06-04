import { Request, Response } from "express"
import PostModel from "../models/Post"
import UserModel from "../models/User"

// Types
import JWTRequest from "../lib/types/JWTRequestType"

// Validators
import createPostSchema from "../lib/validations/createPostValidator"
import updatePostSchema from "../lib/validations/updatePostValidator"
import mongoose from "mongoose"

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find()

    // Check validity of queried posts
    if (!posts || posts.length === 0) {
      return res
        .status(404)
        .json({ message: "No posts found!", data: null, ok: false })
    }

    res
      .status(200)
      .json({ message: "Posts successfully fetched!", data: posts, ok: true })
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ message: `Failed to get posts: ${err}`, data: null, ok: false })
  }
}

export const getPost = async (req: Request, res: Response) => {
  // Destructure payload from the request params
  const { postId } = req.params

  try {
    const existingPost = await PostModel.find({ _id: postId })

    // Check if post exists
    if (!existingPost) {
      return res
        .status(404)
        .json({ message: "Post not found!", data: null, ok: false })
    }

    res.status(200).json({
      message: "Post successfully fetched!",
      data: existingPost,
      ok: true,
    })
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ message: `Failed to get post!: ${err}`, data: null, ok: false })
  }
}

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

export const updatePost = async (req: JWTRequest, res: Response) => {
  try {
    // Validate body using the update post schema
    updatePostSchema.parse(req.body)

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

    // Check if the user that is updating is the creator of the post
    const isOwner = existingUser.username === existingPost.creatorUsername
    if (!isOwner) {
      return res
        .status(400)
        .json({ message: "Unauthorized request!", data: null, ok: false })
    }

    // Update post
    const fieldsToBeUpdated = req.body
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { $set: { ...fieldsToBeUpdated } },
      { new: true }
    )

    return res.status(200).json({
      message: "Post successfully updated!",
      data: updatedPost,
      ok: true,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: `Failed to update post!: ${err}`,
      data: null,
      ok: false,
    })
  }
}

export const authorizeUserToPost = async (req: JWTRequest, res: Response) => {
  try {
    // Destructure payload from the request params
    const { postId, userIdToAuthorize } = req.params

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

    // Check if the user that is authorizing is the owner of the post
    const isOwner = existingUser.username === existingPost.creatorUsername
    if (!isOwner) {
      return res
        .status(400)
        .json({ message: "Unauthorized request!", data: null, ok: false })
    }

    const objectId = new mongoose.Types.ObjectId(userIdToAuthorize)

    // Check if user is already authorized on the post
    const isAlreadyAuthorized = existingPost.authorizedUsers.some((userId) => {
      return objectId.equals(userId)
    })
    if (isAlreadyAuthorized) {
      return res
        .status(400)
        .json({ message: "User is already authorized!", data: null, ok: false })
    }

    // Update authorizedUsers
    const updatedAuthorizedUsers = [...existingPost.authorizedUsers, objectId]
    existingPost.authorizedUsers = updatedAuthorizedUsers
    await existingPost.save()

    return res.status(200).json({
      message: "User successfully authorized!",
      data: null,
      ok: true,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: `Failed to authorize user!: ${err}}`,
      data: null,
      ok: false,
    })
  }
}
