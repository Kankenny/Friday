import React from "react"
import Feedback from "./components/ui/Feedback"
import FixedScrollToTop from "./components/ui/FixedScrollToTop"

type Props = {
  children: React.ReactNode
}

const AppContainer = ({ children }: Props) => {
  return (
    <div className="dark:text-primary overflow-x-hidden bg-blue-50 tracking-tight text-black duration-700 ease-in-out dark:bg-black">
      {children}
      <FixedScrollToTop />
      <Feedback />
    </div>
  )
}

export default AppContainer
