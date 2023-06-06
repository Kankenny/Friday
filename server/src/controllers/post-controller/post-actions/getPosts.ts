// Dependencies
import { Request, Response } from "express"

// Models
import PostModel from "../../../models/Post"

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find()

    // Check validity of queried posts
    if (!posts || posts.length === 0) {
      return res
        .status(404)
        .json({ message: "No posts found!", data: null, ok: false })
    }

    res
      .status(200)
      .json({ message: "Posts successfully fetched!", data: posts, ok: true })
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ message: `Failed to get posts: ${err}`, data: null, ok: false })
  }
}

export const getPost = async (req: Request, res: Response) => {
  // Destructure payload from the request params
  const { postId } = req.params

  try {
    const existingPost = await PostModel.find({ _id: postId }).populate(
      "tasks comments"
    )

    // Check if post exists
    if (!existingPost) {
      return res
        .status(404)
        .json({ message: "Post not found!", data: null, ok: false })
    }

    res.status(200).json({
      message: "Post successfully fetched!",
      data: existingPost,
      ok: true,
    })
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ message: `Failed to get post!: ${err}`, data: null, ok: false })
  }
}
