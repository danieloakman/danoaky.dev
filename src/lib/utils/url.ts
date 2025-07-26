export const domain = (url: string): string => new URL(url).hostname.replace('www.', '');
