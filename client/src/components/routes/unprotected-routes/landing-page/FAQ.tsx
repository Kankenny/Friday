import Accordion from "../../../ui/Accordion"
import Overview from "../../../ui/Overview"

const FAQ = () => {
  return (
    <div className="container mx-auto max-w-2xl flex flex-col space-y-5">
      <Overview twClasses="mb-10">
        <h1 className="text-5xl font-extrabold">Frequently Asked Questions</h1>
      </Overview>
      <Accordion title="What is Friday?">
        <p className="indent-8 text-justify">
          Friday is a productivity application that aims to encourage users to
          be systematic, effective, and performant. Our application is designed
          to organize user to dos in an efficient manner.
        </p>
      </Accordion>
      <Accordion title="What makes our platform different?">
        <p className="indent-8 text-justify">
          Our application allows our users to be able to prioritize their tasks
          based on several factors such as the deadline, or you can even set it
          the priority value yourself!
        </p>
      </Accordion>
      <Accordion title="Who can see my to do lists?">
        <p className="indent-8 text-justify">
          You can control who can access your to do lists. May it be your
          friends, only specific people, or only private to yourself.
        </p>
      </Accordion>
      <Accordion title="What benefits do I get when I login?">
        <div className="space-y-4">
          <p className="indent-8 text-justify">
            Registered users are able to save their to dos that they have
            already made.
          </p>
          <p className="indent-8 text-justify">
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
