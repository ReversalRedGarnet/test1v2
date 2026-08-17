# CS214 Revise

An interactive revision site for **CS214 — Design & Analysis of Algorithms**, covering Weeks 1–3:
time complexity, Big O order, and the Java programming material.

Built from the Week 1–3 lecture notes, the Week 2 and Week 3 lab tutorials, and Sample Test I.

It assumes you are coming back to this cold. Every lesson page opens with a plain-English
summary and a short numbered ladder before the lecture wording starts, every technical word
is clickable for a one-line definition, and the lecture detail underneath is folded into
panels you open one at a time.

## Coming back to it after a while

- **Dotted words are clickable.** The first time a term appears on a page it gets a dotted
  underline; click or tap for a definition, an example, and a link to the page that teaches it.
  All of them are on the **Glossary** page, which is searchable and filterable by area.
- **Guided vs Full.** The button in the top bar toggles the reading mode. *Guided* (the default)
  folds each page's lecture content into collapsible panels, one per heading, with the number of
  activities shown on each. *Full* opens everything — better for a last-minute skim. The choice
  is remembered and survives Reset.
- **Start at "How to use this."** It now carries a suggested route through the material for
  someone starting from nothing.

## What's in it

**16 pages**, 51 activities, 60 quiz questions.

| Page | Covers |
|---|---|
| Data structures & types | Array, stack, queue, linked list, heap, hash table, priority queue; Java data types; Collections/Arrays |
| Inheritance & access | `extends`, `super`, `this`, the four access levels, overloading vs overriding, `Object` |
| Polymorphism & casting | Up/downcasting, static vs dynamic binding, shadowing, `instanceof`, conversion rules |
| Abstract & interfaces | Abstract classes, interfaces, `final`, `Comparable`, `Cloneable`, shallow vs deep clone |
| Object relationships | Association, aggregation, composition, generalization, UML, multiplicity, singleton |
| Efficiency: search & Fibonacci | Sequential vs binary search, recursive vs iterative Fibonacci |
| T(n), W(n), B(n), A(n) | Every-case, worst, best and average complexity; the probability derivations |
| Big O order | Formal definition, complexity categories, finding `c` and `N` |
| Insertion sort & DS choice | Worst/best/average cases, insert vs retrieve costs |
| Interactive labs | Six live tools (below) |
| Code exercises | 20 fill-in-the-blank exercises |
| Quiz | 10 random questions per set, filterable by topic |
| Sample Test I | All four questions, worked through |
| Cheat sheet | Every formula and rule on one page |
| Glossary | Every technical term on the site, one line each, searchable |

### The six labs

1. **Sequential vs binary search** — step both algorithms on the same array and watch the comparison counters diverge.
2. **How the orders grow** — plot O(1) through O(2ⁿ) on a linear or logarithmic axis.
3. **Count the basic operations** — pick a loop nest, guess the count, check it against the exact simulation and the closed form. Includes Sample Test I Q3.
4. **Find c and N** — slide `c` and `N` until `f(n) ≤ c·g(n)` holds, making the Big O definition visual.
5. **Insertion sort pass by pass** — try reverse-sorted for the worst case and sorted for the best case.
6. **Average case by experiment** — run 100,000 random searches and watch the mean settle onto `n(1 − p/2) + p/2`.

Your answers and progress are saved in the browser's local storage, so you can close the tab and
come back. The **Reset** button in the top bar clears everything.

## Deploying to GitHub Pages

There is no build step. Plain HTML, CSS and JavaScript.

1. Create a new repository on GitHub (public, or private on a plan that allows Pages).
2. Upload **everything in this folder, keeping the folder structure**:

```
index.html
.nojekyll
README.md
css/style.css
js/data.js
js/glossary.js
js/primer.js
js/practice.js
js/widgets.js
js/app.js
```

The scripts must stay in that order in `index.html`: `data.js` and `glossary.js` and `primer.js`
all define content that `app.js` reads at boot.

To upload through the web interface: on the repo page choose **Add file → Upload files**, then drag
the whole folder in. GitHub preserves the `css/` and `js/` subfolders. If drag-and-drop misses
`.nojekyll` (some browsers hide dotfiles), create it manually with **Add file → Create new file**,
name it `.nojekyll`, and leave it empty.

3. Go to **Settings → Pages**.
4. Under *Build and deployment*, set **Source** to `Deploy from a branch`, **Branch** to `main` and
   folder to `/ (root)`. Save.
5. Wait about a minute, then open `https://<your-username>.github.io/<repo-name>/`.

### Notes

- All paths are relative, so the site works from a subdirectory — no configuration needed for a
  project page.
- Routing uses the URL hash (`#/bigo`), so there are no 404s on refresh and no rewrite rules needed.
- `.nojekyll` tells Pages to serve the files as-is instead of running them through Jekyll.
- No webfonts, no CDN, no external requests of any kind — you can open `index.html` straight from
  your file system and everything works offline.

## Editing it

Content lives in four files and needs no tooling:

- `js/data.js` — every lesson page, as a list of blocks (`p`, `h`, `code`, `note`, `table`,
  `formula`, `mcq`, `fill`, `reveal`, `order`, `pairs`, `widget`).
- `js/primer.js` — the plain-English run-up shown above each page, plus any extra pages.
  Two block types live only here: `plain` (the blue summary box) and `steps` (the numbered
  ladder). Set `fold: true` on a page to have its `data.js` content folded in Guided mode.
- `js/glossary.js` — the tooltip and glossary terms.
- `js/practice.js` — the quiz bank and the exercise set.

To add a glossary term, append an object to `GLOSSARY`:

```js
{ w:'downcasting', alt:['downcast'], c:'java', see:'#/java-poly',
  d:'One-sentence definition. **bold** and `code` work.',
  ex:'Optional example line.' }
```

`c` is the category (`java`, `ds`, `analysis`). `alt` lists other spellings that should also
trigger the tooltip. Add `kw:true` for bare Java keywords like `this` or `final` — those only
get a tooltip when they appear inside backticks, so the ordinary English words are left alone.
Only the **first** mention of a term on a page is marked, capped at 30 per page.

To add a quiz question, append an object to `QUIZ_BANK`:

```js
{ topic:'Big O', q:'Your question?',
  opts:['A','B','C','D'], a:2, why:'Why C is right.' }
```

To add a fill-in-the-blank exercise, use `{{0}}`, `{{1}}` … as the blanks and give an array of
accepted answers for each:

```js
{ t:'fill', id:'unique-id', title:'…', lang:'java',
  prompt:'…',
  code:'class Dog {{0}} Animal { }',
  answers:[['extends']],
  hint:'…', sol:'…' }
```

Activity ids must be unique across the whole site — they are the keys used for progress tracking.

To add a primer to a page, key it by the section id from `data.js`:

```js
'bigo': { fold:true, blocks:[
  { t:'plain', title:'In plain English', x:'…' },
  { t:'steps', title:'Build it up', x:[ {h:'First rung', p:'…'}, {h:'Second rung', p:'…'} ] }
]}
```
