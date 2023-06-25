import { useState } from "react"

import ColumnHeaders from "./headers/ColumnHeaders"
import MainHeader from "./headers/MainHeader"
import PostActions from "./PostActions"
import Tasks from "./tasks/Tasks"
import { PostType } from "../../../lib/types/primitive-types/PostType"
import EditPostForm from "./headers/post-menu/EditPostForm"
import { calculateRating } from "../../../lib/util/util"

type Props = {
  post: PostType
}

const Post = ({ post }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const formattedDate = new Date(post.createdAt).toLocaleString()

  return (
    <>
      {!isEditing ? (
        <div>
          <div
            className={`rounded-md shadow-md cursor-pointer ${
              !isExpanded &&
              "border border-secondary hover:bg-secondary hover:text-white ease-in-out caret-transparent "
            } duration-300`}
          >
            <div className="bg-red-500 h-2 rounded-t-sm"></div>
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
          <div className="text-xs flex justify-between px-2 py-0.5 text-gray-500">
            <p>{formattedDate}</p>
            <div className="flex gap-2">
              <h1 className="text-secondary">
                {calculateRating(post.upvotes, post.downvotes)}%
              </h1>
              <p>—</p>
              <h2>{`${post.upvotes} upvotes | ${post.downvotes} downvotes`}</h2>
            </div>
          </div>
        </div>
      ) : (
        <EditPostForm setIsEditing={setIsEditing} post={post} />
      )}
    </>
  )
}

export default Post
