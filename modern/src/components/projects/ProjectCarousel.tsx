import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Project } from '../../types/project';
import { useHorizontalDrag } from '../../hooks/useHorizontalDrag';
import { formatCount } from '../../utils/projects';
import { ProjectCard } from './ProjectCard';

export function ProjectCarousel({ items, onOpen }: { items: Project[]; onOpen: (project: Project) => void }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ active: 0, progress: 0, atStart: true, atEnd: false, canScroll: false });
  const { dragging, dragHandlers } = useHorizontalDrag();

  const measure = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    const cards = Array.from(el.querySelectorAll<HTMLElement>('.project-card'));
    const containerLeft = el.getBoundingClientRect().left;
    const active = cards.reduce((best, card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - containerLeft);
      const bestDistance = Math.abs((cards[best]?.getBoundingClientRect().left ?? containerLeft) - containerLeft);
      return distance < bestDistance ? index : best;
    }, 0);
    setState({
      active,
      progress: max > 1 ? el.scrollLeft / max * 100 : 100,
      atStart: el.scrollLeft <= 2,
      atEnd: max - el.scrollLeft <= 2,
      canScroll: max > 2,
    });
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    let raf = 0;
    const handleScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    Array.from(el.children).forEach((child) => observer.observe(child));
    el.addEventListener('scroll', handleScroll, { passive: true });
    measure();
    return () => { observer.disconnect(); el.removeEventListener('scroll', handleScroll); cancelAnimationFrame(raf); };
  }, [items, measure]);

  // Keep vertical page scrolling native; horizontal navigation uses arrows, swipe and drag.

  const move = (direction: number) => {
    const el = viewportRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>('.project-card'));
    const target = cards[Math.min(Math.max(0, state.active + direction), cards.length - 1)];
    if (!target) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: target.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft, behavior: reduced ? 'instant' : 'smooth' });
  };

  if (items.length === 0) return <p className="section-empty">Projects will appear here once added to <code>src/data/projects.ts</code>.</p>;

  return (
    <div className="carousel-shell">
      <div ref={viewportRef} className={`project-viewport ${dragging ? 'is-dragging' : ''}`} {...dragHandlers}
        role="region" aria-roledescription="carousel" aria-label="Selected projects" tabIndex={0}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
          if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
        }}>
        {items.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onOpen={() => onOpen(project)}/>)}
      </div>
      <div className="carousel-footer">
        <div className="carousel-status" aria-live="polite">
          <strong>{formatCount(state.active + 1)}</strong><span>/ {formatCount(items.length)} PROJECTS</span>
        </div>
        <div className="carousel-progress" role="progressbar" aria-label="Project gallery progress"
          aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(state.progress)}>
          <span style={{ transform: `scaleX(${state.canScroll ? Math.max(0.06, state.progress / 100) : 1})` }}/>
        </div>
        <div className="carousel-controls">
          <span className="carousel-hint">DRAG / SWIPE</span>
          <button type="button" aria-label="Previous project" onClick={() => move(-1)} disabled={state.atStart || !state.canScroll}><ArrowLeft size={17}/></button>
          <button type="button" aria-label="Next project" onClick={() => move(1)} disabled={state.atEnd || !state.canScroll}><ArrowRight size={17}/></button>
        </div>
      </div>
    </div>
  );
}
