export const API_URL = "https://2amcreations.com";
export const SITE_SLUG = "xmyxyswkj";

export function buildUrl(path: string) {
  return `${API_URL}${path}`;
}

function normalizeImage(media: any): string | null {
  if (!media) return null;
  // Strapi v5 flattened media
  if (media.url) return buildUrl(media.url as string);
  // Strapi v4 nested media
  const url = media?.data?.attributes?.url as string | undefined;
  return url ? buildUrl(url) : null;
}

function normalizeField<T = unknown>(item: any, key: string): T | null {
  // Prefer flattened (v5), fallback to attributes (v4)
  return (item?.[key] ?? item?.attributes?.[key] ?? null) as T | null;
}

export type BlogPostListItem = {
  id: number;
  slug: string | null;
  title: string | null;
  createdAt: string | null;
  coverImageUrl: string | null;
  excerpt: string | null;
};

export async function fetchBlogPosts(): Promise<BlogPostListItem[]> {
  const query = `/api/blog-posts?populate=coverImage&filters[site][slug][$eq]=${SITE_SLUG}&sort=createdAt:desc`;
  const res = await fetch(buildUrl(query));
  if (!res.ok) throw new Error("Failed to fetch blog posts");
  const json = await res.json();
  const data = (json.data || []) as any[];
  return data.map((item) => ({
    id: item.id as number,
    slug: normalizeField<string>(item, "slug"),
    title: normalizeField<string>(item, "title"),
    createdAt: normalizeField<string>(item, "createdAt"),
    coverImageUrl: normalizeImage(normalizeField(item, "coverImage")),
    excerpt: normalizeField<string>(item, "excerpt"),
  }));
}

export type BlogPostDetail = {
  id: number;
  slug: string | null;
  title: string | null;
  createdAt: string | null;
  contentMarkdown: string;
  coverImageUrl: string | null;
};

export async function fetchBlogBySlug(slug: string): Promise<BlogPostDetail | null> {
  const query = `/api/blog-posts?populate=*&filters[slug][$eq]=${slug}&filters[site][slug][$eq]=${SITE_SLUG}`;
  const res = await fetch(buildUrl(query));
  if (!res.ok) throw new Error("Failed to fetch blog detail");
  const json = await res.json();
  const item = (json.data?.[0] ?? null) as any | null;
  if (!item) return null;
  const published = normalizeField<string>(item, "publishedAt");
  const created = normalizeField<string>(item, "createdAt");
  return {
    id: item.id as number,
    slug: normalizeField<string>(item, "slug"),
    title: normalizeField<string>(item, "title"),
    createdAt: (published || created) ?? null,
    contentMarkdown: normalizeField<string>(item, "contentMarkdown") || "",
    coverImageUrl: normalizeImage(normalizeField(item, "coverImage")),
  };
}