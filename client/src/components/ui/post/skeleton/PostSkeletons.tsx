import PostSkeleton from "./PostSkeleton"

const PostSkeletons = () => {
  const skeletons = []

  for (let i = 0; i < 30; i++) {
    skeletons.push(<PostSkeleton key={i} />)
  }

  return skeletons
}

export default PostSkeletons
