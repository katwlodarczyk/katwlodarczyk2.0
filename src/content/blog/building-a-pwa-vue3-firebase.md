---
title: "Building a PWA with Vue 3 and Firebase: Lessons from Haircare Scan"
date: 2024-09-20
excerpt: "How I built a PWA ingredient scanner using Tesseract.js OCR, Vue 3 Composition API, and Firebase — what worked, what didn't, and what the BCS award meant to me."
category: "Case Study"
tags: ["vue3", "firebase", "pwa", "tesseract", "javascript"]
---

Haircare Scan started as a personal frustration. I have curly hair, and reading ingredient lists to check for silicones, sulfates, and proteins is genuinely tedious. Tiny text, unfamiliar chemical names, and the constant need to cross-reference a list — there had to be a better way.

The result was a Progressive Web App that lets you scan an ingredient list with your camera, uses OCR to extract the text, then analyses each ingredient against a database. It ended up winning the British Computer Society award for Digital Development, which I'm still a bit surprised about.

Here's how it was built.

## Choosing the Stack

**Vue 3** was an easy choice — I'd been working with it professionally and wanted to use the Composition API properly on a greenfield project. The `setup()` syntax and composables make logic reuse feel natural in a way that Options API never quite did for me.

**Firebase** gave me everything I needed without running a server: Firestore for the ingredient database, Firebase Hosting for deployment, and Firebase Authentication if I wanted to add user features later.

**Tesseract.js** is a WebAssembly port of the Tesseract OCR engine. Running OCR in the browser means no server-side processing, no image uploads, and instant feedback. The trade-off is accuracy on low-quality images, but for ingredient lists on the back of a product held under decent lighting, it works well.

**Tailwind CSS** for styling — I can't imagine going back to writing custom CSS for a project like this.

## The OCR Implementation

The core flow is:

1. User takes a photo via the camera input or uploads an image
2. Tesseract.js processes the image and returns raw text
3. The raw text is cleaned and split into individual ingredients
4. Each ingredient is looked up against the Firestore database

```javascript
import { createWorker } from 'tesseract.js';

async function scanIngredients(imageFile) {
  const worker = await createWorker('eng');
  const { data: { text } } = await worker.recognize(imageFile);
  await worker.terminate();
  return parseIngredients(text);
}

function parseIngredients(rawText) {
  return rawText
    .replace(/ingredients:/gi, '')
    .split(/,|\n/)
    .map(i => i.trim().toLowerCase())
    .filter(Boolean);
}
```

The parsing is imperfect — OCR produces noise, and ingredient lists use inconsistent formatting. I spent a lot of time on edge cases: parenthetical INCI names, line breaks mid-ingredient, and the occasional mis-recognised character.

## Firebase Firestore Data Model

The ingredient database is a flat collection in Firestore:

```
/ingredients/{ingredientId}
  name: string
  aliases: string[]
  category: "protein" | "silicone" | "sulfate" | "humectant" | "oil" | ...
  concerns: string[]
  curlFriendly: boolean
  description: string
```

The `aliases` array was critical — the same ingredient can appear under dozens of names. Sodium lauryl sulfate, SLS, sodium dodecyl sulfate — all the same thing. Querying by aliases required a composite index in Firestore and a `array-contains-any` query.

## Making it a PWA

A PWA needs three things: HTTPS, a web app manifest, and a service worker. Firebase Hosting provides HTTPS automatically. The manifest and service worker I configured manually.

The install prompt was the trickiest part. Browsers are opinionated about when to show it, and you have to listen for the `beforeinstallprompt` event to capture it:

```javascript
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallButton();
});

async function installApp() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
}
```

Offline support for a database-backed app is complex. I opted for a pragmatic approach: cache the app shell and static assets via the service worker, but require network access for ingredient lookups. Users see a clear "offline" message rather than stale or missing data.

## What I Learned

**OCR in the browser is impressive but imperfect.** Tesseract.js works well for clean, high-contrast text. Curved surfaces, poor lighting, or unusual fonts degrade accuracy significantly. A hybrid approach — client-side for speed, server-side for accuracy on failure — would be ideal.

**Firestore scales beautifully for read-heavy apps.** The ingredient database is read frequently and written infrequently. Firestore's caching and offline support (which I didn't fully leverage) are well-suited to this pattern.

**PWA install rates are lower than you'd expect.** The install prompt is easy to dismiss and most users don't think to "install" a website. That said, users who do install it engage far more deeply.

**Composables are worth the investment.** I extracted `useOCR`, `useScan`, and `useIngredientLookup` as composables early on. When I needed to refactor the OCR flow, I only touched one file.

The BCS award was a genuine surprise. I built Haircare Scan because I needed it, not because I thought it was award-worthy. If there's a takeaway there, it's that the most useful tools are often the ones you build to solve your own problems.
