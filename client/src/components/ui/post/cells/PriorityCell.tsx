type Props = {
  priority: "low" | "medium" | "high"
}

const PriorityCell = ({ priority }: Props) => {
  const priorityColor = {
    low: "bg-[#FFDADA] hover:bg-[#FFB3B3]",
    medium: "bg-[#FF8E8E] hover:bg-[#FF5F5F]",
    high: "bg-[#FF3838] hover:bg-[#FF1A1A]",
  }

  return (
    <h1
      className={`uppercase flex-grow max-w-[10%] border border-secondary p-2 text-sm cursor-pointer hover:text-secondary duration-200 ${priorityColor[priority]}`}
    >
      {priority}
    </h1>
  )
}

export default PriorityCell
