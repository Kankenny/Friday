import mongoose from "mongoose"

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const SubtaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  progress: {
    type: String,
    required: true,
  },
  taskId: {
    type: ObjectId,
    ref: "Task",
  },
})

const SubtaskModel = mongoose.model("Subtask", SubtaskSchema)

export default SubtaskModel
