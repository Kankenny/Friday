import mongoose from "mongoose"

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const CommentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    commenterId: {
      type: ObjectId,
      required: "User",
    },
    postId: {
      type: ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
)

const CommentModel = mongoose.model("Comment", CommentSchema)

export default CommentModel
