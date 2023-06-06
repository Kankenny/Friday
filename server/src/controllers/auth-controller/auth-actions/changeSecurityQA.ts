// Dependencies
import { Response } from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"

// Models
import UserModel from "../../../models/User"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

export const changeSecurityQA = async (req: JWTRequest, res: Response) => {
  // destructure the payload attached to the body
  const { userId, password, newSecurityQuestion, newSecurityQAnswer } = req.body

  // Check if appropriate payload is attached to the body
  if (!password || !newSecurityQuestion || !newSecurityQAnswer) {
    return res.status(400).json({
      message:
        "New Security Question, New Security Question Answer, and Password properties are required!",
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

  // Check if password matches user password
  const doesPasswordMatch = await bcrypt.compare(
    password,
    existingUser.password
  )
  if (!doesPasswordMatch) {
    return res.status(400).json({
      message: "You provided the wrong password!",
      data: null,
      ok: false,
    })
  }

  try {
    // Hashing new security question answer
    const salt = await bcrypt.genSalt(10)
    const hashedSecurityQAnswer = await bcrypt.hash(newSecurityQAnswer, salt)

    // Update user security qa
    existingUser.securityQuestion = newSecurityQuestion
    existingUser.securityAnswer = hashedSecurityQAnswer
    await existingUser!.save()

    res.status(200).json({
      message: "Security QA Updated Successfully!",
      data: null,
      ok: true,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error, data: null, ok: false })
  }
}
