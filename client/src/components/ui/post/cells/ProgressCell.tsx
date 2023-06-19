type Props = {
  progress: "done" | "working on it" | "stuck" | "untouched"
}

const ProgressCell = ({ progress }: Props) => {
  const progressColor = {
    done: "bg-[#499548] hover:bg-[#366136]",
    "working on it": "bg-[#eab308] hover:bg-[#c79505]",
    stuck: "bg-[#ef4444] hover:bg-[#be2d2d]",
    untouched: "bg-gray-300 hover:bg-gray-400",
  }

  return (
    <h1
      className={`uppercase flex-grow max-w-[20%] border border-secondary p-2 text-sm cursor-pointer hover:text-secondary duration-200 ${progressColor[progress]}`}
    >
      {progress}
    </h1>
  )
}

export default ProgressCell
