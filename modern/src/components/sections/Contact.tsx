import { ArrowUpRight, Download, Github, Mail } from 'lucide-react';
import { profile } from '../../data/profile';
import { safeMailto } from '../../utils/links';
import { assetUrl } from '../../utils/media';

export function Contact() {
  const mail = safeMailto(profile.email);
  return (
    <section id="contact" className="section-anchor contact-section" aria-labelledby="contact-heading">
      <div className="contact-panel">
        <div>
          <p className="eyebrow">LET'S WORK TOGETHER</p>
          <h2 id="contact-heading">Interested in working together?</h2>
          <p>I'm open to discussing interesting projects, opportunities, or just having a chat about technology.</p>
        </div>
        <div className="contact-buttons">
          {mail ? <a href={mail} className="button button-dark"><Mail size={15}/> Get In Touch <ArrowUpRight size={15}/></a>
            : <a href="https://github.com/ArleneNero" target="_blank" rel="noopener noreferrer" className="button button-dark"><Github size={15}/> GitHub <ArrowUpRight size={15}/></a>}
          {profile.cv && <a href={assetUrl(profile.cv)} download className="button button-light"><Download size={15}/> View My CV</a>}
        </div>
      </div>
    </section>
  );
}
