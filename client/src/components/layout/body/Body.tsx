import React from "react"

type Props = {
  children: React.ReactNode
}

const Body = ({ children }: Props) => {
  return (
    <main className="min-h-screen flex flex-col container mx-auto">
      {children}
    </main>
  )
}

export default Body
