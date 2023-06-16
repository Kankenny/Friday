type Props = {
  onClick?: () => void
  buttonText: string
  intent?: "primary" | "secondary"
  twClasses?: string
  type?: "submit" | "button"
}

const StyledButton = ({
  onClick,
  buttonText,
  intent = "primary",
  twClasses,
  type = "button",
}: Props) => {
  const activatedButtonClasses =
    intent === "primary"
      ? "bg-secondary text-main"
      : "bg-main text-secondary border-2 border-secondary"

  return (
    <button
      className={`w-28 rounded-xl text-center text-sm px-4 py-2 hover:scale-105 ease-in-out duration-100 ${activatedButtonClasses} ${twClasses}`}
      onClick={onClick}
      type={type}
    >
      {buttonText}
    </button>
  )
}
export default StyledButton
