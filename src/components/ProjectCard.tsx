import { Check, ExternalLink, Github } from 'lucide-react';
import type { Project } from '../data/projects';
import ProjectPreview from './ProjectPreview';
import { Reveal, Tags } from './Primitives';
export default function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  return (
    <Reveal
      className={`project-card ${p.featured ? 'featured' : ''} ${index === 1 ? 'reverse' : ''}`}
    >
      <div className="project-art">
        {p.image ? (
          <img
            loading="lazy"
            src={p.image}
            width="800"
            height="560"
            alt={`${p.name} application screenshot`}
          />
        ) : (
          <ProjectPreview id={p.id} />
        )}
      </div>
      <div className="project-info">
        <div className="project-meta">
          <span>{p.featured ? 'FEATURED PROJECT' : 'SELECTED PROJECT'}</span>
          <span>{p.year}</span>
        </div>
        <h3>
          {p.name}
          <span className="project-number">0{index + 1}</span>
        </h3>
        <div className="project-subtitle">{p.subtitle}</div>
        <p>{p.description}</p>
        {p.featured && (
          <ul className="project-features">
            {p.features.map((f) => (
              <li key={f}>
                <Check size={14} />
                {f}
              </li>
            ))}
          </ul>
        )}
        <Tags items={p.stack} />
        <div className="project-links">
          {p.repoUrl && (
            <a href={p.repoUrl} target="_blank" rel="noopener noreferrer">
              <Github size={16} /> Source code
            </a>
          )}
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} /> Live demo
            </a>
          )}
          {!p.repoUrl && !p.liveUrl && (
            <a
              href={`mailto:nitinkoundal2005@gmail.com?subject=${encodeURIComponent(`I'd like to learn more about ${p.name}`)}`}
            >
              Discuss this project <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}
