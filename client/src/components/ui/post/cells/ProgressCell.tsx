type Props = {
  progress: string
}

const ProgressCell = ({ progress }: Props) => {
  return (
    <h1 className="uppercase flex-grow max-w-[20%] border border-secondary p-2 text-sm cursor-pointer hover:bg-secondary hover:text-main duration-200">
      {progress}
    </h1>
  )
}

export default ProgressCell
