import React, { useState } from "react"
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined"
import { Drawer } from "@mui/material"
import CommentsDrawer from "./CommentsDrawer"
import postAPI from "../../../../lib/services/axios-instances/postAPI"
import { useDispatch } from "react-redux"
import { setPostDetails } from "../../../../lib/store/slices/post-detail-slice/postDetailSlice"
import { PostDetailSliceType } from "../../../../lib/types/slice-types/PostDetailSliceType"

type Props = {
  post: PostDetailSliceType
}

const CommentsButton = ({ post }: Props) => {
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()
  const getPostDetails = async () => {
    try {
      const { data } = await postAPI.get(`/${post._id}`)
      dispatch(setPostDetails(data.data))
    } catch (err) {
      console.error(err)
    }
  }

  const toggleDrawer =
    (openState: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return
      }

      setOpen(openState)

      if (openState === true) {
        getPostDetails()
      }
    }

  return (
    <div>
      <h1 className="cursor-pointer" onClick={toggleDrawer(true)}>
        <CommentOutlinedIcon className="mr-2 opacity-100 h-5 w-5" />
        Comments
      </h1>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <CommentsDrawer post={post} toggleDrawer={toggleDrawer} />
      </Drawer>
    </div>
  )
}

export default CommentsButton
