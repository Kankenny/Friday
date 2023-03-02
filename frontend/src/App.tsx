import { Routes, Route } from "react-router-dom";

import LandingPage from "./components/routes/LandingPage";
import Home from "./components/routes/Home";
import Playground from "./components/routes/Playground";
import RouterLink from "./components/ui/RouterLink";
import StyledLink from "./components/ui/StyledLink";

function App() {
  return (
    <>
      <RouterLink to="/" routerLinkText="Landing Page" />
      <RouterLink to="/home" routerLinkText="Home" />
      <RouterLink to="/playground" routerLinkText="Playground" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
    </>
  );
}

export default App;
