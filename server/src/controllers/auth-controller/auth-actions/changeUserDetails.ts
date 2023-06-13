// Dependencies
import { Response } from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"

// Models
import UserModel from "../../../models/User"

// Validators
import { changeUserDetailsFormSchema } from "../../../../../common/validations/auth/changeUserDetailsFormValidator"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

export const changeUserDetails = async (req: JWTRequest, res: Response) => {
  try {
    // Validate body using the register form schema
    changeUserDetailsFormSchema.parse(req.body)

    // Extract decoded token from verifyToken middleware
    const { _idFromToken } = req.user

    // Check if id from token is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(_idFromToken)) {
      return res.status(400).json({
        message: "Invalid userId!",
        data: null,
        ok: false,
      })
    }

    // Check if user exists
    const existingUser = await UserModel.findById(_idFromToken)
    if (!existingUser) {
      return res.status(400).json({
        message: "User not found!",
        data: null,
        ok: false,
      })
    }

    const fieldsToBeUpdated = req.body
    const updatedUser = await UserModel.findByIdAndUpdate(
      _idFromToken,
      fieldsToBeUpdated,
      {
        new: true,
      }
    )

    return res.status(200).json({
      message: "User details updated successfully!",
      data: updatedUser,
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
