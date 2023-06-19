import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop"

const FixedScrollToTop = () => {
  const scrollToTopHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div
      className="z-20 bg-tertiary bottom-5 right-5 fixed p-4 rounded-full cursor-pointer border-2 border-secondary hover:scale-110 duration-200 ease-in-out opacity-50 hover:opacity-100 backdrop-blur-sm"
      onClick={scrollToTopHandler}
    >
      <VerticalAlignTopIcon />
    </div>
  )
}

export default FixedScrollToTop
