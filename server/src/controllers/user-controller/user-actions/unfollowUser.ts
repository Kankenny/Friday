// Dependencies
import { Response } from "express"
import mongoose from "mongoose"

// Models
import UserModel from "../../../models/User"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

export const unfollowUser = async (req: JWTRequest, res: Response) => {
  // Extract userId and followerId from request params
  const { userId, userToUnfollowId } = req.params

  // Check if appropriate payload is attached to the body
  if (!userId || !userToUnfollowId) {
    return res.status(400).json({
      message: "userId and userToUnfollowId params are required!",
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

  // Check if userId and userToUnfollowId are valid ObjectIds
  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(userToUnfollowId)
  ) {
    return res.status(400).json({
      message: "Invalid userId or userToUnfollowId!",
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

    // Check if follower exists
    const existingFollower = await UserModel.findById(userToUnfollowId)
    if (!existingFollower) {
      return res
        .status(404)
        .json({ message: "Follower not found!", data: null, ok: false })
    }

    const objectId = new mongoose.Types.ObjectId(userToUnfollowId)
    // Check if the user is followed by the follower
    if (!existingUser.following.includes(objectId)) {
      return res.status(400).json({
        message: "User is not followed by the follower!",
        data: null,
        ok: false,
      })
    }

    // Update user's followers and follower's following list
    existingUser.following = existingUser.following.filter(
      (follower) => !follower.equals(objectId)
    )
    existingFollower.followers = existingFollower.followers.filter(
      (user) => !user.equals(userId)
    )

    await existingUser.save()
    await existingFollower.save()

    res.status(200).json({
      message: "User successfully unfollowed!",
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
