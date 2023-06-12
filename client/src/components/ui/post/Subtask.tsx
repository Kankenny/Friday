import SubdirectoryArrowRightOutlinedIcon from "@mui/icons-material/SubdirectoryArrowRightOutlined"

const Subtask = () => {
  return (
    <div className="flex justify-between text-center">
      <div className="border-secondary border p-2 pl-10 text-sm text-left cursor-pointer hover:bg-secondary hover:text-main duration-200 flex items-center flex-grow">
        <SubdirectoryArrowRightOutlinedIcon className="h-5 w-5" /> Subtask
      </div>
      <h1 className="flex-grow max-w-[20%] border border-secondary p-2 text-sm cursor-pointer hover:bg-secondary hover:text-main duration-200">
        Working on it
      </h1>
      <h1 className="flex-grow max-w-[10%] border border-secondary p-2 text-sm cursor-pointer hover:bg-secondary hover:text-main duration-200">
        5
      </h1>
      <h1 className="flex-grow max-w-[20%] border border-secondary p-2 text-sm cursor-pointer hover:bg-secondary hover:text-main duration-200">
        10/01/1001
      </h1>
    </div>
  )
}

export default Subtask
