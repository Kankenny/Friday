// Dependencies
import { Response } from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"

// Models
import UserModel from "../../../models/User"

// Validators
import { changePasswordFormSchema } from "../../../../../common/validations/changePasswordFormValidator"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

export const changePassword = async (req: JWTRequest, res: Response) => {
  try {
    // Validate body using the register form schema
    changePasswordFormSchema.parse(req.body)

    // Destructure the payload attached to the body
    const { oldPassword, newPassword } = req.body

    // Extract decoded token from verifyToken middleware
    const { _idFromToken } = req.user

    // Check if user exists
    const existingUser = await UserModel.findById(_idFromToken)
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User not found!", data: null, ok: false })
    }

    // Check if oldPassword is correct
    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      existingUser.password
    )
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Password is incorrect!", data: null, ok: false })
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

    // Hashing new password
    const salt = await bcrypt.genSalt(10)
    const newHashedPassword = await bcrypt.hash(newPassword, salt)

    // Update user password
    existingUser.password = newHashedPassword
    await existingUser.save()

    res.status(200).json({
      message: "Password Changed Successful!",
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
