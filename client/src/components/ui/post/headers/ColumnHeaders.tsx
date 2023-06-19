const ColumnHeaders = () => {
  return (
    <div className="flex justify-between text-center font-semibold ">
      <h1 className="flex-grow max-w-[45%] bg-secondary text-tertiary border border-secondary border-r-tertiary p-2 rounded-tl-md text-sm">
        Task
      </h1>
      <h1 className="flex-grow max-w-[25%] bg-secondary text-tertiary border border-secondary border-x-tertiary p-2 text-sm">
        Progress
      </h1>
      <h1 className="flex-grow max-w-[10%] bg-secondary text-tertiary border border-secondary border-x-tertiary p-2 text-sm">
        Priority
      </h1>
      <h1 className="flex-grow max-w-[20%] bg-secondary text-tertiary border border-secondary border-l-tertiary p-2 rounded-tr-md text-sm">
        Due Date
      </h1>
    </div>
  )
}

export default ColumnHeaders
