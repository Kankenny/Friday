// Dependencies
import { Request, Response } from "express"
import bcrypt from "bcrypt"

// Models
import UserModel from "../../../models/User"

// Validators
import { resetPasswordFormSchema } from "../../../../../common/validations/resetPasswordFormValidator"

export const resetPassword = async (req: Request, res: Response) => {
  // Validate body using the register form schema
  try {
    resetPasswordFormSchema.parse(req.body)
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      message: "Invalid reset password form data!",
      data: null,
      ok: false,
    })
  }

  // destructure the payload attached to the body
  const { username, newPassword } = req.body

  try {
    // Check if user exists
    const existingUser = await UserModel.findOne({ username })
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "Bad request!", data: null, ok: false })
    }

    // Check if new password matches old password
    const doesOldPasswordMatch = await bcrypt.compare(
      newPassword,
      existingUser.password
    )
    if (doesOldPasswordMatch) {
      return res.status(400).json({
        message: "New password cannot be the same as the old password!",
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
      message: "Password Reset Successful!",
      data: { username: existingUser.username, _id: existingUser._id },
      ok: true,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error, data: null, ok: false })
  }
}
