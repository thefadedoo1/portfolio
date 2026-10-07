import { Award, Cloud, Users } from 'lucide-react';
import { achievements } from '../data/achievements';
import { Reveal, SectionHeading } from '../components/Primitives';
export default function Achievements() {
  return (
    <section id="achievements" className="section container">
      <Reveal>
        <SectionHeading
          number="03"
          label="BEYOND THE CODE"
          title="Building software. Growing communities."
        />
      </Reveal>
      <div className="achievement-grid">
        <Reveal className="achievement google">
          <div className="achievement-provider">
            <Award size={20} />
            {achievements[0].provider}
          </div>
          <div className="recognition-number">
            TOP <span>15</span>
            <span className="recognition-slash">/ 9,000</span>
          </div>
          <div className="recognition-note">Recognized among approximately 9,000 ambassadors</div>
          <p>{achievements[0].description}</p>
          <span className="achievement-bottom">
            <Users size={15} /> Outreach · Marketing · Community
          </span>
        </Reveal>
        <Reveal className="achievement aws" delay={0.08}>
          <div className="achievement-provider">
            <Cloud size={20} />
            {achievements[1].provider}
          </div>
          <h3>{achievements[1].headline}</h3>
          <p>{achievements[1].description}</p>
          <span className="achievement-bottom">
            <Cloud size={15} /> Learn · Build · Connect
          </span>
        </Reveal>
      </div>
    </section>
  );
}
