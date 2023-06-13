import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"

const TimelinePosts = () => {
  const { posts } = useTypedSelector((state) => state.timeline)
  console.log(posts)
  return <div>TimelinePosts</div>
}

export default TimelinePosts
