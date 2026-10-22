import { Award } from 'lucide-react';
import { awards } from '../../data/awards';
import { safeExternalUrl } from '../../utils/links';
import { SectionHeading } from '../ui/SectionHeading';

export function Awards() {
  return (
    <section id="awards" className="section-anchor awards-panel" aria-labelledby="awards-heading">
      <div id="awards-heading"><SectionHeading eyebrow="RECOGNITION" title="Awards"/></div>
      {awards.length > 0 ? <div className="awards-list">
        {awards.map(item => {
          const proof = safeExternalUrl(item.proof);
          return <article className="award-card" key={item.id}>
            <span className="award-icon" aria-hidden="true"><Award size={21}/></span>
            <div className="award-text"><div className="award-top"><h3>{item.title}</h3><time>{item.year}</time></div><p>{item.organizer}</p>{item.description && <p className="award-description">{item.description}</p>}{proof && <a href={proof} target="_blank" rel="noopener noreferrer">View proof ↗</a>}{item.sample && <span className="sample-note">SAMPLE ENTRY</span>}</div>
          </article>;
        })}
      </div> : <p className="section-empty">Recognition and achievements will appear here once verified. <span>Configured in <code>src/data/awards.ts</code>.</span></p>}
    </section>
  );
}
