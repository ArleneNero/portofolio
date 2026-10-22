/** Refuse javascript: / relative / placeholder URL values in external buttons. */
export function safeExternalUrl(input?: string): string | undefined {
  if (!input) return undefined;
  try {
    const url = new URL(input);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

export function safeMailto(email?: string): string | undefined {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return undefined;
  return `mailto:${email}`;
}
