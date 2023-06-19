type Props = {
  priority: "low" | "medium" | "high"
}

const PriorityCell = ({ priority }: Props) => {
  return (
    <h1 className="uppercase flex-grow max-w-[10%] border border-secondary p-2 text-sm cursor-pointer hover:bg-secondary hover:text-main duration-200">
      {priority}
    </h1>
  )
}

export default PriorityCell
