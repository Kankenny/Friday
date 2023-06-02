import mongoose from "mongoose"

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  progress: {
    type: String,
    required: true,
  },
  postId: {
    type: ObjectId,
    ref: "Post",
  },
})

const TaskModel = mongoose.model("Task", TaskSchema)

export default TaskModel
