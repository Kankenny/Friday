import mongoose from "mongoose"

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const SubtaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    progress: {
      type: String,
      enum: ["done", "working on it", "stuck", "untouched"],
      required: true,
    },
    taskId: {
      type: ObjectId,
      ref: "Task",
    },
  },
  { timestamps: true }
)

const SubtaskModel = mongoose.model("Subtask", SubtaskSchema)

export default SubtaskModel
