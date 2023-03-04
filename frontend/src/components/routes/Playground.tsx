import React from "react";
import Card from "../ui/Card";
import StyledInput from "../ui/StyledInput";
import StyledButton from "../ui/StyledButton";
import Accordion from "../ui/Accordion";
import StyledLink from "../ui/StyledLink";

const Playground = () => {
  return (
    <div className="flex justify-center flex-col items-center">
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
        <StyledLink href="something" linkText="somethingElse"/>
      </div>

      <div className="w-96 space-y-4 border-b-2 border-b-black mb-10 p-5">
        <h1 className="text-2xl font-bold">Accordion Component</h1>
        <Accordion title="Some Title">
          <h1>Some Heading</h1>
          <p>Some other description</p>
        </Accordion>
      </div>
    </div>
  );
};

export default Playground;
