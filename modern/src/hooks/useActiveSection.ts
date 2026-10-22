import { useEffect, useState } from 'react';

export const sectionIds = ['home', 'about', 'projects', 'skills', 'experience', 'awards', 'contact'] as const;
export type SectionId = (typeof sectionIds)[number];

export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>('home');

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const threshold = Math.min(180, window.innerHeight * 0.32);
        let current: SectionId = 'home';
        for (const id of sectionIds) {
          const element = document.getElementById(id);
          if (element && element.getBoundingClientRect().top <= threshold) current = id;
        }
        setActive(current);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return active;
}
