// Dependencies
import { Request, Response } from "express"
import mongoose from "mongoose"

// Models
import UserModel from "../../../models/User"

export const getUser = async (req: Request, res: Response) => {
  // Extract username from request params
  const { userIdOrUsername } = req.params

  // Check if appropriate payload is attached to the body
  if (!userIdOrUsername) {
    return res.status(400).json({
      message: "userIdOrUsername params is required!",
      data: null,
      ok: false,
    })
  }

  try {
    // Check if the user exists
    const existingUser = await UserModel.findOne({
      $or: [{ _id: userIdOrUsername }, { username: userIdOrUsername }],
    })
      .populate({
        path: "posts savedPosts upvotedPosts downvotedPosts",
        populate: {
          path: "tasks",
          populate: {
            path: "subtasks",
          },
        },
      })
      .populate("notifications")

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
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: `Internal Server Error!: ${error}`,
      data: null,
      ok: false,
    })
  }
}
