// Dependencies
import { Response } from "express"

// Models
import NotificationModel from "../../models/Notification"

// Types
import JWTRequest from "../../lib/types/JWTRequestType"

export const visitUserNotification = async (req: JWTRequest, res: Response) => {
  try {
    // Extract notification id from the request params
    const { notificationId } = req.params

    // Check if the notification exists
    const existingNotification = await NotificationModel.findById(
      notificationId
    )
    if (!existingNotification) {
      return res.status(404).json({
        message: "Notification does not exist!",
        data: null,
        ok: false,
      })
    }

    // Extract id from token
    const { _idFromToken } = req.user

    // Check if id from token matches the notificationOwnerId
    if (!existingNotification.notificationOwnerId!.equals(_idFromToken)) {
      return res.status(400).json({
        message: "Invalid Credentials!",
        data: null,
        ok: false,
      })
    }

    // Mark the notification as visited
    existingNotification.isVisited = true
    await existingNotification.save()

    res.status(200).json({
      message: "Notification visited successfully!",
      data: null,
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
