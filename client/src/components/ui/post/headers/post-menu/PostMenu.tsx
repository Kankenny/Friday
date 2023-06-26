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
import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"
import PeopleIcon from "@mui/icons-material/People"
import AuthorizedUsersDialog from "./AuthorizedUsersDialog"
import { setPostDetails } from "../../../../../lib/store/slices/post-detail-slice/postDetailSlice"

type Props = {
  post: PostType
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export default function PostMenu({ post, setIsEditing }: Props) {
  const { _id: authUserId } = useTypedSelector((state) => state.sameProfile)
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLDivElement>(null)
  const isPostOwner = authUserId === post.creatorId._id
  const [isAuthUsersDialogOpen, setIsAuthUsersDialogOpen] =
    React.useState(false)

  const handleCloseDialog = () => {
    setIsAuthUsersDialogOpen(false)
  }

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

  const handleUsersClick = async (e: React.MouseEvent | Event) => {
    try {
      const { data } = await postAPI.get(`/${post._id}`)
      setIsAuthUsersDialogOpen(true)
      dispatch(setPostDetails(data.data))
    } catch (err) {
      console.error(err)
    } finally {
      handleClose(e)
    }
  }

  const handleEditPostClick = (e: React.MouseEvent | Event) => {
    setIsEditing(true)
    handleClose(e)
  }

  const handleCopyClick = async (e: React.MouseEvent | Event) => {
    try {
      const { data } = await postAPI.post(`/${post._id}/copy`)
      dispatch(createPost(data.data))
      dispatch(
        setFeedback({
          feedbackMessage: data.message,
          feedbackType: "success",
        })
      )
      dispatch(copyPostToProfile(data.data))
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
        setFeedback({
          feedbackMessage: data.message,
          feedbackType: "success",
        })
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
        setFeedback({
          feedbackMessage: data.message,
          feedbackType: "success",
        })
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

  const isCurrUserAuthorized =
    post.authorization === "public" ||
    (post.authorization === "private" &&
      post.authorizedUsers.some((user) => user._id === authUserId)) ||
    post.creatorId._id === authUserId

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
          <MoreHorizOutlined className="hover:bg-tertiary text-md h-8 w-8 rounded-full p-2 duration-200 ease-in-out" />
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
                <Paper className="border-secondary border bg-blue-50 ">
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      {isPostOwner && (
                        <MenuItem
                          onClick={handleUsersClick}
                          className="hover:bg-tertiary flex items-center gap-4"
                        >
                          <PeopleIcon className="h-5 w-5" />
                          Users
                        </MenuItem>
                      )}
                      {isCurrUserAuthorized && (
                        <MenuItem
                          onClick={handleEditPostClick}
                          className="hover:bg-tertiary flex items-center gap-4"
                        >
                          <EditIcon className="h-5 w-5" />
                          Edit
                        </MenuItem>
                      )}
                      <MenuItem
                        onClick={handleSaveClick}
                        className="hover:bg-tertiary flex items-center gap-4"
                      >
                        <SaveAltIcon className="h-5 w-5" />
                        Save
                      </MenuItem>
                      <MenuItem
                        onClick={handleCopyClick}
                        divider
                        className="hover:bg-tertiary flex items-center gap-4"
                      >
                        <ContentCopyIcon className="h-5 w-5" />
                        Copy
                      </MenuItem>
                      {isCurrUserAuthorized && (
                        <MenuItem
                          onClick={handleDeleteClick}
                          className="hover:bg-tertiary flex items-center gap-4"
                        >
                          <DeleteIcon className="h-5 w-5" />
                          Delete
                        </MenuItem>
                      )}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        )}
      </div>
      <AuthorizedUsersDialog
        open={isAuthUsersDialogOpen}
        onClose={handleCloseDialog}
      />
    </>
  )
}
