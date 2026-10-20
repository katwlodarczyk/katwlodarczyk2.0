---
title: "Just in Case: a free emergency binder for your family"
date: 2026-10-07
excerpt: "If something happened to you tomorrow, would your family know where everything is? I built Just in Case, a free and private emergency binder you fill in on screen and print."
category: "Projects"
tags: ["privacy", "pdf", "javascript", "python", "side_project"]
image: "/blog/images/just-in-case-emergency-binder.png"
---

This is not the cheeriest topic, I know. But bear with me.

If something happened to you tomorrow, would your family know where everything is? Your bank accounts, your insurance, who to call, where the important documents are, what you'd want? For most of us the honest answer is "erm... not really". It's all in our heads, scattered across emails, apps and that one drawer.

Having lived in both Poland and the UK, I know it gets even messier. Two sets of bank accounts, two systems, two sets of paperwork. So I built **Just in Case** (Na wszelki wypadek in Polish).

## What it is

Just in Case is a free emergency binder. You fill it in on screen, then download:

- **A printable PDF form**, around 25 pages with binder-style tabs. The first page tells your family what to do in the first 24 hours
- **A "who to notify" list**, built from what you entered: banks, policies, pensions, utilities, subscriptions
- **An A5 guide booklet** with tips for every section, a letter to whoever reads it, and checklists for a hospital stay and after a death
- **A wallet card** with who to call, where your documents are, allergies and medication

Everything prints on a normal home printer. You put it in a folder and file it away. Just in case.

## Made for your situation

The form changes depending on where you live. Pick Polish in Poland, Polish in the UK, British in the UK or Polish in Germany, and it shows the right offices, numbers and rules (PESEL and ZUS, NHS number and probate, Steuer-ID and Erbschein, and so on). Then you tick only what applies to you, like children, property, pets or a business, and everything else stays hidden.

And all of it works in Polish, English or German.

## Privacy was the whole point

This is the most personal information anyone has, so I was really strict about it:

- **No account and no server.** Everything runs in your browser and is saved only on your device
- **The browser physically can't send your data anywhere.** The site has a strict Content Security Policy that blocks every outgoing request
- **No cookies, analytics or third-party scripts.** Even the fonts are served from the site itself
- **It never asks for passwords.** Only where they are: an envelope, a safe, a password manager. If you type something that looks like a PIN, you get a warning
- **Encrypted backups.** You can save your progress to an AES-256 encrypted file and keep it wherever you like

My favourite bit? You don't have to trust me. Open the form, turn on airplane mode, fill it in and download the PDF. It still works, because nothing ever needed to be sent.

## How it's built

This one is a bit different from my usual Vue projects. All the content (every section, field, tip and checklist in three languages) lives in one big YAML file. A few Python scripts turn it into:

- the landing page
- the app itself, as **one single HTML file** with the content, fonts and PDF library all inlined, so you can even download it and use it fully offline
- a review page I use to check all the content

The PDFs are generated right in the browser with [pdf-lib](https://pdf-lib.js.org/), and the site is hosted on Cloudflare Pages.

## What I learnt

**Content is the hard part.** The code was the easy bit. Working out what a family actually needs in each country, and writing it clearly in three languages, took far longer.

**Privacy you can check beats privacy you promise.** Anyone can write "we don't track you" on a website. Making it technically impossible, and letting people check it themselves, feels so much better.

**Paper still wins sometimes.** I love building apps, but in an emergency nobody wants to guess a password or download something. A printed folder just works.

It's free, and it will stay free. You can find it at [justincase.katwlodarczyk.com](https://justincase.katwlodarczyk.com/). Even filling in the "Start here" page is a great first step. And if you do, let me know how it goes 💛
