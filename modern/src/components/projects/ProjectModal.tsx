import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Github, X } from 'lucide-react';
import type { Project } from '../../types/project';
import { getProjectMedia } from '../../utils/projects';
import { safeExternalUrl } from '../../utils/links';
import { ProjectGallery } from './ProjectGallery';

export function ProjectModal({ project, onClose, opener }: { project: Project; onClose: () => void; opener: HTMLElement | null }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(0);
  const media = getProjectMedia(project);
  const demo = safeExternalUrl(project.links?.demo);
  const github = safeExternalUrl(project.links?.github);
  const report = safeExternalUrl(project.links?.report);
  const video = safeExternalUrl(project.links?.video);
  const slides = safeExternalUrl(project.links?.slides);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, [opener]);

  return (
    <dialog ref={dialogRef} className="project-dialog" aria-labelledby="project-dialog-title"
      aria-describedby="project-dialog-description"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="modal-panel">
        <header className="modal-head">
          <div className="modal-heading-text">
            <p className="eyebrow">{project.category} <span aria-hidden="true">/</span> {project.year}</p>
            <h2 id="project-dialog-title">{project.title}</h2>
            <p id="project-dialog-description" className="modal-lead">{project.summary}</p>
          </div>
          <button ref={closeRef} type="button" className="modal-close" onClick={onClose} aria-label="Close project details"><X size={20}/></button>
        </header>
        <div className="modal-case-grid">
          <section className="modal-visuals" aria-label="Project visual evidence">
            <ProjectGallery media={media} index={index} onIndex={setIndex} />
            {project.scopeNote && <p className="modal-scope"><strong>Context:</strong> {project.scopeNote}</p>}
          </section>
          <div className="modal-story">
            {!!project.metrics?.length && (
              <section className="modal-metrics" aria-label="Project results">
                {project.metrics.map((metric) => <div className="modal-metric" key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                  {metric.context && <small>{metric.context}</small>}
                </div>)}
              </section>
            )}
            <section className="modal-story-section">
              <h3>The challenge</h3>
              <p>{project.problem}</p>
            </section>
            <section className="modal-story-section">
              <h3>My approach</h3>
              <p>{project.solution}</p>
            </section>
            {!!project.contributions?.length && <section className="modal-story-section">
              <h3>What I built</h3>
              <ul className="modal-contributions">
                {project.contributions.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>}
            <section className="modal-story-section modal-story-details">
              <h3>Implementation details</h3>
              <p>{project.description}</p>
            </section>
          </div>
        </div>
        <footer className="modal-bottom">
          <div className="modal-tech">
            <p className="modal-bottom-label">Tools & technologies</p>
            <div className="modal-stack" aria-label="Technology stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
          {(demo || github || report || video || slides) && <div className="modal-actions">
            <p className="modal-bottom-label">Explore the project</p>
            <div className="modal-links">
              {demo && <a href={demo} target="_blank" rel="noopener noreferrer" className="button button-dark">Live Demo <ArrowUpRight size={15}/></a>}
              {github && <a href={github} target="_blank" rel="noopener noreferrer" className="button button-light"><Github size={15}/> Repository</a>}
              {report && <a href={report} target="_blank" rel="noopener noreferrer" className="button button-light">Report <ArrowUpRight size={15}/></a>}
              {slides && <a href={slides} target="_blank" rel="noopener noreferrer" className="button button-light">Slides <ArrowUpRight size={15}/></a>}
              {video && <a href={video} target="_blank" rel="noopener noreferrer" className="button button-light">Video <ArrowUpRight size={15}/></a>}
            </div>
          </div>}
        </footer>
      </div>
    </dialog>
  );
}
