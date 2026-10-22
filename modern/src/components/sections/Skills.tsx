import { skills } from '../../data/skills';
import { SectionHeading } from '../ui/SectionHeading';

export function Skills() {
  return (
    <section id="skills" className="section-anchor skills-section" aria-labelledby="skills-heading">
      <div className="content-container">
        <div id="skills-heading"><SectionHeading eyebrow="MY TOOLKIT" title="Skills" description="Exploring intelligence through data, language, and code."/></div>
        <div className="skill-groups">
          {skills.map(group => (
            <div className="skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <div className="skill-list">{group.items.map(item => <span className="skill-chip" key={item}>{item}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
