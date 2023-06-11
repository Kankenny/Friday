import express, { NextFunction, Request, Response } from "express"

// Auth Controller Functions
import { getUserTimeline } from "../controllers/user-controller/userController"

// Types
import JWTRequest from "../lib/types/JWTRequestType"
import verifyToken from "../middlewares/verifyToken"

// Router
const TimelineRoute = express.Router()

// GET USER TIMELINE
TimelineRoute.get(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => getUserTimeline(req as JWTRequest, res)
)
