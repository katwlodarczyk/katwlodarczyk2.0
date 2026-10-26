---
title: "The maths was right, the model was wrong"
date: 2026-10-26
excerpt: "A month of fixes to Saldo, my own budgeting app, and every single one came down to the same thing: the app had the wrong idea about where my money actually lives."
category: "Projects"
tags: ["vue3", "supabase", "pwa", "personal_finance", "side_projects"]
image: "/blog/images/saldo-budget-boundary.png"
---

A couple of months ago I wrote about [Saldo, the budget app I built to replace my spreadsheet](/blog/saldo-budget-pwa). One number on the home screen, one formula behind it: income − fixed expenses − savings goal = safe to spend.

That formula hasn't changed since. What changed this month is the thing underneath it: the model of where my money actually lives. Every awkward bug I've hit since September turned out to be the same bug wearing a different coat, and not one of them was arithmetic.

## The number fell off a cliff

I added what looked like a tiny feature: a toggle in settings for which accounts count toward safe to spend. Obviously sensible. Money sitting in a savings account isn't grocery money, and neither is the balance of my company account.

So I ticked the company account off, opened the app, and safe to spend had collapsed to almost nothing.

The reason is boring and completely my own fault. I don't get paid into a personal account. My salary lands in the company account, and then I move it across to the two personal accounts I actually spend from. Excluding the company account excluded my income along with it.

The tempting fix is to count income wherever it lands and move on. That's wrong in the other direction: it would mean money I haven't moved yet, money that genuinely isn't available to spend this week, shows up as spendable.

The fix that's actually right meant changing what "the budget" even means. The budget isn't a list of transactions. It's a **set of accounts**. Money becomes spendable the moment it crosses into that set, not when it's earned.

```ts
export function transferredIntoBudget(transfers: TransferRow[], excluded: Set<string>): number {
  if (excluded.size === 0) return 0
  return transfers
    .filter((t) => excluded.has(t.from_account_id) && !excluded.has(t.to_account_id))
    .reduce((s, t) => s + t.amount_minor, 0)
}
```

Only inbound crossings count. Money going the other way, out to a savings account, is already held back by the savings reserve, so counting it here as well would subtract it twice. That asymmetry looks arbitrary right up until you've made the mistake once.

![The home screen, with the budget boundary visible: the income line shows how much of it crossed in, and each account says whether it counts](/blog/images/saldo-home-budget-boundary.png)

Everything in these screenshots is an example, by the way: the numbers, the expenses, the account and bank names, all of it. I'm happy to show you the app, slightly less happy to show you my actual bank balance.

Showing the boundary in the interface mattered more than I expected. A little green `budget` tag next to the accounts that feed safe to spend turns an invisible rule into something you can check at a glance, and it's the thing that would have saved me the original confusion.

## Two questions wearing one flag

The boundary held for about a week, and then I spotted the next crack: some of my excluded accounts are personal savings, and one of them is a business account. Those aren't the same kind of thing at all, and I'd been using a single flag to mean both.

"Is this money spendable day to day?" and "whose money is this?" are independent questions, so now they have independent answers. The summary screen gained **Personal** and **Business** tabs, and net worth splits the same way. Averaging a business and a household together averages nothing.

The interesting case is the transfer I'd already taught the app about. A move from the company account to a personal one is income when you're standing on the personal side, and a drawing when you're standing on the business side. One row in the database, two meanings, and which one you get depends entirely on where you're looking from.

![The summary screen on the Business tab, with the Drawings tile and where the income went](/blog/images/saldo-summary-business.png)

That screenshot contains the smallest and most recent fix of the lot. The tile said zł 9,000 of drawings, and the donut below it didn't mention them at all, because it only ever split income into spending, savings and "the rest". So a drawing quietly inflated the rest, and the chart insisted the money was still sitting in the business when it had been in my current account for three weeks. It gets its own slice now.

## A detour: I kept forgetting to log

Running alongside all of this was a much less elegant problem. The app only works if you tell it what you spent, and I kept not telling it.

My first instinct was more notifications. I built the logging nudge into a daily reminder and then, which is the useful part, checked whether it was working. The app records its own cron runs, so I could go and count. The reminder had fired on nine of the last ten days. I'd ignored all nine.

That settled it. More notifications weren't the answer, so the effort went elsewhere: Apple Pay transactions now log themselves through an iOS Shortcut automation and land in a review queue, each Apple Pay card maps to the account it actually draws on, and there's a weekly review screen that walks through balances, pending items and anything missing a category in about five minutes. Catching a payment at the moment of the card tap beats asking me to remember it at nine in the evening.

## The widget that disagreed

Then the home screen widget started showing a different number from the app.

iOS won't let a PWA have a widget, so Saldo's lives in Scriptable and talks to a read-only endpoint. That endpoint worked out safe to spend itself, which means it had its own copy of the rules, which means it got neither of the two model changes above. It wasn't stale. It was confidently wrong.

Counting properly, six places knew what safe to spend meant: the dashboard, the widget endpoint, the summary endpoint, the weekly digest, the evening reminder and the tests. So I spent a day collapsing them into one pure module with no Deno and no browser imports, which the edge functions, the Vue app and Vitest can all import unchanged.

The bit worth repeating: sharing only the arithmetic would not have caught this bug. The sum was never wrong. What was wrong was **which rows counted**, so the rules about which rows count had to move into the same module as the sum. Test cases went from 14 to 36 along the way, and most of the new ones are about boundaries rather than totals.

## Making the record match the money

The last stretch was less conceptual. If transfers are now load bearing, they can't be invisible, and they were: the history screen showed transactions only. The moves that explain where the money went were the one thing you couldn't see.

So transfers appear in the list, they open for editing, and there are two new ways to filter: a **Transfers** chip for transfers themselves, and a row of account chips.

![History filtered to transfers, and filtered to one account](/blog/images/saldo-history-filters.png)

A transfer matches an account filter if **either** end matches, because filtering to an account means wanting to see money arriving as well as leaving. And one small honesty detail I'm glad I added: transactions recorded before accounts existed have no account to match, so they drop out of an account filter. Rather than quietly showing a smaller total, the filter bar says **no account: 3**. A total that has silently lost rows is worse than no total at all.

## What it adds up to

About a month of evenings, and the pattern was identical every time. The formula on the home screen was never wrong. What was wrong was the app's picture of where money lives and how it moves, and every visible bug was that picture failing to match a bank account somewhere.

I think that's the real difference between a budgeting app you build for yourself and one you download. A general app has to model everybody's money, so it models a simplified everybody. Mine only has to model mine, including the inconvenient bit where my salary takes a detour through a company account before it becomes real.

Next on the list: a proper domain, a PIN lock so an unlocked phone doesn't mean an open ledger, and eventually a shared household budget, which I suspect will break the model all over again.
