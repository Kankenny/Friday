import React from "react"

type Props = {
  children: React.ReactNode
}

const Body = ({ children }: Props) => {
  return (
    <main className="container mx-auto flex min-h-screen flex-col">
      {children}
    </main>
  )
}

export default Body
