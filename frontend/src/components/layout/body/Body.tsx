import React from "react"

type Props = {
  children: React.ReactNode
}

const Body = ({ children }: Props) => {
  return <div className="min-h-screen bg-main flex flex-col">{children}</div>
}

export default Body
