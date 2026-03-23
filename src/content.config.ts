import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string().max(70),
			description: z.string().max(160),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			category: z.enum(['cooling', 'ergonomics', 'reviews']).optional(),
			featured: z.boolean().default(false), // para destacar artículos en home
			affiliate: z.boolean().default(true), // muestra disclaimer automáticamente
		}),
});

export const collections = { blog };
