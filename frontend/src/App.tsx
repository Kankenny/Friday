import Card from "./components/ui/Card";
import StyledInput from "./components/ui/StyledInput";

function App() {
  return (
    <div className="flex justify-center flex-col items-center space-y-4">
      <h1>Hello World, this is a test</h1>
      <div className="w-64">
        <StyledInput label="Some Label" name="Some Label" type="text" />
      </div>
    </div>
  );
}

export default App;
