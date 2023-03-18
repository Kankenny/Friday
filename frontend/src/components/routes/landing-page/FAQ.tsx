import Accordion from "../../ui/Accordion"

const FAQ = () => {
  return (
    <div className="container mx-auto max-w-[30%] flex flex-col space-y-5">
      <Accordion title="What makes application your different from traditional to do applications?">
        <p>
          Our application allows our users to be able to prioritize their tasks
          based on several factors such as the deadline, or you can even set it
          the priority value yourself!
        </p>
      </Accordion>
      <Accordion title="Who can see my to do lists?">
        <p>
          You can control who can access your to do lists. May it be your
          friends, only specific people, or only private to you
        </p>
      </Accordion>
      <Accordion title="What makes your different from traditional to do applications?">
        <p>
          Our application allows our users to be able to prioritize their tasks
          based on several factors such as the deadline or you can set it the
          priority value yourself!
        </p>
      </Accordion>
      <Accordion title="What makes your different from traditional to do applications?">
        <p>
          Our application allows our users to be able to prioritize their tasks
          based on several factors such as the deadline or you can set it the
          priority value yourself!
        </p>
      </Accordion>
    </div>
  )
}

export default FAQ
