// Dependencies
import { Request, Response } from "express"

// Models
import UserModel from "../../../models/User"

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    // Check if the user exists
    const users = await UserModel.find()

    if (!users) {
      return res
        .status(404)
        .json({ message: "Users not found!", data: null, ok: false })
    }

    res.status(200).json({
      message: "Users successfully fetched!",
      data: users,
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
