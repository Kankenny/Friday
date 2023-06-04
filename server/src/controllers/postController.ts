import { Request, Response } from "express"
import PostModel from "../models/Post"
import UserModel from "../models/User"
import mongoose from "mongoose"

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
    res.status(500).json({ message: err, data: null, ok: false })
  }
}
