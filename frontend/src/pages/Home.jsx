import Navbar from "../sections/Navbar";
import Hero from "../sections/Hero";
import Stats from "../sections/Stats";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Experience from "../sections/Experience";
import Projects from "../sections/Projects";
import Services from "../sections/Services";
import TechStack from "../sections/TechStack";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";
import { useEffect } from "react";
import API from "../api/axios";


export default function Home() {
  useEffect(()=>{
    API.post("/visitor");
  })
  return (
    <>
      <Navbar />

      <main className="pt-15">
        <Hero />

        <Stats />

        <About />

        <Skills />

        <Experience />

        <Projects />

        <Services />

        <TechStack />

        <Contact />

        <Footer />
            
      </main>
    </>
  );
}
