import SubdirectoryArrowRightOutlinedIcon from "@mui/icons-material/SubdirectoryArrowRightOutlined"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { SubtaskType } from "../../../../lib/types/primitive-types/SubtaskType"

type Props = {
  subtask: SubtaskType
}

const Subtask = ({ subtask }: Props) => {
  const subtaskDueDate = new Date(subtask.dueDate)
  const formattedDueDate = subtaskDueDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <>
      <div className="flex justify-between text-center">
        <div className="border-secondary border p-2 pl-10 text-sm text-left cursor-pointer hover:bg-secondary hover:text-main duration-200 flex items-center flex-grow">
          <SubdirectoryArrowRightOutlinedIcon className="h-5 w-5" />
          {subtask.title}
        </div>
        <h1 className="uppercase flex-grow max-w-[20%] border border-secondary p-2 text-sm cursor-pointer hover:bg-secondary hover:text-main duration-200">
          {subtask.progress}
        </h1>
        <h1 className="uppercase flex-grow max-w-[10%] border border-secondary p-2 text-sm cursor-pointer hover:bg-secondary hover:text-main duration-200">
          {subtask.priority}
        </h1>
        <h1 className="uppercase flex-grow max-w-[20%] border border-secondary p-2 text-sm cursor-pointer hover:bg-secondary hover:text-main duration-200">
          {formattedDueDate}
        </h1>
      </div>
      <div className="border border-secondary p-2 pl-9 text-sm">
        <div className="flex items-center">
          <AddOutlinedIcon className="h-5 w-5 opacity-50" />
          <input
            type="text"
            placeholder="Add Subtask"
            className="h-full outline-none"
          />
        </div>
      </div>
    </>
  )
}

export default Subtask
