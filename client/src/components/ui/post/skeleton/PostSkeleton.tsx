const PostSkeleton = () => {
  return (
    <div
      className="p-2 rounded-md shadow-md 
        border cursor-not-allowed h-20 space-y-2 caret-transparent"
    >
      <div className="flex justify-between">
        <div className="w-1/3 h-5 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="w-1/12 h-5 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
      <div className="flex justify-between">
        <div className="w-1/6 h-5 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="w-1/6 h-5 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
    </div>
  )
}

export default PostSkeleton
