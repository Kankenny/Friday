// Dependencies
import express, { Request, Response, NextFunction } from "express"

// Task Controller Functions
import {
  changeTaskProgress,
  createTask,
  deleteTask,
  getPostTasks,
} from "../controllers/task-controller/taskController"

// Middlewares
import verifyToken from "../middlewares/verifyToken"

// Types
import JWTRequest from "../lib/types/JWTRequestType"

const TaskRouter = express.Router()

// GET POST TASKS
TaskRouter.get("/getPostTasks", getPostTasks)

// CREATE TASK
TaskRouter.post(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => createTask(req as JWTRequest, res)
)

// DELETE TASK
TaskRouter.delete(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => deleteTask(req as JWTRequest, res)
)

// CHANGE TASK PROGRESS
TaskRouter.put(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => changeTaskProgress(req as JWTRequest, res)
)

export default TaskRouter
