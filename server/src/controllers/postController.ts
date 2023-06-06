// Dependencies
import { Request, Response } from "express"
import mongoose from "mongoose"

// Models
import PostModel from "../models/Post"
import UserModel from "../models/User"
import TaskModel from "../models/Task"
import SubtaskModel from "../models/Subtask"

// Types
import JWTRequest from "../lib/types/JWTRequestType"

// Validators
import createPostSchema from "../lib/validations/post/createPostValidator"
import updatePostSchema from "../lib/validations/post/updatePostValidator"

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
    const existingPost = await PostModel.find({ _id: postId }).populate(
      "tasks comments"
    )

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

export const deletePost = async (req: JWTRequest, res: Response) => {
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
    const existingPost = await PostModel.findById(postId)
    if (!existingPost) {
      return res
        .status(400)
        .json({ message: "Post not found!", data: null, ok: false })
    }

    // Check if the user that is deleting the post is the owner
    const isOwner = existingUser.username === existingPost.creatorUsername
    if (!isOwner) {
      return res
        .status(400)
        .json({ message: "Unauthorized request!", data: null, ok: false })
    }

    // Delete the post and the tasks and subtasks included in the post
    await PostModel.deleteOne({ _id: postId })
    await TaskModel.deleteMany({ postId })
    await SubtaskModel.deleteMany({ taskId: { $in: existingPost.tasks } })

    res.status(200).json({
      message: "Post successfully deleted!",
      data: null,
      ok: true,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: `Failed to delete post!: ${err}`,
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

    let objectId
    try {
      objectId = new mongoose.Types.ObjectId(userIdToAuthorize)
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Invalid userIdToAuthorize!", data: null, ok: false })
    }

    // Check if user is already authorized on the post
    const isAlreadyAuthorized = existingPost.authorizedUsers.some((userId) =>
      objectId.equals(userId)
    )
    if (isAlreadyAuthorized) {
      return res
        .status(400)
        .json({ message: "User is already authorized!", data: null, ok: false })
    }

    // Update authorizedUsers
    existingPost.authorizedUsers.push(objectId)
    await existingPost.save()

    return res.status(200).json({
      message: "User successfully authorized!",
      data: null,
      ok: true,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: `Failed to authorize user!: ${error}`,
      data: null,
      ok: false,
    })
  }
}

export const unauthorizeUserToPost = async (req: JWTRequest, res: Response) => {
  try {
    // Destructure payload from the request params
    const { postId, userIdToUnauthorize } = req.params

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

    const objectId = new mongoose.Types.ObjectId(userIdToUnauthorize)

    // Check if user is authorized on the post
    const isAuthorized = existingPost.authorizedUsers.some((userId) =>
      objectId.equals(userId)
    )
    if (!isAuthorized) {
      return res.status(400).json({
        message: "User is already unauthorized!",
        data: null,
        ok: false,
      })
    }

    // Update authorizedUsers
    const filteredAuthorizedUsers = existingPost.authorizedUsers.filter(
      (userId) => !userId.equals(objectId)
    )
    existingPost.authorizedUsers = filteredAuthorizedUsers
    await existingPost.save()

    return res.status(200).json({
      message: "User successfully unauthorized!",
      data: null,
      ok: true,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: `Failed to unauthorize user!: ${err}}`,
      data: null,
      ok: false,
    })
  }
}

export const upvotePost = async (req: JWTRequest, res: Response) => {
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
    const existingPost = await PostModel.findById(postId)
    if (!existingPost) {
      return res
        .status(400)
        .json({ message: "Post not found!", data: null, ok: false })
    }

    // Check if the user that is upvoting is not the owner of the post
    const isOwner = existingUser.username === existingPost.creatorUsername
    if (isOwner) {
      return res.status(400).json({
        message: "You cannot upvote your own post!",
        data: null,
        ok: false,
      })
    }

    // Check if the user has downvoted the post. If so, remove their downvote
    const hasAlreadyDownvoted = existingPost.downvotedBy.some((userId) =>
      userId.equals(existingUser._id)
    )
    if (hasAlreadyDownvoted) {
      // Remove user's downvote and update upvotes
      existingPost.downvotes -= 1
      const filteredDownvotedBy = existingPost.downvotedBy.filter((userId) =>
        userId.equals(existingUser._id)
      )
      existingPost.downvotedBy = filteredDownvotedBy
    }

    // Check if the user has already upvoted the post
    const hasAlreadyUpvoted = existingPost.upvotedBy.some((userId) =>
      userId.equals(existingUser._id)
    )
    if (hasAlreadyUpvoted) {
      return res.status(400).json({
        message: "You have already upvoted this post!",
        data: null,
        ok: false,
      })
    }

    // Update upvotes
    existingPost.upvotes += 1
    existingPost.upvotedBy.push(existingUser._id)
    await existingPost.save()

    res.status(200).json({
      message: "Post successfully upvoted!",
      data: null,
      ok: true,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: `Failed to upvote post!: ${error}`,
      data: null,
      ok: false,
    })
  }
}

export const downvotePost = async (req: JWTRequest, res: Response) => {
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
    const existingPost = await PostModel.findById(postId)
    if (!existingPost) {
      return res
        .status(400)
        .json({ message: "Post not found!", data: null, ok: false })
    }

    // Check if the user that is downvoting is not the owner of the post
    const isOwner = existingUser.username === existingPost.creatorUsername
    if (isOwner) {
      return res.status(400).json({
        message: "You cannot downvote your own post!",
        data: null,
        ok: false,
      })
    }

    // Check if the user has upvoted the post. If so, remove their upvote
    const hasAlreadyUpvoted = existingPost.upvotedBy.some((userId) =>
      userId.equals(existingUser._id)
    )
    if (hasAlreadyUpvoted) {
      // Remove user's upvote
      existingPost.upvotes -= 1
      const filteredUpvotedBy = existingPost.upvotedBy.filter((userId) =>
        userId.equals(existingUser._id)
      )
      existingPost.upvotedBy = filteredUpvotedBy
    }

    // Check if the user has already downvoted the post
    const hasAlreadyDownvoted = existingPost.downvotedBy.some((userId) =>
      userId.equals(existingUser._id)
    )
    if (hasAlreadyDownvoted) {
      return res.status(400).json({
        message: "You have already downvoted this post!",
        data: null,
        ok: false,
      })
    }

    // Update downvotes
    existingPost.downvotes += 1
    existingPost.downvotedBy.push(existingUser._id)
    await existingPost.save()

    res.status(200).json({
      message: "Post successfully downvoted!",
      data: null,
      ok: true,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: `Failed to downvote post!: ${error}`,
      data: null,
      ok: false,
    })
  }
}
