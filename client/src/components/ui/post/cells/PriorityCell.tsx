import * as React from "react"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Grow from "@mui/material/Grow"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import { PostType } from "../../../../lib/types/primitive-types/PostType"
import { TaskType } from "../../../../lib/types/primitive-types/TaskType"
import { SubtaskType } from "../../../../lib/types/primitive-types/SubtaskType"
import taskAPI from "../../../../lib/services/axios-instances/taskAPI"
import { useDispatch } from "react-redux"
import {
  updateSubtask,
  updateTask,
} from "../../../../lib/store/slices/timeline-slice/timelineSlice"
import subtaskAPI from "../../../../lib/services/axios-instances/subtaskAPI"
import { setFeedback } from "../../../../lib/store/slices/feedback-slice/feedbackSlice"
import { isAxiosError } from "axios"

type Props = {
  post: PostType
  task: TaskType
  subtask?: SubtaskType
  priority: "low" | "medium" | "high"
  isTaskCell: boolean
}

const PriorityCell = ({ post, task, subtask, priority, isTaskCell }: Props) => {
  const dispatch = useDispatch()
  const [currPriority, setCurrPriority] = React.useState(priority)
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLHeadingElement>(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleUpdatePiority = async (newPriority: Props["priority"]) => {
    try {
      if (isTaskCell) {
        const { data } = await taskAPI.put(
          `/?postId=${post._id}&taskId=${task._id}`,
          {
            priority: newPriority,
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
            priority: newPriority,
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
    setCurrPriority(newPriority)
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

  const priorityColor = {
    low: "bg-[#FFDADA] hover:bg-[#FFB3B3] focus:bg-[#FFDADA]",
    medium: "bg-[#FF8E8E] hover:bg-[#FF5F5F] focus:bg-[#FF8E8E]",
    high: "bg-[#FF3838] hover:bg-[#FF1A1A] focus:bg-[#FF3838]",
  }

  return (
    <>
      <h1
        ref={anchorRef}
        onClick={handleToggle}
        className={`uppercase flex-grow max-w-[10%] border border-secondary p-2 text-sm cursor-pointer hover:text-secondary duration-200 ${priorityColor[currPriority]}`}
      >
        {currPriority}
      </h1>
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
            <Paper className="bg-blue-50">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  className="py-0"
                >
                  <MenuItem
                    onClick={() => handleUpdatePiority("low")}
                    className={`flex justify-center uppercase text-sm text-secondary ${priorityColor["low"]}`}
                  >
                    Low
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleUpdatePiority("medium")}
                    className={`flex justify-center uppercase text-sm text-secondary ${priorityColor["medium"]}`}
                  >
                    Med
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleUpdatePiority("high")}
                    className={`flex justify-center uppercase text-sm text-secondary ${priorityColor["high"]}`}
                  >
                    High
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

export default PriorityCell
