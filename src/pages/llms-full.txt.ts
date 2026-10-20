import { buildLlmsTxt } from "../lib/llms";
import { getSortedPosts, postToMarkdown } from "../lib/blog";

export async function GET() {
  const posts = await getSortedPosts();
  const body = [await buildLlmsTxt(), ...posts.map(postToMarkdown)].join("\n---\n\n");
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
