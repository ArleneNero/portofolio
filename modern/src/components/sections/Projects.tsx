import type { Project } from '../../types/project';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectCarousel } from '../projects/ProjectCarousel';

export function Projects({ projects, onOpen }: { projects: Project[]; onOpen: (project: Project) => void }) {
  return (
    <section id="projects" className="section-anchor projects-section" aria-labelledby="projects-heading">
      <div className="content-container">
        <div id="projects-heading">
          <SectionHeading eyebrow="SELECTED WORK" title="Explore my projects." aside={<span>Browse projects with arrows or swipe, then open one for details.</span>}/>
        </div>
        <ProjectCarousel items={projects} onOpen={onOpen}/>
      </div>
    </section>
  );
}
