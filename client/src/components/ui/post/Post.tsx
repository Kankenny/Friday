import { useState } from "react"

import ColumnHeaders from "./headers/ColumnHeaders"
import MainHeader from "./headers/MainHeader"
import PostActions from "./PostActions"
import Tasks from "./tasks/Tasks"
import { PostType } from "../../../lib/types/primitive-types/PostType"

type Props = {
  post: PostType
}

const Post = ({ post }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)
  console.log(post)
  return (
    <div
      className={`rounded-md shadow-md  ${
        !isExpanded &&
        "border border-secondary hover:bg-secondary hover:text-white ease-in-out caret-transparent cursor-pointer"
      } duration-300`}
    >
      <MainHeader
        setIsExpanded={setIsExpanded}
        isExpanded={isExpanded}
        post={post}
      />
      <div className={`border rounded-md ${!isExpanded && "hidden"}`}>
        <ColumnHeaders />
        <Tasks tasks={post.tasks} />
        <PostActions post={post} />
      </div>
    </div>
  )
}

export default Post
