// Dependencies
import { Response } from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"

// Models
import UserModel from "../../../models/User"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

export const changePassword = async (req: JWTRequest, res: Response) => {
  // Destructure the payload attached to the body
  const { userId, oldPassword, newPassword, newConfirmPassword } = req.body

  // Check if appropriate payload is attached to the body
  if (!oldPassword || !newPassword || !newConfirmPassword) {
    return res.status(400).json({
      message:
        "Old Password, New Password, and Confirm Password properties are required!",
      data: null,
      ok: false,
    })
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

  // Check if user exists
  const existingUser = await UserModel.findOne({ _id: userId })
  if (!existingUser) {
    return res
      .status(400)
      .json({ message: "Bad Request!", data: null, ok: false })
  }

  // Check if oldPassword and newPassword matches
  const didPasswordEvenChange = await bcrypt.compare(
    newPassword,
    existingUser.password
  )
  if (didPasswordEvenChange) {
    return res.status(400).json({
      message: "New password cannot match your old password!",
      data: null,
      ok: false,
    })
  }

  try {
    // Hashing new password
    const salt = await bcrypt.genSalt(10)
    const newHashedPassword = await bcrypt.hash(newPassword, salt)

    // Update user password
    existingUser.password = newHashedPassword
    await existingUser!.save()

    res.status(200).json({
      message: "Password Changed Successful!",
      data: null,
      ok: true,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error, data: null, ok: false })
  }
}
