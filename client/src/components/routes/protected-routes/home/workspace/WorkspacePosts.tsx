import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"
import Post from "../../../../ui/post/Post"

const WorkspacePosts = () => {
  const { posts } = useTypedSelector((state) => state.timeline)
  const { _id } = useTypedSelector((state) => state.auth)

  const currAuthUserPosts = posts.filter((post) => post.creatorId === _id)

  const content = currAuthUserPosts.map((post) => (
    <Post post={post} key={post._id + post.createdAt} />
  ))

  return <div className="flex flex-col gap-10">{content}</div>
}

export default WorkspacePosts
