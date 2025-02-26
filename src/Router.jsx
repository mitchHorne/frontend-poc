import { Routes, Route } from "react-router";
import { StatutoryTraining, Vehicles, NotFound } from "./containers";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<StatutoryTraining />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
