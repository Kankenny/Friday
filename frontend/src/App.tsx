import Card from "./components/ui/Card";
import StyledInput from "./components/ui/StyledInput";

function App() {
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="w-64 space-y-4">
        <h1>Styled Input Component</h1>
        <StyledInput label="Some Label" name="Some Label" type="text" />
      </div>
      <div className="w-64 space-y-4">
        <h1>Styled Button Component</h1>
        {/* Put component here */}
      </div>
      <div className="w-64 space-y-4">
        <h1>Styled Link Component</h1>
        {/* Put component here */}
      </div>
    </div>
  );
}

export default App;
