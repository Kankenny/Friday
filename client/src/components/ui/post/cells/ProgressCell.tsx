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

type Props = {
  post: PostType
  task: TaskType
  subtask?: SubtaskType
  progress: "done" | "working on it" | "stuck" | "untouched"
  isTaskCell: boolean
}

const ProgressCell = ({ post, task, subtask, progress, isTaskCell }: Props) => {
  const dispatch = useDispatch()
  const [currProgress, setCurrProgress] = React.useState(progress)
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLHeadingElement>(null)

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

  const progressColor = {
    done: "bg-[#499548] hover:bg-[#366136] focus:bg-[#499548]",
    "working on it": "bg-[#eab308] hover:bg-[#c79505] focus:bg-[#eab308]",
    stuck: "bg-[#ef4444] hover:bg-[#be2d2d] focus:bg-[#ef4444]",
    untouched: "bg-gray-300 hover:bg-gray-400 focus:bg-gray-300",
  }

  return (
    <>
      <h1
        ref={anchorRef}
        onClick={handleToggle}
        className={`uppercase flex-grow max-w-[20%] border border-secondary p-2 text-sm cursor-pointer hover:text-secondary duration-200 ${progressColor[currProgress]}`}
      >
        {currProgress}
      </h1>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
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
                    className={`flex justify-center uppercase text-sm text-secondary ${progressColor["done"]}`}
                  >
                    Done
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleUpdateProgress("working on it")}
                    className={`flex justify-center uppercase text-sm text-secondary ${progressColor["working on it"]}`}
                  >
                    Working on it
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleUpdateProgress("stuck")}
                    className={`flex justify-center uppercase text-sm text-secondary ${progressColor["stuck"]}`}
                  >
                    Stuck
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleUpdateProgress("untouched")}
                    className={`flex justify-center uppercase text-sm text-secondary ${progressColor["untouched"]}`}
                  >
                    Untouched
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
