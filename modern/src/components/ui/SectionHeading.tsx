import type { ReactNode } from 'react';

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  aside?: ReactNode;
};

export function SectionHeading({ eyebrow, title, description, aside }: Props) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {aside && <div className="section-aside">{aside}</div>}
    </div>
  );
}
