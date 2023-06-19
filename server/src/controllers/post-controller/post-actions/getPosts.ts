// Dependencies
import { Request, Response } from "express"

// Models
import PostModel from "../../../models/Post"

export const getPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await PostModel.find()
      .populate({
        path: "tasks comments",
        populate: {
          path: "subtasks",
        },
      })
      .populate("comments")

    // Check validity of queried posts
    if (!posts || posts.length === 0) {
      return res
        .status(404)
        .json({ message: "No posts found!", data: null, ok: false })
    }

    res
      .status(200)
      .json({ message: "Posts successfully fetched!", data: posts, ok: true })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: `Internal Server Error!: ${error}`,
      data: null,
      ok: false,
    })
  }
}
