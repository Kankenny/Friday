import * as React from "react"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Grow from "@mui/material/Grow"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import Tooltip from "@mui/material/Tooltip"
import EditIcon from "@mui/icons-material/Edit"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import SaveAltIcon from "@mui/icons-material/SaveAlt"
import DeleteIcon from "@mui/icons-material/Delete"
import MoreHorizOutlined from "@mui/icons-material/MoreHorizOutlined"
import { useDispatch } from "react-redux"
import {
  createPost,
  deletePost,
} from "../../../../../lib/store/slices/timeline-slice/timelineSlice"
import {
  copyPostToProfile,
  savePost,
} from "../../../../../lib/store/slices/same-profile-slice/sameProfileSlice"
import { PostType } from "../../../../../lib/types/primitive-types/PostType"
import postAPI from "../../../../../lib/services/axios-instances/postAPI"
import { setFeedback } from "../../../../../lib/store/slices/feedback-slice/feedbackSlice"

import { isAxiosError } from "axios"

type Props = {
  post: PostType
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export default function PostMenu({ post, setIsEditing }: Props) {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLDivElement>(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
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

  const handleEditPostClick = (e: React.MouseEvent | Event) => {
    setIsEditing(true)
    handleClose(e)
  }

  const handleCopyClick = async (e: React.MouseEvent | Event) => {
    try {
      const { data } = await postAPI.post(`/${post._id}/copy`)
      dispatch(
        setFeedback({ feedbackMessage: data.message, feedbackType: "success" })
      )
      dispatch(copyPostToProfile(data.data))
      dispatch(createPost(data.data))
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
    } finally {
      handleClose(e)
    }
  }

  const handleSaveClick = async (e: React.MouseEvent | Event) => {
    try {
      const { data } = await postAPI.put(`/${post._id}/save`)
      dispatch(
        setFeedback({ feedbackMessage: data.message, feedbackType: "success" })
      )
      dispatch(savePost(data.data))
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
    } finally {
      handleClose(e)
    }
  }

  const handleDeleteClick = async (e: React.MouseEvent | Event) => {
    try {
      const { data } = await postAPI.delete(`/${post._id}`)
      dispatch(
        setFeedback({ feedbackMessage: data.message, feedbackType: "success" })
      )
      dispatch(deletePost(post))
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
    } finally {
      handleClose(e)
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

  return (
    <>
      <div>
        <Tooltip
          title="Post Options"
          className="cursor-pointer"
          ref={anchorRef}
          aria-haspopup="true"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          onClick={handleToggle}
        >
          <MoreHorizOutlined className="rounded-full hover:bg-tertiary duration-200 ease-in-out text-md p-2 h-8 w-8" />
        </Tooltip>
        {open && (
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
                <Paper className="bg-blue-50 border border-secondary">
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem
                        onClick={handleEditPostClick}
                        className="flex gap-4 items-center hover:bg-tertiary"
                      >
                        <EditIcon className="h-5 w-5" />
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={handleSaveClick}
                        className="flex gap-4 items-center hover:bg-tertiary"
                      >
                        <SaveAltIcon className="h-5 w-5" />
                        Save
                      </MenuItem>
                      <MenuItem
                        onClick={handleCopyClick}
                        divider
                        className="flex gap-4 items-center hover:bg-tertiary"
                      >
                        <ContentCopyIcon className="h-5 w-5" />
                        Copy
                      </MenuItem>
                      <MenuItem
                        onClick={handleDeleteClick}
                        className="flex gap-4 items-center hover:bg-tertiary"
                      >
                        <DeleteIcon className="h-5 w-5" />
                        Delete
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        )}
      </div>
    </>
  )
}
