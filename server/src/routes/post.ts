import express, { NextFunction, Request, Response } from "express"

// Post Controller Functions
import {
  getPosts,
  getPost,
  updatePost,
  deletePost,
  authorizeUserToPost,
  unauthorizeUserToPost,
  upvotePost,
  downvotePost,
} from "../controllers/postController"

// Types
import JWTRequest from "../lib/types/JWTRequestType"
import verifyToken from "../middlewares/verifyToken"

// Router
const PostRouter = express.Router()

// GET ALL POSTS
PostRouter.get("/", getPosts)

// GET POST
PostRouter.get("/:postId", getPost)

// UPDATE POST
PostRouter.put(
  "/:postId",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => updatePost(req as JWTRequest, res)
)

// DELETE POST
PostRouter.delete(
  "/:postId",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => deletePost(req as JWTRequest, res)
)

// AUTHORIZE USER
PostRouter.post(
  "/:postId/authorize/:userIdToAuthorize",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => authorizeUserToPost(req as JWTRequest, res)
)

// UNAUTHORIZE USER
PostRouter.post(
  "/:postId/unauthorize/:userIdToUnauthorize",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => unauthorizeUserToPost(req as JWTRequest, res)
)

// UPVOTE POST
PostRouter.post(
  "/:postId/upvote",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => upvotePost(req as JWTRequest, res)
)

// DOWNVOTE POST
PostRouter.post(
  "/:postId/downvote",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => downvotePost(req as JWTRequest, res)
)

export default PostRouter
