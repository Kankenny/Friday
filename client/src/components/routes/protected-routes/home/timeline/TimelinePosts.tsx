import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"
import Card from "../../../../ui/Card"
import Post from "../../../../ui/post/Post"

const TimelinePosts = () => {
  const {
    posts: allPosts,
    queriedPosts,
    didQuery,
  } = useTypedSelector((state) => state.timeline)

  const posts = didQuery ? queriedPosts : allPosts

  const content =
    posts.length !== 0 ? (
      posts.map((post) => <Post post={post} key={post._id + post.createdAt} />)
    ) : (
      <Card twClasses="p-20 text-3xl text-center">
        <h1 className="font-bold">No Posts Found...</h1>
      </Card>
    )

  return <div className="flex flex-col gap-10">{content}</div>
}

export default TimelinePosts
