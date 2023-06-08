import { Response } from "express"
import UserModel from "../../../models/User"
import NotificationModel from "../../../models/Notification"
import JWTRequest from "../../../lib/types/JWTRequestType"
import mongoose from "mongoose"

export const sendUserNotification = async (req: JWTRequest, res: Response) => {
  try {
    // Extract sender id from token
    const { _idFromToken } = req.user

    // Extract recipient id from request params
    const { recipientId } = req.params

    // Check if the sender exists
    const existingSender = await UserModel.findById(_idFromToken)
    if (!existingSender) {
      return res.status(404).json({
        message: "Sender does not exist!",
        data: null,
        ok: false,
      })
    }

    // Check if the recipient exists
    const existingRecipient = await UserModel.findById(recipientId)
    if (!existingRecipient) {
      return res.status(404).json({
        message: "Recipient does not exist!",
        data: null,
        ok: false,
      })
    }

    // Extract payload from the body
    const { title, type, idLinkToEntity } = req.body

    // Determine if idLinkToEntity is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(idLinkToEntity)) {
      return res
        .status(400)
        .json({ message: "Invalid idLinkToEntity!", data: null, ok: false })
    }

    // Create new notification
    const newNotification = new NotificationModel({
      title,
      type,
      idLinkToEntity,
      isVisited: false,
      notificationOwnerId: existingRecipient._id,
    })

    // Update notifications field of recipient
    existingRecipient.notifications.push(newNotification._id)
    await existingRecipient.save()

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
