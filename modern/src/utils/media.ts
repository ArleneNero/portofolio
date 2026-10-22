/** Respect Vite's base path for GitHub Pages and custom domains. */
export function assetUrl(source?: string, base = import.meta.env.BASE_URL): string {
  if (!source) return '';
  if (/^(https?:|data:|blob:)/.test(source)) return source;
  const prefix = (base || '/').replace(/\/*$/, '/');
  return prefix + source.replace(/^\/+/, '');
}
