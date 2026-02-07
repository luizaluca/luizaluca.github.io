import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional().default(''),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    banner: z.string().optional(),
    banner_after_paragraph: z.number().optional(),
    published_date: z.string().optional(),
  }),
});

export const collections = { blog };
