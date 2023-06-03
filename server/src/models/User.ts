import mongoose from "mongoose"

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  securityQuestion: {
    type: String,
    required: true,
  },
  securityAnswer: {
    type: String,
    required: true,
  },
  following: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  followers: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  blocked: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  posts: [
    {
      type: ObjectId,
      ref: "Post",
    },
  ],
  upvotedPosts: [
    {
      type: ObjectId,
      ref: "Post",
    },
  ],
  downvotedPosts: [
    {
      type: ObjectId,
      ref: "Post",
    },
  ],
  savedPosts: [
    {
      type: ObjectId,
      ref: "Post",
    },
  ],
  notifications: [
    {
      type: ObjectId,
      ref: "Notification",
    },
  ],
  comments: [
    {
      type: ObjectId,
      ref: "Comment",
    },
  ],
})

const UserModel = mongoose.model("User", UserSchema)

export default UserModel
