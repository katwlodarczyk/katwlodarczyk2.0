import { getCollection, type CollectionEntry } from "astro:content";
import { siteUrl } from "./data";

export type Post = CollectionEntry<"blog">;

export async function getSortedPosts(): Promise<Post[]> {
  const posts = await getCollection("blog");
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const postUrl = (post: Post) => `${siteUrl}/blog/${post.slug}`;

export const isoDate = (date: Date) => date.toISOString().split("T")[0];

// Turn root-relative links and images into absolute URLs so the Markdown works outside the site.
const absolutise = (markdown: string) =>
  markdown.replace(/(\]\(|src=")\/(?!\/)/g, `$1${siteUrl}/`);

export function postToMarkdown(post: Post): string {
  const { title, date, excerpt, category, tags = [] } = post.data;
  const meta = [
    `- URL: ${postUrl(post)}`,
    `- Published: ${isoDate(date)}`,
    `- Category: ${category}`,
    tags.length ? `- Tags: ${tags.join(", ")}` : null,
  ].filter(Boolean);

  return `# ${title}\n\n> ${excerpt}\n\n${meta.join("\n")}\n\n${absolutise(post.body ?? "").trim()}\n`;
}
