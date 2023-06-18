import { useState } from "react"

import ColumnHeaders from "./headers/ColumnHeaders"
import MainHeader from "./headers/MainHeader"
import PostActions from "./PostActions"
import Tasks from "./tasks/Tasks"
import { PostType } from "../../../lib/types/primitive-types/PostType"
import EditPostForm from "./headers/post-menu/EditPostForm"

type Props = {
  post: PostType
}

const Post = ({ post }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      {!isEditing ? (
        <div
          className={`rounded-md shadow-md  ${
            !isExpanded &&
            "border border-secondary hover:bg-secondary hover:text-white ease-in-out caret-transparent cursor-pointer"
          } duration-300`}
        >
          <MainHeader
            setIsExpanded={setIsExpanded}
            setIsEditing={setIsEditing}
            isExpanded={isExpanded}
            post={post}
          />
          <div className={`border rounded-md ${!isExpanded && "hidden"}`}>
            <ColumnHeaders />
            {post.tasks && <Tasks tasks={post.tasks} post={post} />}
            <PostActions post={post} />
          </div>
        </div>
      ) : (
        <EditPostForm setIsEditing={setIsEditing} post={post} />
      )}
    </>
  )
}

export default Post
