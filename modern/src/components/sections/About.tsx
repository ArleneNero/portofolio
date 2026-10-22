import { profile } from '../../data/profile';
import { SmartImage } from '../ui/SmartImage';

export function About() {
  return (
    <section id="about" className="section-anchor about-section" aria-labelledby="about-heading">
      <div className="content-container about-grid">
        <div className="about-copy">
          <p className="eyebrow">GET TO KNOW ME</p>
          <h2 id="about-heading" className="section-title">About Me</h2>
          <p className="about-bio">{profile.bio}</p>
          {profile.stats.length > 0 && (
            <dl className="about-stats">
              {profile.stats.map((item) => <div key={item.label}><dt>{item.value}</dt><dd>{item.label}</dd></div>)}
            </dl>
          )}
        </div>
        <div className="about-photo-frame">
          <SmartImage src={profile.photo} alt="Portrait of Muhammad Ariefsyah" className="about-photo" />
        </div>
      </div>
    </section>
  );
}
