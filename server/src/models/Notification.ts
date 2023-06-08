import mongoose from "mongoose"

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const NotificationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["invite to collab", "follow"],
      required: true,
    },
    idLinkToEntity: {
      type: String,
      required: true,
    },
    isVisited: {
      type: Boolean,
      default: false,
      required: true,
    },
    notificationOwnerId: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
)

const NotificationModel = mongoose.model("Notification", NotificationSchema)

export default NotificationModel
