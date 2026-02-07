import { getCollection, type CollectionEntry } from 'astro:content';

const POST_ID_REGEX = /^(\d{4})-(\d{1,2})-(\d{1,2})-(.+)$/;

export function parseLegacyId(id: string) {
  const match = id.match(POST_ID_REGEX);
  if (!match) {
    throw new Error(`Invalid post id format: ${id}`);
  }

  const [, year, month, day, rawSlug] = match;
  const slug = rawSlug.replace(/\.md$/, '');
  return {
    year,
    month,
    day,
    slug,
    monthPadded: month.padStart(2, '0'),
    dayPadded: day.padStart(2, '0'),
  };
}

export function legacyPostPath(entry: CollectionEntry<'blog'>) {
  const { year, monthPadded, dayPadded, slug } = parseLegacyId(entry.id);
  return `/${year}/${monthPadded}/${dayPadded}/${slug}/`;
}

export async function getSortedPosts() {
  const posts: CollectionEntry<'blog'>[] = await getCollection('blog');
  return posts.sort((a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) => {
    const aParts = parseLegacyId(a.id);
    const bParts = parseLegacyId(b.id);
    const aDate = new Date(`${aParts.year}-${aParts.monthPadded}-${aParts.dayPadded}`).getTime();
    const bDate = new Date(`${bParts.year}-${bParts.monthPadded}-${bParts.dayPadded}`).getTime();
    return bDate - aDate;
  });
}
