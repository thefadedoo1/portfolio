import { projects } from '../data/projects';
import { SectionHeading, Reveal } from '../components/Primitives';
import ProjectCard from '../components/ProjectCard';
export default function Projects() {
  return (
    <section id="projects" className="section container">
      <Reveal>
        <SectionHeading
          number="01"
          label="SELECTED WORK"
          title="Built to solve. Designed to work."
          description="A selection of full-stack platforms and practical tools, from citizen services to expert consultations."
        />
      </Reveal>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
