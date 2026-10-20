import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { personalInfo } from "../lib/data";
import { getSortedPosts } from "../lib/blog";

export async function GET(context: APIContext) {
  const posts = await getSortedPosts();
  return rss({
    title: `${personalInfo.name} — Blog`,
    description: "Writing about web development, design, and the tools I use day-to-day.",
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      link: `/blog/${post.slug}/`,
      categories: [post.data.category, ...(post.data.tags ?? [])],
    })),
  });
}
