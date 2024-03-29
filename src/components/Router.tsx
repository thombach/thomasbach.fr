import NotFound from "@/pages/404";
import About from "@/pages/About";
import Home from "@/pages/Home";
import ProjectDetails from "@/pages/ProjectDetails";
import { Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
