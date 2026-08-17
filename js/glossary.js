/* ============================================================
   CS214 Revise — glossary
   Every entry here becomes (a) a tooltip the first time the word
   appears on a page, and (b) a row on the Glossary page.

   Fields:
     w    the word as it should be displayed
     alt  other spellings/forms that should also trigger the tooltip
     c    category — 'java' | 'ds' | 'analysis'
     d    the one-or-two-sentence definition (inline `code` and **bold** work)
     ex   optional example or "why it matters" line
     see  optional hash link to the page that teaches it

   Keep definitions SHORT. A tooltip is not a lecture.
   ============================================================ */

const GLOSSARY = [

/* ---------------- Java & object orientation ---------------- */
{ w:'class', alt:['classes'], c:'java', see:'#/ds-basics',
  d:'A blueprint. It describes what data an object will hold and what it can do — but nothing exists yet.',
  ex:'`class Dog { String name; void speak(){} }` is a plan. No dog exists until you make one.' },

{ w:'object', alt:['objects'], c:'java', see:'#/ds-basics',
  d:'One actual thing built from a class, sitting in memory with its own copy of the data.',
  ex:'Two `Dog` objects can have different names while sharing the same class.' },

{ w:'instantiate', alt:['instantiation','instantiated','instantiating','instance'], c:'java', see:'#/ds-basics',
  d:'To create an object from a class, using the `new` keyword. The object produced is called an **instance** of that class.',
  ex:'`Dog d = new Dog("Rover");` — the `new Dog("Rover")` part is the instantiation.' },

{ w:'constructor', alt:['constructors'], c:'java', see:'#/java-inherit',
  d:'A special method with the same name as the class, run once at the moment of instantiation, to set the object up.',
  ex:'It has no return type — not even `void`.' },

{ w:'reference variable', alt:['reference variables','reference'], c:'java', see:'#/java-poly',
  d:'A variable that does not hold the object itself, only the location of it. Two references can point at the same object.',
  ex:'`Animal ref;` holds a reference. `ref = aDog;` points it at a Dog object.' },

{ w:'method', alt:['methods'], c:'java',
  d:'A named block of code belonging to a class — what an object of that class can do.' },

{ w:'signature', alt:['method signature'], c:'java', see:'#/java-inherit',
  d:'A method\u2019s name plus the number, types and order of its parameters. The return type is **not** part of it.',
  ex:'This is why you cannot overload by changing only the return type.' },

{ w:'encapsulation', c:'java',
  d:'Keeping an object\u2019s data private and letting the outside world touch it only through methods.' },

{ w:'inheritance', alt:['inherit','inherits','inherited'], c:'java', see:'#/java-inherit',
  d:'One class taking on the fields and methods of another, so it does not have to repeat them.',
  ex:'`class Dog extends Animal` — Dog now has everything Animal has, plus whatever it adds.' },

{ w:'superclass', alt:['super class','superclasses','base class','parent class'], c:'java', see:'#/java-inherit',
  d:'The class being inherited **from** — the more general one, higher up the diagram.' },

{ w:'subclass', alt:['sub class','subclasses','derived class','child class'], c:'java', see:'#/java-inherit',
  d:'The class doing the inheriting — the more specific one, lower down the diagram.' },

{ w:'extends', kw:true, c:'java', see:'#/java-inherit',
  d:'The Java keyword that sets up inheritance between two classes. A class can extend exactly one other class.' },

{ w:'implements', kw:true, c:'java', see:'#/java-abstract',
  d:'The Java keyword for taking on an interface. Unlike `extends`, a class may implement as many interfaces as it likes.' },

{ w:'super', kw:true, c:'java', see:'#/java-inherit',
  d:'A keyword meaning "the superclass part of me". `super()` calls the superclass constructor and must be the **first** statement in a constructor.' },

{ w:'this', kw:true, c:'java', see:'#/java-inherit',
  d:'A reference to the current object. `this.x` picks the field over a parameter of the same name; `this(...)` calls another constructor of the same class.' },

{ w:'access modifier', alt:['access modifiers','access level','access levels'], c:'java', see:'#/java-inherit',
  d:'The keyword controlling who can see a member: `public`, `protected`, default (no keyword), or `private`.',
  ex:'Order from most open to most closed: public \u2192 protected \u2192 default \u2192 private.' },

{ w:'private', kw:true, c:'java', see:'#/java-inherit',
  d:'Visible only inside the class that declares it. Not even a subclass can see it.' },

{ w:'protected', kw:true, c:'java', see:'#/java-inherit',
  d:'Visible inside the class, inside the same package, and inside subclasses anywhere.' },

{ w:'package-private', alt:['package private','default access'], c:'java', see:'#/java-inherit',
  d:'What you get when you write no access keyword at all: visible to any class in the same package, and nowhere else.' },

{ w:'static', kw:true, c:'java', see:'#/java-relations',
  d:'Belongs to the class itself rather than to any one object — one copy shared by everybody.',
  ex:'`Math.max(...)` needs no Math object because `max` is static.' },

{ w:'final', kw:true, c:'java', see:'#/java-abstract',
  d:'"Cannot be changed." A final variable is a constant, a final method cannot be overridden, a final class cannot be extended.' },

{ w:'overloading', alt:['overload','overloaded'], c:'java', see:'#/java-inherit',
  d:'Two or more methods in the same class sharing a name but taking different parameters. The compiler picks which one, so it is decided **before** the program runs.' },

{ w:'overriding', alt:['override','overrides','overridden'], c:'java', see:'#/java-inherit',
  d:'A subclass replacing an inherited method with its own version of the same signature. Which one runs is decided **while** the program runs, from the object\u2019s real type.' },

{ w:'abstract class', alt:['abstract classes'], c:'java', see:'#/java-abstract',
  d:'A class you are not allowed to instantiate. It exists to be extended, and can hold both finished methods and unfinished ones.',
  ex:'`Animal` is abstract — you can have a Dog, but not a plain "animal".' },

{ w:'abstract method', alt:['abstract methods'], c:'java', see:'#/java-abstract',
  d:'A method declared with a signature and no body. Any concrete subclass is forced to supply one.' },

{ w:'interface', alt:['interfaces'], c:'java', see:'#/java-abstract',
  d:'A contract: a list of method signatures (and constants) with no code behind them. A class that implements it must fill in every method.' },

{ w:'polymorphism', alt:['polymorphic'], c:'java', see:'#/java-poly',
  d:'One name, many behaviours. The same call runs different code depending on what the object actually is.',
  ex:'`ref.speak()` barks for a Dog and hisses for a Snake, with no change to the calling line.' },

{ w:'casting', alt:['cast','casts','casted'], c:'java', see:'#/java-poly',
  d:'Telling the compiler to treat a reference as a different type. **It never changes the object** — only how the reference is regarded.',
  ex:'`(Dog) a` says "trust me, this Animal really is a Dog".' },

{ w:'upcasting', alt:['upcast','up-casting'], c:'java', see:'#/java-poly',
  d:'Treating a subclass object as its superclass type. Always safe, so Java does it for you without a cast being written.',
  ex:'`Animal a = new Dog();` — a Dog is definitely an Animal.' },

{ w:'downcasting', alt:['downcast','down-casting'], c:'java', see:'#/java-poly',
  d:'Treating a superclass reference as a subclass type. Must be written out explicitly, and can still blow up at run time if the object is not really that type.',
  ex:'`Dog d = (Dog) a;` compiles, but throws if `a` is holding a Cat.' },

{ w:'static binding', alt:['early binding'], c:'java', see:'#/java-poly',
  d:'The compiler decides which method will run, using the **variable\u2019s** declared type. Used for overloaded, static, private and final methods.' },

{ w:'dynamic binding', alt:['late binding'], c:'java', see:'#/java-poly',
  d:'The decision is left until the program runs, and is made from the **object\u2019s** real type. Used for overridden instance methods — this is what makes polymorphism work.' },

{ w:'shadowing', alt:['shadowed','shadows a field'], c:'java', see:'#/java-poly',
  d:'A subclass declaring a field with the same name as one in the superclass. Fields are not polymorphic: the variable\u2019s type decides which field you get.',
  ex:'The classic trap — methods override, fields shadow.' },

{ w:'instanceof', kw:true, c:'java', see:'#/java-poly',
  d:'An operator asking "is this object really of that type?" — true for subclasses and for implemented interfaces too. Use it to check before downcasting.' },

{ w:'ClassCastException', c:'java', see:'#/java-poly',
  d:'The run-time error thrown when a downcast turns out to be a lie.' },

{ w:'Object class', alt:['the Object class'], c:'java', see:'#/java-inherit',
  d:'The class every Java class inherits from, directly or indirectly. It supplies `toString`, `equals`, `hashCode` and `clone`.' },

{ w:'Comparable', alt:['compareTo'], c:'java', see:'#/java-abstract',
  d:'An interface with a single method, `compareTo`, returning a negative number, zero, or a positive number. Implement it and sorting works on your objects.' },

{ w:'Cloneable', c:'java', see:'#/java-abstract',
  d:'A marker interface saying "this object may be copied with `clone()`". Without it, `clone()` throws.' },

{ w:'shallow copy', alt:['shallow clone'], c:'java', see:'#/java-abstract',
  d:'Copies the fields exactly as they are — so any field holding a reference ends up pointing at the **same** object as the original.' },

{ w:'deep copy', alt:['deep clone'], c:'java', see:'#/java-abstract',
  d:'Copies the referenced objects too, all the way down, so the copy shares nothing with the original.' },

{ w:'association', c:'java', see:'#/java-relations',
  d:'A plain "knows about / uses" link between two classes that exist independently of each other.' },

{ w:'aggregation', c:'java', see:'#/java-relations',
  d:'A has-a where the part can survive without the whole. Drawn with a **hollow** diamond.',
  ex:'A department has lecturers; close the department and the lecturers still exist.' },

{ w:'composition', c:'java', see:'#/java-relations',
  d:'A stronger has-a where the part is owned by the whole and dies with it. Drawn with a **filled** diamond.',
  ex:'A house has rooms; demolish the house and the rooms are gone.' },

{ w:'generalization', c:'java', see:'#/java-relations',
  d:'The is-a relationship — plain inheritance, drawn in UML with a hollow triangle pointing at the superclass.' },

{ w:'multiplicity', c:'java', see:'#/java-relations',
  d:'The numbers written on a UML line saying how many objects take part: `1`, `0..1`, `1..*`, `*`.' },

{ w:'UML', c:'java', see:'#/java-relations',
  d:'Unified Modelling Language — the standard box-and-line notation for drawing classes and how they relate.' },

{ w:'singleton', c:'java', see:'#/java-relations',
  d:'A class deliberately limited to one single instance: private constructor, static field holding the one object, static method handing it out.' },

{ w:'pass by value', c:'java', see:'#/java-relations',
  d:'The method gets a copy, so changing it inside the method does not affect the caller. This is how Java passes primitives.' },

{ w:'pass by reference', c:'java', see:'#/java-relations',
  d:'The method gets the location of the original, so changes are visible to the caller. Java passes object references this way.' },

{ w:'primitive type', alt:['primitive types','primitives','primitive'], c:'java', see:'#/ds-basics',
  d:'The eight built-in value types — `int`, `double`, `char`, `boolean` and friends. They hold the value itself, not a reference.' },

{ w:'wrapper class', alt:['wrapper classes','wrapper'], c:'java', see:'#/ds-basics',
  d:'The object version of a primitive: `Integer` for `int`, `Double` for `double`, and so on. Needed wherever only objects are allowed.' },

{ w:'generic programming', c:'java', see:'#/java-poly',
  d:'Writing code against a general type so that every subclass is handled without the code knowing about them.' },

/* ---------------- Data structures ---------------- */
{ w:'abstract data type', alt:['ADT','abstract data types'], c:'ds', see:'#/ds-basics',
  d:'A description of what a structure holds and what operations it offers, said without committing to how it is built inside.' },

{ w:'array', alt:['arrays'], c:'ds', see:'#/ds-basics',
  d:'A fixed-size run of same-typed slots laid out one after another. Reaching any slot by its index costs the same, no matter which.',
  ex:'Fast to read by position, slow to insert in the middle — everything after has to shift.' },

{ w:'linked list', alt:['linked lists'], c:'ds', see:'#/ds-basics',
  d:'A chain of nodes, each holding a value and the location of the next one. Cheap to insert and delete, but you cannot jump straight to item 500 — you must walk there.' },

{ w:'node', alt:['nodes'], c:'ds', see:'#/ds-basics',
  d:'One link in a chain or one position in a tree: the value plus the connections to its neighbours.' },

{ w:'stack', alt:['stacks'], c:'ds', see:'#/ds-basics',
  d:'Add and remove at one end only — the last thing in is the first thing out.',
  ex:'A pile of plates. Undo history works this way.' },

{ w:'LIFO', alt:['last in first out'], c:'ds', see:'#/ds-basics',
  d:'Last In, First Out — the rule a stack follows.' },

{ w:'queue', alt:['queues'], c:'ds', see:'#/ds-basics',
  d:'Add at the back, remove from the front — the first thing in is the first thing out.',
  ex:'A queue at a counter. Print jobs work this way.' },

{ w:'FIFO', alt:['first in first out'], c:'ds', see:'#/ds-basics',
  d:'First In, First Out — the rule a queue follows.' },

{ w:'heap', alt:['heaps','binary heap'], c:'ds', see:'#/ds-basics',
  d:'A complete binary tree where every parent sits correctly against its children (bigger in a max-heap, smaller in a min-heap), so the extreme value is always at the root.' },

{ w:'priority queue', alt:['priority queues'], c:'ds', see:'#/ds-basics',
  d:'A queue where the most important item leaves next rather than the oldest one. Usually built on a heap.' },

{ w:'hash table', alt:['hash tables','hashtable'], c:'ds', see:'#/ds-basics',
  d:'Turns a key straight into a slot number with a hash function, so lookup is close to instant regardless of size.' },

{ w:'hash function', c:'ds', see:'#/ds-basics',
  d:'The calculation that turns a key into an index. A good one spreads keys evenly across the table.' },

{ w:'collision', alt:['collisions'], c:'ds', see:'#/ds-basics',
  d:'What happens when two different keys hash to the same slot. The table needs a plan for it — chaining, or probing for the next free slot.' },

/* ---------------- Analysis ---------------- */
{ w:'algorithm', alt:['algorithms'], c:'analysis', see:'#/eff-search',
  d:'A finite, ordered set of unambiguous steps that solves a problem for every allowed input.' },

{ w:'input size', alt:['size of the input'], c:'analysis', see:'#/complexity',
  d:'The number, written **n**, that describes how big the job is — usually how many items there are.' },

{ w:'basic operation', alt:['basic operations'], c:'analysis', see:'#/complexity',
  d:'The single instruction you choose to count, picked because the total running time rises roughly in step with it.',
  ex:'In a search it is the comparison; in a sort it is usually the comparison too, not the swap.' },

{ w:'time complexity', alt:['complexity analysis'], c:'analysis', see:'#/complexity',
  d:'How the count of the basic operation grows as the input size grows. Deliberately says nothing about seconds, CPUs or languages.' },

{ w:'every-case time complexity', alt:['every-case complexity','every case complexity','T(n)'], c:'analysis', see:'#/complexity',
  d:'Written **T(n)**. The number of basic operations for an input of size n — but only when that count is identical for **every** input of that size.',
  ex:'Adding up an array is every-case: n additions, whatever the numbers are.' },

{ w:'worst case', alt:['worst-case','W(n)'], c:'analysis', see:'#/complexity',
  d:'Written **W(n)**. The largest number of basic operations over all inputs of size n.' },

{ w:'best case', alt:['best-case','B(n)'], c:'analysis', see:'#/complexity',
  d:'Written **B(n)**. The smallest number of basic operations over all inputs of size n.' },

{ w:'average case', alt:['average-case','A(n)'], c:'analysis', see:'#/complexity',
  d:'Written **A(n)**. The expected number of basic operations, weighing each input by how likely it is. Needs a probability assumption before you can compute it.' },

{ w:'expected value', c:'analysis', see:'#/complexity',
  d:'Each possible value multiplied by its probability, all added up. The formal name for a weighted average.' },

{ w:'Big O', alt:['big-O','O(g(n))','big oh'], c:'analysis', see:'#/bigo',
  d:'An upper bound on growth. f(n) is in O(g(n)) if past some point N, f(n) never exceeds c\u00b7g(n) for a fixed constant c.',
  ex:'It is a ceiling, not a promise of exactness — n is in O(n\u00b2), technically true and usually useless.' },

{ w:'order of growth', alt:['growth rate','order of growth'], c:'analysis', see:'#/bigo',
  d:'The shape of the curve as n gets large — constant, log, linear, n log n, quadratic, cubic, exponential — ignoring constants and small terms.' },

{ w:'asymptotic', alt:['asymptotically'], c:'analysis', see:'#/bigo',
  d:'"Once n is large enough." Small inputs are allowed to misbehave; only the eventual trend counts.' },

{ w:'threshold', alt:['threshold N'], c:'analysis', see:'#/bigo',
  d:'The **N** in the Big O definition: the point past which the inequality has to hold. Below it, anything goes.' },

{ w:'logarithmic', alt:['log n','logarithm','log\u2082n'], c:'analysis', see:'#/bigo',
  d:'Grows by one step every time n **doubles**. Doubling a million items adds one comparison to a binary search.' },

{ w:'quadratic', c:'analysis', see:'#/bigo',
  d:'n\u00b2 growth: double the input, quadruple the work. Typical of two nested loops over the same data.' },

{ w:'exponential', c:'analysis', see:'#/bigo',
  d:'2\u207f growth: add one item and the work doubles. Unusable beyond small n.' },

{ w:'sequential search', alt:['linear search'], c:'analysis', see:'#/eff-search',
  d:'Check each slot from the start until you find the key or run out. Needs no ordering. W(n) = n, B(n) = 1.' },

{ w:'binary search', c:'analysis', see:'#/eff-search',
  d:'Look at the middle of a **sorted** array, throw away the half that cannot contain the key, repeat. W(n) = \u230alog\u2082 n\u230b + 1.' },

{ w:'insertion sort', c:'analysis', see:'#/insertion',
  d:'Take each item in turn and slide it back into its place among the already-sorted items on its left.',
  ex:'Worst case n(n\u22121)/2 comparisons, best case n\u22121 when the array is already sorted.' },

{ w:'recursion', alt:['recursive','recursively'], c:'analysis', see:'#/eff-search',
  d:'A method that calls itself on a smaller version of the problem, with a stopping case to end the chain.',
  ex:'Short to write; can be catastrophically slow if it recomputes the same subproblem over and over, as recursive Fibonacci does.' },

{ w:'iteration', alt:['iterative','iteratively'], c:'analysis', see:'#/eff-search',
  d:'Doing the job with a loop instead of self-calls. Usually more verbose, usually much cheaper.' }

];
