import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import About from './sections/About';
import Achievements from './sections/Achievements';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './components/Footer';
export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navbar />
        <main id="main">
          <Hero />
          <Projects />
          <About />
          <Achievements />
          <Experience />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  );
}
