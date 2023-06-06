import { Response } from "express"
import UserModel from "../../../models/User"
import NotificationModel from "../../../models/Notification"
import JWTRequest from "../../../lib/types/JWTRequestType"

export const getUserNotifications = async (req: JWTRequest, res: Response) => {
  try {
    // Extract userId from the params
    const { userId } = req.params

    // Extract id from token
    const { _idFromToken } = req.user

    // Check if id from token matches the userId
    if (userId !== _idFromToken) {
      return res.status(400).json({
        message: "Invalid Credentials!",
        data: null,
        ok: false,
      })
    }

    // Check if the user exists
    const existingUser = await UserModel.findById(userId)
    if (!existingUser) {
      return res.status(404).json({
        message: "User does not exist!",
        data: null,
        ok: false,
      })
    }

    // Fetch the user's notifications
    const notifications = await NotificationModel.find({
      notificationOwnerId: userId,
    })

    res.status(200).json({
      message: "User notifications retrieved successfully!",
      data: notifications,
      ok: true,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error!",
      data: null,
      ok: false,
    })
  }
}
