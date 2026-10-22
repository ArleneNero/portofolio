import { BriefcaseBusiness } from 'lucide-react';
import { experience } from '../../data/experience';
import { SectionHeading } from '../ui/SectionHeading';

export function Experience() {
  return (
    <section id="experience" className="section-anchor experience-panel" aria-labelledby="experience-heading">
      <div id="experience-heading"><SectionHeading eyebrow="MY JOURNEY" title="Experience"/></div>
      {experience.length > 0 ? (
        <ol className="experience-list">
          {experience.map(item => (
            <li className="experience-item" key={item.id}>
              <span className="experience-icon" aria-hidden="true"><BriefcaseBusiness size={19}/></span>
              <div className="experience-text"><div className="experience-top"><h3>{item.role}</h3><time>{item.period}</time></div><p className="experience-company">{item.organization}</p><p>{item.description}</p>{item.sample && <span className="sample-note">SAMPLE ENTRY</span>}</div>
            </li>
          ))}
        </ol>
      ) : <p className="section-empty">Experience entries can be added here when verified. <span>Configured in <code>src/data/experience.ts</code>.</span></p>}
    </section>
  );
}
