import { Routes, Route } from "react-router-dom";

import LandingPage from "./components/routes/LandingPage";
import Home from "./components/routes/Home";
import Playground from "./components/routes/Playground";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="playground" element={<Playground />} />
    </Routes>
  );
}

export default App;
