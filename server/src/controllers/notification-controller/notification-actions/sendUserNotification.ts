import { Response } from "express"
import UserModel from "../../../models/User"
import NotificationModel from "../../../models/Notification"
import JWTRequest from "../../../lib/types/JWTRequestType"
import sendUserNotificationSchema from "../../../lib/validations/notification/sendUserNotificationValidator"

export const sendUserNotification = async (req: JWTRequest, res: Response) => {
  try {
    // Validate body using the send user notification schema
    sendUserNotificationSchema.parse(req.body)

    // Extract sender id from token
    const { _idFromToken } = req.user

    // Extract recipient id from request params
    const { recipientId } = req.params

    // Check if the sender exists
    const existingSender = await UserModel.findById(_idFromToken)
    if (!existingSender) {
      return res.status(404).json({
        message: "Notification sender does not exist!",
        data: null,
        ok: false,
      })
    }

    // Check if the recipient exists
    const existingRecipient = await UserModel.findById(recipientId)
    if (!existingRecipient) {
      return res.status(404).json({
        message: "Notification recipient does not exist!",
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
      notificationOwnerId: existingRecipient._id,
    })
    await newNotification.save()

    // Update notifications field of recipient
    existingRecipient.notifications.push(newNotification._id)
    await existingRecipient.save()

    res.status(200).json({
      message: `User notification sent successfully to ${existingRecipient.username}!`,
      data: newNotification,
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
