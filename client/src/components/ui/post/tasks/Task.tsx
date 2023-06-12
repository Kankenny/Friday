import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined"
import { useState } from "react"
import Subtask from "../subtasks/Subtask"

const Task = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <div className="flex justify-between text-center">
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-grow max-w-[50%] border border-secondary p-2 text-sm text-left cursor-pointer hover:bg-secondary hover:text-main duration-200 flex items-center"
        >
          <ChevronRightOutlinedIcon />
          <h1>Eat</h1>
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
      {isExpanded && <Subtask />}
    </>
  )
}

export default Task
