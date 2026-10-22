import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { sectionIds, useActiveSection } from '../../hooks/useActiveSection';
import { site } from '../../data/site';
import { experience } from '../../data/experience';
import { awards } from '../../data/awards';

const visibleSections = sectionIds.filter(id => (id !== 'experience' || experience.length > 0) && (id !== 'awards' || awards.length > 0));

const labels: Record<(typeof sectionIds)[number], string> = {
  home: 'Home', about: 'About', projects: 'Projects', skills: 'Skills',
  experience: 'Experience', awards: 'Awards', contact: 'Contact',
};

export function FloatingNavbar() {
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-shell">
        <a className="wordmark" href="#home" aria-label="Go to home">portofolio<span className="wordmark-dot">.</span></a>
        <nav className="floating-nav" aria-label="Main navigation">
          {visibleSections.map((id) => (
            <a key={id} href={`#${id}`} className={`nav-link ${active === id ? 'is-active' : ''}`}
              aria-current={active === id ? 'location' : undefined}>{labels[id]}</a>
          ))}
        </nav>
        <span className="header-caption">{site.accentLabel}</span>
        <button className="mobile-menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)}
          aria-controls="mobile-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <nav id="mobile-navigation" className={`mobile-navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Mobile navigation" inert={!menuOpen} onKeyDown={(e) => {
        if (e.key === 'Escape') setMenuOpen(false);
      }}>
        {visibleSections.map((id) => (
          <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}
            aria-current={active === id ? 'location' : undefined}
            className={active === id ? 'is-active' : ''}>{labels[id]}</a>
        ))}
      </nav>
    </header>
  );
}
