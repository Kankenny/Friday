import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined"
import { useState, useEffect } from "react"
import Subtasks from "../subtasks/Subtasks"
import { TaskType } from "../../../../lib/types/primitive-types/TaskType"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  createSubtaskSchema,
  createSubtaskType,
} from "../../../../../../common/validations/subtask/createSubTaskValidator"
import subtaskAPI from "../../../../lib/services/axios-instances/subtaskAPI"
import { PostType } from "../../../../lib/types/primitive-types/PostType"
import {
  createSubtask,
  updateTask,
} from "../../../../lib/store/slices/timeline-slice/timelineSlice"
import {
  updateTaskSchema,
  updateTaskType,
} from "../../../../../../common/validations/task/updateTaskValidator"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import taskAPI from "../../../../lib/services/axios-instances/taskAPI"
import { isAxiosError } from "axios"
import { setFeedback } from "../../../../lib/store/slices/feedback-slice/feedbackSlice"
import ProgressCell from "../cells/ProgressCell"
import PriorityCell from "../cells/PriorityCell"
import DueDateCell from "../cells/DueDateCell"

type Props = {
  post: PostType
  task: TaskType
}

const Task = ({ post, task }: Props) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const {
    register: registerNewSubtask,
    handleSubmit: handleSubmitNewSubtask,
    reset: resetNewSubtaskForm,
    formState: {
      errors: newSubtaskErrors,
      isSubmitSuccessful: isNewSubtaskSubmittedSuccessful,
    },
  } = useForm<createSubtaskType>({
    resolver: zodResolver(createSubtaskSchema),
  })

  const {
    register: registerUpdateTask,
    handleSubmit: handleSubmitUpdateTask,
    setFocus: setFocusUpdateTask,
    reset: resetUpdateTask,
    formState: {
      errors: updateTaskErrors,
      isSubmitSuccessful: isUpdateSubmitSuccessful,
    },
  } = useForm<updateTaskType>({
    resolver: zodResolver(updateTaskSchema),
  })

  const handleUpdateTask = async (formData: updateTaskType) => {
    try {
      const { data } = await taskAPI.put(
        `/?postId=${post._id}&taskId=${task._id}`,
        formData
      )
      dispatch(updateTask({ post, task: data.data }))
      setIsEditing(false)
      resetUpdateTask()
    } catch (err) {
      console.error(err)
    }
  }

  const handleNewSubtaskSubmit = async (formData: createSubtaskType) => {
    try {
      const { data } = await subtaskAPI.post(
        `/?taskId=${task._id}&postId=${post._id}`,
        formData
      )
      dispatch(createSubtask({ post, task, subtask: data.data }))
      dispatch(
        setFeedback({
          feedbackMessage: data.message,
          feedbackType: "success",
        })
      )
      resetNewSubtaskForm()
    } catch (err) {
      if (isAxiosError(err)) {
        dispatch(
          setFeedback({
            feedbackMessage: err.response?.data.message,
            feedbackType: "error",
          })
        )
      }
      console.error(err)
    }
  }

  useEffect(() => {
    if (isEditing) {
      setFocusUpdateTask("title")
    }
  }, [isEditing, setFocusUpdateTask])

  useEffect(() => {
    if (updateTaskErrors.title?.message && !isUpdateSubmitSuccessful) {
      dispatch(
        setFeedback({
          feedbackMessage: updateTaskErrors.title?.message,
          feedbackType: "error",
        })
      )
    }
    if (newSubtaskErrors.title?.message && !isNewSubtaskSubmittedSuccessful) {
      dispatch(
        setFeedback({
          feedbackMessage: newSubtaskErrors.title?.message,
          feedbackType: "error",
        })
      )
    }
  }, [
    updateTaskErrors.title?.message,
    isUpdateSubmitSuccessful,
    newSubtaskErrors.title?.message,
    isNewSubtaskSubmittedSuccessful,
    dispatch,
  ])

  const taskDueDate = new Date(task.dueDate)
  const formattedDueDate = taskDueDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <>
      <div className="flex justify-between text-center">
        <div className="flex-grow max-w-[50%] border border-secondary p-2 text-sm text-left cursor-pointer hover:bg-secondary hover:text-main duration-200 flex items-center">
          <ChevronRightOutlinedIcon
            onClick={() => setIsExpanded(!isExpanded)}
          />

          {!isEditing ? (
            <h1
              onClick={() => setIsEditing(true)}
              className="min-w-[5em] h-full "
            >
              {task.title}
            </h1>
          ) : (
            <ClickAwayListener onClickAway={() => setIsEditing(false)}>
              <form onSubmit={handleSubmitUpdateTask(handleUpdateTask)}>
                <input
                  type="text"
                  placeholder={task.title}
                  className="bg-transparent h-full px-4 outline-none text-secondary rounded-md hover:border hover:border-secondary duration-200 ease-in-out hover:text-main"
                  {...registerUpdateTask("title")}
                />
              </form>
            </ClickAwayListener>
          )}
        </div>
        <ProgressCell
          progress={task.progress}
          post={post}
          task={task}
          isTaskCell={true}
        />
        <PriorityCell
          priority={task.priority}
          post={post}
          task={task}
          isTaskCell={true}
        />
        <DueDateCell
          formattedDueDate={formattedDueDate}
          post={post}
          task={task}
          isTaskCell={true}
        />
      </div>
      {isExpanded && task.subtasks.length !== 0 && (
        <Subtasks subtasks={task.subtasks} post={post} task={task} />
      )}
      {isExpanded && (
        <div className="border border-secondary p-2 pl-9 text-sm">
          <form
            className="flex items-center"
            onSubmit={handleSubmitNewSubtask(handleNewSubtaskSubmit)}
          >
            <button type="submit">
              <AddOutlinedIcon className="h-5 w-5 opacity-50" />
            </button>
            <input
              type="text"
              placeholder="Add Subtask"
              className="bg-transparent px-2 h-full outline-none text-secondary rounded-md hover:border hover:border-secondary duration-200 ease-in-out"
              {...registerNewSubtask("title")}
            />
          </form>
        </div>
      )}
    </>
  )
}

export default Task
