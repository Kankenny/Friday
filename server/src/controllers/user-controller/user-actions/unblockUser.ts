// Dependencies
import { Response } from "express"
import mongoose from "mongoose"

// Models
import UserModel from "../../../models/User"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

export const unblockUser = async (req: JWTRequest, res: Response) => {
  // Extract userId and userToUnblockId from request params
  const { userId, userToUnblockId } = req.params

  // Check if appropriate payload is attached to the body
  if (!userId || !userToUnblockId) {
    return res.status(400).json({
      message: "userId and userToUnblockId params are required!",
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

  // Check if userId and userToUnblockId are valid ObjectIds
  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(userToUnblockId)
  ) {
    return res.status(400).json({
      message: "Invalid userId or userToUnblockId!",
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
    const unblockedUser = await UserModel.findById(userToUnblockId)
    if (!unblockedUser) {
      return res
        .status(404)
        .json({ message: "Unblocked user not found!", data: null, ok: false })
    }

    if (!existingUser.blocked.includes(unblockedUser._id)) {
      return res.status(400).json({
        message: "User is not blocked!",
        data: null,
        ok: false,
      })
    }

    // Remove the unblocked user from the user's blocked array
    existingUser.blocked = existingUser.blocked.filter(
      (id) => !id.equals(unblockedUser._id)
    )

    await existingUser.save()

    res.status(200).json({
      message: "User successfully unblocked!",
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
