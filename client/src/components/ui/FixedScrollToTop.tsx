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
      className="bg-tertiary border-secondary fixed bottom-5 right-5 z-20 cursor-pointer rounded-full border-2 p-4 opacity-50 backdrop-blur-sm duration-200 ease-in-out hover:scale-110 hover:opacity-100"
      onClick={scrollToTopHandler}
    >
      <VerticalAlignTopIcon />
    </div>
  )
}

export default FixedScrollToTop
