import StyledButton from "../../ui/StyledButton";


const subhead = "The next best task management application";
const head = "A Better Day Than ";
const days = ["Monday", "Tuesday", "Wednesday", "Thursday",];

const Headline = () => {
  return (
    <div className="flex justify-center mx-auto h-full text-left">
      <div className="bg-white p-8 md:p-16">
        <h1 className="text-tertiary text-6xl md: font-bold mb-8">
          {head}{days[0]}
        </h1>
        <p className="text-gray-500 text-xl mb-10">
          {subhead}
        </p>
        <StyledButton
          onClick={() => console.log("Button clicked")}
          buttonText="Get Started"
          intent="primary"
        />
      </div>
      <div className="w-2/5 md:w-1/2">
        <img src="/to-do.gif" alt="to-do gif" className="ml-auto" />
      </div>
    </div>
  );
};

export default Headline;

