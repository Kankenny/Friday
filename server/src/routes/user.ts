import express, { NextFunction, Request, Response } from "express"

// Auth Controller Functions
import {
  getUser,
  getUserBlocked,
  getUserFollowers,
  getUserFollowing,
  followUser,
  unfollowUser,
  blockUser,
  unblockUser,
} from "../controllers/user-controller/userController"

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

// FOLLOW USER
UserRoute.post(
  "/:userId/follow/:followerId",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => followUser(req as JWTRequest, res)
)

// UNFOLLOW USER
UserRoute.delete(
  "/:userId/unfollow/:followerId",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => unfollowUser(req as JWTRequest, res)
)

// BLOCK USER
UserRoute.post(
  "/:userId/block/:blockedUserId",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => blockUser(req as JWTRequest, res)
)

// UNBLOCK USER
UserRoute.delete(
  "/:userId/unblock/:unblockedUserId",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => unblockUser(req as JWTRequest, res)
)

export default UserRoute
