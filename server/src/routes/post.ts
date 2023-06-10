import express, { NextFunction, Request, Response } from "express"

// Post Controller Functions
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  savePost,
  copyPost,
  authorizeUserToPost,
  unauthorizeUserToPost,
  upvotePost,
  downvotePost,
  revertUpvoteOrDownvote,
} from "../controllers/post-controller/postController"

// Types
import JWTRequest from "../lib/types/JWTRequestType"
import verifyToken from "../middlewares/verifyToken"

// Router
const PostRouter = express.Router()

// GET ALL POSTS
PostRouter.get("/", getPosts)

// GET POST
PostRouter.get("/:postId", getPost)

// CREATE POST
PostRouter.post(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => createPost(req as JWTRequest, res)
)

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

// SAVE POST
PostRouter.put(
  "/:postId/save",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => savePost(req as JWTRequest, res)
)

// COPY POST
PostRouter.post(
  "/:postId/copy",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => copyPost(req as JWTRequest, res)
)

// AUTHORIZE USER
PostRouter.put(
  "/:postId/authorize/:userIdToAuthorize",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => authorizeUserToPost(req as JWTRequest, res)
)

// UNAUTHORIZE USER
PostRouter.put(
  "/:postId/unauthorize/:userIdToUnauthorize",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => unauthorizeUserToPost(req as JWTRequest, res)
)

// UPVOTE POST
PostRouter.put(
  "/:postId/upvote",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => upvotePost(req as JWTRequest, res)
)

// DOWNVOTE POST
PostRouter.put(
  "/:postId/downvote",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => downvotePost(req as JWTRequest, res)
)

// REVERT UPVOTE OR DOWNVOTE ON POST
PostRouter.put(
  "/:postId/revert",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) =>
    revertUpvoteOrDownvote(req as JWTRequest, res)
)

export default PostRouter
