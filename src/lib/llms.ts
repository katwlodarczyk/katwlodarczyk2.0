import { personalInfo, siteUrl, workExperience, education, skills, projects, awards } from "./data";
import { getSortedPosts, isoDate, postUrl } from "./blog";

export async function buildLlmsTxt() {
  const posts = await getSortedPosts();
  const current = workExperience[0];

  return `# ${personalInfo.name}

> ${personalInfo.jobTitle} based in ${personalInfo.location}, currently at ${current.company}. ${personalInfo.bio}

## About

- Role: ${current.position} at ${current.company} (${current.period})
- Education: ${education.map((e) => `${e.degree}, ${e.institution}`).join("; ")}
- Awards: ${awards.map((a) => `${a.name} — ${a.issuer} (${a.date})`).join("; ")}
- Skills: ${Object.values(skills).flat().join(", ")}
- Contact: ${personalInfo.email}
- GitHub: ${personalInfo.github}
- LinkedIn: ${personalInfo.linkedin}

## Pages

- [Portfolio](${siteUrl}/): experience, skills, education, awards and projects
- [Blog](${siteUrl}/blog): all posts
- [Blog index (JSON)](${siteUrl}/blog/index.json): machine-readable list of posts
- [RSS feed](${siteUrl}/rss.xml)
- [Full text of all posts](${siteUrl}/llms-full.txt)

## Projects

${projects.map((p) => `- [${p.title}](${p.website ?? p.github}): ${p.description.join(". ")}`).join("\n")}

## Blog posts

Every post is also available as Markdown by appending \`.md\` to its URL.

${posts.map((post) => `- [${post.data.title}](${postUrl(post)}.md) (${isoDate(post.data.date)}): ${post.data.excerpt}`).join("\n")}
`;
}
