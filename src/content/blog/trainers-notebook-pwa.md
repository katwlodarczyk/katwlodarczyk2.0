---
title: "Trainer's Notebook: a gym diary that works without signal"
date: 2026-09-30
excerpt: "Personal trainers still log sessions on paper or in random phone notes. I built Trainer's Notebook, an offline-first PWA for clients, sessions and personal bests."
category: "Projects"
tags: ["react", "pwa", "offline_first", "supabase", "dexie"]
image: "/blog/images/trainers-notebook-pwa.png"
---

If you've ever trained with a PT, you've probably seen it: a battered paper notebook, or a phone full of notes like "Anna squat 70x6 felt easy??". Somehow it all lives in the trainer's head, and good luck finding what someone lifted three weeks ago.

I thought that could be a lot nicer. So I built **Trainer's Notebook** (Zeszyt Trenera in Polish, which is the language it speaks first).

## What it does

It's a mobile-first PWA made for using between sets, with sweaty hands and zero patience:

- **A client list** you can filter by how often people train (1, 2 or 3 times a week) and where (gym or studio)
- **Session logging** with sets, reps, weight, RIR and supersets. Hit "Repeat" and the last session becomes a template, with the previous numbers shown as hints
- **Personal bests and charts** worked out automatically from what you've logged
- **Notes** for goals, injuries and equipment settings
- **A PIN lock**, because client notes can include health information and the phone often sits on a bench

It's in Polish, English and German, and the design is dark, chunky and high contrast so you can read it from a step away.

## The tricky part: gyms have terrible signal

This was the fun bit to build. Gyms are often in basements, and an app that spins forever while you're trying to log a set is useless. So the app is **offline first**.

Here's how it works:

1. The UI only ever reads from a local database in the browser (I used [Dexie](https://dexie.org/), a lovely wrapper around IndexedDB)
2. Every change is saved locally first and added to a queue
3. When the phone is back online and signed in, the queue sends everything to Supabase in order

A few details made a big difference. Every row gets its ID on the phone, so sending the same change twice is harmless. The queue stops at the first failure, so a session can never arrive before the client it belongs to. And a session in progress is saved as a draft, so locking the phone mid-workout doesn't lose anything.

You don't even need an account. "This phone only" mode keeps everything on the device, and if you sign up later, your data comes with you.

## The stack

- React 19 + TypeScript + Vite
- Tailwind CSS 4
- Dexie for the offline database
- Supabase for auth and backup, with row level security so each trainer only sees their own clients
- react-i18next for the three languages
- Cloudflare Pages for hosting

## What I learnt

**Offline first is a mindset, not a feature.** Once I decided the local database is the source of truth, a lot of decisions made themselves. Loading spinners mostly disappeared.

**Think about the data you're holding.** Notes about other people's injuries are sensitive. That's why there's a PIN, why row level security is non-negotiable, and why the app works without an account at all.

**Small screens need big buttons.** I tested everything with one thumb, standing up. If I couldn't hit it between sets, it got bigger.

This was a quick build, but it's one of my favourites so far. You can try it at [zeszyt-trenera.katwlodarczyk.com](https://zeszyt-trenera.katwlodarczyk.com/welcome). If you're a PT (or you know one who still lives in a paper notebook), I'd love to hear what you think 💪
