import { ArrowDown, Code2, Database, Download, Layers3 } from 'lucide-react';
import { profile } from '../data/profile';
import { Count, Reveal, SocialLinks } from '../components/Primitives';
import ProjectPreview from '../components/ProjectPreview';
export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-grid">
          <Reveal className="hero-copy">
            <div className="availability">
              <span /> Open to software development opportunities
            </div>
            <div className="intro-label">HI, I’M NITIN KAUNDAL</div>
            <h1>
              Nitin Kaundal.
              <br />
              <span>Code with purpose.</span>
            </h1>
            <div className="hero-role">
              Full-Stack Developer <span>/</span> CSE @ HPTU
            </div>
            <p className="hero-description">{profile.introduction}</p>
            <div className="hero-buttons">
              <a className="button primary" href="#projects">
                View my work <ArrowDown size={17} />
              </a>
              <a className="button" href={profile.resume} download>
                <Download size={17} /> Download resume
              </a>
            </div>
            <div className="hero-bottom">
              <SocialLinks />
              <span className="hero-location">Based in Himachal Pradesh, India</span>
            </div>
          </Reveal>
          <Reveal className="hero-visual" delay={0.15}>
            <div className="visual-grid" />
            <div className="visual-overline">
              <span className="code-mark">&lt;/&gt;</span> FROM INTERFACE TO INFRASTRUCTURE
            </div>
            <div className="hero-window">
              <ProjectPreview id="edistrict" hero />
            </div>
            <div className="stack-card">
              <span className="stack-card-icon">
                <Layers3 size={20} />
              </span>
              <div>
                <strong>Built across the stack</strong>
                <span>React · Node.js · PostgreSQL</span>
              </div>
              <div className="stack-connector">
                <Code2 size={16} />
                <i />
                <Database size={16} />
              </div>
            </div>
            <div className="visual-footnote">
              <span /> REAL PROBLEMS. END-TO-END SOLUTIONS.
            </div>
          </Reveal>
        </div>
        <Reveal className="stats-strip">
          <div>
            <strong>
              <Count value={4} />
              <span className="stat-suffix"> projects</span>
            </strong>
            <span>Ideas turned into applications</span>
          </div>
          <div>
            <strong>
              <Count value={3} />
              <span className="stat-suffix"> internships</span>
            </strong>
            <span>Learning through industry exposure</span>
          </div>
          <div>
            <strong>
              Top <Count value={15} />
              <span className="stat-suffix"> / ~9,000</span>
            </strong>
            <span>Google Student Ambassadors</span>
          </div>
          <div>
            <strong>
              <Count value={8.6} decimals={1} />
              <span className="stat-suffix"> / 10</span>
            </strong>
            <span>CGPA · through 6th semester</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
