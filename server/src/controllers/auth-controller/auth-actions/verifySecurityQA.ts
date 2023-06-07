// Dependencies
import { Response } from "express"
import bcrypt from "bcrypt"

// Models
import UserModel from "../../../models/User"

// Validators
import { securityAnswerFormSchema } from "../../../../../common/validations/securityAnswerFormValidator"
import JWTRequest from "../../../lib/types/JWTRequestType"

export const verifySecurityQA = async (req: JWTRequest, res: Response) => {
  // Validate body using the register form schema
  try {
    securityAnswerFormSchema.parse(req.body)
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      message: "Invalid security answer form data!",
      data: null,
      ok: false,
    })
  }

  // destructure the payload attached to the body
  const { securityAnswer } = req.body

  // Extract decoded token from verifyToken middleware
  const { _idFromToken } = req.user

  try {
    // Check if the username already exists in the db
    const existingUser = await UserModel.findById(_idFromToken)

    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Invalid auth!", data: null, ok: false })
    }

    const isMatch = await bcrypt.compare(
      securityAnswer,
      existingUser.securityAnswer
    )
    // Check if the security question answer matches existing user's answer
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid auth!", data: null, ok: false })
    }

    res.status(200).json({
      message: "Security question answered successfully!",
      data: existingUser.username,
      ok: true,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error, data: null, ok: false })
  }
}
