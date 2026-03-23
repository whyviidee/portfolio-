import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const Projects = dynamic(() => import("@/components/Projects"));
const About = dynamic(() => import("@/components/About"));
const Experience = dynamic(() => import("@/components/Experience"));
const Contact = dynamic(() => import("@/components/Contact"));

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <About />
      <Experience />
      <Contact />
    </main>
  );
}
