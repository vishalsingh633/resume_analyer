import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";

import About from "./pages/About";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
          
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}