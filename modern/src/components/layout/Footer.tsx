import { profile } from '../../data/profile';
import { site } from '../../data/site';
import { safeExternalUrl } from '../../utils/links';

export function Footer() {
  const links = profile.socials.map(item => ({ ...item, url: safeExternalUrl(item.url) })).filter((item): item is { label: string; url: string } => Boolean(item.url));
  return (
    <footer className="site-footer content-container">
      <span>© {site.copyrightYear} · {profile.name}</span>
      <nav aria-label="Social links">{links.map(item => <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer">{item.label} ↗</a>)}</nav>
    </footer>
  );
}
