---
title: "Making my site friendly for AI agents"
date: 2026-10-20
excerpt: "More and more people find things through AI tools now, so I spent an afternoon making my portfolio easier for them to read. Here's what I added and why."
category: "Projects"
tags: ["astro", "ai", "llms_txt", "seo", "portfolio"]
image: "/blog/images/making-my-site-ai-friendly.png"
---

Here's something I've noticed lately: when I want to find out about a person or a tool, I don't always open Google anymore. I ask an AI assistant. And if I do that, other people do too. So what happens when someone asks one of them about me?

I had a look at my own site with that in mind and, honestly, it wasn't great. It worked fine for humans, but for an agent it was a bit of a guessing game. No sitemap, no RSS, no structured data. Even worse, half my content was invisible until you scrolled to it (more on that in a second).

So I spent an afternoon fixing it. Nothing fancy, and most of it is useful for regular SEO too!

## What I added

### llms.txt

This one is my favourite. [llms.txt](https://llmstxt.org/) is a simple idea: a plain Markdown file at the root of your site that tells an AI who you are and where the important stuff lives. Think of it as a README for your website.

Mine has a short bio, my current role, education, awards, skills, projects and a list of every blog post with a one line summary. The best part? It's generated from the same data file that builds my portfolio, so I never have to remember to update it. There's also an `llms-full.txt` with the full text of every post, for when an agent wants the whole lot in one go.

[Have a look at mine →](/llms.txt)

### Every post as Markdown

Add `.md` to the end of any post URL and you'll get the plain Markdown version. No navigation, no styles, no scripts. Just the words. HTML is fine for agents, but this is cleaner, cheaper for them to read and much harder to get wrong.

### A JSON index of the blog

`/blog/index.json` lists every post with its title, date, category, tags and excerpt. Before this, an agent had to click through the pagination to find anything. Now it gets everything in one request.

### Structured data

I added JSON-LD to the pages, which is a little block of data describing what's on them. The homepage says "this is a Person, here's her job, her skills, her GitHub and LinkedIn". Each post says "this is a blog post, written by Kat, published on this date". Search engines have used this for years and AI tools read it too.

### The boring (but important) bits

- **robots.txt and a sitemap**, so crawlers know what's there
- **An RSS feed**, because RSS never really went away 😉
- **Canonical URLs and Open Graph tags**, which also means my links finally look nice when I share them

## The bug I didn't know I had

This is the bit that surprised me. I love a good scroll animation, so a lot of sections on my homepage fade in as you scroll down. To do that, they start with `opacity: 0` in the CSS and JavaScript reveals them later.

Sounds harmless, right? Except anything that doesn't scroll like a human, or doesn't run JavaScript at all, saw... nothing. Some AI agents look at pages through screenshots, and they were getting big empty gaps where my experience and projects should be.

The fix was pretty simple. A tiny script in the `<head>` adds a `js` class to the page, and the CSS only hides things when that class is there. I also turned the animation off for anyone with reduced motion switched on, which I should have done from the start, to be honest. Lesson learnt!

## Was it worth it?

Absolutely. It took one afternoon, most of it was small changes to files I already had, and now my site makes sense to people, search engines and AI tools alike.

If you've got a portfolio or blog, I'd really recommend at least adding an `llms.txt` and checking your site with JavaScript turned off. You might be surprised what's hiding in there!

Have you done anything like this on your own site? I'd love to know 🙌
