import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import PlanDestination from "./pages/PlanDestination";
import SelectDateRange from "./pages/SelectDateRange";
import SelectPeople from "./pages/SelectPeople";

function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Planetrip" element={<PlanDestination />} />
        <Route path="/SelectDateRange" element={<SelectDateRange />} />
        <Route path="/SelectPeople" element={<SelectPeople />} />
      </Routes>

  );
}

export default App;
