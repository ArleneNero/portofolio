import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { MediaAsset } from '../../types/project';
import { clampIndex, formatCount } from '../../utils/projects';
import { SmartImage } from '../ui/SmartImage';

export function ProjectGallery({ media, index, onIndex }: { media: MediaAsset[]; index: number; onIndex: (index: number) => void }) {
  const total = media.length;
  const active = clampIndex(index, total);
  const item = media[active];
  const step = (direction: number) => onIndex(clampIndex(active + direction, total));

  return (
    <div className="gallery" role="region" aria-label="Project visual preview" tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); }
        if (event.key === 'ArrowRight') { event.preventDefault(); step(1); }
      }}>
      <div className="gallery-media" aria-live="polite" aria-atomic="true">
        <div className="gallery-media-inner" key={item?.src || 'placeholder'}>
          <SmartImage src={item?.src} alt={item?.alt || 'No project visual available'} className="gallery-image" eager />
        </div>
      </div>
      <div className="gallery-bottom">
        <p className="gallery-caption">{item?.caption || 'Project visual'}</p>
        <div className="gallery-pager" aria-label="Gallery navigation">
          <button type="button" onClick={() => step(-1)} aria-label="Previous visual" disabled={active <= 0}><ChevronLeft size={19}/></button>
          <span className="gallery-count" aria-live="off">{formatCount(total ? active + 1 : 0)} / {formatCount(total)}</span>
          <button type="button" onClick={() => step(1)} aria-label="Next visual" disabled={total <= 1 || active >= total - 1}><ChevronRight size={19}/></button>
        </div>
      </div>
      {total > 1 && <div className="gallery-thumbnails" role="group" aria-label="Choose visual">
        {media.map((visual, position) => (
          <button key={visual.src} type="button" className={position === active ? 'gallery-thumb is-active' : 'gallery-thumb'}
            onClick={() => onIndex(position)} aria-label={`Show visual ${position + 1} of ${total}`}
            aria-pressed={position === active}>
            <SmartImage src={visual.src} alt="" className="gallery-thumb-image"/>
          </button>
        ))}
      </div>}
    </div>
  );
}
