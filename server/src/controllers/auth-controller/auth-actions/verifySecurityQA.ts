// Dependencies
import { Request, Response } from "express"
import bcrypt from "bcrypt"

// Models
import UserModel from "../../../models/User"

// Validators
import { securityAnswerFormSchema } from "../../../../../common/validations/securityAnswerFormValidator"

export const verifySecurityQA = async (req: Request, res: Response) => {
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
  const { securityAnswer, username } = req.body

  try {
    // Check if the username already exists in the db
    const existingUser = await UserModel.findOne({
      username,
    })
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
