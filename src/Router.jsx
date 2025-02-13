import { Routes, Route } from "react-router";
import { Certification, NotFound } from "./containers";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Certification />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
