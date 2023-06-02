import Card from "../../../ui/Card"

const mission =
  "At Friday, we are dedicated to improving the lives of individuals by equipping them with the tools and resources they need to succeed. Our mission is to empower people to achieve their goals and aspirations by providing a powerful yet user-friendly application that simplifies task management and helps prioritize their to-do lists."

const vision =
  "At Friday, our vision is to make task management effortless and stress-free for individuals everywhere. We understand the struggle of juggling multiple tasks and responsibilities, and our goal is to provide a solution that simplifies the process and empowers users to focus on what truly matters."

const MissionVision = () => {
  return (
    <div className="mx-auto space-y-20 bg-secondary p-20">
      <Card twClasses="container mx-auto bg-secondary text-white">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <h1 className="text-5xl font-bold text-tertiary h-full">
            Our Mission
          </h1>
          <p className="text-xl leading-9 indent-14 text-justify">{mission}</p>
        </div>
      </Card>
      <Card twClasses="container mx-auto bg-secondary text-white">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10">
          <p className="text-xl leading-9 indent-14 text-justify">{vision}</p>
          <h1 className="text-5xl font-bold text-tertiary h-full">
            Our Vision
          </h1>
        </div>
      </Card>
    </div>
  )
}

export default MissionVision
