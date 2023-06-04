import express, { NextFunction, Request, Response } from "express"

// Auth Controller Functions
import { getUser, getUserFollowing } from "../controllers/userController"

// Types
import JWTRequest from "../lib/types/JWTRequestType"
import verifyToken from "../middlewares/verifyToken"

// Router
const UserRoute = express.Router()

// GET USER
UserRoute.get(
  "/:userId",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => getUser(req as JWTRequest, res)
)

// GET USER FOLLOWING
UserRoute.get(
  "/:userId/following",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => getUserFollowing(req as JWTRequest, res)
)

export default UserRoute
