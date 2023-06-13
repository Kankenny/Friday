// Dependencies
import { Request, Response } from "express"
import mongoose from "mongoose"

// Models
import UserModel from "../../../models/User"

export const getUser = async (req: Request, res: Response) => {
  // Extract username from request params
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

  try {
    const existingUser = await UserModel.findById(userId)
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
