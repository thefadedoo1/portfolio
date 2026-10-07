import { experience } from '../data/experience';
import { Reveal, SectionHeading, Tags } from '../components/Primitives';
export default function Experience() {
  return (
    <section id="experience" className="section container experience-layout">
      <Reveal>
        <SectionHeading
          number="04"
          label="INDUSTRY EXPERIENCE"
          title="Learning by doing."
          description="Practical exposure to data, analytics and intelligent systems."
        />
        <div className="experience-note">
          3 internships <span>·</span> A broader perspective
        </div>
      </Reveal>
      <div className="timeline">
        {experience.map((e, i) => (
          <Reveal className="experience-card" key={e.company}>
            <span className="timeline-dot" />
            <div className="experience-top">
              <span className="company-monogram">{e.company.slice(0, 1)}</span>
              <span className="experience-date">{e.date}</span>
            </div>
            <h3>{e.company}</h3>
            <div className="experience-role">{e.role}</div>
            <p>{e.description}</p>
            <Tags items={e.tags} />
            {i < 2 && <div className="timeline-connector" />}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
