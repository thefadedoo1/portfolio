import { Award, GraduationCap, ExternalLink } from 'lucide-react';
import { education } from '../data/profile';
import { certifications } from '../data/certifications';
import { Reveal, SectionHeading } from '../components/Primitives';
export default function Education() {
  return (
    <section id="education" className="section container">
      <Reveal>
        <SectionHeading
          number="06"
          label="A STRONG FOUNDATION"
          title="Curiosity, backed by consistency."
        />
      </Reveal>
      <Reveal className="education-card">
        <div className="education-main">
          <span className="education-icon">
            <GraduationCap size={26} />
          </span>
          <div>
            <div className="eyebrow">{education.dates}</div>
            <h3>{education.institution}</h3>
            <p>{education.degree}</p>
          </div>
          <div className="cgpa">
            <strong>
              {education.cgpa}
              <span>/10</span>
            </strong>
            <span>CGPA · {education.note.toLowerCase()}</span>
          </div>
        </div>
        <div className="school-results">
          {education.school.map((s) => (
            <div key={s.title}>
              <span>{s.title}</span>
              <strong>{s.score}</strong>
              <span className="rank">
                <Award size={14} />
                {s.rank}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
      <div className="cert-heading">
        <h3>Certifications & programs</h3>
        <span>Continuing to learn</span>
      </div>
      <div className="cert-grid">
        {certifications.map((c) => (
          <Reveal className="cert-card" key={c.name}>
            <Award size={21} />
            <span>{c.provider}</span>
            <h4>{c.name}</h4>
            {c.date && <p>{c.date}</p>}
            {c.credentialId && <p>Credential: {c.credentialId}</p>}
            {c.url && (
              <a href={c.url} target="_blank" rel="noopener noreferrer">
                View credential <ExternalLink size={14} />
              </a>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
