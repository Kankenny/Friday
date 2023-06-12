import Card from "../../../ui/Card"
import StyledInput from "../../../ui/StyledInput"
import StyledButton from "../../../ui/StyledButton"
import Accordion from "../../../ui/Accordion"
import StyledLink from "../../../ui/StyledLink"
import Overview from "../../../ui/Overview"
import Logo from "../../../ui/Logo"
import Post from "../../../ui/post/Post"

const Playground = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <Overview>
        <h1 className="text-4xl font-extrabold">
          This playground route is for dev purposes only
        </h1>
      </Overview>

      <div className="w-full space-y-4 border-b-2 border-b-black mb-10 p-5">
        <h1 className="text-2xl font-bold">Post Component</h1>
        <Post />
      </div>

      <div className="w-96 space-y-4 border-b-2 border-b-black mb-10 p-5">
        <h1 className="text-2xl font-bold">Logo Component</h1>
        <Logo />
      </div>

      <div className="w-96 space-y-4 border-b-2 border-b-black mb-10 p-5">
        <h1 className="text-2xl font-bold">StyledInput Component</h1>
        <StyledInput placeholder="Some Label" name="Some Label" type="text" />
      </div>

      <div className="w-96 space-y-4 border-b-2 border-b-black mb-10 p-5">
        <h1 className="text-2xl font-bold">Card Component</h1>
        <Card>Some Content</Card>
      </div>

      <div className="w-96 space-y-4 border-b-2 border-b-black mb-10 p-5">
        <h1 className="text-2xl font-bold">StyledButton Component</h1>
        <div className="flex space-x-10">
          <StyledButton
            onClick={() => console.log("hello")}
            buttonText={"Primary"}
            intent="primary"
          />
          <StyledButton
            onClick={() => console.log("hello")}
            buttonText={"Secondary"}
            intent="secondary"
          />
        </div>
      </div>

      <div className="w-96 space-y-4 border-b-2 border-b-black mb-10 p-5">
        <h1 className="text-2xl font-bold">StyledLink Component</h1>
        <StyledLink href="add link here" linkText="Link" />
      </div>

      <div className="w-96 space-y-4 border-b-2 border-b-black mb-10 p-5">
        <h1 className="text-2xl font-bold">Accordion Component</h1>
        <Accordion title="Some Title">
          <h1>Some Heading</h1>
          <p>Some other description</p>
        </Accordion>
      </div>

      <div className="w-96 space-y-4 border-b-2 border-b-black mb-10 p-5">
        <h1 className="text-2xl font-bold">Overview Component</h1>
        <Overview twClasses="space-y-5">
          <h1 className="text-lg font-bold capitalize">
            I am an Overview Component
          </h1>
          <p className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
            voluptatem corporis asperiores aperiam, inventore corrupti sed
            dolorum ad quisquam, soluta laborum in officiis sit. Voluptate quis,
            iusto neque ut nemo blanditiis temporibus qui perspiciatis,
            doloremque vel, dolore ipsum quisquam! Voluptatem minima ad natus
            ducimus adipisci dolorem maiores. Sequi, aperiam dolor!
          </p>
        </Overview>
      </div>
    </div>
  )
}

export default Playground
