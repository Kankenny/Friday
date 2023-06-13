// Dependencies
import { Response } from "express"
import bcrypt from "bcrypt"

// Models
import UserModel from "../../../models/User"

// Validators
import { changeSecurityQAFormSchema } from "../../../../../common/validations/auth/changeSecurityQAFormValidator"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

export const changeSecurityQA = async (req: JWTRequest, res: Response) => {
  try {
    // Validate body using the register form schema
    changeSecurityQAFormSchema.parse(req.body)

    // Extract decoded token from verifyToken middleware
    const { _idFromToken } = req.user

    // Destructure the payload attached to the body
    const { password, newSecurityQuestion, newSecurityQAnswer } = req.body

    // Check if user exists
    const existingUser = await UserModel.findById(_idFromToken)
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
    console.error(error)
    return res.status(500).json({
      message: `Internal Server Error!: ${error}`,
      data: null,
      ok: false,
    })
  }
}
