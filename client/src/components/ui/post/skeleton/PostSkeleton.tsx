const PostSkeleton = () => {
  return (
    <>
      <div className="space-y-1">
        <div
          className="border-secondary h-[5.2rem] cursor-not-allowed
          space-y-2 rounded-md border p-2 caret-transparent shadow-md"
        >
          <div className="flex justify-between">
            <div className="h-5 w-1/3 animate-pulse rounded-md bg-gray-300"></div>
            <div className="h-5 w-1/12 animate-pulse rounded-md bg-gray-300"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-5 w-1/6 animate-pulse rounded-md bg-gray-300"></div>
            <div className="h-5 w-1/6 animate-pulse rounded-md bg-gray-300"></div>
          </div>
        </div>
        <div className="flex justify-between px-4">
          <div className="h-1 w-1/6 animate-pulse rounded-md bg-gray-300"></div>
          <div className="h-1 w-1/4 animate-pulse rounded-md bg-gray-300"></div>
        </div>
      </div>
    </>
  )
}

export default PostSkeleton
