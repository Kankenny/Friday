import { Request, Response } from "express"
import UserModel from "../models/User"
import mongoose from "mongoose"
import JWTRequest from "../lib/types/JWTRequestType"

export const getUser = async (req: JWTRequest, res: Response) => {
  // Extract username from params
  const { userId } = req.params

  // Check if appropriate payload is attached to the body
  if (!userId) {
    return res
      .status(400)
      .json({ message: "userId params is required!", data: null, ok: false })
  }

  // Check if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res
      .status(400)
      .json({ message: "Invalid userId!", data: null, ok: false })
  }

  // Extract decoded token from verifyToken middleware
  const { _idFromToken } = req.user

  // Check if user has an id equal to the id from the token
  if (userId !== _idFromToken) {
    return res
      .status(400)
      .json({ message: "Invalid Credentials!", data: null, ok: false })
  }

  try {
    // Check if user exists
    const existingUser = await UserModel.findById(userId).populate(
      "posts savedPosts notifications"
    )
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found!", data: null, ok: false })
    }

    res.status(200).json({
      message: "User successfully fetched!",
      data: existingUser,
      ok: true,
    })
  } catch (err) {
    res.status(500).json({ message: err, data: null, ok: false })
  }
}

export const getUserFollowing = async (req: JWTRequest, res: Response) => {
  // Extract username from params
  const { userId } = req.params

  // Check if appropriate payload is attached to the body
  if (!userId) {
    return res
      .status(400)
      .json({ message: "userId params is required!", data: null, ok: false })
  }

  // Check if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res
      .status(400)
      .json({ message: "Invalid userId!", data: null, ok: false })
  }

  // Extract decoded token from verifyToken middleware
  const { _idFromToken } = req.user

  // Check if user has an id equal to the id from the token
  if (userId !== _idFromToken) {
    return res
      .status(400)
      .json({ message: "Invalid Credentials!", data: null, ok: false })
  }

  try {
    // Check if user exists
    const existingUser = await UserModel.findById(userId).populate("following")
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found!", data: null, ok: false })
    }

    res.status(200).json({
      message: "User following successfully fetched!",
      data: existingUser.following,
      ok: true,
    })
  } catch (err) {
    res.status(500).json({ message: err, data: null, ok: false })
  }
}

export const getUserFollowers = async (req: JWTRequest, res: Response) => {
  // Extract username from params
  const { userId } = req.params

  // Check if appropriate payload is attached to the body
  if (!userId) {
    return res
      .status(400)
      .json({ message: "userId params is required!", data: null, ok: false })
  }

  // Check if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res
      .status(400)
      .json({ message: "Invalid userId!", data: null, ok: false })
  }

  // Extract decoded token from verifyToken middleware
  const { _idFromToken } = req.user

  // Check if user has an id equal to the id from the token
  if (userId !== _idFromToken) {
    return res
      .status(400)
      .json({ message: "Invalid Credentials!", data: null, ok: false })
  }

  try {
    // Check if user exists
    const existingUser = await UserModel.findById(userId).populate("followers")
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found!", data: null, ok: false })
    }

    res.status(200).json({
      message: "User followers successfully fetched!",
      data: existingUser.followers,
      ok: true,
    })
  } catch (err) {
    res.status(500).json({ message: err, data: null, ok: false })
  }
}
