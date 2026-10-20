import { getSortedPosts, isoDate, postUrl } from "../../lib/blog";

export async function GET() {
  const posts = await getSortedPosts();
  const index = posts.map((post) => ({
    title: post.data.title,
    url: postUrl(post),
    markdown: `${postUrl(post)}.md`,
    date: isoDate(post.data.date),
    category: post.data.category,
    tags: post.data.tags ?? [],
    excerpt: post.data.excerpt,
  }));
  return new Response(JSON.stringify(index, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
