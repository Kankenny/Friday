import { Response } from "express"
import UserModel from "../../../models/User"
import NotificationModel from "../../../models/Notification"
import JWTRequest from "../../../lib/types/JWTRequestType"

export const sendUserNotification = async (req: JWTRequest, res: Response) => {
  try {
    // Extract id from token
    const { _idFromToken } = req.user

    // Check if the user exists
    const existingUser = await UserModel.findById(_idFromToken)
    if (!existingUser) {
      return res.status(404).json({
        message: "User does not exist!",
        data: null,
        ok: false,
      })
    }

    // Extract payload from the body
    const { title, type, idLinkToEntity } = req.body

    // Create new notification
    const newNotification = new NotificationModel({
      title,
      type,
      idLinkToEntity,
      isVisited: false,
      notificationOwnerId: existingUser._id,
    })

    // Update notifications field of recipient
    existingUser.notifications.push(newNotification._id)
    await existingUser.save()

    res.status(200).json({
      message: "User notification sent successfully!",
      data: newNotification,
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
