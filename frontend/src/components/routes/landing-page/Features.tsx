const Features = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 m-8 text-xl text-tertiary text-center">
      <div className="p-10">
        <img
          src="/list.gif"
          alt="checklist gif"
          className="h-40 mx-auto min-w-[200px] hover:scale-110 duration-200 ease-in-out cursor-pointer"
        />
        <h1 className="text-secondary font-bold">Prioritize Your Tasks</h1>
        Easily create your to-do lists and set which tasks you'd like to
        prioritize to get done quicker. Values that YOU define, for YOUR
        productivity.
      </div>
      <div className="p-10">
        <img
          src="/connected.gif"
          alt="connected gif"
          className="h-40 mx-auto min-w-[200px] hover:scale-110 duration-200 ease-in-out cursor-pointer"
        />
        <h1 className="text-secondary font-bold">Connect With Others</h1>
        Choose which of your lists you'd like to share and have others join you
        in completing difficult tasks together. Stay connected, no matter where
        they are.
      </div>
      <div className="p-10">
        <img
          src="/workflow.gif"
          alt="workflow gif"
          className="h-40 mx-auto min-w-[200px] hover:scale-110 duration-200 ease-in-out cursor-pointer"
        />
        <h1 className="text-secondary font-bold">Work Seamlessly Together</h1>
        Integrate our service into your business and streamline your internal
        processes. Assign lists to employees to have them work collaboratively
        and increase efficiency.
      </div>
      <div className="p-10">
        <img
          src="/password.gif"
          alt="password gif"
          className="h-40 mx-auto min-w-[200px] hover:scale-110 duration-200 ease-in-out cursor-pointer"
        />
        <h1 className="text-secondary font-bold">Protect Your Ideas</h1>
        With our password protection feature, lock your lists and only give
        access to those you trust. Make sure your lists are only seen by those
        you want to see them.
      </div>
    </div>
  )
}

export default Features
