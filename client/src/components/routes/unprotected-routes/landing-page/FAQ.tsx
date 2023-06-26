import Accordion from "../../../ui/Accordion"
import Overview from "../../../ui/Overview"

const FAQ = () => {
  return (
    <div className="container mx-auto flex max-w-2xl flex-col space-y-5">
      <Overview twClasses="mb-10">
        <h1 className="text-5xl font-extrabold">Frequently Asked Questions</h1>
      </Overview>
      <Accordion title="What is Friday?">
        <p className="text-justify indent-8">
          Friday is a productivity application that aims to encourage users to
          be systematic, effective, and performant. Our application is designed
          to organize user to dos in an efficient manner.
        </p>
      </Accordion>
      <Accordion title="What makes our platform different?">
        <p className="text-justify indent-8">
          Our application allows our users to be able to prioritize their tasks
          based on several factors such as the deadline, or you can even set it
          the priority value yourself!
        </p>
      </Accordion>
      <Accordion title="Who can see my to do lists?">
        <p className="text-justify indent-8">
          You can control who can access your to do lists. May it be your
          friends, only specific people, or only private to yourself.
        </p>
      </Accordion>
      <Accordion title="What benefits do I get when I login?">
        <div className="space-y-4">
          <p className="text-justify indent-8">
            Registered users are able to save their to dos that they have
            already made.
          </p>
          <p className="text-justify indent-8">
            Our application also provides analytics to registered users of
            Friday. Users are able to access how many people have engaged on
            your to do.
          </p>
        </div>
      </Accordion>
    </div>
  )
}

export default FAQ
