import { z } from "zod"

const sendUserNotificationValidator = z.object({
  title: z.string().min(1),
  type: z.enum(["invite to collab", "follow"]),
  idLinkToEntity: z.string().min(1),
  isVisited: z.undefined(),
  notificationOwnerId: z.undefined(),
})

export default sendUserNotificationValidator
