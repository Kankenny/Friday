type Props = {
  onClick: () => void
  buttonText: string
  intent?: "primary" | "secondary"
}

const StyledButton = ({ onClick, buttonText, intent = "primary" }: Props) => {
  const activatedButtonClasses =
    intent === "primary"
      ? "bg-secondary text-main"
      : "bg-main text-secondary border-2 border-secondary"

  return (
    <button
      className={`w-28 rounded-xl text-center text-sm px-4 py-2 hover:scale-105 duration-100 ${activatedButtonClasses}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  )
}
export default StyledButton
