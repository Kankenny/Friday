const Features = () => {
  return (
    <div className="text-tertiary container m-8 mx-auto grid grid-cols-1 gap-4 text-center text-xl md:grid-cols-2 md:grid-rows-2">
      <div className="p-10">
        <img
          src="/list.gif"
          alt="checklist gif"
          className="mx-auto h-40 min-w-[200px] cursor-pointer duration-200 ease-in-out hover:scale-110"
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
          className="mx-auto h-40 min-w-[200px] cursor-pointer duration-200 ease-in-out hover:scale-110"
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
          className="mx-auto h-40 min-w-[200px] cursor-pointer duration-200 ease-in-out hover:scale-110"
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
          className="mx-auto h-40 min-w-[200px] cursor-pointer duration-200 ease-in-out hover:scale-110"
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
