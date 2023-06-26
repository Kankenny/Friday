import Card from "../../../ui/Card"

const mission =
  "At Friday, we are dedicated to improving the lives of individuals by equipping them with the tools and resources they need to succeed. Our mission is to empower people to achieve their goals and aspirations by providing a powerful yet user-friendly application that simplifies task management and helps prioritize their to-do lists."

const vision =
  "At Friday, our vision is to make task management effortless and stress-free for individuals everywhere. We understand the struggle of juggling multiple tasks and responsibilities, and our goal is to provide a solution that simplifies the process and empowers users to focus on what truly matters."

const MissionVision = () => {
  return (
    <div className="bg-secondary mx-auto space-y-20 p-20">
      <Card twClasses="container mx-auto bg-secondary text-white">
        <div className="flex flex-col items-center gap-10 md:flex-row">
          <h1 className="text-tertiary h-full text-5xl font-bold">
            Our Mission
          </h1>
          <p className="text-justify indent-14 text-xl leading-9">{mission}</p>
        </div>
      </Card>
      <Card twClasses="container mx-auto bg-secondary text-white">
        <div className="flex flex-col-reverse items-center gap-10 md:flex-row">
          <p className="text-justify indent-14 text-xl leading-9">{vision}</p>
          <h1 className="text-tertiary h-full text-5xl font-bold">
            Our Vision
          </h1>
        </div>
      </Card>
    </div>
  )
}

export default MissionVision
