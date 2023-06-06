// Dependencies
import { Request, Response } from "express"
import mongoose from "mongoose"

// Models
import UserModel from "../../../models/User"

export const getUserFollowing = async (req: Request, res: Response) => {
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
