import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import PlanDestination from "./pages/PlanDestination";
import SelectDateRange from "./pages/SelectDateRange";
import SelectPeople from "./pages/SelectPeople";
import CreatePackage from "./pages/CreatePackage";
import Userreq from "./pages/Userreq";
import UserChoise from "./pages/UserChoise";
import ThingsdoinGalle from "./pages/ThingsdoinGalle";
import PlanYourTripHere from "./pages/PlanYourTripHere";
import CreatePlan from "./pages/CreatePlan";

function App() {

  return (
    <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/Planetrip" element={<PlanDestination />} />
        <Route path="/SelectDateRange" element={<SelectDateRange />} />
        <Route path="/SelectPeople" element={<SelectPeople />} />
        <Route path="/userreq" element={<Userreq />} />
        <Route path="/CreatePackage" element={<CreatePackage />} />
        <Route path="/UserChoise" element={<UserChoise />} />
        <Route path="/ThingsdoinGalle" element={<ThingsdoinGalle />} />
        <Route path="/PlanYourTripHere" element={<PlanYourTripHere />} />
        <Route path="/CreatePlan" element={<CreatePlan />} />
        <Route path="/create-plan" element={<CreatePlan />} />

    </Routes>
  );
}

export default App;
