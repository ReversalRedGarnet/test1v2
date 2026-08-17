/* ============================================================
   CS214 Revise — quiz bank + exercise set
   ============================================================ */

const QUIZ_BANK = [

/* ---- Week 1: data structures ---- */
{ topic:'Data structures', q:'What is a data structure?',
  opts:['A value or set of values of a given type','A way of organising data so that it is easier to use','Any class that implements Comparable','A measure of how much RAM a program uses'],
  a:1, why:'Data is a value or set of values; structure is a way of organising information; a data structure is a way of organising data so that data can be easier to use.' },

{ topic:'Data structures', q:'Which is NOT one of the four criteria the lecture gives for choosing a data structure?',
  opts:['Must meet requirement','High performance','Low RAM footprint','Written in Java'],
  a:3, why:'The four criteria are: must meet requirement, high performance, low RAM footprint, easy to implement.' },

{ topic:'Data structures', q:'A stack is based on which rule?',
  opts:['FIFO — first in, first out','LIFO — last in, first out','Highest priority out first','Sorted order'],
  a:1, why:'Stack is LIFO. Its applications include parsing algebraic expressions and keeping track of variables and return addresses for function calls.' },

{ topic:'Data structures', q:'Which property makes a binary heap a heap rather than just a binary tree?',
  opts:['It is complete, and each node relates by value to its parent','It stores only integers','It has exactly log n levels','Every node has two children'],
  a:0, why:'A heap is a complete binary tree — all levels filled except possibly the last — and the value of each node is greater (or less) than or equal to the value of its parent.' },

{ topic:'Data structures', q:'`Arrays.binarySearch(a, key)` gives a wrong answer when…',
  opts:['the array contains duplicates','the array is not sorted','key is negative','the array is longer than 1024'],
  a:1, why:'Binary search compares against the middle element and discards half the array. That reasoning only holds on a sorted array.' },

{ topic:'Data structures', q:'Which structure would you choose for a call centre that must serve callers strictly in arrival order?',
  opts:['Stack','Hash table','Queue','Heap'],
  a:2, why:'First-come-first-served is FIFO, which is the queue rule. This is Lab Week 2 Question 1.' },

{ topic:'Data structures', q:'A `PriorityQueue<String>` needs which extra object to know the ordering?',
  opts:['An Iterator','A Comparator','A Cloneable','A ClassCastException'],
  a:1, why:'`new PriorityQueue<String>(SIZE, comparator)` — and writing the comparator requires understanding inheritance, which is why the lecture defers it.' },

/* ---- Week 1: Java OOP ---- */
{ topic:'Java OOP', q:'Which is part of a method signature?',
  opts:['The return type','The number, type and order of the parameters','The access modifier','The name of the class'],
  a:1, why:'The signature includes the number, type and order of the parameters. The return type is explicitly NOT part of the signature.' },

{ topic:'Java OOP', q:'Two methods in the same class have the same name and identical parameters but different return types. What happens?',
  opts:['They overload correctly','They override each other','Compile error','The one declared first wins'],
  a:2, why:'Return type is not part of the signature, so the compiler cannot decide which one you meant — it is a compile error, not an overload.' },

{ topic:'Java OOP', q:'Which access level allows the class itself, other classes in the same package, AND subclasses?',
  opts:['private','package','protected','public'],
  a:2, why:'protected (#) is package access plus subclasses. Remember the mnemonic: you know, everyone in the same group knows, and your children know.' },

{ topic:'Java OOP', q:'What access level do you get if you write no modifier at all?',
  opts:['private','package','protected','public'],
  a:1, why:'Package (~) is the default access level when no access level is specified. It is not a keyword you can type.' },

{ topic:'Java OOP', q:'Which of these CANNOT be overridden?',
  opts:['A public instance method','A protected instance method','A static method','A method that calls super'],
  a:2, why:'Only non-static methods can be overridden. A subclass also cannot override methods declared final.' },

{ topic:'Java OOP', q:'In UML, inheritance is drawn as…',
  opts:['an empty diamond','a filled diamond','a clear triangle','a dashed arrow'],
  a:2, why:'Clear triangle = generalization/inheritance. Empty diamond = aggregation. Filled diamond = composition. Plain line = association.' },

{ topic:'Java OOP', q:'`super.super.x` is…',
  opts:['how you reach a grandparent field','valid only inside a constructor','not valid','equivalent to ((Base)this).x'],
  a:2, why:'The notes state plainly that super.super.x is not valid. You can reach a parent field with super.x or with a cast, but Java gives you no way to skip two levels.' },

{ topic:'Java OOP', q:'Which is the third basic principle of object oriented programming, according to the lecture?',
  opts:['Encapsulation','Inheritance','Polymorphism','Abstraction'],
  a:2, why:'The polymorphism lecture describes it as the third basic principle of OOP, and notes that overloading and overriding are its two types.' },

{ topic:'Java OOP', q:'`Base b = new Derived();` — this assignment is an example of…',
  opts:['downcasting, and needs an explicit cast','upcasting, which is implicit and always safe','shadowing','a compile error'],
  a:1, why:'Derived → Base moves up the inheritance diagram. The derived class is a superset of the base class, so it must contain at least the base class methods; that is why the compiler allows it without an explicit cast.' },

{ topic:'Java OOP', q:'`d = (derived) b;` where b really refers to a plain `base` object. What happens?',
  opts:['Compile error','Compiles, then fails at run time','Compiles and runs fine','Silently returns null'],
  a:1, why:'The cast convinces the compiler to allow the narrowing conversion. The run-time check then determines whether the class of the object being cast is compatible with the new type — here it is not.' },

{ topic:'Java OOP', q:'Which category of member is DYNAMICALLY bound?',
  opts:['Instance variables','Static variables','Instance methods','Static methods'],
  a:2, why:'Instance methods are the only dynamically bound case. Instance variables, shadowed variables, static variables and static methods are all statically bound.' },

{ topic:'Java OOP', q:'`Base r = new Derived();` Both classes declare `int x`. What does `r.x` give you?',
  opts:['Derived\'s x, because of the object','Base\'s x, because fields are statically bound','A compile error','Whichever was assigned last'],
  a:1, why:'Fields are resolved from the declared type of the reference at compile time. This is the classic contrast with r.show(), which would call Derived\'s override because instance methods are dynamically bound.' },

{ topic:'Java OOP', q:'Casting an object to a different type changes…',
  opts:['which overridden method is invoked','only the compiler\'s treatment of the reference','the object\'s actual type','nothing at all'],
  a:1, why:'Casting does not change the reference or the object being pointed to; it only changes the compiler\'s treatment of the reference. Once overridden, methods remain overridden. It does however change which shadowed field you see.' },

{ topic:'Java OOP', q:'Which operator lets you verify an object\'s real type before downcasting?',
  opts:['typeof','instanceof','getClass','isA'],
  a:1, why:'`if (b1 instanceof derived) { d1 = (derived) b1; }` — instanceof also works for testing whether a class implements an interface.' },

{ topic:'Java OOP', q:'How many copies of a `static` field exist?',
  opts:['One per object','One per class','One per method call','One per package'],
  a:1, why:'A class variable declared static has only one copy, shared by all objects of the class. Instance variables have one copy per object; local variables get a new copy each time the method is entered.' },

{ topic:'Java OOP', q:'An abstract class with no abstract methods is…',
  opts:['a compile error','perfectly legal','automatically an interface','implicitly final'],
  a:1, why:'An abstract class is not required to have an abstract method in it. The reverse is what is compulsory: any class that HAS an abstract method must be declared abstract.' },

{ topic:'Java OOP', q:'Which is legal for an abstract class `Animal`?',
  opts:['`Animal a = new Animal();`','`Animal a;` on its own','Both','Neither'],
  a:1, why:'An abstract class cannot be instantiated, however references to an abstract class can be declared. That declared reference is what makes polymorphism work.' },

{ topic:'Java OOP', q:'How many interfaces can a Java class implement?',
  opts:['Exactly one','At most two','One or more','None — only extend'],
  a:2, why:'Classes can extend only one class, but can implement one or more interfaces. This is how Java supports multiple inheritance.' },

{ topic:'Java OOP', q:'A field declared inside an interface is implicitly…',
  opts:['private','public static final','protected','abstract'],
  a:1, why:'Any fields in an interface are automatically static and final, and must be class constants — which makes interfaces a convenient way to group constants, like an enum in C or C++.' },

{ topic:'Java OOP', q:'Why does the lecture say you should extend an interface rather than add a method to it?',
  opts:['Extending is faster at run time','Interfaces cannot grow — adding a method breaks every class that implements it','Java forbids editing interfaces','Because interfaces are final'],
  a:1, why:'Adding a method to a class does not affect its users. Adding a method to an interface breaks every implementing class, since they must now implement another method. So extend into a sub-interface instead.' },

{ topic:'Java OOP', q:'`final` applied to a class means…',
  opts:['it cannot be instantiated','it cannot be subclassed, and its methods are implicitly final too','all its fields are constants','it has no constructor'],
  a:1, why:'Final field = constant. Final argument = the called method cannot change the data. Final method = cannot be overridden. Final class = cannot be subclassed.' },

{ topic:'Java OOP', q:'`compareTo` returns a positive integer when…',
  opts:['the object it is applied to is less than the argument','they are equal','the object it is applied to is greater than the argument','the argument is null'],
  a:2, why:'Negative if less than, zero if equal, positive if greater. Arrays.sort(Object[]) requires every element to implement Comparable.' },

{ topic:'Java OOP', q:'What does the default `Object.clone()` do with a field that holds a reference to another object?',
  opts:['Clones that object too','Copies the reference, so both objects share the subobject','Sets it to null','Throws CloneNotSupportedException'],
  a:1, why:'clone() initialises fields with exactly the contents of the corresponding fields as if by assignment — the contents of the fields are not themselves cloned. That is a shallow copy; you must override clone() for a deep copy.' },

{ topic:'Java OOP', q:'Cloning an object whose class does not implement `Cloneable` produces…',
  opts:['a null result','a shallow copy anyway','a CloneNotSupportedException','a compile error'],
  a:2, why:'Cloneable is an empty interface that marks a class as cloneable. Without it, clone() throws CloneNotSupportedException at run time.' },

{ topic:'Java OOP', q:'Which relationship means "removing the whole also removes the parts"?',
  opts:['Association','Aggregation','Composition','Generalization'],
  a:2, why:'Composition — drawn with a filled diamond. Aggregation (empty diamond) is a whole-part relationship where the part can outlive the whole.' },

{ topic:'Java OOP', q:'"A house has furniture" is an example of…',
  opts:['association','aggregation','composition','generalization'],
  a:0, why:'Association is the plain "has a" relationship — the ability of one instance to send a message to another. "A house has a part roof" would be aggregation.' },

{ topic:'Java OOP', q:'Which are ALWAYS passed by value in Java?',
  opts:['All objects','Arrays','Primitive data types and Strings','Nothing — Java is always by reference'],
  a:2, why:'The lecture states it directly: primitive data types and Strings are always passed by value.' },

{ topic:'Java OOP', q:'In a singleton, the constructor is private so that…',
  opts:['it runs faster','no code outside the class can create an instance','it can be overridden','it becomes static'],
  a:1, why:'A private or protected constructor means no direct access from outside; a static getInstance()-style method is then the only route to the single object.' },

/* ---- Week 2 ---- */
{ topic:'Complexity', q:'What is an "instance" of a problem?',
  opts:['A running copy of the program','One specific assignment of values to the parameters','A subclass of the problem','The worst case input'],
  a:1, why:'A problem contains parameters — variables not assigned specific values in the statement. Each specific assignment of values to those parameters is an instance.' },

{ topic:'Complexity', q:'Why do we not measure running time in CPU cycles?',
  opts:['They are too small to measure','It depends on the computer, and we want a machine-independent measure','Cycles vary randomly','Big O forbids it'],
  a:1, why:'We want a measure independent of the computer, the programming language, the programmer, and all the complex details of the implementation.' },

{ topic:'Complexity', q:'Time complexity analysis determines…',
  opts:['the number of lines of code','how many times the basic operation is done for each value of the input size','the memory used','the number of variables declared'],
  a:1, why:'Total running time is proportional to how many times some basic operation is done, so we count that as a function of the input size.' },

{ topic:'Complexity', q:'`for (i=0;i<n;i++) result = result + array[i];` — what is T(n)?',
  opts:['1','n','n(n−1)/2','n²'],
  a:1, why:'The addition is the basic operation and the loop runs exactly n times regardless of the array contents, so there is an every-case complexity T(n) = n.' },

{ topic:'Complexity', q:'Exchange sort: what is T(n) for the number of comparisons?',
  opts:['n','n²','n(n−1)/2','log₂ n'],
  a:2, why:'The inner loop runs n−1, then n−2, … down to 1, giving (n−1)+(n−2)+…+1 = n(n−1)/2. Note that the number of EXCHANGES has no every-case complexity because it depends on the input.' },

{ topic:'Complexity', q:'Matrix multiplication of two n×n matrices has T(n) =',
  opts:['n²','n³','n log n','2n²'],
  a:1, why:'Three nested loops each running n times, with the multiply-add as the basic operation: n × n × n = n³.' },

{ topic:'Complexity', q:'Sequential search: which trio is right?',
  opts:['B=1, W=n, A=(n+1)/2 when the key is present','B=n, W=1, A=n/2','B=1, W=log n, A=log n','B=0, W=n, A=n'],
  a:0, why:'Best case the key is in slot 1; worst case it is last or absent, giving n; average with the key certainly present is (n+1)/2.' },

{ topic:'Complexity', q:'The general average case for sequential search, where p is the probability the key is present, is…',
  opts:['(n+1)/2','n(1 − p/2) + p/2','p·n','n/2 + p'],
  a:1, why:'E(n) = 1·(p/n) + 2·(p/n) + … + n·(p/n) + n·(1−p) = n(1 − p/2) + p/2. Check it: p=1 gives (n+1)/2, p=0 gives n.' },

{ topic:'Complexity', q:'An algorithm has an every-case time complexity when…',
  opts:['it never loops','the basic operation count is the same for every input of size n','best and worst differ by a constant','it is recursive'],
  a:1, why:'T(n) is defined as the number of times the basic operation is done for an instance of size n — it only exists when that count does not vary across inputs of the same size. Sequential search has no T(n); summing an array does.' },

{ topic:'Complexity', q:'W(n) for binary search is…',
  opts:['n','⌈log₂(n+1)⌉','n/2','log₂ n − 1'],
  a:1, why:'From 2⁰ + 2¹ + … + 2^(i−1) = 2^i − 1 = n we get i = log₂(n+1), and the ceiling because you cannot do a fractional pass. Equivalently ⌊log₂ n⌋ + 1. Simplified to log₂ n for order purposes.' },

{ topic:'Complexity', q:'On an array of 1,048,576 items, sequential search does about 1,048,576 comparisons. Binary search does about…',
  opts:['1,024','512','21','100'],
  a:2, why:'log₂(1,048,576) = 20, so 21 with the +1. This is the row from the efficiency comparison table in Lecture 2.1.' },

{ topic:'Complexity', q:'The number of terms computed by the RECURSIVE Fibonacci for input n is…',
  opts:['n + 1','2n','greater than 2^(n/2)','n log n'],
  a:2, why:'The call tree branches twice at each level and recomputes the same subproblems, giving more than 2^(n/2) terms — over a million by n = 40, where the iterative version computes 41.' },

{ topic:'Complexity', q:'B(n) ≤ A(n) ≤ W(n). When T(n) exists, what is true?',
  opts:['T(n) = W(n) only','T(n) = B(n) = A(n) = W(n)','T(n) = A(n) only','T(n) is the average of B and W'],
  a:1, why:'If the count is identical for every input of size n, then best, average and worst all equal that same count.' },

/* ---- Week 3 ---- */
{ topic:'Big O', q:'Big O notation describes…',
  opts:['the exact running time','an asymptotic upper bound','an asymptotic lower bound','the average case only'],
  a:1, why:'Big O puts an asymptotic upper bound on a function. The lower bound is Ω (omega), which this course does not cover.' },

{ topic:'Big O', q:'The formal definition of f(n) being O(g(n)) requires positive constants c and N such that…',
  opts:['f(n) = c·g(n) for all n','0 ≤ f(n) ≤ c·g(n) for all n ≥ N','f(n) ≥ c·g(n) for all n ≥ N','f(n) < g(n) for all n'],
  a:1, why:'0 ≤ f(n) ≤ c·g(n) for all n ≥ N. You only need to find ONE pair (c, N) that works, not the best pair.' },

{ topic:'Big O', q:'For n² + 3n + 4, the lecture picks which constants?',
  opts:['c = 1, N = 1','c = 8, N = 1','c = 3, N = 4','c = 4, N = 3'],
  a:1, why:'Bound each term by the highest power: n² + 3n + 4 ≤ n² + 3n² + 4n² = 8n² for n > 0. So c = 8 and N = 1. c = 2 with N = 10 also works — the answer O(n²) is the same.' },

{ topic:'Big O', q:'5n² + 100 is called a…',
  opts:['complete quadratic function','pure quadratic function','cubic function','linear function'],
  a:1, why:'Pure quadratic contains no linear term. 0.1n² + n + 100 would be complete quadratic because it has the n term. Both are O(n²).' },

{ topic:'Big O', q:'0.1n³ + 10n² + 5n + 25 is of order…',
  opts:['O(n)','O(n²)','O(n³)','O(n⁴)'],
  a:2, why:'Throw away low-order terms when classifying complexity functions — only the highest power survives, and its coefficient is discarded too.' },

{ topic:'Big O', q:'Which order grows the slowest?',
  opts:['O(n log n)','O(log n)','O(n)','O(1)'],
  a:3, why:'O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ).' },

{ topic:'Big O', q:'Insertion sort on a reverse-sorted array does how many comparisons?',
  opts:['n − 1','n(n−1)/2','n log n','n²+n'],
  a:1, why:'Every element must travel to the front, so pass i does i comparisons: 1 + 2 + … + (n−1) = n(n−1)/2, which is O(n²).' },

{ topic:'Big O', q:'Insertion sort on an ALREADY SORTED array is…',
  opts:['O(n²)','O(n log n)','O(n)','O(1)'],
  a:2, why:'The while condition arr[j] > key fails immediately on every pass, so there is one comparison per pass and no shifting: n − 1 comparisons, which is O(n).' },

{ topic:'Big O', q:'The average case of insertion sort is…',
  opts:['O(n)','O(n log n)','O(n²)','O(2ⁿ)'],
  a:2, why:'E(s[k]) = (k+1)/2 for each element, summing to about n²/4 — approximately n², hence O(n²). Halving the worst case does not change the order.' },

{ topic:'Big O', q:'Big O order for inserting an element in the worst case:',
  opts:['array O(1), linked list O(n)','array O(n), linked list O(1)','both O(n)','both O(1)'],
  a:1, why:'An array insert may shift every following element (O(n)); a linked list insert just relinks pointers (O(1)). Retrieval is the reverse: array O(1), linked list O(n).' },

{ topic:'Big O', q:'Is it correct to say 3n² + 5n is O(n³)?',
  opts:['No, the order must match exactly','Yes, but it is a loose bound — O(n²) is the useful answer','No, you cannot mix powers','Only for n < 10'],
  a:1, why:'Big O is an upper bound, so any dominating function is technically valid. In an exam, always give the tightest bound.' },

{ topic:'Big O', q:'What does the lecture list as a way to write efficient algorithms?',
  opts:['Write everything recursively','Use built-in algorithms with a known Big O order','Always prefer arrays','Avoid data structures'],
  a:1, why:'The list is: good programming skills; use built-in algorithms which are well tested and have a known Big O order; good analytical ability and mathematics; know the strengths and weaknesses of data structures.' }
];

/* ============================================================
   Exercises section
   ============================================================ */

const EXERCISES_SECTION = {
  id: 'exercises', group: 'Practice', nav: 'Code exercises',
  eyebrow: 'Practice',
  title: 'Code exercises',
  lede: 'Type the missing piece and check it. Case matters for Java keywords; the complexity answers accept the usual spellings.',
  blocks: [

    { t:'h', x:'Java: inheritance and access' },

    { t:'fill', id:'ex1', title:'Exercise 1 — set up the inheritance', lang:'java',
      prompt:'Cylinder should be a specialised Circle, and should reuse Circle\'s constructor.',
      code:'class Cylinder {{0}} Circle {\n   protected double length;\n   public Cylinder(double radius, double length) {\n      {{1}}(radius);\n      {{2}}.length = length;\n   }\n}',
      answers:[['extends'],['super'],['this']],
      hint:'One keyword builds the relationship, one calls the parent constructor, one resolves the clash between the parameter `length` and the field `length`.',
      sol:'`extends Circle`, `super(radius)` and `this.length = length`. Without `this.`, the assignment `length = length` would just assign the parameter to itself.' },

    { t:'fill', id:'ex2', title:'Exercise 2 — the four access levels', lang:'text',
      prompt:'Write the Java keyword for each UML symbol. For the default level, write the word the lecture uses.',
      code:'-  ->  {{0}}\n~  ->  {{1}}\n#  ->  {{2}}\n+  ->  {{3}}',
      answers:[['private'],['package','default'],['protected'],['public']],
      hint:'Narrowest to widest.',
      sol:'`private` (−), `package` (~, the default when you write no modifier), `protected` (#), `public` (+).' },

    { t:'fill', id:'ex3', title:'Exercise 3 — overriding toString()', lang:'java',
      prompt:'Complete the override so that println(student) prints the student\'s details. Which class does toString() come from?',
      code:'public {{0}} toString() {\n   return name + String.valueOf(id) + major;\n}\n// toString() is inherited from the {{1}} class',
      answers:[['String'],['Object']],
      hint:'The method returns a string representation. Every Java class implicitly extends one root class.',
      sol:'`public String toString()`, inherited from `Object` — the root of the Java class hierarchy. Overriding it changes what `System.out.println(obj)` prints.' },

    { t:'h', x:'Java: polymorphism and casting' },

    { t:'fill', id:'ex4', title:'Exercise 4 — which lines compile?', lang:'text',
      prompt:'Given `base b = new base();` and `derived d = new derived();`, write OK or ERROR for each line.',
      code:'b = d;              ->  {{0}}\nd = b;              ->  {{1}}\nd = (derived) b;    ->  {{2}} at compile time\nb = (base) d;       ->  {{3}}',
      answers:[['OK','ok'],['ERROR','error'],['OK','ok'],['OK','ok']],
      hint:'Upcasting is implicit; narrowing assignment without a cast is a compile error; a cast always satisfies the compiler.',
      sol:'`b = d;` OK (implicit upcast). `d = b;` compile ERROR (narrowing assignment). `d = (derived) b;` compiles fine — but throws at run time because the object really is only a base. `b = (base) d;` OK, an optional explicit upcast.' },

    { t:'fill', id:'ex5', title:'Exercise 5 — guard the downcast', lang:'java',
      prompt:'Verify the type before casting.',
      code:'if (a1 {{0}} Dog) {\n   Dog d = ({{1}}) a1;\n   d.work();\n}',
      answers:[['instanceof'],['Dog']],
      hint:'An operator that returns a boolean, then an explicit cast.',
      sol:'`instanceof` verifies the nature of the object; `(Dog)` performs the explicit narrowing cast. instanceof also works to test whether a class implements an interface.' },

    { t:'fill', id:'ex6', title:'Exercise 6 — static or dynamic?', lang:'text',
      prompt:'Write STATIC or DYNAMIC for how each is bound.',
      code:'Instance methods    ->  {{0}}\nInstance variables  ->  {{1}}\nStatic methods      ->  {{2}}\nShadowed variables  ->  {{3}}',
      answers:[['DYNAMIC','dynamic'],['STATIC','static'],['STATIC','static'],['STATIC','static']],
      hint:'Only one row is dynamic.',
      sol:'Instance methods are the ONLY dynamically bound case. Everything else — instance variables, static variables, static methods, shadowed variables — is statically bound from the declared type.' },

    { t:'h', x:'Java: abstract, interfaces, cloning' },

    { t:'fill', id:'ex7', title:'Exercise 7 — abstract class', lang:'java',
      prompt:'shape forces every subclass to define draw(), but shares set_color().',
      code:'{{0}} class shape {\n   private String color;\n   public void set_color(String color) { this.color = color; }\n   public {{1}} void draw();\n}',
      answers:[['abstract'],['abstract']],
      hint:'Both gaps take the same keyword.',
      sol:'`abstract class shape` and `public abstract void draw();`. A class containing an abstract method must itself be declared abstract. Note there are no braces after draw() — just a semicolon.' },

    { t:'fill', id:'ex8', title:'Exercise 8 — interface vs class', lang:'java',
      prompt:'One keyword for taking on an interface, one for extending a class, one for combining interfaces.',
      code:'class circle {{0}} shape { }            // shape is an interface\nclass Dog {{1}} Animal { }             // Animal is a class\ninterface amphibian {{2}} aquatic, terrestrial { }',
      answers:[['implements'],['extends'],['extends']],
      hint:'An interface extends another interface — it never "implements" one.',
      sol:'A class `implements` an interface and `extends` a class. An interface `extends` other interfaces, and unlike a class it may extend more than one.' },

    { t:'fill', id:'ex9', title:'Exercise 9 — deep clone', lang:'java',
      prompt:'Complete the override that turns a shallow clone into a one-level deep clone.',
      code:'public Object clone() {\n   try {\n      Student s = (Student) {{0}}.clone();\n      s.c = (course[]) this.c.{{1}}();\n      return s;\n   }\n   catch ({{2}} e) { return null; }\n}',
      answers:[['super'],['clone'],['CloneNotSupportedException']],
      hint:'Start with the parent\'s shallow copy, then clone the array yourself. The exception is thrown when a class is not Cloneable.',
      sol:'`super.clone()` gives the shallow copy, `this.c.clone()` duplicates the array, and `CloneNotSupportedException` must be caught because Object.clone() declares it.' },

    { t:'h', x:'Complexity: find T(n)' },

    { t:'fill', id:'ex10', title:'Exercise 10 — single loop', lang:'text',
      prompt:'Give T(n) and the Big O order.',
      code:'for (i = 0; i < n; i++)\n   sum = sum + a[i];\n\nT(n) = {{0}}          order = O({{1}})',
      answers:[['n'],['n']],
      hint:'The loop body runs once per iteration and there are n iterations.',
      sol:'T(n) = n, which is O(n). This is the every-case example from Lecture 2.2 — the count does not depend on the array contents.' },

    { t:'fill', id:'ex11', title:'Exercise 11 — triangular double loop', lang:'text',
      prompt:'Give the closed form and the order.',
      code:'for (i = 0; i < n; i++)\n   for (j = i+1; j < n; j++)\n      compare(S[i], S[j]);\n\nT(n) = n(n-{{0}})/{{1}}      order = O(n^{{2}})',
      answers:[['1'],['2'],['2']],
      hint:'(n−1) + (n−2) + … + 1.',
      sol:'T(n) = n(n−1)/2, which is O(n²). This is exchange sort. The comparison has an every-case complexity; the exchange does not, because it only happens when the condition is true.' },

    { t:'fill', id:'ex12', title:'Exercise 12 — triple loop', lang:'text',
      prompt:'Give the order for matrix multiplication.',
      code:'for (i = 0; i < n; i++)\n   for (j = 0; j < n; j++)\n      for (k = 0; k < n; k++)\n         C[i][j] = C[i][j] + A[i][k]*B[k][j];\n\nT(n) = n^{{0}}      order = O(n^{{1}})',
      answers:[['3'],['3']],
      hint:'Three independent loops, each running n times.',
      sol:'T(n) = n³, order O(n³). Every one of the three loops runs the full n times regardless of the data, so this has an every-case complexity.' },

    { t:'fill', id:'ex13', title:'Exercise 13 — the three cases', lang:'text',
      prompt:'Fill in the best, worst and average for sequential search on an array of size n, assuming the key is definitely present.',
      code:'B(n) = {{0}}\nW(n) = {{1}}\nA(n) = ({{2}} + 1)/2',
      answers:[['1'],['n'],['n']],
      hint:'Best = key in the first slot. Worst = key in the last slot.',
      sol:'B(n) = 1, W(n) = n, A(n) = (n+1)/2. If the key might be absent, the general formula is A(n) = n(1 − p/2) + p/2 where p is the probability it is present.' },

    { t:'fill', id:'ex14', title:'Exercise 14 — binary search worst case', lang:'text',
      prompt:'Complete the derivation.',
      code:'2^0 + 2^1 + ... + 2^(i-1) = 2^i - {{0}} = n\n\n=>   i = log2(n + {{1}})\n\norder = O({{2}} n)',
      answers:[['1'],['1'],['log']],
      hint:'A geometric series of powers of two, then take logs.',
      sol:'2^i − 1 = n gives i = log₂(n+1), so W(n) = ⌈log₂(n+1)⌉ = ⌊log₂ n⌋ + 1, which is O(log n).' },

    { t:'h', x:'Big O' },

    { t:'fill', id:'ex15', title:'Exercise 15 — the formal definition', lang:'text',
      prompt:'Write the definition. Use <= for the inequality and >= where needed.',
      code:'f(n) is O(g(n)) if there are positive constants c and N such that\n\n   0 {{0}} f(n) {{1}} c * g(n)   for all n {{2}} N',
      answers:[['<=','≤'],['<=','≤'],['>=','≥']],
      hint:'Sandwich f(n) between zero and c times g(n), past some threshold.',
      sol:'0 ≤ f(n) ≤ c·g(n) for all n ≥ N. You only need one working pair (c, N), not the tightest one.' },

    { t:'fill', id:'ex16', title:'Exercise 16 — find c and N', lang:'text',
      prompt:'Bound n² + 3n + 4 by replacing every lower term with n². Fill in the coefficients.',
      code:'n^2 + 3n + 4  <=  n^2 + {{0}}n^2 + {{1}}n^2  =  {{2}}n^2   for n > 0\n\nso c = {{3}} and N = 1, giving O(n^2)',
      answers:[['3'],['4'],['8'],['8']],
      hint:'For n ≥ 1 you have n ≤ n² and 1 ≤ n². Then add the coefficients.',
      sol:'3n ≤ 3n² and 4 ≤ 4n², so the whole thing is at most (1+3+4)n² = 8n². Therefore c = 8 and N = 1, and the order is O(n²).' },

    { t:'fill', id:'ex17', title:'Exercise 17 — classify', lang:'text',
      prompt:'Give the tightest Big O order. Write like n^2, log n, 2^n, or 1.',
      code:'100n + 3               ->  O({{0}})\n0.01n^2                ->  O({{1}})\nn(n-1)/2               ->  O({{2}})\n2^(n/2)                ->  O({{3}})',
      answers:[['n'],['n^2','n2','n²'],['n^2','n2','n²'],['2^n','2n','2ⁿ']],
      hint:'Drop constants and low-order terms.',
      sol:'O(n), O(n²), O(n²), O(2ⁿ). Constants never survive: 100n is linear, and 0.01n² is still quadratic.' },

    { t:'fill', id:'ex18', title:'Exercise 18 — insertion sort', lang:'text',
      prompt:'Complete all three cases.',
      code:'Reverse sorted:  1 + 2 + ... + (n-1) = n(n-1)/{{0}}  ->  O(n^{{1}})\nAlready sorted:  n - {{2}}                       ->  O({{3}})',
      answers:[['2'],['2'],['1'],['n']],
      hint:'The worst case is the triangular sum; the best case is one comparison per pass.',
      sol:'Worst: n(n−1)/2 comparisons → O(n²). Best: n−1 comparisons → O(n). The average is also O(n²).' },

    { t:'fill', id:'ex19', title:'Exercise 19 — data structure costs', lang:'text',
      prompt:'Give the worst-case order for each operation.',
      code:'Insert into an array        ->  O({{0}})\nInsert into a linked list   ->  O({{1}})\nRetrieve item i from array  ->  O({{2}})\nRetrieve item i from list   ->  O({{3}})',
      answers:[['n'],['1'],['1'],['n']],
      hint:'Arrays are good at exactly what linked lists are bad at, and vice versa.',
      sol:'Array insert O(n) because everything after shifts; linked list insert O(1) because you just relink. Array retrieval O(1) by index arithmetic; linked list retrieval O(n) because you walk from the head. This table answers most "which data structure" questions.' },

    { t:'fill', id:'ex20', title:'Exercise 20 — the two Fibonaccis', lang:'text',
      prompt:'How many terms does each version compute, and what order is each?',
      code:'Iterative:  {{0}} + 1 terms   ->  O({{1}})\nRecursive:  more than 2^(n/{{2}}) terms  ->  exponential',
      answers:[['n'],['n'],['2']],
      hint:'The iterative version fills an array once. The recursive one branches twice per level.',
      sol:'Iterative computes n+1 terms — O(n). Recursive computes more than 2^(n/2) terms, which is over a million by n = 40 versus 41 for the iterative version.' }
  ]
};

const QUIZ_SECTION = {
  id: 'quiz', group: 'Practice', nav: 'Quiz',
  eyebrow: 'Practice',
  title: 'Quiz',
  lede: 'Ten questions at a time, drawn from all three weeks. Every answer comes with the reasoning, so a wrong one is still worth something.',
  blocks: [ { t:'quiz' } ]
};

/* insert the two practice sections right after the labs page */
(function(){
  const i = SECTIONS.findIndex(s => s.id === 'lab');
  SECTIONS.splice(i + 1, 0, EXERCISES_SECTION, QUIZ_SECTION);
})();
