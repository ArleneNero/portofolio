import type { MediaAsset, Project } from '../types/project';

export function getPublishedProjects(list: readonly Project[]): Project[] {
  return list
    .filter((project) => project.status === 'published')
    .slice()
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getProjectBySlug(list: readonly Project[], slug: string): Project | undefined {
  return getPublishedProjects(list).find((project) => project.slug === slug);
}

/** Cover first, then supplemental gallery. Remove exact duplicate src values. */
export function getProjectMedia(project: Project): MediaAsset[] {
  const media = [project.cover, ...project.gallery].filter((item) => Boolean(item?.src?.trim()));
  const seen = new Set<string>();
  return media.filter((item) => {
    if (seen.has(item.src)) return false;
    seen.add(item.src);
    return true;
  });
}

export function clampIndex(index: number, length: number): number {
  return Math.min(Math.max(Math.trunc(index), 0), Math.max(length - 1, 0));
}

export function formatCount(value: number): string {
  return String(value).padStart(2, '0');
}
