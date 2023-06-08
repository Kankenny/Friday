// Dependencies
import { Response } from "express"
import mongoose from "mongoose"

// Models
import UserModel from "../../../models/User"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

export const blockUser = async (req: JWTRequest, res: Response) => {
  // Extract userId and userToBlockId from request params
  const { userId, userToBlockId } = req.params

  // Check if appropriate payload is attached to the body
  if (!userId || !userToBlockId) {
    return res.status(400).json({
      message: "userId and userToBlockId params are required!",
      data: null,
      ok: false,
    })
  }

  // Check if blocker is the blockee
  const isTheSameUser = userId === userToBlockId
  if (isTheSameUser) {
    return res.status(400).json({
      message: "You cannot block yourself!",
      data: null,
      ok: false,
    })
  }

  // Extract decoded token from verifyToken middleware
  const { _idFromToken } = req.user

  // Check if user has an id equal to the id from the token
  if (userId !== _idFromToken) {
    return res
      .status(400)
      .json({ message: "Invalid Credentials!", data: null, ok: false })
  }

  // Check if userId and userToBlockId are valid ObjectIds
  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(userToBlockId)
  ) {
    return res.status(400).json({
      message: "Invalid userId or userToBlockId!",
      data: null,
      ok: false,
    })
  }

  try {
    // Check if user exists
    const existingUser = await UserModel.findById(userId)
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found!", data: null, ok: false })
    }

    // Check if blocked user exists
    const blockedUser = await UserModel.findById(userToBlockId)
    if (!blockedUser) {
      return res
        .status(404)
        .json({ message: "Blocked user not found!", data: null, ok: false })
    }

    const blockedUserObjectId = new mongoose.Types.ObjectId(userToBlockId)
    // Check if the user is already blocked
    if (existingUser.blocked.includes(blockedUserObjectId)) {
      return res.status(400).json({
        message: "User is already blocked!",
        data: null,
        ok: false,
      })
    }

    // Remove the blocked user from the user's following list
    existingUser.following = existingUser.following.filter(
      (id) => !id.equals(blockedUserObjectId)
    )

    // Remove the user from the blocked user's followers list
    blockedUser.followers = blockedUser.followers.filter(
      (id) => !id.equals(existingUser._id)
    )

    // Add userToBlockId to user's blocked array
    existingUser.blocked.push(blockedUserObjectId)

    await existingUser.save()
    await blockedUser.save()

    res.status(200).json({
      message: "User successfully blocked!",
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
