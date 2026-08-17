/* ============================================================
   CS214 Revise — primers
   A short, plain-language run-up that is shown ABOVE the lecture
   content on each page, for when you are coming back to this cold.

   PRIMERS[sectionId] = {
     fold:   true  -> in Guided mode the lecture content underneath is
                      folded into collapsible panels, one per heading
     blocks: [ ... same block types as data.js, plus: ]
   }

   Two extra block types live here:
     { t:'plain',  title:'...', x:'...' }             a plain-English box
     { t:'steps',  title:'...', x:[{h:'',p:''}, ...]} a numbered ladder

   EXTRA_SECTIONS are appended to SECTIONS at boot.
   ============================================================ */

const PRIMERS = {

/* ============================================================ */
'start': { fold:false, blocks:[
  { t:'plain', title:'Read this bit first',
    x:'If you have not touched this material in a while, do **not** start by reading everything. Start at the top of the list below and work down. Each page now opens with a plain-English version of the idea before the lecture wording arrives, and every technical word is clickable for a one-line definition.' },

  { t:'steps', title:'How the site works now', x:[
    { h:'Dotted words are clickable',
      p:'Any term with a dotted underline opens a short definition when you click or tap it — try casting, instantiate, or basic operation, three of the words most likely to have gone fuzzy. All of them are also listed on the <a href="#/glossary">Glossary</a> page.' },
    { h:'Guided mode keeps pages short',
      p:'The button in the top bar switches between **Guided** and **Full**. In Guided mode the lecture material is folded into panels you open one at a time, so a page is a page and not a wall. In Full mode everything is open at once — better for a last-minute skim.' },
    { h:'The blue box is the summary',
      p:'Every lesson page starts with an "In plain English" box and a short ladder of steps. If you only read those, you still know what the page is about.' },
    { h:'Do the activity under each section',
      p:'The activities are the actual revision. Reading feels like progress; answering is progress. Your answers are saved in this browser.' }
  ]},

  { t:'steps', title:'A route through, if you are starting cold', x:[
    { h:'1 · Get the vocabulary back',
      p:'Skim the <a href="#/glossary">Glossary</a> for ten minutes. You do not need to memorise it — you need the words to stop being unfamiliar.' },
    { h:'2 · Java first, because the exam code is written in it',
      p:'Data structures & types \u2192 Inheritance \u2192 Polymorphism & casting \u2192 Abstract & interfaces \u2192 Object relationships. Guided mode, one panel at a time.' },
    { h:'3 · Then the counting',
      p:'Efficiency \u2192 T(n), W(n), B(n), A(n) \u2192 Big O \u2192 Insertion sort. This is roughly seven of the ten marks, so it gets the most time.' },
    { h:'4 · Then stop reading and start answering',
      p:'Labs \u2192 Code exercises \u2192 Quiz \u2192 Sample Test I. If a question catches you out, the explanation tells you which page to go back to.' },
    { h:'5 · Night before',
      p:'The Cheat sheet, and one more quiz set.' }
  ]}
]},

/* ============================================================ */
'ds-basics': { fold:true, blocks:[
  { t:'plain', title:'In plain English',
    x:'A data structure is just a decision about **how you keep your things**, and that decision fixes what is cheap and what is expensive later. Keeping books in a numbered shelf means you can grab number 40 instantly but inserting a new book at position 5 means shifting everything along. Keeping them in a chain where each book points at the next means inserting is trivial but finding number 40 means walking past thirty-nine books. There is no best structure — there is only the one that makes your most frequent operation cheap.' },

  { t:'steps', title:'Build it up', x:[
    { h:'Start with the array',
      p:'A fixed run of slots, all the same type, side by side. Because slot 40 is a fixed distance from slot 0, reaching it takes one step regardless of size. Inserting or deleting in the middle is the expensive one.' },
    { h:'Break the "side by side" rule and you get a linked list',
      p:'Each item now carries the location of the next. Insert and delete become cheap — rewire two pointers. But direct access is gone: to reach the 40th you walk 39 links.' },
    { h:'Restrict where you are allowed to add and remove',
      p:'Allow both only at one end and you have a **stack** (last in, first out). Allow adding at one end and removing at the other and you have a **queue** (first in, first out). The restriction is the point: it makes the structure simple and fast.' },
    { h:'Order by importance instead of arrival, and you need a heap',
      p:'A **priority queue** hands out the most important item next. Built on a **heap** — a tree kept in a shape where the extreme value is always sitting at the top.' },
    { h:'Skip searching entirely with a hash table',
      p:'Calculate the slot from the key itself. No walking, no comparing — near-instant lookup, at the cost of a plan for when two keys land on the same slot.' }
  ]},

  { t:'note', k:'exam', title:'What the exam does with this',
    x:'Question 1 of the sample test is a data structure choice worth 3 marks. It never asks "define a stack" — it describes a situation and asks which structure fits and **why**. So for each structure, hold on to one sentence: what it makes cheap, and what it makes expensive.' }
]},

/* ============================================================ */
'java-inherit': { fold:true, blocks:[
  { t:'plain', title:'In plain English',
    x:'Inheritance is copy-paste that stays connected. You write `Animal` once with a name and an eat() method, then say `class Dog extends Animal` — and Dog has all of it without you retyping a line. Fix a bug in Animal and every subclass is fixed too. Everything else on this page is detail hanging off that one idea: how the subclass reaches back up to the parent (`super`), who is allowed to see what (the access levels), and the difference between adding a second version of a method (**overloading**) and replacing the inherited one (**overriding**).' },

  { t:'steps', title:'Build it up', x:[
    { h:'A class is a plan; an object is a thing built from it',
      p:'`class Dog { }` is the plan. `new Dog()` builds one. That act is called **instantiating**, and the object produced is an **instance**.' },
    { h:'extends draws the line',
      p:'`class Dog extends Animal` means Dog is-a Animal. Dog gets Animal\u2019s fields and methods. Java allows only one parent per class.' },
    { h:'Constructors chain upwards',
      p:'Before a Dog can be built, the Animal inside it must be built. `super(...)` does that, and it has to be the very first statement in the constructor.' },
    { h:'Access levels decide who can see it',
      p:'Four settings, most open to most closed: `public`, `protected`, nothing at all (package-private), `private`. A subclass can see protected members; it cannot see private ones.' },
    { h:'Two methods can share a name in two different ways',
      p:'**Overloading** is same name, different parameters, in the same class — the compiler picks. **Overriding** is a subclass rewriting an inherited method with the identical signature — the running program picks, based on the real object.' }
  ]},

  { t:'note', k:'trap', title:'The one to get straight before you read on',
    x:'Overload = different parameter list, decided at **compile** time. Override = identical signature in a subclass, decided at **run** time. Almost every trick question on this topic is testing whether you can tell those apart.' }
]},

/* ============================================================ */
'java-poly': { fold:true, blocks:[
  { t:'plain', title:'In plain English',
    x:'You have a box labelled "Animal". You put a Dog in it. The label still says Animal — but the thing inside is still a Dog, and when you ask it to speak, it barks. That is the whole of polymorphism. **The label is what the compiler reads. The contents are what actually runs.** Casting is nothing more than changing the label: it never touches what is inside the box. Relabelling a Dog box as an Animal box is always fine, because a Dog really is an Animal. Relabelling an Animal box as a Dog box is a gamble, and if you are wrong the program finds out and crashes.' },

  { t:'steps', title:'Build it up', x:[
    { h:'Two types are in play at once',
      p:'`Animal ref = new Dog();` has a **variable type** (Animal, on the left) and an **object type** (Dog, on the right). Nearly every question here is asking which of the two governs the answer.' },
    { h:'The compiler checks the variable type',
      p:'It only lets you call methods that Animal declares. `ref.fetch()` will not compile even though the object is genuinely a Dog — the label does not mention fetching.' },
    { h:'The running program uses the object type',
      p:'When you call `ref.speak()` and Dog has overridden speak(), the Dog version runs. That decision-at-the-last-moment is called **dynamic** (or late) **binding**.' },
    { h:'Upcasting is safe, downcasting is a promise',
      p:'Dog \u2192 Animal is **upcasting**: always true, so Java does it silently. Animal \u2192 Dog is **downcasting**: you have to write `(Dog)` yourself, and the run time will check whether you were telling the truth.' },
    { h:'Check first with instanceof',
      p:'`if (a instanceof Dog) { Dog d = (Dog) a; }` turns a possible crash into a question you asked politely.' },
    { h:'Fields do not play this game',
      p:'Only methods are chosen by the object type. A field with the same name in both classes is **shadowed**, and the variable type decides which one you get. This is the trap most people fall into.' }
  ]},

  { t:'note', k:'exam', title:'If you remember one line from this page',
    x:'The compiler checks the **type of the variable**; the run time uses the **type of the object**. Methods override, fields shadow, and a cast changes only the label — never the object.' }
]},

/* ============================================================ */
'java-abstract': { fold:true, blocks:[
  { t:'plain', title:'In plain English',
    x:'Sometimes a class exists only so other classes can inherit from it. "Animal" is like that — real animals exist, but a plain animal does not. Mark it **abstract** and Java stops anyone instantiating it, while still letting it hold shared code. Push that idea all the way and you get an **interface**: no shared code at all, just a list of methods a class promises to provide. Abstract class = a partly-built parent. Interface = a promise with nothing behind it. A class can have one parent, but it can make as many promises as it likes.' },

  { t:'steps', title:'Build it up', x:[
    { h:'Abstract class: cannot be instantiated',
      p:'`abstract class Animal` can hold finished methods, fields and constructors — you simply cannot write `new Animal()`. It exists to be extended.' },
    { h:'Abstract method: a signature with no body',
      p:'`abstract void speak();` forces every concrete subclass to write its own. This is how a parent guarantees that all its children can do something without knowing how they do it.' },
    { h:'Interface: all promise, no code',
      p:'A list of method signatures and constants. `class Dog implements Comparable` obliges Dog to supply every method the interface names.' },
    { h:'One parent, many interfaces',
      p:'That is the practical reason interfaces exist. `extends` is limited to one; `implements` is not.' },
    { h:'final is the opposite instruction',
      p:'Where abstract says "you must finish this", final says "nobody may change this" — a constant variable, an unoverridable method, an unextendable class.' },
    { h:'Two interfaces you are expected to know by name',
      p:'**Comparable** gives your objects an ordering through `compareTo`, so sorting works. **Cloneable** permits copying with `clone()` — and raises the shallow-versus-deep question, because a plain clone copies references, leaving both copies pointing at the same inner objects.' }
  ]}
]},

/* ============================================================ */
'java-relations': { fold:true, blocks:[
  { t:'plain', title:'In plain English',
    x:'Classes are rarely alone. This page is about naming the ways they connect, and the names are almost entirely about **who dies when**. A house has rooms, and if the house is demolished the rooms go with it — the whole owns the part, which is **composition**. A department has lecturers, and closing the department does not delete the lecturers — the part outlives the whole, which is **aggregation**. If they just use each other without owning anything, it is a plain **association**. And is-a, the inheritance arrow, is **generalization**.' },

  { t:'steps', title:'Build it up', x:[
    { h:'Association — knows about',
      p:'A plain line. Two independent classes, one uses the other. A Student uses a Library.' },
    { h:'Aggregation — has-a, loosely',
      p:'Hollow diamond at the owner\u2019s end. The part exists on its own and can be shared. Break the whole and the part survives.' },
    { h:'Composition — has-a, strictly',
      p:'Filled diamond. The part belongs to exactly one whole and is destroyed with it.' },
    { h:'Generalization — is-a',
      p:'Hollow triangle pointing at the superclass. This is inheritance drawn as a picture.' },
    { h:'Multiplicity puts numbers on the line',
      p:'`1`, `0..1`, `1..*`, `*`. Read them as "how many of this end take part in the relationship".' },
    { h:'Singleton, the odd one out',
      p:'Not a relationship but a pattern: a class that permits only one instance ever, through a private constructor and a static accessor.' }
  ]},

  { t:'note', k:'', title:'A memory hook for the diamonds',
    x:'Hollow = hollow commitment = aggregation, the part can leave. Filled = filled-in, permanent = composition, the part cannot.' }
]},

/* ============================================================ */
'eff-search': { fold:true, blocks:[
  { t:'plain', title:'In plain English',
    x:'Two algorithms can produce identical answers and still be worlds apart. Looking for a name in an unsorted list means checking every entry — a million names, up to a million checks. Looking in a **sorted** list lets you open the middle, throw away half, and repeat: a million names in about twenty checks. Nothing changed about the answer; everything changed about the work. The same lesson repeats with Fibonacci, where the recursive version recalculates the same values thousands of times and the loop version calculates each one once.' },

  { t:'steps', title:'Build it up', x:[
    { h:'Sequential search: check them one at a time',
      p:'Works on any array, sorted or not. Best case you find it first try; worst case you check all n; the price of needing no order.' },
    { h:'Binary search: halve the problem repeatedly',
      p:'Requires a sorted array. Each comparison eliminates half of what is left, so the count grows like log\u2082 n — one extra comparison every time the array **doubles**.' },
    { h:'Feel the size of that difference',
      p:'n = 1,000,000. Sequential: up to 1,000,000 comparisons. Binary: 20. That gap is what the whole course is about.' },
    { h:'Recursive Fibonacci is elegant and terrible',
      p:'Each call spawns two more, and the same subproblems are computed again and again — the work grows exponentially.' },
    { h:'Iterative Fibonacci does the obvious thing',
      p:'One loop, keeping the last two values, n additions and done. Same answers, incomparably less work.' }
  ]},

  { t:'note', k:'exam', title:'Sample Test I asks this directly',
    x:'Question 2 is iterative versus recursive. The mark is not for saying "recursive is slower" — it is for saying **why**: repeated recomputation of identical subproblems, against a single pass that computes each value once.' }
]},

/* ============================================================ */
'complexity': { fold:true, blocks:[
  { t:'plain', title:'In plain English',
    x:'We refuse to measure algorithms in seconds, because seconds depend on your laptop, your language and your compiler — and none of those tell us anything about the algorithm. So instead we pick **one instruction** that dominates the work, count how many times it runs, and write that count as a formula in n. Sometimes the count is the same for every input of that size, and we call it T(n). Often it is not — a search can stop at the first item or grind to the last — and then we describe it three ways: the unluckiest input W(n), the luckiest B(n), and the typical one A(n).' },

  { t:'steps', title:'The method, every single time', x:[
    { h:'1 · Name the input size',
      p:'Usually n, the number of items. Everything is expressed in terms of it.' },
    { h:'2 · Pick the basic operation',
      p:'The instruction that happens most and drives the total. In a search or sort it is nearly always the **comparison** — not the swap, because the swap only happens conditionally.' },
    { h:'3 · Count how many times it runs',
      p:'One loop over n items \u2192 n. A loop inside a loop where the inner one shrinks \u2192 (n\u22121)+(n\u22122)+\u2026+1 = n(n\u22121)/2. Three nested full loops \u2192 n\u00b3.' },
    { h:'4 · Ask whether that count is the same for every input',
      p:'If yes, you have an every-case complexity and you write T(n). If no, T(n) does not exist and you must give W(n), B(n) and A(n) instead.' },
    { h:'5 · For A(n), state the probability assumption before computing',
      p:'Average case is a weighted average, so it is meaningless until you say what the weights are — "the key is equally likely to be in any slot", or "the key is present with probability p".' }
  ]},

  { t:'note', k:'', title:'The two relationships worth memorising',
    x:'B(n) \u2264 A(n) \u2264 W(n), always. And when T(n) exists, all four are equal: T(n) = B(n) = A(n) = W(n).' }
]},

/* ============================================================ */
'bigo': { fold:true, blocks:[
  { t:'plain', title:'In plain English',
    x:'Once you have a count like 3n\u00b2 + 50n + 900, most of it is noise. For large n the n\u00b2 term swamps everything, and the 3 in front depends on hardware you were never trying to measure. Big O is the agreement to throw away both — the constants and the smaller terms — and keep only the shape of the curve. Saying an algorithm is O(n\u00b2) means: **beyond some point, it never grows faster than n\u00b2 does.** It is a ceiling, not an exact measurement.' },

  { t:'steps', title:'Build it up', x:[
    { h:'Drop the constant multipliers',
      p:'3n\u00b2 and 100n\u00b2 are both O(n\u00b2). A constant factor is a faster machine, not a better algorithm.' },
    { h:'Drop the lower-order terms',
      p:'n\u00b2 + 50n + 900 is O(n\u00b2). At n = 1,000,000 the n\u00b2 term is a million times bigger than the n term; nothing else matters.' },
    { h:'Learn the ladder in order',
      p:'1 &lt; log n &lt; n &lt; n log n &lt; n\u00b2 &lt; n\u00b3 &lt; 2\u207f. Being able to place any expression on that ladder is most of what is asked.' },
    { h:'Now the formal definition, which just says the same thing carefully',
      p:'f(n) \u2208 O(g(n)) if there exist a constant **c** and a threshold **N** such that f(n) \u2264 c\u00b7g(n) for every n \u2265 N. The c absorbs the constant multipliers; the N gives permission for small inputs to misbehave.' },
    { h:'Proving it means producing one c and one N that work',
      p:'You are not asked for the best pair, just a pair. For n\u00b2 + 3n, taking c = 2 and N = 3 does it — beyond n = 3, 3n never exceeds n\u00b2.' }
  ]},

  { t:'note', k:'trap', title:'Where marks get lost',
    x:'O is an **upper** bound, so n \u2208 O(n\u00b2) is a perfectly true statement — just a useless one. If a question asks for the order, give the tightest bound you can justify, not merely a correct one.' }
]},

/* ============================================================ */
'insertion': { fold:true, blocks:[
  { t:'plain', title:'In plain English',
    x:'Insertion sort is how nearly everyone sorts a hand of cards. Everything to the left of where you are stands already sorted; you pick up the next card and slide it leftwards until it sits in the right place. If the hand arrives already sorted, every card stops immediately and you barely do any work. If it arrives backwards, every card has to travel the full width of the sorted part — and that is where n(n\u22121)/2 comes from.' },

  { t:'steps', title:'Build it up', x:[
    { h:'The invariant: the left part is always sorted',
      p:'Start with just the first item, which is trivially sorted. Each pass grows the sorted region by one.' },
    { h:'Best case is an already-sorted array',
      p:'Every item is compared once against its left neighbour and stays put. n\u22121 comparisons, no shifts.' },
    { h:'Worst case is a reverse-sorted array',
      p:'Item i travels past all i\u22121 items before it. Total 1+2+\u2026+(n\u22121) = n(n\u22121)/2, so O(n\u00b2).' },
    { h:'Average case sits halfway',
      p:'On a random input each item travels roughly half the sorted region, giving about n(n\u22121)/4 \u2014 still quadratic.' },
    { h:'Then the design lesson',
      p:'The last part of this page is about choosing structures by cost profile: which operation is cheap to insert into, which is cheap to retrieve from, and which one your problem does more often.' }
  ]}
]},

/* ============================================================ */
'lab': { fold:false, blocks:[
  { t:'plain', title:'What these are for',
    x:'These are the pages to use when a formula will not stick. Counting comparisons yourself, watching two searches diverge on the same array, or dragging c and N until the inequality holds tends to fix an idea in a way that re-reading the derivation does not. Nothing here needs setting up — press the buttons.' }
]},

/* ============================================================ */
'sampletest': { fold:false, blocks:[
  { t:'plain', title:'How to use this page',
    x:'Do not read the answers first. Write yours in the box, then reveal — being wrong and finding out why is worth several times more than nodding along to a worked solution. Give yourself the real time limit on a first attempt.' }
]}

};

/* ============================================================
   Extra pages appended to the site
   ============================================================ */
const EXTRA_SECTIONS = [
{
  id: 'glossary', group: 'Practice', nav: 'Glossary',
  eyebrow: 'Reference',
  title: 'Glossary',
  lede: 'Every technical word used on this site, in one line each. These same definitions pop up when you click a dotted word anywhere in the lessons.',
  blocks: [
    { t:'glossary' }
  ]
}
];
