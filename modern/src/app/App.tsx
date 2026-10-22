import { useState } from 'react';
import type { Project } from '../types/project';
import { projects } from '../data/projects';
import { getPublishedProjects } from '../utils/projects';
import { site } from '../data/site';
import { experience } from '../data/experience';
import { awards } from '../data/awards';
import { FloatingNavbar } from '../components/layout/FloatingNavbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Projects } from '../components/sections/Projects';
import { Skills } from '../components/sections/Skills';
import { Experience } from '../components/sections/Experience';
import { Awards } from '../components/sections/Awards';
import { Contact } from '../components/sections/Contact';
import { ProjectModal } from '../components/projects/ProjectModal';

export function App() {
  const [selection, setSelection] = useState<{ project: Project; opener: HTMLElement | null } | null>(null);
  const visibleProjects = getPublishedProjects(projects);

  const openProject = (project: Project) => {
    setSelection({ project, opener: document.activeElement instanceof HTMLElement ? document.activeElement : null });
  };

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <FloatingNavbar />
      <main id="main-content">
        <Hero />
        <About />
        <Projects projects={visibleProjects} onOpen={openProject}/>
        <Skills />
        {(experience.length > 0 || awards.length > 0) && (
          <div className={`content-container experience-awards-row ${experience.length === 0 || awards.length === 0 ? 'single-panel' : ''}`}>
            {experience.length > 0 && <Experience />}
            {awards.length > 0 && <Awards />}
          </div>
        )}
        <Contact />
      </main>
      <Footer />
      {site.showSampleNotice && <p className="demo-footer-note">Some project visuals and content are samples. Update the data files with verified work before publishing your personal portfolio.</p>}
      {selection && <ProjectModal key={selection.project.slug} project={selection.project} opener={selection.opener} onClose={() => setSelection(null)}/>}
    </>
  );
}
