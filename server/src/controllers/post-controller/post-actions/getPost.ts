// Dependencies
import { Request, Response } from "express"

// Models
import PostModel from "../../../models/Post"

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
