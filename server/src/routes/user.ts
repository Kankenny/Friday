import express, { NextFunction, Request, Response } from "express"

// Auth Controller Functions
import {
  getUser,
  getUserBlocked,
  getUserFollowers,
  getUserFollowing,
} from "../controllers/userController"

// Types
import JWTRequest from "../lib/types/JWTRequestType"
import verifyToken from "../middlewares/verifyToken"

// Router
const UserRoute = express.Router()

// GET USER
UserRoute.get("/:userId", getUser)

// GET USER FOLLOWING
UserRoute.get("/:userId/following", getUserFollowing)

// GET USER FOLLOWERS
UserRoute.get("/:userId/followers", getUserFollowers)

// GET USER BLOCKED
UserRoute.get(
  "/:userId/blocked",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => getUserBlocked(req as JWTRequest, res)
)

export default UserRoute
