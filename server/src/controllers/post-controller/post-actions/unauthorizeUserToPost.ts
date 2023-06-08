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

    // Check if userIdToAuthorize is a valid objectId
    let objectId: any
    try {
      objectId = new mongoose.Types.ObjectId(userIdToUnauthorize)
    } catch (error) {
      return res.status(400).json({
        message: "Invalid userIdToAuthorize!",
        data: null,
        ok: false,
      })
    }

    // Check if unauthorizer exists
    const existingDeauthorizer = await UserModel.findById(_idFromToken)
    if (!existingDeauthorizer) {
      return res
        .status(400)
        .json({ message: "Authorizer does not exist!", data: null, ok: false })
    }

    // Check if unauthorizee exists
    const existingDeauthorizee = await UserModel.findById(userIdToUnauthorize)
    if (!existingDeauthorizee) {
      return res
        .status(404)
        .json({ message: "Authorizee does not exist", data: null, ok: false })
    }

    // Check if post exists
    const existingPost = await PostModel.findById(postId)
    if (!existingPost) {
      return res
        .status(400)
        .json({ message: "Post not found!", data: null, ok: false })
    }

    // Check if the user that is authorizing is the owner of the post
    const isOwner =
      existingDeauthorizer.username === existingPost.creatorUsername
    if (!isOwner) {
      return res.status(400).json({
        message: "Invalid Request!",
        data: null,
        ok: false,
      })
    }

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

    // Update deauthorizee's authorizedPosts field
    existingDeauthorizee.authorizedPosts.filter(
      (authorizedPosts) => !authorizedPosts._id.equals(existingPost._id)
    )
    await existingDeauthorizee.save()

    return res.status(200).json({
      message: "User successfully unauthorized!",
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
