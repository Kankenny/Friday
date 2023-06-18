import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"
import Post from "../../../../ui/post/Post"

const WorkspacePosts = () => {
  const { posts } = useTypedSelector((state) => state.sameProfile)

  const content = posts.map((post) => (
    <Post post={post} key={post._id + post.createdAt} />
  ))

  return <div className="flex flex-col gap-10">{content}</div>
}

export default WorkspacePosts
