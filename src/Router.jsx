import { Routes, Route } from "react-router";
import { Certification, Vehicles, NotFound } from "./containers";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Certification />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
