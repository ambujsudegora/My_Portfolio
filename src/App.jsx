import { useState } from "react";
import IntroAnimation from "./components/IntroAnimation";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import CompetitiveSection from "./sections/CompetitiveSection";
import Achievement from "./sections/Achievement";
import Certification from "./sections/Certification";
import Education from "./sections/Education";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="relative text-white min-h-screen">
      <div className="fixed inset-0 -z-20 bg-black overflow-hidden pointer-events-none dark-bg-glows">
        <div className="absolute inset-0 animated-gradient opacity-[0.08]" />
        
        <div className="absolute -left-40 -top-40 h-[60vw] w-[60vw] max-h-[600px] max-w-[600px] animate-pulse rounded-full bg-gradient-to-br from-[#302b63] via-[#00bf8f] to-[#1CD8D2] opacity-[0.15] blur-[130px]" />
        <div className="absolute -bottom-40 -right-40 h-[60vw] w-[60vw] max-h-[600px] max-w-[600px] animate-pulse rounded-full bg-gradient-to-br from-[#1CD8D2] via-[#00bf8f] to-[#302b63] opacity-[0.20] blur-[130px] delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50vw] w-[50vw] max-h-[500px] max-w-[500px] animate-pulse rounded-full bg-gradient-to-tr from-[#00bf8f]/10 to-[#1CD8D2]/10 opacity-[0.10] blur-[120px] delay-500" />
      </div>
      <Navbar />

      {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}

      <Home introDone={introDone} />
      <About />
      <Skills />
      <CompetitiveSection />
      <Achievement />
      <Projects />
      <Certification />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}
