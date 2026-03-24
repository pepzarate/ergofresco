/**
 * Formats a Date object into a human-readable string.
 * @example formatDate(new Date('2026-03-24')) → 'Mar 24, 2026'
 */
export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

/**
 * Converts a string into a URL-friendly slug.
 * @example toSlug('Best Desk Fans 2026') → 'best-desk-fans-2026'
 */
export function toSlug(str: string): string {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Truncates a string to a maximum length, appending an ellipsis if needed.
 * @example truncate('Hello world', 5) → 'Hello...'
 */
export function truncate(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength).trimEnd() + '...';
}

/**
 * Returns the absolute URL for a given path.
 * @example absoluteUrl('/blog/my-post') → 'https://ergofresco.com/blog/my-post'
 */
export function absoluteUrl(path: string, site = 'https://ergofresco.com'): string {
    return `${site}${path.startsWith('/') ? path : `/${path}`}`;
}