// Dependencies
import { Response } from "express"
import mongoose from "mongoose"

// Models
import PostModel from "../../../models/Post"
import UserModel from "../../../models/User"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

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
