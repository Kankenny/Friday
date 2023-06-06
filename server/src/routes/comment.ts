import express, { Request, Response, NextFunction } from "express"

// Comment Controller Functions
import {
  createComment,
  deleteComment,
} from "../controllers/comment-controller/commentController"

// Middlewares
import verifyToken from "../middlewares/verifyToken"

// Types
import JWTRequest from "../lib/types/JWTRequestType"

const CommentRoute = express.Router()

// CREATE COMMENT
CommentRoute.post(
  "/create/:postId/:commenterId",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => createComment(req as JWTRequest, res)
)

// DELETE COMMENT
CommentRoute.delete(
  "/delete/:commentId/:deleterId",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => deleteComment(req as JWTRequest, res)
)

export default CommentRoute
