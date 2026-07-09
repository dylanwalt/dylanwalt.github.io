/**
 * Editor's Advice - practical marketing notes for lodge preview viewers.
 */
import { resolvePath } from './utils.js';

const ADVICE = [
  {
    title: 'Lead with one hero aerial',
    body: 'Safari lodges convert best when the first 3 seconds show scale - waterhole, deck, or villa reveal. Pick a single Drone clip as your homepage hero rather than a montage.',
    tag: 'Website',
  },
  {
    title: 'Match clip to booking intent',
    body: 'Bush Picnic footage suits couples and celebration packages. Estate-wide orbits suit corporate groups and venue hire. Wine clips should feel intimate, not crowded.',
    tag: 'Sales',
  },
  {
    title: 'Keep events in separate chapters',
    body: 'Do not mix picnic and wine tasting in one social post. Your guests chose an experience - show the experience they booked, then cross-sell in a second touchpoint.',
    tag: 'Social',
  },
  {
    title: 'Blur or crop guest faces in BTS',
    body: 'Top-down dining clips are powerful for marketing but need privacy care. Use tight crops on the table setting, or blur faces before posting publicly.',
    tag: 'Compliance',
  },
  {
    title: 'Pair aerial with one ground still',
    body: 'Drone footage builds desire; a single ground-level detail shot (wine pour, fire pit, linen) builds trust. Alternate them in carousel posts.',
    tag: 'Content mix',
  },
  {
    title: 'Low-res preview, full-res delivery',
    body: 'This portal uses compressed previews for fast review. Final graded 4K masters are delivered separately for broadcast, ads, and print.',
    tag: 'Delivery',
  },
];

export async function initEditorAdvice(lodge, basePath) {
  const root = document.getElementById('editor-advice-root');
  if (!root) return;

  let droneMeta = null;
  try {
    const url = resolvePath(
      basePath,
      'assets/media/safari-plains/drone-gallery/drone-gallery-index.json',
    );
    const res = await fetch(url);
    if (res.ok) droneMeta = await res.json();
  } catch {
    /* optional */
  }

  const heroClips =
    droneMeta?.clips?.filter((c) => c.tier === 'hero').map((c) => c.label).join(', ') ||
    'Drone 01-14';

  const shell = document.createElement('section');
  shell.className = 'editor-advice';
  shell.innerHTML = `
    <header class="editor-advice-head">
      <p class="editor-advice-eyebrow">Editor's advice</p>
      <h2>How to use this footage</h2>
      <p class="editor-advice-lead">Notes from the Elevated Walt Media edit - written for lodge marketing teams reviewing aerial deliverables.</p>
    </header>
    <div class="editor-advice-highlight">
      <strong>Hero picks from this shoot:</strong> ${heroClips}. Mark your favourites by drone number and we will grade those first.
    </div>
    <div class="editor-advice-grid"></div>
    <details class="editor-advice-analytics">
      <summary>Portal review checklist</summary>
      <ul>
        <li>Watch each event tab start to finish - does the story match how you sell the experience?</li>
        <li>Note drone numbers to move between Bush Picnic, Wine Event 1, and Wine Event 2.</li>
        <li>Flag any clip where guest privacy needs a crop before public use.</li>
        <li>Share top 3 picks with your GM for website, Instagram, and paid ads separately.</li>
      </ul>
    </details>`;

  const grid = shell.querySelector('.editor-advice-grid');
  ADVICE.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'editor-advice-card';
    card.innerHTML = `
      <span class="editor-advice-tag">${item.tag}</span>
      <h3>${item.title}</h3>
      <p>${item.body}</p>`;
    grid.appendChild(card);
  });

  root.replaceChildren(shell);
}
