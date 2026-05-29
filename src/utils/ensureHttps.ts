/** Mockaroo gift images use http:// — upgrade so iOS ATS and Android cleartext allow loading. */
export const ensureHttps = (url: string): string =>
  url.replace(/^http:\/\//i, 'https://');
