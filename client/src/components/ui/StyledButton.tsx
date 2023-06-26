type Props = {
  onClick?: () => void
  buttonText: string
  intent?: "primary" | "secondary"
  twClasses?: string
  type?: "submit" | "button"
  disabled?: boolean
}

const StyledButton = ({
  onClick,
  buttonText,
  intent = "primary",
  twClasses,
  type = "button",
  disabled = false,
}: Props) => {
  const activatedButtonClasses =
    intent === "primary"
      ? "bg-secondary text-main"
      : "text-secondary border-2 border-secondary"

  return (
    <button
      className={`w-28 rounded-xl px-4 py-2 text-center text-sm duration-100 ease-in-out hover:scale-105 ${activatedButtonClasses} ${twClasses}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {buttonText}
    </button>
  )
}
export default StyledButton
