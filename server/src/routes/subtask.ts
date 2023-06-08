// Dependencies
import express, { Request, Response, NextFunction } from "express"

// Task Controller Functions
import {
  changeSubtaskProgress,
  createSubtask,
  deleteSubtask,
  getTaskSubtasks,
} from "../controllers/subtask-controller/subtaskController"

// Middlewares
import verifyToken from "../middlewares/verifyToken"

// Types
import JWTRequest from "../lib/types/JWTRequestType"

const SubtaskRouter = express.Router()

// GET TASK SUBTASKS
SubtaskRouter.get("/getTaskSubtasks", getTaskSubtasks)

// CREATE SUBTASK
SubtaskRouter.post(
  "/createSubtask",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => createSubtask(req as JWTRequest, res)
)

// DELETE TASK
SubtaskRouter.delete(
  "/:subtaskId",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => deleteSubtask(req as JWTRequest, res)
)

// CHANGE TASK PROGRESS
SubtaskRouter.post(
  "/changeSubtaskProgress",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => changeSubtaskProgress(req as JWTRequest, res)
)

export default SubtaskRouter
