import { skills } from '../data/skills';
import { Reveal, SectionHeading, Tags } from '../components/Primitives';
export default function Skills() {
  return (
    <section id="skills" className="section section-tint">
      <div className="container">
        <Reveal>
          <SectionHeading
            number="05"
            label="TECHNICAL TOOLKIT"
            title="The tools behind the work."
            description="A full-stack foundation, with room to explore data and intelligent systems."
          />
        </Reveal>
        <div className="skills-grid">
          {skills.map((s) => (
            <Reveal className="skill-card" key={s.name}>
              <div className="skill-heading">
                <h3>{s.name}</h3>
                <span>{s.code}</span>
              </div>
              <Tags items={s.items} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
