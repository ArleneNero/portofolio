import { describe, expect, it } from 'vitest';
import { getPublishedProjects, getProjectBySlug, getProjectMedia, clampIndex, formatCount } from '../src/utils/projects';
import { assetUrl } from '../src/utils/media';
import { safeExternalUrl } from '../src/utils/links';
import { projects } from '../src/data/projects';

describe('project data', () => {
  it('filters drafts and sorts published entries without mutating input', () => {
    const [first, second, third] = projects;
    const input = [{ ...first!, order: 3 }, { ...second!, order: 1 }, { ...third!, status: 'draft' as const }];
    expect(getPublishedProjects(input).map(p => p.slug)).toEqual([second!.slug, first!.slug]);
    expect(input[0]!.order).toBe(3);
    expect(getProjectBySlug(input, third!.slug)).toBeUndefined();
  });
  it('adding a published project needs only a data object', () => {
    const extended = [...projects, { ...projects[0]!, id: 'new', slug: 'new-project', title: 'New', order: projects.length + 1 }];
    expect(getPublishedProjects(extended)).toHaveLength(getPublishedProjects(projects).length + 1);
    expect(getProjectBySlug(extended, 'new-project')?.title).toBe('New');
  });
  it('deduplicates cover/gallery and clamps gallery index', () => {
    const media = getProjectMedia({ ...projects[0]!, gallery: [projects[0]!.cover] });
    expect(media).toHaveLength(1);
    expect(clampIndex(99, 1)).toBe(0);
    expect(clampIndex(-5, 3)).toBe(0);
    expect(clampIndex(1, 3)).toBe(1);
    expect(formatCount(4)).toBe('04');
  });
});
describe('CV internship project additions', () => {
  it('has all three verified project records with unique IDs and ordering', () => {
    const slugs = ['hybrid-evidence-engine', 'foresight-mrt', 'xiaomimi-rag'];
    for (const slug of slugs) {
      const item = getProjectBySlug(projects, slug);
      expect(item).toBeDefined();
      expect(item?.links?.github).toMatch(/^https:\/\/github.com\/ArleneNero\//);
      expect(item?.cover.src).toMatch(/^projects\/[a-z-]+\/screenshot\.webp$/);
    }
    expect(new Set(projects.map(p => p.id)).size).toBe(projects.length);
    expect(getPublishedProjects(projects).map(p => p.slug)).toEqual([
      'xiaomimi-rag',
      'hybrid-evidence-engine',
      'coordinated-buzzer-detection',
      'foresight-mrt',
      'nusantara-museum',
      'flood-disaster-extraction',
      'sentiment-analysis',
      'retail-crisis-recovery',
    ]);
    expect(getProjectBySlug(projects, 'hydro-chain-ai-protocol')).toBeUndefined();
    expect(getProjectBySlug(projects, 'warkop-umkm-digitalization')).toBeUndefined();
    expect(new Set(projects.map(p => p.order)).size).toBe(projects.length);
  });
});
describe('safe paths and links', () => {
  it('supports both GitHub Pages and root base paths', () => {
    expect(assetUrl('/projects/a/cover.jpg', '/portofolio-web/')).toBe('/portofolio-web/projects/a/cover.jpg');
    expect(assetUrl('profile/cv.pdf', '/')).toBe('/profile/cv.pdf');
  });
  it('omits fake or unsafe external links', () => {
    expect(safeExternalUrl('javascript:alert(1)')).toBeUndefined();
    expect(safeExternalUrl('#')).toBeUndefined();
    expect(safeExternalUrl('https://github.com/ArleneNero')).toBe('https://github.com/ArleneNero');
  });
});
