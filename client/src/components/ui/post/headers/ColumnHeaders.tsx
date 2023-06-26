const ColumnHeaders = () => {
  return (
    <div className="flex justify-between text-center font-semibold">
      <h1 className="bg-secondary text-tertiary border-secondary border-r-tertiary max-w-[45%] flex-grow rounded-tl-md border p-2 text-sm">
        Task
      </h1>
      <h1 className="bg-secondary text-tertiary border-secondary border-x-tertiary max-w-[25%] flex-grow border p-2 text-sm">
        Progress
      </h1>
      <h1 className="bg-secondary text-tertiary border-secondary border-x-tertiary max-w-[10%] flex-grow border p-2 text-sm">
        Priority
      </h1>
      <h1 className="bg-secondary text-tertiary border-secondary border-l-tertiary max-w-[20%] flex-grow rounded-tr-md border p-2 text-sm">
        Due Date
      </h1>
    </div>
  )
}

export default ColumnHeaders
