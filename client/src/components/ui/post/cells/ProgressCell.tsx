import * as React from "react"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Grow from "@mui/material/Grow"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import { isAxiosError } from "axios"
import { setFeedback } from "../../../../lib/store/slices/feedback-slice/feedbackSlice"
import { TaskType } from "../../../../lib/types/primitive-types/TaskType"
import { PostType } from "../../../../lib/types/primitive-types/PostType"
import { useDispatch } from "react-redux"
import taskAPI from "../../../../lib/services/axios-instances/taskAPI"
import {
  updateSubtask,
  updateTask,
} from "../../../../lib/store/slices/timeline-slice/timelineSlice"
import subtaskAPI from "../../../../lib/services/axios-instances/subtaskAPI"
import { SubtaskType } from "../../../../lib/types/primitive-types/SubtaskType"
import { useTypedSelector } from "../../../../lib/hooks/redux-hook/useTypedSelector"
import { Tooltip } from "@mui/material"

type Props = {
  post: PostType
  task: TaskType
  subtask?: SubtaskType
  progress: "done" | "working on it" | "stuck" | "untouched"
  isTaskCell: boolean
}

const ProgressCell = ({ post, task, subtask, progress, isTaskCell }: Props) => {
  const { _id: authUserId } = useTypedSelector((state) => state.sameProfile)
  const dispatch = useDispatch()
  const [currProgress, setCurrProgress] = React.useState(progress)
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleUpdateProgress = async (newProgress: Props["progress"]) => {
    try {
      if (isTaskCell) {
        const { data } = await taskAPI.put(
          `/?postId=${post._id}&taskId=${task._id}`,
          {
            progress: newProgress,
          }
        )
        dispatch(updateTask({ post, task: data.data }))
        dispatch(
          setFeedback({
            feedbackMessage: data.message,
            feedbackType: "success",
          })
        )
      } else {
        const { data } = await subtaskAPI.put(
          `/${subtask?._id}?postId=${post._id}&taskId=${task._id}`,
          {
            progress: newProgress,
          }
        )
        dispatch(updateSubtask({ post, task, subtask: data.data }))
        dispatch(
          setFeedback({
            feedbackMessage: data.message,
            feedbackType: "success",
          })
        )
      }
    } catch (err) {
      if (isAxiosError(err)) {
        dispatch(
          setFeedback({
            feedbackMessage: err.response?.data.message,
            feedbackType: "error",
          })
        )
      } else {
        console.error(err)
      }
    }
    setCurrProgress(newProgress)
    setOpen(false)
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === "Escape") {
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus()
    }

    prevOpen.current = open
  }, [open])

  const isCurrUserAuthorized =
    post.authorization === "public" ||
    (post.authorization === "private" &&
      post.authorizedUsers.includes(authUserId)) ||
    post.creatorId === authUserId

  const progressColor = {
    done: "bg-[#499548] hover:bg-[#366136] focus:bg-[#499548]",
    "working on it": "bg-[#eab308] hover:bg-[#c79505] focus:bg-[#eab308]",
    stuck: "bg-[#ef4444] hover:bg-[#be2d2d] focus:bg-[#ef4444]",
    untouched: "bg-gray-300 hover:bg-gray-400 focus:bg-gray-300",
  }

  return (
    <>
      <Tooltip
        title={
          isCurrUserAuthorized
            ? "Edit progress"
            : "You are unauthorized to edit this post"
        }
      >
        <span className="w-[25%]">
          <button
            ref={anchorRef}
            onClick={handleToggle}
            className={`w-full h-full uppercase border border-secondary p-2 text-sm hover:text-secondary duration-200 ${
              progressColor[currProgress]
            } ${
              isCurrUserAuthorized ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            disabled={!isCurrUserAuthorized}
          >
            {currProgress}
          </button>
        </span>
      </Tooltip>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "left top" : "left bottom",
            }}
          >
            <Paper className="bg-blue-50 border border-secondary rounded-md">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  className="py-0 rounded-md"
                >
                  <MenuItem
                    onClick={() => handleUpdateProgress("done")}
                    className={`flex justify-center uppercase text-sm ${progressColor["done"]}`}
                  >
                    <h1>Done</h1>
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleUpdateProgress("working on it")}
                    className={`flex justify-center uppercase text-sm ${progressColor["working on it"]}`}
                  >
                    <h1>Working on it</h1>
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleUpdateProgress("stuck")}
                    className={`flex justify-center uppercase text-sm ${progressColor["stuck"]}`}
                  >
                    <h1>Stuck</h1>
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleUpdateProgress("untouched")}
                    className={`flex justify-center uppercase text-sm ${progressColor["untouched"]}`}
                  >
                    <h1>Untouched</h1>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

export default ProgressCell
