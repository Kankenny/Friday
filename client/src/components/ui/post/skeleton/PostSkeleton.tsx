const PostSkeleton = () => {
  return (
    <>
      <div className="space-y-1">
        <div
          className="p-2 rounded-md shadow-md
          border border-secondary cursor-not-allowed h-[5.1rem] space-y-2 caret-transparent"
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
        <div className="flex justify-between px-4">
          <div className="w-1/6 h-1 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="w-1/4 h-1 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
      </div>
    </>
  )
}

export default PostSkeleton
