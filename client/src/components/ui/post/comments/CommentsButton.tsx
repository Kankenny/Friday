import React, { useState } from "react"
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined"
import { Drawer } from "@mui/material"
import CommentsDrawer from "./CommentsDrawer"
import { PostType } from "../../../../lib/types/primitive-types/PostType"

type Props = {
  post: PostType
}

const CommentsButton = ({ post }: Props) => {
  const [open, setOpen] = useState(false)

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
