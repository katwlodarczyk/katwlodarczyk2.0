---
title: "Saldo: the budget app I built to replace my spreadsheet"
date: 2026-08-27
excerpt: "For years my budget lived in a Google Sheet. It worked, until it didn't. So I built Saldo, a little PWA that answers one question: how much can I actually spend?"
category: "Projects"
tags: ["vue3", "supabase", "pwa", "tailwind", "personal_finance"]
image: "/blog/images/saldo-budget-pwa.png"
---

Confession time: I've been tracking my money in a Google Sheet for years. Tabs for every month, formulas I wrote once and was scared to touch, colour coding that made sense only to me. It did the job, but there was one problem. Every time I wanted to know if I could afford something, I had to open a laptop, find the right tab and do maths in my head.

What I really wanted was one number. **How much is safe to spend right now?**

So I built Saldo.

## The idea

Saldo is Polish for "balance", and the whole app is built around a very simple formula:

> income − fixed expenses − savings goal = safe to spend

That's it. Open the app and the first thing you see is that number, how much you've already spent this month and roughly how much that gives you per day until the end of the month. No charts to decode, no ten tabs. If I'm standing in a shop wondering whether I really need that thing, I can check in two seconds.

## What it can do

It started small, but (as always) it grew a bit:

- **Multiple bank accounts**, including credit cards, with live balances
- **Fixed expenses** that get added automatically every month, so I don't forget about rent or subscriptions
- **Savings goals** with deadlines, and the app tells me if I'm on track
- **IKE/IKZE limits**, which are Polish retirement accounts with yearly contribution limits (very niche, very useful for me 😅)
- **A budget month that starts on payday**, because my month doesn't start on the 1st and I don't think yours does either
- **Category budgets** with a little warning when I'm getting close
- **A weekly digest** push notification every Monday morning

My favourite feature is a bit nerdy. I set up an Apple Pay shortcut on my iPhone, so when I pay with my phone the transaction lands in Saldo on its own, ready for me to review. Logging expenses was always the part I gave up on, so this alone was worth building the app for.

## The stack

- Vue 3 + TypeScript + Vite
- Tailwind CSS 4
- Supabase for Google login and the database (with row level security, so nobody can see anyone else's data)
- vite-plugin-pwa, so it installs on my phone like a real app
- Cloudflare Pages for hosting

The whole thing costs me exactly 0 zł a month to run, which feels right for a budgeting app!

It's in Polish by default, but you can switch to English or German, and it supports PLN, EUR, GBP and USD.

## Things I learnt

**Store money as whole numbers.** Every amount in Saldo is stored in grosze (or pence, or cents), never as a decimal. Floating point maths and money do not mix, and I really didn't want to find out my balance was off by 0.0000001 zł.

**Build the thing you'll actually use.** I've started plenty of side projects that never got past the first weekend. This one is different because I open it every single day. Every annoying moment turns into a new idea for the roadmap.

**Design first, then code.** I mocked up the main screens before writing any Vue, in both light and dark mode. It made building so much faster, because I wasn't making design decisions halfway through a component.

## What's next

There's a roadmap (of course there is). Next up is a custom domain, an app lock with a PIN and Face ID, and the big one: a shared household budget, so two people can see the same numbers.

My old spreadsheet is still there, but I haven't opened it in weeks. I think that says it all 💚

Do you track your spending? App, spreadsheet or the good old "check the bank and hope for the best"? I'd love to know!
