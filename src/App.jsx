import { useState } from "react";
import IntroAnimation from "./components/IntroAnimation";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import CompetitiveSection from "./sections/CompetitiveSection";
import Achievement from "./sections/Achievement";
import Certification from "./sections/Certification";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="relative animated-gradient text-white">
      <CustomCursor />
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
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
