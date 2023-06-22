import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"
import Post from "../../../../ui/post/Post"

const TimelinePosts = () => {
  const {
    posts: allPosts,
    queriedPosts,
    didQuery,
  } = useTypedSelector((state) => state.timeline)

  const posts = didQuery ? queriedPosts : allPosts

  const content = posts.map((post) => (
    <Post post={post} key={post._id + post.createdAt} />
  ))

  return <div className="flex flex-col gap-10">{content}</div>
}

export default TimelinePosts
