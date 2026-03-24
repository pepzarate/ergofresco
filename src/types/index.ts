import type { CollectionEntry } from 'astro:content';

/** Blog post from Astro content collection */
export type Post = CollectionEntry<'blog'>;

/** Frontmatter data of a blog post */
export type PostData = CollectionEntry<'blog'>['data'];

/** Affiliate product card data */
export interface Product {
    name: string;
    description: string;
    price: string;           // e.g. '$249.99' — string to support ranges like '$200–$300'
    affiliateUrl: string;
    imageUrl?: string;
    rating?: number;         // 1–5
    pros?: string[];
    cons?: string[];
    badge?: string;          // e.g. 'Best Overall', 'Budget Pick'
}

/** Single affiliate link with tracking */
export interface AffiliateLink {
    url: string;
    label: string;
    merchant: 'amazon' | 'flexispot' | 'autonomous' | 'other';
    trackingId?: string;
}

/** Category of content */
export type Category = 'cooling' | 'ergonomics' | 'reviews';

/** Site metadata */
export interface SiteMeta {
    title: string;
    description: string;
    url: string;
}