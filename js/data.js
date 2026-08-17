/* ============================================================
   CS214 Revise — lesson content
   Every section is a list of blocks rendered by app.js
   Block types: h, h3, p, ul, ol, code, note, table, formula,
                mcq, fill, reveal, order, pairs, widget
   ============================================================ */

const SECTIONS = [

/* ============================================================ */
{
  id: 'start', group: 'Start', nav: 'How to use this',
  eyebrow: 'CS214 · Design & Analysis of Algorithms',
  title: 'Revision for Weeks 1–3',
  lede: 'Time complexity, Big O order, and the Java you need to read the code in the exam. Read a bit, then do the activity underneath it — the activities are the point.',
  blocks: [
    { t:'p', x:'This works like a W3Schools tutorial: short explanation, worked example, then something you actually have to answer. Your answers are saved in this browser, so you can close the tab and come back to a half-finished quiz.' },

    { t:'h', x:'What is covered' },
    { t:'cards', x:[
      { to:'#/ds-basics', kick:'Week 1', h:'Data structures & Java types', p:'Array, stack, queue, linked list, heap, priority queue — and when each one is the right answer.' },
      { to:'#/java-inherit', kick:'Week 1', h:'Inheritance & access', p:'extends, super, overloading vs overriding, the four access levels.' },
      { to:'#/java-poly', kick:'Week 1', h:'Polymorphism & casting', p:'Upcasting, downcasting, static vs dynamic binding, shadowing, instanceof.' },
      { to:'#/java-abstract', kick:'Week 1', h:'Abstract classes & interfaces', p:'When to use which, final, Comparable, Cloneable, shallow vs deep clone.' },
      { to:'#/java-relations', kick:'Week 1', h:'Object relationships', p:'Association, aggregation, composition, generalization, multiplicity, singleton.' },
      { to:'#/eff-search', kick:'Week 2', h:'Efficiency & analysis', p:'Sequential vs binary search, recursive vs iterative Fibonacci.' },
      { to:'#/complexity', kick:'Week 2', h:'T(n), W(n), B(n), A(n)', p:'Every-case, worst-case, best-case and average-case time complexity.' },
      { to:'#/bigo', kick:'Week 3', h:'Big O order', p:'The formal definition, complexity categories, and how to find c and N.' },
      { to:'#/insertion', kick:'Week 3', h:'Insertion sort & data structure choice', p:'Worst case n(n−1)/2, best case n−1, and insert/retrieve costs.' }
    ]},

    { t:'h', x:'And then practise' },
    { t:'cards', x:[
      { to:'#/lab', kick:'Interactive', h:'Labs', p:'Race the two searches, plot growth orders, count loop operations, prove a Big O bound.' },
      { to:'#/exercises', kick:'Practice', h:'Code exercises', p:'Fill in the missing Java and the missing complexity terms.' },
      { to:'#/quiz', kick:'Practice', h:'Quiz', p:'Multiple choice across all three weeks, with an explanation on every answer.' },
      { to:'#/sampletest', kick:'Past paper', h:'Sample Test I', p:'The four questions from the sample test, worked through.' },
      { to:'#/cheatsheet', kick:'Reference', h:'Cheat sheet', p:'Every formula and rule on one page for the night before.' }
    ]},

    { t:'note', k:'exam', title:'What the test is marking', x:'Sample Test I says it covers two learning outcomes: **evaluate the efficiency of algorithms** (7 of 10 marks) and **assess the suitability of different algorithms for solving a given problem** (3 of 10 marks). So roughly two thirds is complexity maths, one third is "which data structure and why".' }
  ]
},

/* ============================================================ */
{
  id: 'ds-basics', group: 'Week 1 · Java & data structures', nav: 'Data structures & types',
  eyebrow: 'Lecture 1.1 & 1.2',
  title: 'Data structures and Java data types',
  lede: 'The vocabulary questions come from here, and so does the "which data structure would you use?" question that is worth 3 marks.',
  blocks: [
    { t:'h', x:'The three definitions' },
    { t:'note', k:'def', title:'Definitions', x:'**Data** — a value or set of values of some type (string, integer, char…).<br>**Structure** — a way of organising information so it is easier to use.<br>**Data structure** — a way of organising data so that the data is easier to use.' },
    { t:'p', x:'The lecture makes one practical point about why any of this matters: the choice of data structure and algorithm can be the difference between a program running in a few seconds and one running for many days.' },

    { t:'h', x:'Choosing between data structures' },
    { t:'p', x:'Four criteria from the notes, in order:' },
    { t:'ol', x:[
      'It must meet the requirement.',
      'High performance.',
      'Low RAM footprint.',
      'Easy to implement.'
    ]},
    { t:'note', k:'exam', title:'How to answer the "which data structure" question', x:'Name the structure, then justify it against the requirement — what operation does the application do most? If it retrieves far more often than it inserts, say so, and pick the structure that is fast for retrieval. Sample Test I gives 1 mark for the choice and 2 marks for the justification, so the justification is worth double.' },

    { t:'h', x:'The common structures' },
    { t:'table', head:['Structure','Rule','Typical use'], rows:[
      ['Array','Fixed size, direct index access','Anything where you know the size and index a lot'],
      ['Stack','LIFO — last in, first out','Parsing algebraic expressions, tracking variables and return addresses for function calls'],
      ['Queue','FIFO — first in, first out','Message queuing, a call centre serving first-come-first-served'],
      ['Linked list','Nodes with pointers, no index','Frequent insertion and deletion'],
      ['Tree','Hierarchical nodes','Hierarchies, searching'],
      ['Heap','Complete binary tree; each node ≥ (or ≤) its parent','Backing a priority queue'],
      ['Hash table','Key hashes to a slot','Fast retrieval by key — dictionary lookups'],
      ['Priority queue','Every item has a priority; highest priority dequeues first','OS load balancing, Dijkstra, job scheduling']
    ]},
    { t:'note', k:'def', title:'Heap, precisely', x:'A binary heap is a **complete** binary tree — all levels completely filled except possibly the last — and the value of each node is greater than or equal to (max-heap) or less than or equal to (min-heap) the value of its parent.' },

    { t:'mcq', id:'ds-q1',
      q:'ANZ\'s call centre must serve callers strictly on a first-come-first-served basis. Which structure fits?',
      opts:['Stack','Queue','Priority queue','Hash table'],
      a:1,
      why:'First-come-first-served is exactly FIFO, which is the queue rule. A stack would serve the most recent caller first, and a priority queue would need a priority to sort on — "fair chance to each customer" says there is no priority.' },

    { t:'mcq', id:'ds-q2',
      q:'SCIMS awards prize money to the five first-year students with the highest GPA. You need to keep dequeuing the highest GPA. Which structure?',
      opts:['Queue','Stack','Priority queue (heap)','Array sorted by name'],
      a:2,
      why:'The dequeue order depends on a value (GPA), not arrival order — that is a priority queue, normally implemented with a heap. This is Lab Week 3 Question 1.' },

    { t:'h', x:'Data types in Java' },
    { t:'ul', x:[
      '**Primitive types** — `int`, `float`, `double`, `boolean`, `char`',
      '**Primitive wrapper classes** (immutable) — `Integer`, `Float`, `Double`, `Boolean`',
      '**Built-in classes** — Java\'s rich set of helper classes',
      '**User defined types (UDT)** — anything you create with `class { … }`'
    ]},
    { t:'note', k:'def', title:'What a data type is', x:'A data type of a value or object is an attribute that tells what kind of data that value can hold **and the set of operations that act on it**. `int` is not just 0, 1, 2… — it is those values together with `+ - * / %`.' },

    { t:'h', x:'Using the built-in structures' },
    { t:'code', lang:'java', cap:'LinkedList and ArrayList', x:
`LinkedList<Integer> L = new LinkedList<Integer>();
L.add(10);
L.add(20);
L.remove(1);        // removes the element at index 1

ArrayList<Integer> A = new ArrayList<Integer>();
A.add(10);
A.add(20);
A.remove(1);` },
    { t:'code', lang:'java', cap:'A queue, built from a LinkedList', x:
`Queue<Integer> q = new LinkedList<Integer>();
q.add(1);           // no specific enqueue method
q.add(2);
q.remove();         // no specific dequeue method` },
    { t:'code', lang:'java', cap:'A priority queue needs a comparator', x:
`Comparator<String> comparator = new UserDefinedComparator();
PriorityQueue<String> queue =
        new PriorityQueue<String>(SIZE, comparator);
// writing the comparator needs inheritance — see the next pages` },

    { t:'note', k:'', title:'Homework question from the lecture', x:'What is the difference between `LinkedList` and `ArrayList`? Short answer: `ArrayList` is a dynamic **array** — index access is fast, but inserting in the middle shifts elements. `LinkedList` is a chain of nodes — inserting where you already are is fast, but reaching index *i* means walking there. This is the same trade-off as the last section of the Big O week.' },

    { t:'h', x:'Built-in algorithms worth knowing' },
    { t:'code', lang:'java', cap:'java.util.Collections and java.util.Arrays', x:
`Collections.sort(list);
Collections.min(list);
Collections.max(list);

Arrays.sort(array);
Arrays.binarySearch(array, key);
Arrays.asList(array);` },
    { t:'note', k:'trap', title:'The trap', x:'`Arrays.sort` works on arrays; `Collections.sort` works on Collections such as `ArrayList`. Calling `Arrays.sort(myArrayList)` will not compile. And `Arrays.binarySearch` only gives a correct answer on an array that is **already sorted**.' },

    { t:'fill', id:'ds-f1', title:'Complete the queue', lang:'java',
      prompt:'Java has no dedicated Queue class you can instantiate — you build one from a LinkedList. Fill in the two gaps.',
      code: 'Queue<Integer> q = new {{0}}<Integer>();\nq.{{1}}(1);   // enqueue\nq.remove();   // dequeue',
      answers: [['LinkedList'],['add']],
      hint: 'Which concrete class in the notes is used as the queue implementation? And which method adds to it?',
      sol: '`Queue<Integer> q = new LinkedList<Integer>();` then `q.add(1);`. `Queue` is an interface, so it cannot be instantiated directly.' },

    { t:'reveal', id:'ds-r1', title:'Short answer practice', scratch:true,
      q:'The USP library search system stores book titles with authors, editions and publishers. Users search by title keyword and the system displays matching titles. What is the best data structure, and why? (1 + 2 marks)',
      ans:'A hash table (or a heap / priority queue) is the answer given in the sample solution, because **retrieval has a higher priority than insertion** here — books are added rarely and searched constantly.<br><br>The sample solution argues for a heap on two grounds: it is a complete tree, so searching down it costs about log<sub>k</sub> n in the average case; and because the value of each node relates to its parent, commonly used words can be kept near the top, giving high-frequency searches a short path. Priority is obtained by indexing on how often each word is used.<br><br>The marks are in the justification, so always tie the structure back to the operation the application does most.' }
  ]
},

/* ============================================================ */
{
  id: 'java-inherit', group: 'Week 1 · Java & data structures', nav: 'Inheritance & access',
  eyebrow: 'Lecture 2.1',
  title: 'Inheritance, access levels, overloading vs overriding',
  lede: 'Two words that look alike and mean opposite things: overloading and overriding. Expect to be asked to tell them apart.',
  blocks: [
    { t:'h', x:'Inheritance' },
    { t:'p', x:'In an inheritance relationship a subclass obtains data and behaviour from a base class (superclass). It is implemented with the `extends` keyword, and `super` refers to the base class. In a UML diagram inheritance is drawn as a **clear (unfilled) triangle** pointing at the base class.' },
    { t:'p', x:'A derived class:' },
    { t:'ul', x:[
      'inherits all the public variables and methods of the base class,',
      'adds additional variables and methods,',
      'can change the meaning of inherited methods (override them).'
    ]},
    { t:'note', k:'exam', title:'Remember', x:'**Java does not support multiple inheritance.** C++ does. In Java a class has exactly one base class — multiple inheritance is only approximated through interfaces.' },

    { t:'code', lang:'java', cap:'extends and super', x:
`public abstract class Animal {          // class is abstract
   private String name;
   public Animal(String nm) { name = nm; }
   public String getName() { return name; }
}

public class Dog extends Animal {
   public Dog(String nm) {
      super(nm);                        // builds using the parent constructor
   }
   public void work() {                 // method specific to Dog
      System.out.println("I can herd sheep and cows");
   }
}` },

    { t:'h', x:'The Object class' },
    { t:'p', x:'Every class in Java inherits from a base class, and each class has exactly one. If you do not explicitly extend anything, your class implicitly extends `Object`. `Object` is the root of the whole Java class hierarchy.' },
    { t:'p', x:'Object\'s members are not listed when you list a class\'s members — but if you write a method with the same signature as one of Object\'s, you are **overriding** it, whether you meant to or not. `toString()` is the usual example: it returns a string representation of the object, and overriding it changes what `System.out.println(myObject)` prints.' },
    { t:'code', lang:'java', cap:'Overriding toString()', x:
`Student S1 = new Student("s1", 1, "NOMAJOR");
System.out.println(S1.toString());
// System.out.println(S1);   <- calls toString() too

public String toString() {
   return name + String.valueOf(id) + major;
}` },

    { t:'h', x:'Access levels' },
    { t:'p', x:'Access level determines how far an object will let another object reach into it. It is used to enforce encapsulation by hiding attributes, to restrict access to certain methods, and to restrict access based on package.' },
    { t:'table', head:['Level','UML','Who can see it','The lecture\'s mnemonic'], rows:[
      ['`private`','−','Only the class itself','"Only you know the secret"'],
      ['`package` (default)','~','The class and any class in the same package','"Everyone in the same group knows"'],
      ['`protected`','#','The class, the same package, and any subclass','"You, your group, and your children know"'],
      ['`public`','+','Every class','"Everyone knows the secret"']
    ]},
    { t:'note', k:'trap', title:'Two easy marks lost here', x:'`package` is the level you get when you write **no** modifier at all — it is not a keyword you type. And `protected` is wider than `package`, not narrower: it adds subclasses on top of package access.' },

    { t:'pairs', id:'inh-p1', title:'Match the UML notation',
      prompt:'Drag-free version: pick the access level each UML symbol stands for.',
      cats:['private','package','protected','public'],
      items:[ {x:'+', a:'public'}, {x:'−', a:'private'}, {x:'#', a:'protected'}, {x:'~', a:'package'} ] },

    { t:'h', x:'Overloading' },
    { t:'p', x:'Method overloading is using the **same method name for multiple methods** in the same class. Each overloaded method must have a unique *signature*.' },
    { t:'note', k:'def', title:'What a signature is', x:'The signature is the **number, type and order of the parameters**. The return type is **NOT** part of the signature. The compiler must be able to work out which version you meant purely by looking at the arguments you passed.' },
    { t:'code', lang:'java', cap:'Three overloads and one compile error', x:
`public void aMethod(String y)          { /* … */ }
public void aMethod(int x)             { /* … */ }   // overloading
public void aMethod(int x, String y)   { /* … */ }   // overloading

public int  aMethod(float y)           { /* … */ }   // still overloading:
                                                     // float differs from int` },
    { t:'note', k:'trap', title:'Careful', x:'Two methods that differ **only** by return type are not overloads — they are a compile error, because the compiler cannot choose between them from the call site.' },

    { t:'h', x:'Overriding' },
    { t:'p', x:'A derived class can use its base class\'s methods, or it can override them — supplying a new implementation for the same method.' },
    { t:'p', x:'The rules:' },
    { t:'ul', x:[
      'The method in the derived class must have **exactly the same signature** as the base class method.',
      'The **return type must match** the base class method.',
      'A subclass cannot override a method declared `final`.',
      'Only **non-static** methods can be overridden.',
      'The new method can still call the original with `super.methodName(...)`.'
    ]},
    { t:'code', lang:'java', cap:'Cylinder overrides Circle.getArea()', x:
`class Circle {
   protected double radius;
   public Circle(double radius) { this.radius = radius; }

   public double getArea() {                  // can be overridden
      return Math.PI * radius * radius;
   }
}

class Cylinder extends Circle {
   protected double length;
   public Cylinder(double radius, double length) {
      super(radius);
      this.length = length;
   }

   public double getArea() {                  // overridden here
      return 2 * super.getArea() + 2 * Math.PI * radius * length;
   }
}` },

    { t:'table', head:['','Overloading','Overriding'], rows:[
      ['Where','Same class','Base class and derived class'],
      ['Signature','Must be **different**','Must be **identical**'],
      ['Return type','Not part of the decision','Must match'],
      ['Resolved','At compile time (static binding)','At run time (dynamic binding)'],
      ['Blocked by','—','`final`, and `static` methods']
    ]},

    { t:'mcq', id:'inh-q1',
      q:'Which pair of methods in the same class is an overload?',
      opts:[
        '`void go(int a)` and `int go(int a)`',
        '`void go(int a)` and `void go(int a, int b)`',
        '`void go(int a)` in Base and `void go(int a)` in Derived',
        '`static void go(int a)` and `final void go(int a)`'
      ],
      a:1,
      why:'Overloading needs a different number, type or order of parameters. Option A differs only by return type, which is not part of the signature — compile error. Option C is overriding, not overloading, because it is across two classes with the same signature.' },

    { t:'h', x:'super and this' },
    { t:'table', head:['`super`','`this`'], rows:[
      ['`super()` or `super(...)` calls the parent constructor — called automatically if you do not call it explicitly','`this()` or `this(...)` calls another constructor of the same class'],
      ['`super.member` reaches the superclass\'s method or instance variable','`this.member` refers to the current object'],
      ['`super.super.x` is **not valid**','`this.x` resolves a clash between an instance variable and a local variable of the same name']
    ]},

    { t:'fill', id:'inh-f1', title:'Fix the constructor', lang:'java',
      prompt:'Dog must build itself using Animal\'s constructor, and getName must not be re-implemented. Fill the gaps.',
      code: 'public class Dog {{0}} Animal {\n   public Dog(String nm) {\n      {{1}}(nm);\n   }\n}',
      answers: [['extends'],['super']],
      hint: 'One keyword sets up the inheritance relationship; the other calls the parent constructor.',
      sol: '`extends` creates the relationship and `super(nm)` invokes `Animal(String)`. If you leave out `super(nm)`, Java inserts a call to the no-argument `super()` — which Animal does not have, so it would not compile.' }
  ]
},

/* ============================================================ */
{
  id: 'java-poly', group: 'Week 1 · Java & data structures', nav: 'Polymorphism & casting',
  eyebrow: 'Lecture 2.2 & 3.1',
  title: 'Polymorphism, binding and casting',
  lede: 'The rule that decides everything on this page: the compiler checks the type of the variable, the run time uses the type of the object.',
  blocks: [
    { t:'h', x:'What polymorphism is' },
    { t:'note', k:'def', title:'Definition', x:'Polymorphism is the ability of objects belonging to different types to respond to method calls of methods of the **same name**, each one according to an appropriate type-specific behaviour. The program does not have to know the exact type of the object in advance, so the behaviour can be decided at run time — this is called **late binding** or **dynamic binding**.' },
    { t:'p', x:'It is the third basic principle of object oriented programming. **Overloading and overriding are the two types of polymorphism.**' },

    { t:'formula', x:'At compile time → the type of each VARIABLE is checked, to ensure only methods belonging to that type are called.\nAt run time    → the code executed depends on the nature of the OBJECT, not the type of the variable.' },

    { t:'code', lang:'java', cap:'One reference variable, three behaviours', x:
`// Cow, Dog and Snake all extend the abstract class Animal
// and each has its own speak() method.

public class AnimalReference {
   public static void main(String args[]) {
      Animal ref;                             // variable of type Animal
      Cow   aCow   = new Cow("Bossy");
      Dog   aDog   = new Dog("Rover");
      Snake aSnake = new Snake("Earnie");

      ref = aCow;    ref.speak();             // upcasting
      ref = aDog;    ref.speak();             // upcasting
      ref = aSnake;  ref.speak();             // upcasting
   }
}` },
    { t:'p', x:'Three identical calls to `ref.speak()`, three different outputs. The variable\'s type never changed; the object it pointed at did.' },

    { t:'h3', x:'Benefits' },
    { t:'ul', x:[
      '**Generic programming** — you write against one type and every subclass is taken care of.',
      '**Dynamic binding** — the right implementation is chosen from the actual type.',
      '**Extensibility** — a new class can be added to the hierarchy without changing the generic code.'
    ]},

    { t:'h', x:'Upcasting and downcasting' },
    { t:'p', x:'Casting from derived to base moves **up** the inheritance diagram, so it is called upcasting.' },
    { t:'note', k:'', title:'Why upcasting is always safe', x:'You are going from a more specific type to a more general one. The derived class is a superset of the base class: it may contain more methods, but it must contain at least the base class\'s methods. That is why the compiler allows upcasting with no explicit cast.' },
    { t:'code', lang:'java', cap:'Upcasting is implicit', x:
`base b = new base();
derived d = new derived();

b = d;              // valid upcasting — used in polymorphism
                    // identical to  b = (base) d;` },
    { t:'code', lang:'java', cap:'Downcasting must be explicit — and can still fail', x:
`base b = new base();
derived d = new derived();

d = b;                  // compile error
d = (derived) b;        // compiles, but throws at RUN TIME

base d_as_b = new derived();
d = (derived) d_as_b;   // compile AND run time OK` },
    { t:'note', k:'trap', title:'The distinction the exam wants', x:'`d = b;` fails at **compile** time — narrowing reference assignment is simply not allowed. `d = (derived) b;` passes the compiler because the cast is your promise that you know better, but the **run-time check** finds that the object really is only a `base` and it fails. The cast never changes the object; it only changes how the compiler treats the reference.' },

    { t:'h3', x:'instanceof' },
    { t:'p', x:'Use `instanceof` to verify the nature of an object before casting. It also works for interfaces.' },
    { t:'code', lang:'java', cap:'Guarding a downcast', x:
`if (b1 instanceof derived) {
   d1 = (derived) b1;
   System.out.println("d1 converted ....");
} else {
   System.out.println("d1 NOT converted ....");
}

if (a instanceof Cloneable)     // works on interfaces too
   a.clone();` },

    { t:'mcq', id:'poly-q1',
      q:'`Base b = new Derived();` — then `((Base) b).speak();` is called, and Derived overrides speak(). What runs?',
      opts:[
        'Base\'s speak(), because of the cast',
        'Derived\'s speak(), because the object is a Derived',
        'Compile error',
        'Run time error'
      ],
      a:1,
      why:'"Casting an object to a different type will have NO effect on which method is invoked in response to a given message. Once overridden, methods remain overridden." The cast only changes the compiler\'s view of the reference. Note this is the opposite of what happens with *fields* — see shadowing below.' },

    { t:'h', x:'Static and dynamic binding' },
    { t:'note', k:'def', title:'The two bindings', x:'**Static binding** — the type T of a variable is explicitly associated with its name by *declaration*. Hard-wired at compile time, which lets the compiler check type consistency.<br>**Dynamic binding** — the type of a variable is implicitly associated by its *content*, determined and checked as the program runs.' },
    { t:'table', head:['Statically bound','Dynamically bound'], rows:[
      ['Instance variables (different names)','Instance methods'],
      ['Shadowed variables (same names)','—'],
      ['Static variables','—'],
      ['Static methods','—']
    ]},
    { t:'note', k:'exam', title:'One line to memorise', x:'**Instance methods are the only thing bound dynamically.** Fields, static variables and static methods are all resolved at compile time from the declared type of the reference.' },

    { t:'h', x:'Shadowing' },
    { t:'p', x:'Shadowing is when an instance variable in a subclass has the same name as one in its parent. The new variable shadows the identically named parent variable. There are two ways to reach the hidden value:' },
    { t:'code', lang:'java', cap:'Unshadowing with super, or with a cast', x:
`public class Derived extends Base {
   public void method1() {
      System.out.println("x from Derived: "    + x);
      System.out.println("x from superclass: " + super.x);
      System.out.println("x from superclass: " + ((Base) this).x);
   }
}

Derived b2 = new Derived();
System.out.println( ((Base) b2).x );        // parent's x

Base b3 = new Derived();
System.out.println( ((Derived) b3).x );     // child's x` },
    { t:'ul', x:[
      '`this.x` accesses the field x defined in the child class.',
      '`super.x` accesses the field x defined in the parent class.',
      '`super.super.x` is **not valid**.',
      'This only works if `x` was not declared `private`.'
    ]},

    { t:'h', x:'The three kinds of variable' },
    { t:'table', head:['Kind','Declared','Lifetime / copies'], rows:[
      ['Local','In a method or block','A new copy on entry, destroyed on exit'],
      ['Instance (field)','In a class, outside a method','One copy per object'],
      ['Class (`static`)','In a class with `static`, outside a method','Exactly one copy, shared by all objects']
    ]},
    { t:'p', x:'The two reasons for `static` members: static **methods** let you invoke the class without instantiating an object first, and static **attributes** let all objects of the class share one variable.' },

    { t:'h', x:'Conversion vs casting' },
    { t:'table', head:['Direction','Primitives','Object references'], rows:[
      ['Widening','`d = i;` works with no cast. `d = (double) i;` is allowed and more readable','`b1 = d;` (derived to base) works with no cast; `b2 = (Base) d;` is optional'],
      ['Narrowing','`i = d;` is a **compile error**; `i = (int) d;` compiles with loss of precision','`d1 = b1;` is a **compile error**; `d1 = (derived) b1;` compiles, then the run-time check decides']
    ]},
    { t:'note', k:'', title:'Two rules about casting objects', x:'Casting is only legal between objects in the **same inheritance hierarchy**, and you can always safely cast an object to its superclass. Object conversion is handled automatically by the compiler, and the object itself is never changed — once instantiated, an object never changes its type. A Cat will always be a Cat.' },

    { t:'reveal', id:'poly-r1', title:'Predict the output', scratch:true,
      q:'Base declares `int x = 1;` and `void show(){ System.out.println("Base"); }`. Derived extends Base, declares `int x = 2;` and overrides `void show(){ System.out.println("Derived"); }`.<br><br>What does this print?<br><br>`Base r = new Derived();`<br>`System.out.println(r.x);`<br>`r.show();`',
      ans:'It prints **1** then **Derived**.<br><br>`r.x` is a *field* access — statically bound, resolved from the declared type of `r`, which is `Base`, so you get Base\'s x = 1.<br><br>`r.show()` is an *instance method* — dynamically bound, resolved from the actual object, which is a `Derived`, so Derived\'s override runs.<br><br>This is the single most reliable trick question in this topic: fields do not override, methods do.' },

    { t:'fill', id:'poly-f1', title:'Complete the safe downcast', lang:'java',
      prompt:'Fill in the operator that checks the object\'s real type, and the cast.',
      code: 'if (shape1 {{0}} Circle) {\n   Circle c = ({{1}}) shape1;\n   c.area();\n}',
      answers: [['instanceof'],['Circle']],
      hint: 'One is an operator that returns a boolean; the other is the target type in parentheses.',
      sol: '`instanceof` verifies the nature of the object before you cast, and the explicit cast `(Circle)` performs the narrowing conversion. Without the guard, the cast compiles but may throw at run time.' }
  ]
},

/* ============================================================ */
{
  id: 'java-abstract', group: 'Week 1 · Java & data structures', nav: 'Abstract & interfaces',
  eyebrow: 'Lecture 3.2 & 11.3',
  title: 'Abstract classes, interfaces, final, Comparable and Cloneable',
  lede: 'The compare-and-contrast question here is almost guaranteed. Learn the four differences.',
  blocks: [
    { t:'h', x:'Abstract classes' },
    { t:'note', k:'def', title:'Definitions', x:'An **abstract class** is a class declared `abstract` — it may or may not include abstract methods. It cannot be instantiated, but it can be subclassed.<br><br>An **abstract method** is declared without an implementation: no braces, just a semicolon.' },
    { t:'code', lang:'java', cap:'Abstract method and abstract class', x:
`abstract void moveTo(double deltaX, double deltaY);

public abstract class GraphicObject {
   // non-abstract methods can live here too
   abstract void draw();
}` },
    { t:'p', x:'The rules, in the order the lecture gives them:' },
    { t:'ul', x:[
      'An abstract class is **not required** to have an abstract method in it.',
      'But any class that has an abstract method — or that fails to implement an inherited abstract method — **must** be declared abstract.',
      'When a class inherits from an abstract class it must implement every abstract member, otherwise it is abstract too.',
      'An abstract class cannot be instantiated, **however references to an abstract class can be declared** (`Animal ref;` is legal).'
    ]},

    { t:'h3', x:'Why bother' },
    { t:'p', x:'The lecture splits a superclass\'s members into **generic methods** (a common definition that works for all subclasses, e.g. `set_color()` and `get_color()`) and **specific methods** (each subclass needs its own definition, e.g. `draw()` and `area()`). Making the specific ones abstract *forces* every subclass to provide a definition. Subclasses then have three kinds of member: generic, specific, and **unique** — methods that do not exist in the superclass at all.' },
    { t:'code', lang:'java', cap:'Abstract class in practice', x:
`abstract class shape {
   private String color;
   public void set_color(String color) {   // generic — shared
      this.color = color;
   }
   public abstract void draw();            // specific — forced on subclasses
}

class circle extends shape {
   public void draw() {
      System.out.println("This is circle");
   }
}` },

    { t:'h', x:'Interfaces' },
    { t:'p', x:'If an abstract class contains **only** abstract method declarations, it should be an interface instead. An interface defines a protocol of behaviour: method headers (signatures) with no implementation, plus field definitions that must be class constants — `public static final` only. An interface is never directly instantiated.' },
    { t:'code', lang:'java', cap:'implements', x:
`interface shape {
   public void area();
   public void draw();
}

class circle implements shape {
   public void area()  { System.out.println("formula: PI.r^2"); }
   public void draw()  { System.out.println("This is circle."); }
   public void circumference() {           // unique to circle
      System.out.println("formula: 2.PI.r");
   }
}` },

    { t:'h3', x:'Abstract class vs interface' },
    { t:'table', head:['Abstract class','Interface'], rows:[
      ['**Can** implement methods','Cannot implement any method — all methods are abstract'],
      ['A subclass that does not implement everything must be abstract','A class that implements it must define all methods or declare itself abstract'],
      ['A class can extend only **one**','A class can implement **one or more**'],
      ['Used for related classes','**Unrelated** classes can implement the same interface']
    ]},
    { t:'note', k:'exam', title:'The one-line answer', x:'Multiple inheritance is not supported by classes in Java, but **is supported through interfaces** — a class may implement as many as it likes.' },

    { t:'h3', x:'Extending interfaces' },
    { t:'p', x:'Interfaces can extend other interfaces, giving subinterfaces and superinterfaces. An interface extends an interface; a class **cannot** extend an interface. Unlike classes, an interface can extend more than one at a time.' },
    { t:'code', lang:'java', cap:'A subinterface from two parents', x:
`interface aquatic     { public void swim(); }
interface terrestrial { public void walk(); }

interface amphibian extends aquatic, terrestrial { }` },
    { t:'note', k:'', title:'Why you extend instead of edit', x:'**Interfaces cannot grow.** Adding a method to a class does not disturb the classes that use it. Adding a method to an interface breaks every class that implements it, because they must now implement another method. So when something else is needed, extend the interface into a new sub-interface instead.' },

    { t:'h', x:'final' },
    { t:'p', x:'`final` prevents inheritance effects, in four places:' },
    { t:'table', head:['Applied to','Effect'], rows:[
      ['Field','It is a constant'],
      ['Argument','The called method cannot change the data'],
      ['Method','Cannot be overridden in subclasses'],
      ['Class','Cannot be subclassed — all its methods are implicitly final too']
    ]},

    { t:'mcq', id:'abs-q1',
      q:'Which statement is TRUE?',
      opts:[
        'An abstract class must contain at least one abstract method',
        'You can declare a reference of an abstract type, but not instantiate one',
        'A class can extend two abstract classes',
        'An interface can provide a default body for its methods'
      ],
      a:1,
      why:'`Animal ref;` is legal even though `new Animal()` is not. A is false — an abstract class need not have any abstract method. C is false — Java has no multiple class inheritance. D is false in this course\'s notes: an interface is where all the methods are abstract.' },

    { t:'h', x:'Comparable' },
    { t:'p', x:'`Arrays.sort(Object[] a)` sorts an array of objects into ascending order — and **every element must implement `Comparable`** for it to work. `Arrays` lives in `java.util`; `Comparable` lives in `java.lang`.' },
    { t:'note', k:'def', title:'What compareTo returns', x:'`int compareTo(Object obj)` returns a **negative** integer if the object it is applied to is less than the argument, **zero** if they are equal, and a **positive** integer if it is greater.' },
    { t:'code', lang:'java', cap:'Implementing Comparable', x:
`public class Person implements Comparable {
   private String name;

   public int compareTo(Object obj) {          // dynamic binding
      if (!(obj instanceof Person)) {
         throw new ClassCastException("Not a Person");
      }
      Person p = (Person) obj;
      return name.compareTo(p.get_name());     // delegate to String
   }
}` },
    { t:'code', lang:'java', cap:'Sorting Strings — Strings are already Comparable', x:
`String animals[] = new String[4];
animals[0] = "snake";
animals[1] = "kangaroo";
animals[2] = "wombat";
animals[3] = "bird";

System.out.println(animals[0].compareTo(animals[1]));
Arrays.sort(animals);           // Collections.sort(list) for an ArrayList` },

    { t:'h', x:'Cloneable, and shallow vs deep' },
    { t:'p', x:'`Cloneable` is an **empty interface** that supports duplication of an object. Attempting to clone an object that does not implement it results in a `CloneNotSupportedException`.' },
    { t:'p', x:'`Object.clone()` creates a new instance of the class and initialises all its fields with exactly the contents of the corresponding fields of the original, as if by assignment — **the contents of the fields are not themselves cloned**.' },
    { t:'table', head:['Shallow clone','Deep clone'], rows:[
      ['Creates an object of the same type and copies the member variables\' values','Also clones the objects that the fields refer to'],
      ['A field holding a reference gives you **another reference to the same subobject**','Every user-defined or built-in object inside is duplicated'],
      ['What `Object.clone()` does by default','You must **override** `clone()` to get it']
    ]},
    { t:'code', lang:'java', cap:'A deep clone, one level down', x:
`class course {
   public String id;
   public String name;
}

public class Student implements Cloneable {
   private course[] c;

   public Object clone() {
      try {
         Student s = (Student) super.clone();     // shallow copy first
         s.c = (course[]) this.c.clone();         // then clone the array
         return s;
      }
      catch (CloneNotSupportedException e) {
         return null;
      }
   }
}` },

    { t:'h', x:'Interfaces as constant groups' },
    { t:'p', x:'Any field in an interface is automatically `static` and `final`, which makes an interface a convenient way to group constants — the Java equivalent of a C/C++ `enum`.' },
    { t:'code', lang:'java', cap:'Grouping constants', x:
`interface months {
   int JAN = 1, FEB = 2, MAR = 3;   // implicitly public static final
}

public class Calendar implements months {
   // …
}` },

    { t:'fill', id:'abs-f1', title:'Complete the interface', lang:'java',
      prompt:'A class takes on an interface with one keyword and a superclass with another. Fill in both, and the return type compareTo must have.',
      code: 'public class Person {{0}} Comparable {\n   public {{1}} compareTo(Object obj) {\n      // …\n   }\n}',
      answers: [['implements'],['int']],
      hint: 'You extend a class but you ___ an interface. And compareTo returns a negative / zero / positive value.',
      sol: '`implements Comparable`, and `compareTo` returns an `int` — negative if less than the argument, zero if equal, positive if greater.' },

    { t:'mcq', id:'abs-q2',
      q:'A Student holds a `course[] c`. You call the default `Object.clone()` and then change `copy.c[0].name`. What happens to the original?',
      opts:[
        'Nothing — clone() always makes an independent copy',
        'The original\'s c[0].name changes too, because clone() is shallow',
        'A CloneNotSupportedException is thrown',
        'The array is copied but the course objects are not'
      ],
      a:1,
      why:'The default clone copies field contents as if by assignment, so the field holding the array is copied as a *reference* — both objects point at the same array and the same course objects. To make them independent you must override clone() and clone the subobjects yourself. (Option D describes what happens after the one-level `this.c.clone()` fix, not the default behaviour.)' }
  ]
},

/* ============================================================ */
{
  id: 'java-relations', group: 'Week 1 · Java & data structures', nav: 'Object relationships',
  eyebrow: 'Lecture 2.3',
  title: 'Relationships between objects, UML and singletons',
  lede: 'Three relationships, three UML symbols, three English phrases. Learn them as triples.',
  blocks: [
    { t:'h', x:'The three relationships' },
    { t:'table', head:['Relationship','Phrase','UML symbol','Example'], rows:[
      ['Association','"has a"','A plain straight line','A house **has** furniture'],
      ['Aggregation','"has a part"','An **empty** diamond','A house **has a part** roof'],
      ['Composition','"has a part", but parts die with the whole','A **filled** diamond','A person and their head'],
      ['Generalization (inheritance)','"is a"','A clear triangle','A dog **is an** animal']
    ]},

    { t:'h3', x:'Association' },
    { t:'p', x:'Association represents the ability of one instance to send a message to another instance. It is typically implemented with a pointer or reference instance variable, although it might also be a method argument or the creation of a local variable. In Java that means one class contains a link to (or an instance of) another class, or sends/receives a message to another class.' },

    { t:'h3', x:'Aggregation' },
    { t:'p', x:'Aggregation is the typical whole-part relationship — one class is constructed from another. There is **not much difference in the way association and aggregation are implemented**; the difference is in the meaning you are documenting. It is a form of *asymmetric* association between the aggregate (whole) and a subordinate (part).' },

    { t:'h3', x:'Composition' },
    { t:'p', x:'Composition is a *symmetric* whole-part association in which **removing the whole also removes the parts**. Every part belongs to exactly one whole. The lecture\'s example: removing the person removes the head, and removing the head effectively destroys the person — they must exist together in the context of a living person. A cascading delete in a relational database is the same idea.' },

    { t:'h3', x:'Generalization' },
    { t:'p', x:'One class is derived from another. The derived class has more specialization than the base class: it may override methods of the base and may add new methods.' },

    { t:'pairs', id:'rel-p1', title:'Classify each relationship',
      prompt:'Pick the relationship each sentence describes.',
      cats:['Association','Aggregation','Composition','Generalization'],
      items:[
        {x:'A Car has a part Engine — the engine can be removed and put in another car', a:'Aggregation'},
        {x:'A Person has a Head — delete the person and the head goes with it', a:'Composition'},
        {x:'A Person has an Address it can send messages to', a:'Association'},
        {x:'A Cylinder is a Circle with a length', a:'Generalization'}
      ]},

    { t:'h', x:'UML class notation' },
    { t:'p', x:'A class is drawn as a rectangle divided into **three compartments**: name, attributes, operations. Access levels are marked on members with `+` public, `−` private, `#` protected, `~` package.' },

    { t:'h', x:'Multiplicity' },
    { t:'p', x:'Once the relation between classes is established, you specify the **multiplicity** — how many instances of one class can relate to a single instance of an associated class. Multiplicity constrains the numbers of related components. The usual notations are `1`, `0..1`, `*` (many), `1..*` (one or more), and `n..m`.' },

    { t:'h', x:'Pass by reference vs pass by value' },
    { t:'note', k:'def', title:'The two', x:'**Pass by reference** — you pass a reference to a method. If the object is modified inside the method using the reference, any change made to the object still exists after the method completes.<br><br>**Pass by value** — you pass a data value. Any modification made to that value inside the method does not exist after the method completes.' },
    { t:'note', k:'exam', title:'The line to quote', x:'**Primitive data types and Strings are always passed by value.**' },

    { t:'h', x:'The singleton pattern' },
    { t:'p', x:'A design pattern is a template for software development — it defines a behaviour or technique that can be used as a building block, to solve universal problems that commonly face developers.' },
    { t:'p', x:'A **singleton** allows only a single object to be created from a class, e.g. a network connection. It means the class has control over how it is created: the constructor is `private` or `protected` so there is no direct access from outside, and a `getInstance()` method is used to obtain the object.' },
    { t:'code', lang:'java', cap:'Singleton', x:
`public class SingletonObject {
   private SingletonObject() {
      // no code req'd
   }

   public static SingletonObject getSingletonObject() {
      if (ref == null)
         ref = new SingletonObject();     // ok — we can call this constructor
      return ref;
   }

   private static SingletonObject ref;
}` },
    { t:'note', k:'trap', title:'Why the pieces are what they are', x:'The constructor is private so nothing outside can call `new`. `getSingletonObject()` is `static` so you can call it **without an object** — you have to, since you cannot make one. And `ref` is `static` so there is exactly one copy shared by the class rather than one per object.' },

    { t:'mcq', id:'rel-q1',
      q:'Why must a singleton\'s getInstance()-style method be declared static?',
      opts:[
        'So it can be overridden by subclasses',
        'So it can be called without first creating an object — which is impossible here',
        'So the reference is passed by value',
        'Because private methods must be static'
      ],
      a:1,
      why:'Static class methods are used to invoke the class without having to first instantiate an object. Since the constructor is private, you cannot instantiate one, so the accessor must be static or it could never be reached.' }
  ]
},

/* ============================================================ */
{
  id: 'eff-search', group: 'Week 2 · Efficiency & analysis', nav: 'Efficiency: search & Fibonacci',
  eyebrow: 'Lecture 2.1',
  title: 'Algorithm efficiency: two searches and two Fibonaccis',
  lede: 'Two comparisons that show why efficiency is not about faster hardware.',
  blocks: [
    { t:'h', x:'The vocabulary' },
    { t:'note', k:'def', title:'Four terms that get confused', x:'**Problem** — a question to which we seek an answer.<br>**Parameters** — variables in a problem that are not assigned specific values in the statement of the problem.<br>**Instance** — one specific assignment of values to those parameters. Because a problem contains parameters, it represents a *class* of problems, one per assignment.<br>**Algorithm** — a general step-by-step procedure for producing the solution to **each** instance. We say the algorithm *solves* the problem.' },
    { t:'p', x:'A solution is **efficient** if it solves the problem within the required resource constraints. Since one problem can be solved by many different algorithms, it matters which one you pick — and making sure the developer uses the most efficient algorithm is crucial no matter how fast computers become or how cheap memory gets.' },

    { t:'h', x:'Sequential search vs binary search' },
    { t:'p', x:'**Sequential search** begins at the first position in the array and looks at each value in turn until the item is found.' },
    { t:'p', x:'**Binary search** first compares x with the middle item of the array. If they are equal, it is done. If x is smaller than the middle item then x must be in the first half (if it is present at all), and the procedure is repeated on the first half. If x is larger, the search repeats on the second half. This is repeated until x is found or it is determined that x is not in the array.' },
    { t:'note', k:'trap', title:'The precondition', x:'Binary search only works on a **sorted** array. Sequential search does not care. If a question gives you an unsorted array and asks which is better, the answer is not automatically "binary".' },

    { t:'widget', w:'searchRace' },

    { t:'h3', x:'Counting the comparisons' },
    { t:'p', x:'Sequential search does n comparisons to determine that x is **not** in an array of size n. If x is in the array, the number of comparisons is no greater than n. Binary search reduces the number of elements to be examined **by two each time**.' },
    { t:'table', head:['Array size','Sequential search','Binary search'], rows:[
      ['32','32','6'],['64','64','7'],['128','128','8'],
      ['n','n','log₂ n + 1'],
      ['1,024','1,024','11'],
      ['1,048,576','1,048,576','21']
    ]},
    { t:'p', x:'A million-element array: a million comparisons versus twenty-one. That gap is the whole reason this course exists.' },

    { t:'code', lang:'java', cap:'Sequential search', x:
`public static int seqSearch(int[] S, int x) {
   for (int i = 0; i < S.length; i++) {
      if (S[i] == x)          // basic operation
         return i;
   }
   return -1;                 // not found
}` },
    { t:'code', lang:'java', cap:'Binary search', x:
`public static int binSearch(int[] S, int x) {
   int low = 0, high = S.length - 1;
   while (low <= high) {
      int mid = (low + high) / 2;
      if (S[mid] == x)        // basic operation
         return mid;
      else if (x < S[mid])
         high = mid - 1;      // search the first half
      else
         low = mid + 1;       // search the second half
   }
   return -1;
}` },

    { t:'mcq', id:'eff-q1',
      q:'For an array of size 1,048,576, roughly how many comparisons does binary search need in the worst case?',
      opts:['1,048,576','1,024','21','512'],
      a:2,
      why:'log₂(1,048,576) = 20, and the table in the notes gives 21 = log₂ n + 1. Every doubling of n adds just one more comparison.' },

    { t:'h', x:'Recursive vs iterative Fibonacci' },
    { t:'formula', x:'Fib(n) = Fib(n−1) + Fib(n−2)   for n ≥ 2,   Fib(0) = 0, Fib(1) = 1\nSequence: 0, 1, 1, 2, 3, 5, 8, …' },
    { t:'code', lang:'java', cap:'Recursive — elegant and catastrophic', x:
`int fib(int n) {
   if (n <= 1) return n;
   else return fib(n-1) + fib(n-2);
}` },
    { t:'code', lang:'java', cap:'Iterative — dull and fast', x:
`int fib2(int n) {
   int f[] = new int[n+1];
   f[0] = 0;
   if (n > 0) {
      f[1] = 1;
      for (int i = 2; i <= n; i++)
         f[i] = f[i-1] + f[i-2];
   }
   return f[n];
}` },
    { t:'table', head:['n','Recursive terms computed','Iterative terms computed'], rows:[
      ['0','1','1'],['1','1','2'],['2','3','3'],['3','5','4'],['4','9','5'],
      ['n','> 2^(n/2)','n + 1'],
      ['40','> 1,048,576','41']
    ]},
    { t:'note', k:'exam', title:'Why the recursive one explodes', x:'The recursive version recomputes the same subproblems over and over — the call tree branches twice at every level. The number of terms computed is **greater than 2^(n/2)**, which is exponential. The iterative version stores each term once, so it computes **n + 1** terms. This is the standard "explain the difference" question.' },

    { t:'reveal', id:'eff-r1', title:'From Sample Test I, Question 2', scratch:true,
      q:'Algorithm X is written both iteratively and recursively. Testers claim the iterative approach is slower. The operation counts are: size 1 → 5 vs 2, size 2 → 10 vs 4, size 3 → 15 vs 6, size 4 → 20 vs 8. Do you agree with the testers? (1 + 2 marks)',
      ans:'**Both have linear time complexity.** Iterative is 5n, recursive is 2n — both are Θ(n), so both are O(n).<br><br>The tester\'s claim that the recursive version is *somewhat* faster is true in the narrow sense that 2n < 5n, but it does not matter which one you use: they are in the same complexity class, and constants are exactly what Big O throws away.<br><br>The sample solution adds a practical preference: iterative approaches are generally easier to use, so it would prefer iterative even though it is slightly slower, because computationally the difference is negligible.<br><br>Note the contrast with Fibonacci above — there the difference was exponential vs linear, which is a real difference. Here it is only a constant factor.' },

    { t:'note', k:'', title:'Lab Week 3, Question 3', x:'The homework asks you to code both Fibonacci versions, run them for n = {5, 10, 15, 20, 30, 40, 50, 100, 500, 1000}, time them with `long startTime = System.nanoTime();`, and plot CPU time against n for both on one graph. Expect the recursive line to disappear off the top of the chart somewhere around n = 40.' }
  ]
},

/* ============================================================ */
{
  id: 'complexity', group: 'Week 2 · Efficiency & analysis', nav: 'T(n), W(n), B(n), A(n)',
  eyebrow: 'Lecture 2.2',
  title: 'Complexity analysis: every-case, worst, best and average',
  lede: 'The mechanical part of the exam. Find the basic operation, count how many times it runs as a function of input size, done.',
  blocks: [
    { t:'h', x:'What we measure, and why not seconds' },
    { t:'p', x:'The critical resource for a program is most often its **running time** and the **space** required to run it. But time is not merely CPU cycles — we want to study algorithms independently of implementations, platforms and hardware.' },
    { t:'ul', x:[
      'We do **not** determine the actual number of CPU cycles, because that depends on the computer the algorithm runs on.',
      'We do **not** count every instruction executed, because the number of instructions depends on the programming language used.',
      'We want a measure independent of the computer, the language, the programmer, and all the complex details of the algorithm.'
    ]},
    { t:'note', k:'def', title:'The definition to write down', x:'The total running time is proportional to how many times some **basic operation** is done. So we analyse efficiency by determining the number of times the basic operation is done **as a function of the size of the input**. The size of the input is called the **input size**.<br><br>A **time complexity analysis** of an algorithm is the determination of how many times the basic operation is done for each value of the input size.' },

    { t:'h', x:'Every-case time complexity T(n)' },
    { t:'p', x:'T(n) is defined as the number of times the algorithm does the basic operation for an instance of size n — it exists only when that count is the **same for every input** of size n.' },

    { t:'h3', x:'Example 1 — adding array members' },
    { t:'code', lang:'java', cap:'T(n) = n', x:
`int sum(int n, int array[]) {
   int result = 0;
   for (int i = 0; i < n; i++)
      result = result + array[i];   // basic operation
   return result;
}` },
    { t:'formula', x:'T(n) = n' },
    { t:'p', x:'The loop runs exactly n times whatever the array contains, so there is an every-case complexity.' },

    { t:'h3', x:'Example 2 — exchange sort' },
    { t:'code', lang:'java', cap:'The comparison is the basic operation', x:
`void exchangesort(int n, keytype S[]) {
   for (int i = 0; i < n; i++)
      for (int j = i+1; j < n; j++)
         if (S[j] < S[i])            // basic operation
            exchange S[i] and S[j];
}` },
    { t:'p', x:'The inner loop runs n−1 times when i = 0, then n−2, then n−3 … down to 1. Adding those up:' },
    { t:'formula', x:'T(n) = (n−1) + (n−2) + … + 2 + 1 = n(n−1)/2' },
    { t:'note', k:'trap', title:'Comparison, not exchange', x:'The **comparison** is the basic operation and happens every time. The **exchange** only happens when the condition is true, so it has no every-case complexity — its count depends on the input.' },

    { t:'h3', x:'Example 3 — matrix multiplication' },
    { t:'code', lang:'java', cap:'Three nested loops', x:
`void matrixmult(int n, number A[][], number B[][], number C[][]) {
   for (int i = 0; i < n; i++)
      for (int j = 0; j < n; j++) {
         C[i][j] = 0;
         for (int k = 0; k < n; k++)
            C[i][j] = C[i][j] + A[i][k] * B[k][j];   // basic operation
      }
}` },
    { t:'formula', x:'T(n) = n × n × n = n³' },

    { t:'widget', w:'loopCounter' },

    { t:'h', x:'When there is no every-case complexity' },
    { t:'p', x:'Sequential search does not have an every-case complexity: if the key is in slot 1 you stop after one comparison, if it is not there at all you do n. So we describe it three ways instead.' },
    { t:'table', head:['','Definition','Sequential search'], rows:[
      ['**W(n)** worst case','The **maximum** number of times the basic operation is done, over all instances of size n','W(n) = n'],
      ['**B(n)** best case','The **minimum** number of times, over all instances of size n','B(n) = 1'],
      ['**A(n)** average case','The **expected** number of times, over all instances of size n, weighted by how likely each is','A(n) = (n+1)/2 when the key is certainly present']
    ]},
    { t:'note', k:'exam', title:'Relationship', x:'B(n) ≤ A(n) ≤ W(n) always. And when T(n) exists, T(n) = B(n) = A(n) = W(n).' },

    { t:'h', x:'Working out A(n) properly' },
    { t:'p', x:'Average case needs probability. You define a sample space of inputs, a random variable that maps each input to its running time, and a probability distribution over the inputs — then take the expected value.' },
    { t:'formula', x:'E[X] = Σ  x · Pr(X = x)          "value × probability, summed"' },
    { t:'h3', x:'Case 1 — the key is definitely in the array' },
    { t:'p', x:'If the key is equally likely to be in any of the n slots, each has probability 1/n, and finding it in slot i costs i comparisons:' },
    { t:'formula', x:'A(n) = Σᵢ₌₁ⁿ i × (1/n) = (1/n) × n(n+1)/2 = (n+1)/2' },
    { t:'h3', x:'Case 2 — the key might not be there at all' },
    { t:'p', x:'Let p be the probability the key is in the array. Then each slot has probability p/n, and with probability 1−p you do the full n comparisons and fail:' },
    { t:'formula', x:'E(n) = 1·(p/n) + 2·(p/n) + … + n·(p/n) + n·(1−p)\n     = n(1 − p/2) + p/2' },
    { t:'p', x:'Sanity check it: with p = 1 (always present) this gives n(1 − ½) + ½ = (n+1)/2, matching case 1. With p = 0 (never present) it gives n. Both are what you would expect.' },

    { t:'fill', id:'cx-f1', title:'Plug in the probability', lang:'text',
      prompt:'Using A(n) = n(1 − p/2) + p/2 with n = 100 and p = 1, what is A(n)? And with p = 0?',
      code: 'p = 1  ->  A(100) = {{0}}\np = 0  ->  A(100) = {{1}}',
      answers: [['50.5','50.5 ','101/2'],['100']],
      hint: 'Substitute carefully. With p = 1 the formula collapses to (n+1)/2.',
      sol: 'p = 1 → 100(1 − 0.5) + 0.5 = **50.5**, which is (100+1)/2. p = 0 → 100(1 − 0) + 0 = **100**, the full failed scan.' },

    { t:'h', x:'W(n) for binary search' },
    { t:'p', x:'Count how many elements can be resolved at each pass. Pass 1 resolves 1 element, pass 2 resolves 2, pass 3 resolves 4, pass i resolves 2^(i−1). After i passes the largest array you can fully cover is:' },
    { t:'formula', x:'2⁰ + 2¹ + 2² + … + 2^(i−1) = 2^i − 1 = n\n\n=>  2^i = n + 1\n=>  i = log₂(n + 1)' },
    { t:'p', x:'Because you cannot do a fractional pass, the real answer takes the ceiling:' },
    { t:'table', head:['Array size n','log₂(n+1)','⌈log₂(n+1)⌉ = W(n)'], rows:[
      ['7','3','3'],['15','4','4'],['16','4.0875','5'],['19','4.3219','5'],
      ['29','4.9069','5'],['31','5','5'],['1023','10','10'],['1048575','20','20']
    ]},
    { t:'note', k:'exam', title:'What to write in the exam', x:'W(n) = ⌈log₂(n + 1)⌉, which is the same as ⌊log₂ n⌋ + 1. The lecture note says: **for simplicity we can use i = log₂ n**, and the Big O order is O(log n) either way. Do not lose marks arguing about the ceiling — state it, then simplify.' },

    { t:'mcq', id:'cx-q1',
      q:'Exchange sort has T(n) = n(n−1)/2. Does it have an every-case time complexity for the number of **exchanges**?',
      opts:[
        'Yes, also n(n−1)/2',
        'No — the number of exchanges depends on how sorted the input already is',
        'Yes, exactly n',
        'No, because exchange sort is recursive'
      ],
      a:1,
      why:'An every-case complexity exists only when the count is identical for every input of size n. Comparisons always happen; exchanges happen only when S[j] < S[i], which depends entirely on the input. So the comparisons have an every-case complexity and the exchanges do not.' },

    { t:'mcq', id:'cx-q2',
      q:'Which of these is the correct reason we do not measure running time in CPU cycles?',
      opts:[
        'CPU cycles are too hard to count',
        'It would depend on the computer the algorithm runs on, and we want a machine-independent measure',
        'Cycles vary with the size of the input',
        'Because Big O only accepts whole numbers'
      ],
      a:1,
      why:'The notes are explicit: we do not determine the actual number of CPU cycles because it depends on the computer, and we do not count instructions because that depends on the language. We want a measure independent of computer, language, programmer and implementation detail.' },

    { t:'reveal', id:'cx-r1', title:'Lab Week 3, Question 2A', scratch:true,
      q:'Find the best, worst and average time complexity for binary search. Does it have an every-case time complexity?',
      ans:'**B(n) = 1** — the key is the middle element and you find it on the first comparison.<br><br>**W(n) = ⌈log₂(n+1)⌉ ≈ log₂ n + 1** — derived above. This is O(log n).<br><br>**A(n) ≈ log₂ n − 1** for a successful search (the derivation weights each depth by how many elements sit at that depth: one element is found at depth 1, two at depth 2, four at depth 3, and so on, so most elements are near the bottom and the average is only about one comparison less than the worst case).<br><br>**No, there is no every-case complexity** — B(n) = 1 and W(n) ≈ log₂ n + 1 differ, so the count is not the same for every input of size n.<br><br>The useful observation for the lab discussion: for binary search, average and worst are almost identical, because the overwhelming majority of the elements live in the bottom level of the search tree. Sequential search is the opposite — its average, (n+1)/2, is half its worst case.' }
  ]
},

/* ============================================================ */
{
  id: 'bigo', group: 'Week 3 · Big O', nav: 'Big O order',
  eyebrow: 'Lecture 3.1 & 3.2',
  title: 'Big O order',
  lede: 'Big O throws away the constants and the low-order terms, and keeps the shape of the curve.',
  blocks: [
    { t:'h', x:'Order' },
    { t:'p', x:'Order groups algorithms according to their **eventual** behaviour. Algorithms with complexities like n and 100n are **linear-time** because their complexity is linear in the input size n. Algorithms with complexities like n² and 0.01n² are **quadratic-time**.' },
    { t:'note', k:'def', title:'Pure vs complete', x:'Functions like 5n² and 5n² + 100 are called **pure quadratic** functions, because they contain no linear term. A function like 0.1n² + n + 100 is a **complete quadratic** function, because it contains a linear term. Both are O(n²).' },
    { t:'p', x:'**Throw away low-order terms when classifying complexity functions.** For example 0.1n³ + 10n² + 5n + 25 ≅ n³, a pure cubic function. When an algorithm\'s time complexity is a polynomial of order 2 it is called a quadratic-time algorithm.' },

    { t:'widget', w:'growth' },

    { t:'h', x:'The complexity categories' },
    { t:'p', x:'The categories used in this course, in increasing order of growth:' },
    { t:'table', head:['Order','Name','Where you have seen it'], rows:[
      ['O(1)','Constant','Inserting at a known position in a linked list'],
      ['O(log n)','Logarithmic','Binary search'],
      ['O(n)','Linear','Sequential search; summing an array; iterative Fibonacci'],
      ['O(n log n)','Linearithmic','Good general-purpose sorts'],
      ['O(n²)','Quadratic','Exchange sort; insertion sort worst case'],
      ['O(n³)','Cubic','Matrix multiplication'],
      ['O(2ⁿ)','Exponential','Recursive Fibonacci (> 2^(n/2))']
    ]},

    { t:'order', id:'bigo-o1', title:'Put these in increasing order of growth',
      prompt:'Slowest-growing at the top. Use the arrows.',
      items:['O(1)','O(log n)','O(n)','O(n log n)','O(n²)','O(n³)','O(2ⁿ)'],
      ok:'Constant, logarithmic, linear, linearithmic, quadratic, cubic, exponential — every one of them appears somewhere in this course.',
      no:'Think about which grows faster for large n, not for n = 2. At n = 2, n² and 2ⁿ are equal; by n = 20 they are 400 and a million.' },

    { t:'h', x:'The formal definition' },
    { t:'p', x:'Big O notation describes an **upper bound** on the time (and space) usage of an algorithm. Here n refers to the size of the input, and the order refers to the amount of time the algorithm takes to finish on an input of that size.' },
    { t:'note', k:'def', title:'Formal definition', x:'For a given complexity function f(n), saying f(n) is O(g(n)) means there are **positive constants c and N** such that:<br><br>&nbsp;&nbsp;&nbsp;&nbsp;0 ≤ f(n) ≤ c · g(n)&nbsp;&nbsp; for all n ≥ N' },
    { t:'p', x:'In words: past some point N, the function f never rises above g scaled by some constant c. Big O expressions therefore do not have constants or low-order terms, because once N gets large enough, constants and low-order terms do not matter.' },

    { t:'h3', x:'The worked example' },
    { t:'p', x:'What is the Big O order of n² + 3n + 4?' },
    { t:'formula', x:'n² + 3n + 4  ≤  n² + 3n² + 4n²      for all n > 0\n             =  8n²\n\nSo with c = 8 and N = 1:   0 ≤ n² + 3n + 4 ≤ 8n²   for all n ≥ 1\n\nAnswer: O(n²)' },
    { t:'note', k:'', title:'The trick', x:'Replace every lower-power term with the highest power. Since n ≤ n² and 1 ≤ n² for all n ≥ 1, you can bound 3n by 3n² and 4 by 4n². Add the coefficients: 1 + 3 + 4 = 8, so c = 8 and N = 1. It is also perfectly valid to pick c = 2 and N = 10 — **the final answer is the same**, because you only have to find *one* pair that works, not the best pair.' },

    { t:'widget', w:'bigoProof' },

    { t:'h', x:'Asymptotic behaviour' },
    { t:'p', x:'Big O describes the **asymptotic** behaviour of a function, because it is concerned only with eventual behaviour. Big O puts an asymptotic **upper** bound on a function. Similar notation describes the *least* amount of a resource an algorithm needs for some class of input — the lower bound, denoted Ω (omega).' },
    { t:'note', k:'exam', title:'Good news', x:'The lecture says Ω **will not be covered**. You need Big O only.' },

    { t:'pairs', id:'bigo-p1', title:'Classify each function',
      prompt:'Give the Big O order of each complexity function.',
      cats:['O(log n)','O(n)','O(n log n)','O(n²)','O(n³)','O(2ⁿ)'],
      items:[
        {x:'5n² + 100', a:'O(n²)'},
        {x:'0.1n³ + 10n² + 5n + 25', a:'O(n³)'},
        {x:'100n + 3', a:'O(n)'},
        {x:'log₂(n + 1)', a:'O(log n)'},
        {x:'n(n−1)/2', a:'O(n²)'},
        {x:'2^(n/2) + n³', a:'O(2ⁿ)'}
      ]},

    { t:'mcq', id:'bigo-q1',
      q:'A student writes "T(n) = 3n² + 5n is O(n³)". Is this correct?',
      opts:[
        'No — the order must match the highest power exactly',
        'Yes — Big O is an upper bound, and n³ is a valid (if loose) upper bound',
        'No — you cannot mix powers',
        'Only if c > 3'
      ],
      a:1,
      why:'Big O is an *upper* bound, so any function that eventually dominates works — 3n² + 5n ≤ 8n³ for all n ≥ 1. It is technically true but uselessly loose; in an exam you give the tightest bound, O(n²). Recognising that O is an upper bound and not an exact match is exactly what this kind of question is testing.' },

    { t:'reveal', id:'bigo-r1', title:'Prove it yourself', scratch:true,
      q:'Show that 4n² + 20n + 6 is O(n²). State your c and N.',
      ans:'For all n ≥ 1 we have n ≤ n² and 1 ≤ n², so:<br><br>4n² + 20n + 6 ≤ 4n² + 20n² + 6n² = 30n²<br><br>Take **c = 30** and **N = 1**. Then 0 ≤ 4n² + 20n + 6 ≤ 30n² for all n ≥ 1, so the function is O(n²).<br><br>Any other working pair is equally correct — for example c = 5 with N = 22 also holds, since past n = 22 the 4n² term dominates so completely that a scale of 5 is enough. Show one pair and you have the marks.' }
  ]
},

/* ============================================================ */
{
  id: 'insertion', group: 'Week 3 · Big O', nav: 'Insertion sort & DS choice',
  eyebrow: 'Lecture 3.2',
  title: 'Insertion sort, and the cost of choosing a data structure',
  lede: 'One sorting algorithm analysed all the way through, then the table that answers "which structure?" questions.',
  blocks: [
    { t:'h', x:'How insertion sort works' },
    { t:'p', x:'An insertion sort algorithm is one that sorts by **inserting records into an existing sorted array**. Everything to the left of position i is already in order; you take the element at i and slide it left past every larger element until it lands in the right place.' },
    { t:'code', lang:'java', cap:'Insertion sort', x:
`void sort(int arr[]) {
   int n = arr.length;
   for (int i = 1; i < n; ++i) {
      int key = arr[i];
      int j = i - 1;

      /* Move elements of arr[0..i-1] that are greater than key
         to one position ahead of their current position */
      while (j >= 0 && arr[j] > key) {
         arr[j+1] = arr[j];
         j = j - 1;
      }
      arr[j+1] = key;
   }
}` },

    { t:'widget', w:'insertionSort' },

    { t:'h', x:'The worst case' },
    { t:'p', x:'The worst case is a **reverse-sorted** array: every element has to travel all the way to the front. On pass i the inner loop does i comparisons, so:' },
    { t:'formula', x:'W(n) = 1 + 2 + … + (n−1) = n(n−1)/2\n\nBig O order for the worst case:  O(n²)' },

    { t:'h', x:'The best case' },
    { t:'p', x:'When the array is **already sorted**, the `while` condition `arr[j] > key` fails immediately on every pass. That is one comparison per pass, n−1 in total:' },
    { t:'formula', x:'B(n) = n − 1        Big O order for the best case:  O(n)' },
    { t:'note', k:'exam', title:'The exam sentence', x:'"The Big O order for the worst case is O(n²). What is the best case? When the array is already sorted, the order is O(n)."' },

    { t:'h3', x:'The average case' },
    { t:'p', x:'Sample Test I asks for the Big O order of the **average** time complexity of insertion sort. The reasoning: to place the element at slot k it may move 1, 2, … up to k positions, each equally likely with probability 1/k. So the expected number of passes to place s[k] is:' },
    { t:'formula', x:'E(s[k]) = (1/k)·1 + (1/k)·2 + … + (1/k)·k\n        = (1/k) · k(k+1)/2\n        = (k+1)/2\n\nSumming over all k:\nE(s) = 2/2 + 3/2 + 4/2 + … + n/2 = (1/2)·n(n+1)/2 − 1  ≅  n²\n\nHence Big O is O(n²)' },
    { t:'note', k:'', title:'The shortcut if you run out of time', x:'Even without the full expectation derivation you can argue: on average each element travels about half as far as in the worst case, so the average is about half of n(n−1)/2 — and halving does not change the order. **A(n) is O(n²).** State that, and show whatever working you have.' },

    { t:'mcq', id:'ins-q1',
      q:'Insertion sort is run on an array that is already sorted. What is the order?',
      opts:['O(n²)','O(n log n)','O(n)','O(1)'],
      a:2,
      why:'Each pass makes exactly one comparison, which fails immediately, so there are n−1 comparisons in total and no shifting at all. That is O(n) — insertion sort\'s one genuine strength.' },

    { t:'h', x:'Choice of data structure' },
    { t:'p', x:'The end of the lecture reduces the whole "which data structure" question to a table of orders:' },
    { t:'table', head:['Operation','Array','Linked list'], rows:[
      ['Insert an element (worst case)','O(n) — everything after the insertion point must shift','O(1) — relink two pointers'],
      ['Retrieve element i','O(1) — direct index arithmetic','O(n) — you must walk from the head']
    ]},
    { t:'note', k:'exam', title:'How to use this', x:'Ask which operation the application does most. Retrieval-heavy → array (or hash table). Insertion/deletion-heavy → linked list. This is the reasoning the sample test wants when it says "retrieval has higher priority than insertion" about the library search system.' },

    { t:'h', x:'Writing efficient algorithms' },
    { t:'p', x:'The lecture\'s checklist:' },
    { t:'ul', x:[
      'Good programming skills.',
      'Use built-in algorithms, which are well tested and have a known Big O order.',
      'Good analytical ability and understanding of mathematics.',
      'Know the strengths and weaknesses of data structures.'
    ]},

    { t:'fill', id:'ins-f1', title:'Complete the analysis', lang:'text',
      prompt:'Fill in the three orders for insertion sort.',
      code: 'Worst case  (reverse sorted): n(n-1)/2   -> O({{0}})\nBest case   (already sorted): n - 1      -> O({{1}})\nAverage case:                 approx n^2 -> O({{2}})',
      answers: [['n^2','n2','n²'],['n'],['n^2','n2','n²']],
      hint: 'Write n^2 or n. Only the highest-order term survives.',
      sol: 'Worst **O(n²)**, best **O(n)**, average **O(n²)**. Insertion sort is quadratic in general but linear on nearly-sorted data, which is why it is used as the base case inside bigger sorting algorithms.' }
  ]
},

/* ============================================================ */
{
  id: 'lab', group: 'Practice', nav: 'Interactive labs',
  eyebrow: 'Practice',
  title: 'Interactive labs',
  lede: 'Everything with a moving part, in one place. Change the numbers and watch the counters.',
  blocks: [
    { t:'h', x:'1 · Sequential vs binary search' },
    { t:'p', x:'Set an array size and a target, then step both algorithms and compare the comparison counts. Lab Week 3 Question 2C asks you to plot exactly this.' },
    { t:'widget', w:'searchRace' },

    { t:'h', x:'2 · Growth of orders' },
    { t:'p', x:'The realisation of different orders. Watch how quickly 2ⁿ leaves the chart, and how flat log n stays.' },
    { t:'widget', w:'growth' },

    { t:'h', x:'3 · Count the loop operations' },
    { t:'p', x:'Pick a nested loop, pick an n, and see the exact operation count alongside the closed form and the Big O order. The third snippet is Sample Test I Question 3.' },
    { t:'widget', w:'loopCounter' },

    { t:'h', x:'4 · Find c and N' },
    { t:'p', x:'The Big O definition made visual: slide c and N until f(n) sits underneath c·g(n) for every n past N.' },
    { t:'widget', w:'bigoProof' },

    { t:'h', x:'5 · Insertion sort, pass by pass' },
    { t:'p', x:'Try a reverse-sorted array for the worst case, then a sorted one for the best case, and compare the comparison counters.' },
    { t:'widget', w:'insertionSort' },

    { t:'h', x:'6 · Average case simulator' },
    { t:'p', x:'A(n) for sequential search is a formula, but it is also just an average over many runs. Run a few thousand random searches and watch the empirical mean settle onto n(1 − p/2) + p/2.' },
    { t:'widget', w:'avgCase' }
  ]
},

/* ============================================================ */
{
  id: 'sampletest', group: 'Practice', nav: 'Sample Test I',
  eyebrow: 'Past paper',
  title: 'Sample Test I, worked through',
  lede: '50 minutes, 10 marks, 10% of the final grade. Four questions. Try each one before you open the answer.',
  blocks: [
    { t:'note', k:'exam', title:'Format', x:'All questions compulsory. Answers written in the booklet. No course material or internet search allowed. The suggested timings on the paper were 10 + 10 + 10 + 20 minutes — the last question is worth the most and takes the longest, so do not get stuck on Q1.' },

    { t:'h', x:'Question 1 — data structure choice (1 + 2 marks)' },
    { t:'p', x:'USP library uses an efficient online system to search for books. Book names are stored in an appropriate data structure along with authors, editions, publisher etc. Users search by providing the title; the system picks the key words and displays the result. For example the word "algorithm" may display many titles such as "data structures & algorithms", "complexity of algorithms", "writing algorithm in C++". What is the best data structure for this scenario? Justify your answer.' },
    { t:'reveal', id:'st-1', title:'Answer to Question 1', scratch:true, q:'Write your answer, then reveal.',
      ans:'**Hash table / 2D linked list / heap / priority queue** — the sample solution accepts these, and the reason it gives for all of them is the same: **retrieval has a higher priority than insertion**.<br><br>The justification developed in the solution, using a heap:<br>• A heap is a complete tree — all levels completely filled except possibly the last — so searching it vertically over an alphabetic range costs about log<sub>k</sub> n in the average case.<br>• The value of each node relates to its parent, so higher-priority items (commonly used words) can be placed near the top and found quickly.<br>• The priority itself comes from **indexing** — tracking how often each word is used, so higher usage gives higher priority.<br><br>The mark split is 1 for naming a structure and 2 for the justification, so a bare "hash table" scores a third of the marks. Always say what operation dominates and why your structure is fast at it.' },

    { t:'h', x:'Question 2 — iterative vs recursive (1 + 2 marks)' },
    { t:'p', x:'Algorithm X is written both iteratively and recursively. Testers find the iterative approach is somewhat slower. Operation counts: size 1 → 5 vs 2, size 2 → 10 vs 4, size 3 → 15 vs 6, size 4 → 20 vs 8. Do you agree with the claim of the testers? Explain.' },
    { t:'reveal', id:'st-2', title:'Answer to Question 2', scratch:true, q:'Write your answer, then reveal.',
      ans:'The sample solution awards 1 mark simply for committing to yes or no, and 2 marks for the explanation.<br><br>**Both have linear time complexity** — iterative is 5n, recursive is 2n, and both are O(n). It does not matter which one you use.<br><br>The solution\'s stated preference: iterative approaches are generally easier to use, so it prefers iterative even though it is slightly slower, because computationally the difference is negligible.<br><br>The concept being examined is that a constant factor is not a complexity difference. Contrast this with recursive vs iterative Fibonacci, where the gap is exponential vs linear and genuinely does matter.' },

    { t:'h', x:'Question 3 — every-case complexity (1 + 1 marks)' },
    { t:'code', lang:'text', cap:'Find the every-case time complexity. Show your working.', x:
`D = 2
for i = 1 to n do
   for j = i to n do
      for k = j + 1 to n do
         D = D * 3` },
    { t:'p', x:'Try it in the loop counter first — pick "Sample Test Q3" from the dropdown and check your closed form against the exact count.' },
    { t:'reveal', id:'st-3', title:'Answer to Question 3', scratch:true, q:'Write your answer, then reveal.',
      ans:'**T(n) is approximately n³, so the order is O(n³).**<br><br>The solution works bottom-up. For a fixed i, the j and k loops together run:<br>(n−1) + (n−2) + … + 1 = n(n+1)/2 ≈ n²/2 times when i = 1;<br>fewer as i grows: (n−2) + (n−3) + … for i = 2, and so on down to 1 time when i = n.<br><br>The i loop runs n times, and each iteration costs on the order of n², so the total is on the order of **n × n² = n³**.<br><br>The exact count is n(n−1)(n+1)/6 = (n³ − n)/6, which is Θ(n³) — but the sample solution accepts the order argument. **Show the bottom-up working**: 1 of the 2 marks is for the working, not the answer.' },

    { t:'h', x:'Question 4 — average case of insertion sort (2 marks + 1 bonus)' },
    { t:'p', x:'What is the Big O order of the average time complexity for insertion sort?' },
    { t:'reveal', id:'st-4', title:'Answer to Question 4', scratch:true, q:'Write your answer, then reveal.',
      ans:'**O(n²).**<br><br>The full derivation, using E(X) = pass × P(e₁) + pass × P(e₂) + … :<br><br>To place the element at slot k it may move to any of k positions, each with probability 1/k. So:<br>E(s[k]) = (1/k)·1 + (1/k)·2 + … + (1/k)·k = (1/k)·k(k+1)/2 = (k+1)/2<br><br>Working the first few: E(s[1]) = 1, E(s[2]) = 3/2, E(s[3]) = 4/2, … E(s[n]) = (n+1)/2.<br><br>Summing: E(s) = 2/2 + 3/2 + 4/2 + … + n/2 = (1/2)·n(n+1)/2 − 1 ≅ n², **hence Big O is O(n²)**.<br><br>If the expectation algebra deserts you, the 2 marks are mostly recoverable by arguing that each element on average travels half the worst-case distance, so A(n) ≈ ½ · n(n−1)/2, and halving does not change the order.' },

    { t:'h', x:'Timing strategy' },
    { t:'note', k:'', title:'Where the marks are', x:'7 of the 10 marks are for **evaluating efficiency** (Q2, Q3, Q4) and 3 are for **assessing suitability** (Q1). If you are short on time, a stated Big O order with a one-line justification is worth far more per minute than a half-finished expectation sum.' }
  ]
},

/* ============================================================ */
{
  id: 'cheatsheet', group: 'Practice', nav: 'Cheat sheet',
  eyebrow: 'Reference',
  title: 'Everything on one page',
  lede: 'For the night before. If you can reconstruct this page from memory you are ready.',
  blocks: [
    { t:'h', x:'Complexity of the algorithms in this course' },
    { t:'table', head:['Algorithm','B(n)','A(n)','W(n)','Big O (worst)'], rows:[
      ['Sequential search','1','(n+1)/2 if present; n(1−p/2)+p/2 in general','n','O(n)'],
      ['Binary search','1','≈ log₂ n − 1','⌈log₂(n+1)⌉','O(log n)'],
      ['Sum an array','n','n','n','O(n) — every-case T(n) = n'],
      ['Exchange sort (comparisons)','n(n−1)/2','n(n−1)/2','n(n−1)/2','O(n²) — every-case'],
      ['Insertion sort','n−1','≈ n²','n(n−1)/2','O(n²)'],
      ['Matrix multiplication','n³','n³','n³','O(n³) — every-case'],
      ['Fibonacci, iterative','n+1 terms','n+1','n+1','O(n)'],
      ['Fibonacci, recursive','—','—','> 2^(n/2) terms','O(2ⁿ)']
    ]},

    { t:'h', x:'Formulas you will actually need' },
    { t:'formula', x:'Sum 1..n            1 + 2 + … + n = n(n+1)/2\nSum 1..n−1          1 + 2 + … + (n−1) = n(n−1)/2\nPowers of two       2⁰ + 2¹ + … + 2^(i−1) = 2^i − 1\nExpected value      E[X] = Σ x · Pr(X = x)\nBig O               f(n) is O(g(n)) iff ∃ c, N > 0 : 0 ≤ f(n) ≤ c·g(n) for all n ≥ N\nSeq. search avg     A(n) = n(1 − p/2) + p/2\nBinary search worst W(n) = ⌈log₂(n+1)⌉ = ⌊log₂ n⌋ + 1' },

    { t:'h', x:'Order of growth, slowest to fastest' },
    { t:'formula', x:'O(1)  <  O(log n)  <  O(n)  <  O(n log n)  <  O(n²)  <  O(n³)  <  O(2ⁿ)' },

    { t:'h', x:'Data structure quick reference' },
    { t:'table', head:['Structure','Rule','Reach for it when'], rows:[
      ['Array','Indexed, fixed size','Retrieval dominates, size is known'],
      ['Linked list','Chained nodes','Insertion and deletion dominate'],
      ['Stack','LIFO','Undo, expression parsing, call/return tracking'],
      ['Queue','FIFO','First-come-first-served, message queuing'],
      ['Priority queue / heap','Highest priority out first','Order depends on a value, not arrival time'],
      ['Hash table','Key → slot','Fast lookup by key; retrieval far exceeds insertion'],
      ['Tree','Hierarchy','Hierarchical data, ordered search']
    ]},
    { t:'formula', x:'Insert an element:    array O(n)      linked list O(1)\nRetrieve element i:  array O(1)      linked list O(n)' },

    { t:'h', x:'Java rules that get tested' },
    { t:'ul', x:[
      'Signature = number, type and order of parameters. **Return type is not part of it.**',
      'Overloading = same name, different signature, same class, resolved at compile time.',
      'Overriding = same signature *and* same return type, subclass, resolved at run time.',
      'Cannot override: `final` methods, `static` methods.',
      'Access, narrowest first: `private` (−) < `package` (~) < `protected` (#) < `public` (+).',
      '**Only instance methods are dynamically bound.** Fields, static variables and static methods are static-bound.',
      'Upcasting (derived → base) is implicit and always safe. Downcasting is explicit and checked at run time.',
      'Casting never changes which overridden **method** runs; it does change which shadowed **field** you see.',
      '`super.super.x` is invalid.',
      'Java has no multiple class inheritance; interfaces give you the equivalent.',
      'Abstract class: can implement methods, extend only one. Interface: no implementations, implement many.',
      'An abstract class needs no abstract methods, but any class *with* one must be abstract.',
      'You can declare a reference to an abstract type; you cannot instantiate it.',
      'Interface fields are implicitly `public static final`.',
      '`compareTo` returns negative / zero / positive.',
      '`Object.clone()` is shallow — override it for a deep copy. Not implementing `Cloneable` gives `CloneNotSupportedException`.',
      'Primitives and Strings are always passed by value.',
      'Association = "has a" (line). Aggregation = "has a part" (empty diamond). Composition = parts die with the whole (filled diamond). Generalization = "is a" (clear triangle).'
    ]},

    { t:'h', x:'Definitions in one line each' },
    { t:'table', head:['Term','One-line definition'], rows:[
      ['Data structure','A way of organising data so that it is easier to use'],
      ['Problem','A question to which we seek an answer'],
      ['Parameter','A variable in a problem not given a specific value in its statement'],
      ['Instance','One specific assignment of values to the parameters'],
      ['Algorithm','A general step-by-step procedure producing a solution to each instance'],
      ['Basic operation','The operation whose count is proportional to total running time'],
      ['Input size','The measure of the input that the basic-operation count is a function of'],
      ['T(n)','Every-case: the count is the same for every input of size n'],
      ['W(n)','Worst case: the maximum count over all inputs of size n'],
      ['B(n)','Best case: the minimum count over all inputs of size n'],
      ['A(n)','Average case: the expected count, weighted by input probability'],
      ['Big O','An asymptotic upper bound on a complexity function'],
      ['Ω (omega)','An asymptotic lower bound — not examined in this course'],
      ['Polymorphism','Objects of different types responding to the same method name with type-specific behaviour'],
      ['Late/dynamic binding','The implementation is chosen at run time from the actual object'],
      ['Shadowing','A subclass field with the same name as a parent field, hiding it'],
      ['Singleton','A pattern allowing only one object to be created from a class']
    ]},

    { t:'note', k:'exam', title:'If you remember nothing else', x:'Find the basic operation. Count how many times it runs as a function of n. Drop the constants and the low-order terms. Name the order. That single procedure is 7 of the 10 marks.' }
  ]
}

];
