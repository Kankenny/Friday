// Dependencies
import express, { Request, Response, NextFunction } from "express"

// Notifications Controller Functions
import {
  getUserNotifications,
  sendUserNotification,
  visitUserNotifications,
} from "../controllers/notification-controller/notificationsController"

// Middlewares
import verifyToken from "../middlewares/verifyToken"

// Types
import JWTRequest from "../lib/types/JWTRequestType"

const NotificationRouter = express.Router()

// GET USER NOTIFICATIONS
NotificationRouter.get(
  "/:userId",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => getUserNotifications(req as JWTRequest, res)
)

// VISIT USER NOTIFICATIONS
NotificationRouter.put(
  "/visit",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) =>
    visitUserNotifications(req as JWTRequest, res)
)

// SEND USER NOTIFICATIONS
NotificationRouter.post(
  "/:recipientId",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => sendUserNotification(req as JWTRequest, res)
)

export default NotificationRouter
