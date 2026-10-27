// Little hidden surprises. Nothing here is needed for the site to work.

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function toast(message: string) {
  const el = document.createElement("div");
  el.className = "egg-toast";
  el.setAttribute("role", "status");
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

// Hello in the console, for anyone who opens DevTools.
console.log(
  `%c _  ____        __
| |/ /\\ \\      / /
| ' /  \\ \\ /\\ / /
| . \\   \\ V  V /
|_|\\_\\   \\_/\\_/`,
  "color:#7675B9;font-weight:bold;font-family:monospace",
);
console.log(
  "%cHey, curious dev! 👋\n%cSince you're poking around: this site is Astro + Tailwind + Alpine.js.\nThere are a few more surprises hidden on the page. Try being indecisive about dark mode,\nor go old school: ↑ ↑ ↓ ↓ ← → ← → B A 😉\nAI agent? Start at /llms.txt",
  "font-size:14px;font-weight:bold;color:#FF8FBB",
  "font-size:12px;color:inherit",
);

// Indecisive disco mode: flip the theme toggle 8 times within 3 seconds.
let toggles: number[] = [];
document.querySelectorAll<HTMLElement>("[data-theme-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const now = Date.now();
    toggles = [...toggles.filter((t) => now - t < 3000), now];
    if (toggles.length < 8) return;
    toggles = [];
    toast("Make up your mind! 😄");
    if (reducedMotion) return;
    document.documentElement.classList.add("disco");
    setTimeout(() => document.documentElement.classList.remove("disco"), 3000);
  });
});

// Konami code: ↑ ↑ ↓ ↓ ← → ← → B A rains running shoes and sparkles.
const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const confettiBits = ["👟", "💜", "✨", "🩷", "🏃‍♀️"];
let konamiPos = 0;
document.addEventListener("keydown", (event) => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  konamiPos = key === konami[konamiPos] ? konamiPos + 1 : key === konami[0] ? 1 : 0;
  if (konamiPos < konami.length) return;
  konamiPos = 0;
  toast("You found it! 🎉");
  if (reducedMotion) return;
  for (let i = 0; i < 40; i++) {
    const bit = document.createElement("span");
    bit.className = "egg-confetti";
    bit.setAttribute("aria-hidden", "true");
    bit.textContent = confettiBits[i % confettiBits.length];
    bit.style.left = `${Math.random() * 100}vw`;
    bit.style.animationDelay = `${Math.random() * 0.8}s`;
    bit.style.animationDuration = `${2 + Math.random() * 1.2}s`;
    document.body.appendChild(bit);
    setTimeout(() => bit.remove(), 4200);
  }
});

// Click a hand-drawn highlight to swap the marker colour.
const markers = ["#9998d4", "#7ee0c0", "#ffc861", "#FF8FBB"];
document.addEventListener("click", (event) => {
  const highlight = (event.target as HTMLElement).closest<HTMLElement>(".text-highlight");
  if (!highlight) return;
  const next = (Number(highlight.dataset.marker ?? -1) + 1) % markers.length;
  highlight.dataset.marker = String(next);
  highlight.style.setProperty("--marker", markers[next]);
});
