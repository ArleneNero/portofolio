import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';
import { profile } from '../../data/profile';
import { assetUrl } from '../../utils/media';

export function Hero() {
  return (
    <section id="home" className="hero section-anchor" aria-labelledby="hero-name">
      <div className="hero-ambient" aria-hidden="true" />
      <div className="hero-content">
        <span className="availability"><i aria-hidden="true" />{profile.availability}</span>
        <p className="hero-kicker">{profile.intro}</p>
        <h1 id="hero-name">{profile.name}</h1>
        <div className="hero-underline" aria-hidden="true" />
        <p className="hero-headline">{profile.headline}</p>
        <div className="hero-actions">
          <a className="button button-dark" href="#projects">View My Work <ArrowUpRight aria-hidden="true" size={15}/></a>
          <a className="button button-light" href={assetUrl(profile.cv)} download="Muhammad_Ariefsyah_CV.pdf">
            Download CV <Download aria-hidden="true" size={16}/>
          </a>
        </div>
        <p className="hero-specialties">MACHINE LEARNING <span>·</span> NLP <span>·</span> GENERATIVE AI</p>
        <a className="scroll-cue" href="#about" aria-label="Scroll to About Me"><ArrowDown size={17} strokeWidth={1.3}/><span>SCROLL TO EXPLORE</span></a>
      </div>
    </section>
  );
}
