// Dependencies
import { Response } from "express"

// Models
import UserModel from "../../../models/User"
import PostModel from "../../../models/Post"

// Types
import JWTRequest from "../../../lib/types/JWTRequestType"

export const getUserTimeline = async (req: JWTRequest, res: Response) => {
  // Extract the id from the token
  const { _idFromToken } = req.user

  try {
    // Check if user exists
    const existingUser = await UserModel.findById(_idFromToken)
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found!", data: null, ok: false })
    }

    // Own user's posts
    const ownPosts = await PostModel.find({ creatorId: existingUser._id })

    // Public posts
    const publicPosts = await PostModel.find({ visibility: "public" })

    // Private posts by followed users
    const following = existingUser.following
    const privatePosts = await PostModel.find({
      visibility: "private",
      creatorId: { $in: following },
    })

    // Authorized posts
    const authorizedPosts = await PostModel.find({
      _id: { $in: existingUser.authorizedPosts },
    })

    // Combine all post categories and remove duplicates using Set
    const allPosts = [
      ...ownPosts,
      ...publicPosts,
      ...privatePosts,
      ...authorizedPosts,
    ]
    const uniquePosts = Array.from(
      new Set(allPosts.map((post) => post._id))
    ).map((postId) => allPosts.find((post) => post._id.equals(postId)))

    // Randomize the order of the unique posts
    const randomizedPosts = uniquePosts.sort(() => Math.random() - 0.5)

    res.status(200).json({
      message: "User timeline successfully fetched!",
      data: randomizedPosts,
      ok: true,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: `Internal Server Error!: ${error}`,
      data: null,
      ok: false,
    })
  }
}
