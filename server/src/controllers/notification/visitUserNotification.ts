// Dependencies
import { Response } from "express"

// Models
import NotificationModel from "../../models/Notification"

// Types
import JWTRequest from "../../lib/types/JWTRequestType"

export const visitUserNotifications = async (
  req: JWTRequest,
  res: Response
) => {
  try {
    // Extract id from token
    const { _idFromToken } = req.user

    // Check if the notification exists
    const unvisitedNotifications = await NotificationModel.find({
      isVisited: true,
      notificationOwnerId: _idFromToken,
    })
    if (!unvisitedNotifications) {
      return res.status(404).json({
        message: "All notifications of the user are already seen!",
        data: null,
        ok: true,
      })
    }

    // Mark the notifications as visited
    // Mark the notifications as visited
    await NotificationModel.updateMany(
      {
        isVisited: false,
        notificationOwnerId: _idFromToken,
      },
      { isVisited: true }
    )

    res.status(200).json({
      message: "Notifications visited successfully!",
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
