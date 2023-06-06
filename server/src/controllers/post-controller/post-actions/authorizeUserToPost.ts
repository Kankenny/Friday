// Dependencies
import { Response } from "express"
import mongoose from "mongoose"

// Models
import PostModel from "../../../models/Post"
import UserModel from "../../../models/User"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

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

    let objectId: any
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
