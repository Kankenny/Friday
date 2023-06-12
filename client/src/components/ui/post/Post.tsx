import { useState } from "react"

import ColumnHeaders from "./headers/ColumnHeaders"
import MainHeader from "./headers/MainHeader"
import PostActions from "./PostActions"
import Task from "./Task"

const Post = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={`rounded-md shadow-md  ${
        !isExpanded &&
        "border border-secondary hover:bg-secondary hover:text-white ease-in-out caret-transparent cursor-pointer"
      } duration-300`}
    >
      <MainHeader setIsExpanded={setIsExpanded} isExpanded={isExpanded} />

      <div className={`border rounded-md ${!isExpanded && "hidden"}`}>
        <ColumnHeaders />
        <Task />
        <PostActions />
      </div>
    </div>
  )
}

export default Post
