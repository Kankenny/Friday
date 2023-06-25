import mongoose from "mongoose"

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    creatorId: {
      type: ObjectId,
      ref: "User",
    },
    creatorUsername: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: false,
    },
    color: {
      type: String,
      required: false,
      default: "#7bdcb5",
    },
    category: {
      type: String,
      required: false,
      default: "chores",
    },
    visibility: {
      type: String,
      enum: ["personal", "collaborators", "private", "public"],
      default: "public",
      required: true,
    },
    upvotes: {
      type: Number,
      required: true,
    },
    downvotes: {
      type: Number,
      required: true,
    },
    authorization: {
      type: String,
      enum: ["personal", "collaborators", "public"],
      required: true,
    },
    authorizedUsers: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    upvotedBy: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    downvotedBy: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    tasks: [
      {
        type: ObjectId,
        ref: "Task",
      },
    ],
    comments: [
      {
        type: ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
)

const PostModel = mongoose.model("Post", PostSchema)

export default PostModel
