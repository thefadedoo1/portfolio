import { Code2, GraduationCap, MapPin, Sparkles } from 'lucide-react';
import { profile } from '../data/profile';
import { Reveal, SectionHeading } from '../components/Primitives';
export default function About() {
  return (
    <section id="about" className="section section-tint">
      <div className="container about-grid">
        <Reveal>
          <SectionHeading
            number="02"
            label="A LITTLE ABOUT ME"
            title="Engineering with a purpose."
          />
          <p className="about-lead">{profile.about}</p>
          <p>{profile.aboutMore}</p>
        </Reveal>
        <Reveal className="about-details" delay={0.1}>
          {[
            { icon: MapPin, label: 'BASED IN', text: profile.location },
            { icon: GraduationCap, label: 'EDUCATION', text: 'B.Tech CSE · HPTU' },
            { icon: Code2, label: 'FOCUS', text: 'Full-Stack Development' },
            { icon: Sparkles, label: 'CURRENTLY', text: 'Open to opportunities' },
          ].map(({ icon: Icon, label, text }) => (
            <div key={label} className="detail-card">
              <Icon size={19} />
              <div>
                <span>{label}</span>
                <strong>{text}</strong>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
