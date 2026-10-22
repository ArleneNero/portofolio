export type MediaAsset = { src: string; alt: string; caption?: string };
export type ProjectMetric = { value: string; label: string; context?: string };
export type Project = {
  id: string; slug: string; title: string; category: string; year: string;
  summary: string; description: string; problem: string; solution: string;
  stack: string[]; cover: MediaAsset; gallery: MediaAsset[];
  /** Verified results and project facts, never marketing estimates. */
  metrics?: ProjectMetric[];
  /** Concrete implementation contributions, described in plain language. */
  contributions?: string[];
  /** Context such as simulated data, prototype status or non-diagnostic models. */
  scopeNote?: string;
  links?: { demo?: string; github?: string; report?: string; video?: string; slides?: string };
  featured?: boolean; order: number; status: 'published' | 'draft'; isSample?: boolean;
};
