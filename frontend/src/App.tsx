import { Routes, Route } from "react-router-dom";

// Routes
import LandingPage from "./components/routes/landing-page/LandingPage";
import Home from "./components/routes/home/Home";
import Playground from "./components/routes/playground/Playground";
import PageNotFound from "./components/routes/404-page/404Page";
import Body from "./components/layout/body/Body";
import Header from "./components/layout/header/Header";

function App() {
  return (
    <>
      <Header />
      <Body>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/playground" element={<Playground />} />
          {/* plaground route here is for dev purposes only */}
        </Routes>
      </Body>
      {/* Wrap future content below with Footer */}
    </>
  );
}

export default App;
