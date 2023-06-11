import express, { NextFunction, Request, Response } from "express"

// Timeline Controller Functions
import { getUserTimeline } from "../controllers/timeline-controller/timelineController"

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

export default TimelineRoute
