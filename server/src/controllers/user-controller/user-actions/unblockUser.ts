// Dependencies
import { Response } from "express"
import mongoose from "mongoose"

// Models
import UserModel from "../../../models/User"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

export const unblockUser = async (req: JWTRequest, res: Response) => {
  // Extract userId and unblockedUserId from request params
  const { userId, unblockedUserId } = req.params

  // Check if appropriate payload is attached to the body
  if (!userId || !unblockedUserId) {
    return res.status(400).json({
      message: "userId and unblockedUserId params are required!",
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

  // Check if userId and unblockedUserId are valid ObjectIds
  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(unblockedUserId)
  ) {
    return res.status(400).json({
      message: "Invalid userId or unblockedUserId!",
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

    // Check if unblocked user exists
    const unblockedUser = await UserModel.findById(unblockedUserId)
    if (!unblockedUser) {
      return res
        .status(404)
        .json({ message: "Unblocked user not found!", data: null, ok: false })
    }

    const unblockedUserObjectId = new mongoose.Types.ObjectId(unblockedUserId)
    // Check if the user is already unblocked
    if (!existingUser.blocked.includes(unblockedUserObjectId)) {
      return res.status(400).json({
        message: "User is not blocked!",
        data: null,
        ok: false,
      })
    }

    // Remove the unblocked user from the user's blocked array
    existingUser.blocked = existingUser.blocked.filter(
      (id) => !id.equals(unblockedUserObjectId)
    )

    await existingUser.save()

    res.status(200).json({
      message: "User successfully unblocked!",
      data: null,
      ok: true,
    })
  } catch (err) {
    res.status(500).json({ message: err, data: null, ok: false })
  }
}
