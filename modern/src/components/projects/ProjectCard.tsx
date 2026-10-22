import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../types/project';
import { SmartImage } from '../ui/SmartImage';

export function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <button type="button" className="project-card" onClick={onOpen} aria-label={`Open details for ${project.title}`}>
      <div className="project-image-container">
        <SmartImage src={project.cover.src} alt={project.cover.alt} className="project-cover" />
        {project.isSample && <span className="sample-flag">SAMPLE</span>}
      </div>
      <div className="project-card-bottom">
        <p className="project-category">{String(index + 1).padStart(2, '0')} <span>/</span> {project.category.toUpperCase()}</p>
        <h3>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>
        <span className="project-arrow" aria-hidden="true"><ArrowUpRight size={17}/></span>
      </div>
    </button>
  );
}
