import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { postToMarkdown, type Post } from "../../lib/blog";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({ params: { slug: post.slug }, props: { post } }));
}

export function GET({ props }: APIContext<{ post: Post }>) {
  return new Response(postToMarkdown(props.post), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
