/* ============================================================
   CS214 Revise — interactive labs
   Each entry is mount(container). Plain DOM, no dependencies.
   ============================================================ */

const WIDGETS = {};

/* ---------- tiny DOM helper ---------- */
function el(tag, attrs, kids){
  const n = document.createElement(tag);
  if (attrs) for (const k in attrs){
    if (k === 'class') n.className = attrs[k];
    else if (k === 'html') n.innerHTML = attrs[k];
    else if (k === 'text') n.textContent = attrs[k];
    else if (k.slice(0,2) === 'on') n.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
    else n.setAttribute(k, attrs[k]);
  }
  (kids || []).forEach(c => n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
  return n;
}
function shell(title, kind){
  const body = el('div', {class:'activity-body'});
  const box  = el('div', {class:'activity'}, [
    el('div', {class:'activity-head'}, [
      el('span', {class:'activity-kind', text:kind || 'Lab'}),
      el('span', {class:'activity-title', text:title})
    ]),
    body
  ]);
  return {box, body};
}
function statEl(label){
  const v = el('b', {text:'0'});
  const s = el('span', {class:'stat'}, [label + ' ', v]);
  return {node:s, set:x => v.textContent = x};
}

/* ============================================================
   1 — Sequential vs binary search
   ============================================================ */
WIDGETS.searchRace = function(host){
  const {box, body} = shell('Sequential vs binary search', 'Lab 1');
  host.appendChild(box);

  let n = 16, arr = [], target = null;
  let seq, bin, timer = null, reported = false;

  const sizeIn   = el('input', {type:'range', min:'8', max:'48', value:'16'});
  const sizeOut  = el('span', {class:'stat'}, ['n = ', el('b', {text:'16'})]);
  const targetIn = el('select');
  const stepBtn  = el('button', {class:'btn', text:'Step both'});
  const runBtn   = el('button', {class:'btn sec', text:'Run to the end'});
  const newBtn   = el('button', {class:'btn sec', text:'New array'});

  const seqStat = statEl('sequential comparisons:');
  const binStat = statEl('binary comparisons:');

  const seqRow = el('div', {class:'cells'});
  const binRow = el('div', {class:'cells'});
  const log    = el('div', {class:'log'});

  body.appendChild(el('div', {class:'w-controls'}, [
    el('label', {}, ['Array size', sizeIn]), sizeOut,
    el('label', {}, ['Looking for', targetIn])
  ]));
  body.appendChild(el('p', {class:'', html:'<strong>Sequential search</strong> — walks from the left.'}));
  body.appendChild(seqRow);
  body.appendChild(el('p', {html:'<strong>Binary search</strong> — halves the live range each pass. Green = current middle, pale = still in range, faded = eliminated.'}));
  body.appendChild(binRow);
  body.appendChild(el('div', {class:'w-controls'}, [seqStat.node, binStat.node]));
  body.appendChild(el('div', {class:'btnrow'}, [stepBtn, runBtn, newBtn]));
  body.appendChild(log);

  function build(){
    stop();
    arr = [];
    let v = Math.floor(Math.random()*5) + 1;
    for (let i = 0; i < n; i++){ arr.push(v); v += Math.floor(Math.random()*4) + 1; }
    const keep = targetIn.value;
    targetIn.innerHTML = '';
    targetIn.appendChild(el('option', {value:'first',  text:'the first item (best case)'}));
    targetIn.appendChild(el('option', {value:'middle', text:'the middle item'}));
    targetIn.appendChild(el('option', {value:'last',   text:'the last item (worst case)'}));
    targetIn.appendChild(el('option', {value:'random', text:'a random item'}));
    targetIn.appendChild(el('option', {value:'absent', text:'an item that is not there'}));
    if (keep) targetIn.value = keep;
    reset();
  }
  function pickTarget(){
    const mode = targetIn.value;
    if (mode === 'first')  return arr[0];
    if (mode === 'middle') return arr[Math.floor((arr.length-1)/2)];
    if (mode === 'last')   return arr[arr.length-1];
    if (mode === 'absent') return arr[arr.length-1] + 7;
    return arr[Math.floor(Math.random()*arr.length)];
  }
  function reset(){
    stop();
    target = pickTarget();
    seq = {i:0, count:0, done:false, found:-1};
    bin = {lo:0, hi:arr.length-1, mid:null, count:0, done:false, found:-1};
    reported = false;
    log.innerHTML = '';
    say('Searching for ' + target + ' in an array of ' + arr.length + ' sorted values.');
    draw();
  }
  function say(t, hl){
    log.appendChild(el('div', {class: hl ? 'hl' : '', text:t}));
    log.scrollTop = log.scrollHeight;
  }
  function draw(){
    seqRow.innerHTML = ''; binRow.innerHTML = '';
    arr.forEach((v,i) => {
      let c = 'cell';
      if (seq.found === i) c += ' hit';
      else if (i === seq.i && !seq.done) c += ' probe';
      else if (i < seq.i) c += ' dead';
      seqRow.appendChild(el('div', {class:c, text:v}));
    });
    arr.forEach((v,i) => {
      let c = 'cell';
      if (bin.found === i) c += ' hit';
      else if (i < bin.lo || i > bin.hi) c += ' dead';
      else if (i === bin.mid) c += ' mid';
      else c += ' range';
      binRow.appendChild(el('div', {class:c, text:v}));
    });
    seqStat.set(seq.count + (seq.done ? (seq.found >= 0 ? '  (found)' : '  (not there)') : ''));
    binStat.set(bin.count + (bin.done ? (bin.found >= 0 ? '  (found)' : '  (not there)') : ''));
  }
  function stepSeq(){
    if (seq.done) return;
    if (seq.i >= arr.length){ seq.done = true; say('Sequential: ran off the end after ' + seq.count + ' comparisons — not present.'); return; }
    seq.count++;
    if (arr[seq.i] === target){ seq.found = seq.i; seq.done = true; say('Sequential: found at index ' + seq.i + ' after ' + seq.count + ' comparisons.', true); }
    else seq.i++;
  }
  function stepBin(){
    if (bin.done) return;
    if (bin.lo > bin.hi){ bin.done = true; bin.mid = null; say('Binary: range is empty after ' + bin.count + ' comparisons — not present.'); return; }
    bin.mid = Math.floor((bin.lo + bin.hi)/2);
    bin.count++;
    const v = arr[bin.mid];
    if (v === target){ bin.found = bin.mid; bin.done = true; say('Binary: found at index ' + bin.mid + ' after ' + bin.count + ' comparisons.', true); }
    else if (target < v){ say('Binary: ' + target + ' < ' + v + ' at index ' + bin.mid + ' — keep the lower half.'); bin.hi = bin.mid - 1; }
    else { say('Binary: ' + target + ' > ' + v + ' at index ' + bin.mid + ' — keep the upper half.'); bin.lo = bin.mid + 1; }
  }
  function step(){ stepSeq(); stepBin(); draw(); if (seq.done && bin.done) finish(); }
  function finish(){
    stop();
    if (reported) return;
    reported = true;
    if (seq.count > 0 && bin.count > 0)
      say('Result: ' + seq.count + ' vs ' + bin.count + ' comparisons. n = ' + arr.length +
          ', and log2(n+1) = ' + (Math.log2(arr.length+1)).toFixed(2) + '.', true);
  }
  function run(){
    stop();
    timer = setInterval(() => {
      if (!document.body.contains(box)){ stop(); return; }      // navigated away
      if (seq.done && bin.done){ finish(); return; }
      step();
    }, 340);
  }
  function stop(){ if (timer){ clearInterval(timer); timer = null; } }

  sizeIn.addEventListener('input', () => { n = +sizeIn.value; sizeOut.querySelector('b').textContent = n; build(); });
  targetIn.addEventListener('change', reset);
  stepBtn.addEventListener('click', step);
  runBtn.addEventListener('click', run);
  newBtn.addEventListener('click', build);

  build();
};

/* ============================================================
   2 — Growth of orders
   ============================================================ */
WIDGETS.growth = function(host){
  const {box, body} = shell('How the orders grow', 'Lab 2');
  host.appendChild(box);

  const FNS = [
    {k:'1',        label:'O(1)',        color:'#8a9a95', f:() => 1},
    {k:'log',      label:'O(log n)',    color:'#2b8ccc', f:n => Math.log2(n) || 0},
    {k:'n',        label:'O(n)',        color:'#1f9f6b', f:n => n},
    {k:'nlog',     label:'O(n log n)',  color:'#b07d00', f:n => n * (Math.log2(n) || 0)},
    {k:'n2',       label:'O(n²)',       color:'#c2543f', f:n => n*n},
    {k:'n3',       label:'O(n³)',       color:'#8b3fa8', f:n => n*n*n},
    {k:'2n',       label:'O(2ⁿ)',       color:'#c0224a', f:n => Math.pow(2, n)}
  ];
  const on = {'1':false, log:true, n:true, nlog:true, n2:true, n3:false, '2n':true};

  const cv = el('canvas', {width:'860', height:'380'});
  const nIn = el('input', {type:'range', min:'8', max:'64', value:'32'});
  const nOut = el('span', {class:'stat'}, ['max n = ', el('b', {text:'32'})]);
  const scaleIn = el('select', {}, [
    el('option', {value:'log',    text:'logarithmic y-axis (see them all)'}),
    el('option', {value:'linear', text:'linear y-axis (see the real gap)'})
  ]);

  const toggles = el('div', {class:'w-controls'});
  FNS.forEach(f => {
    const cb = el('input', {type:'checkbox'});
    cb.checked = on[f.k];
    cb.addEventListener('change', () => { on[f.k] = cb.checked; draw(); });
    toggles.appendChild(el('label', {}, [cb, el('span', {class:'swatch', style:'background:'+f.color}), f.label]));
  });

  const tableWrap = el('div', {class:'tablewrap'});

  body.appendChild(el('div', {class:'w-controls'}, [ el('label', {}, ['Range', nIn]), nOut, el('label', {}, ['Scale', scaleIn]) ]));
  body.appendChild(toggles);
  body.appendChild(cv);
  body.appendChild(tableWrap);

  function draw(){
    const N = +nIn.value;
    nOut.querySelector('b').textContent = N;
    const logScale = scaleIn.value === 'log';
    const ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height, P = 44;
    ctx.clearRect(0,0,W,H);

    const active = FNS.filter(f => on[f.k]);
    let maxY = 1;
    active.forEach(f => { for (let n = 1; n <= N; n++) maxY = Math.max(maxY, f.f(n)); });
    if (!logScale) maxY = Math.min(maxY, Math.max(4, N*N*1.2));

    const y = v => {
      v = Math.max(v, logScale ? 1 : 0);
      const t = logScale ? Math.log10(v) / Math.log10(maxY) : v / maxY;
      return H - P - Math.min(t, 1.02) * (H - 2*P);
    };
    const x = n => P + (n / N) * (W - P - 18);

    // grid
    ctx.strokeStyle = '#e6ecea'; ctx.lineWidth = 1;
    ctx.fillStyle = '#7a8b85'; ctx.font = '11px Consolas, monospace';
    for (let i = 0; i <= 5; i++){
      const yy = H - P - i/5 * (H - 2*P);
      ctx.beginPath(); ctx.moveTo(P, yy); ctx.lineTo(W-18, yy); ctx.stroke();
      const val = logScale ? Math.pow(10, i/5 * Math.log10(maxY)) : (i/5 * maxY);
      ctx.fillText(val >= 1000 ? val.toExponential(0) : Math.round(val), 4, yy + 3);
    }
    ctx.strokeStyle = '#b9c6c1';
    ctx.beginPath(); ctx.moveTo(P, P-8); ctx.lineTo(P, H-P); ctx.lineTo(W-18, H-P); ctx.stroke();
    ctx.fillText('n', W - 26, H - P + 16);
    ctx.fillText(logScale ? 'operations (log scale)' : 'operations', P - 30, P - 16);

    active.forEach(f => {
      ctx.strokeStyle = f.color; ctx.lineWidth = 2.2; ctx.beginPath();
      for (let n = 1; n <= N; n++){
        const px = x(n), py = y(f.f(n));
        if (n === 1) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();
      const last = Math.min(f.f(N), maxY);
      ctx.fillStyle = f.color; ctx.font = '700 11px Consolas, monospace';
      const ly = Math.max(P - 4, y(last));
      ctx.fillText(f.label, Math.min(x(N) + 3, W - 60), ly + 4);
    });

    // table
    const pts = [8, 16, 32, 64, 1024];
    let h = '<table><thead><tr><th>n</th>';
    active.forEach(f => h += '<th>' + f.label + '</th>');
    h += '</tr></thead><tbody>';
    pts.forEach(p => {
      h += '<tr><td><code>' + p.toLocaleString() + '</code></td>';
      active.forEach(f => {
        const v = f.f(p);
        h += '<td>' + (v > 1e12 ? v.toExponential(1) : Math.round(v).toLocaleString()) + '</td>';
      });
      h += '</tr>';
    });
    h += '</tbody></table>';
    tableWrap.innerHTML = h;
  }
  nIn.addEventListener('input', draw);
  scaleIn.addEventListener('change', draw);
  draw();
};

/* ============================================================
   3 — Loop operation counter
   ============================================================ */
WIDGETS.loopCounter = function(host){
  const {box, body} = shell('Count the basic operations', 'Lab 3');
  host.appendChild(box);

  const SNIPPETS = [
    { name:'Single loop',
      code:'for i = 1 to n do\n   op',
      count:n => n,
      form:'T(n) = n',
      order:'O(n)' },
    { name:'Two independent loops',
      code:'for i = 1 to n do\n   op\nfor j = 1 to n do\n   op',
      count:n => 2*n,
      form:'T(n) = 2n',
      order:'O(n)  — the constant 2 is discarded' },
    { name:'Full nested loop',
      code:'for i = 1 to n do\n   for j = 1 to n do\n      op',
      count:n => n*n,
      form:'T(n) = n²',
      order:'O(n²)' },
    { name:'Exchange sort (triangular)',
      code:'for i = 0 to n-1 do\n   for j = i+1 to n-1 do\n      op',
      count:n => n*(n-1)/2,
      form:'T(n) = n(n−1)/2',
      order:'O(n²)' },
    { name:'Matrix multiplication',
      code:'for i = 1 to n do\n   for j = 1 to n do\n      for k = 1 to n do\n         op',
      count:n => n*n*n,
      form:'T(n) = n³',
      order:'O(n³)' },
    { name:'Sample Test I, Question 3',
      code:'D = 2\nfor i = 1 to n do\n   for j = i to n do\n      for k = j + 1 to n do\n         D = D * 3',
      count:n => n*(n-1)*(n+1)/6,
      form:'T(n) = n(n−1)(n+1)/6 = (n³ − n)/6',
      order:'O(n³)' },
    { name:'Halving loop',
      code:'i = 1\nwhile i < n do\n   op\n   i = i * 2',
      count:n => n <= 1 ? 0 : Math.ceil(Math.log2(n)),
      form:'T(n) = ⌈log₂ n⌉',
      order:'O(log n)' }
  ];

  const pick = el('select');
  SNIPPETS.forEach((s,i) => pick.appendChild(el('option', {value:String(i), text:s.name})));
  const nIn  = el('input', {type:'number', min:'1', max:'200', value:'8', style:'width:80px'});
  const codeBox = el('pre', {class:'plaincode'});
  const out = el('div', {class:'w-controls'});
  const guessIn = el('input', {type:'text', class:'fill wide', placeholder:'your count'});
  const checkBtn = el('button', {class:'btn', text:'Check my count'});
  const fb = el('div', {class:'feedback'});

  body.appendChild(el('div', {class:'w-controls'}, [ el('label', {}, ['Code', pick]), el('label', {}, ['n =', nIn]) ]));
  body.appendChild(codeBox);
  body.appendChild(el('p', {style:'margin-top:14px', text:'Work out how many times the basic operation runs for this n, then check it.'}));
  body.appendChild(el('div', {class:'w-controls'}, [guessIn, checkBtn]));
  body.appendChild(fb);
  body.appendChild(out);

  function refresh(){
    const s = SNIPPETS[+pick.value];
    codeBox.textContent = s.code;
    out.innerHTML = '';
    fb.className = 'feedback';
    guessIn.value = '';
    guessIn.className = 'fill wide';
  }
  function check(){
    const s = SNIPPETS[+pick.value];
    const n = Math.max(1, Math.min(200, +nIn.value || 1));
    const exact = Math.round(s.count(n));
    const g = parseFloat(guessIn.value);
    if (isNaN(g)){
      fb.className = 'feedback show hint';
      fb.innerHTML = 'Type a number in the box first — how many times does the operation run when n = ' + n + '?';
      guessIn.className = 'fill wide';
      return;
    }
    const right = Math.abs(g - exact) < 0.5;
    guessIn.className = 'fill wide ' + (right ? 'right' : 'wrong');
    fb.className = 'feedback show ' + (right ? 'good' : 'bad');
    fb.innerHTML = (right ? '<strong>Correct.</strong> ' : '<strong>Not quite.</strong> ') +
      'For n = ' + n + ' the operation runs <strong>' + exact.toLocaleString() + '</strong> times.<br>' +
      'Closed form: <code>' + s.form + '</code> &nbsp;→&nbsp; <strong>' + s.order + '</strong>';
    out.innerHTML = '';
    [8,16,32,64].forEach(k => {
      const st = statEl('n=' + k + ' →');
      st.set(Math.round(s.count(k)).toLocaleString());
      out.appendChild(st.node);
    });
  }
  pick.addEventListener('change', refresh);
  nIn.addEventListener('change', () => { fb.className = 'feedback'; });
  checkBtn.addEventListener('click', check);
  guessIn.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
  refresh();
};

/* ============================================================
   4 — Find c and N
   ============================================================ */
WIDGETS.bigoProof = function(host){
  const {box, body} = shell('Find c and N for the Big O bound', 'Lab 4');
  host.appendChild(box);

  const CASES = [
    { label:'f(n) = n² + 3n + 4,  g(n) = n²',       f:n => n*n + 3*n + 4,      g:n => n*n,   note:'The lecture picks c = 8, N = 1.' },
    { label:'f(n) = 4n² + 20n + 6,  g(n) = n²',     f:n => 4*n*n + 20*n + 6,   g:n => n*n,   note:'c = 30, N = 1 works. So does c = 5, N = 22.' },
    { label:'f(n) = n(n−1)/2,  g(n) = n²',          f:n => n*(n-1)/2,          g:n => n*n,   note:'Insertion sort worst case. c = 1, N = 1 is enough.' },
    { label:'f(n) = 100n + 3,  g(n) = n',           f:n => 100*n + 3,          g:n => n,     note:'c = 103 with N = 1 works. A big constant is still just a constant — the order is unchanged.' },
    { label:'f(n) = 0.1n³ + 10n²,  g(n) = n³',      f:n => 0.1*n*n*n + 10*n*n, g:n => n*n*n, note:'c = 10.1, N = 1. Or c = 0.2 once n is past 100.' }
  ];

  const pick = el('select');
  CASES.forEach((c,i) => pick.appendChild(el('option', {value:String(i), text:c.label})));
  const cIn = el('input', {type:'range', min:'1', max:'120', step:'0.5', value:'2'});
  const nIn = el('input', {type:'range', min:'1', max:'60', value:'1'});
  const cOut = el('span', {class:'stat'}, ['c = ', el('b', {text:'2'})]);
  const nOut = el('span', {class:'stat'}, ['N = ', el('b', {text:'1'})]);
  const verdict = el('div', {class:'feedback show hint'});
  const cv = el('canvas', {width:'860', height:'340'});

  body.appendChild(el('p', {html:'Big O says: <code>0 ≤ f(n) ≤ c·g(n) for all n ≥ N</code>. Slide c and N until the red curve never rises above the green one to the right of the dashed line.'}));
  body.appendChild(el('div', {class:'w-controls'}, [el('label', {}, ['Case', pick])]));
  body.appendChild(el('div', {class:'w-controls'}, [ el('label', {}, ['c', cIn]), cOut, el('label', {}, ['N', nIn]), nOut ]));
  body.appendChild(cv);
  body.appendChild(verdict);
  body.appendChild(el('div', {class:'legend'}, [
    el('span', {}, [el('i', {class:'swatch', style:'background:#c2543f'}), 'f(n)']),
    el('span', {}, [el('i', {class:'swatch', style:'background:#1f9f6b'}), 'c · g(n)'])
  ]));

  function draw(){
    const cs = CASES[+pick.value];
    const c = +cIn.value, N = +nIn.value;
    cOut.querySelector('b').textContent = c;
    nOut.querySelector('b').textContent = N;

    const LIM = 80;
    let holds = true, firstFail = null;
    for (let n = N; n <= 400; n++){
      if (cs.f(n) > c * cs.g(n)){ holds = false; if (firstFail === null) firstFail = n; break; }
    }

    const ctx = cv.getContext('2d'); const W = cv.width, H = cv.height, P = 42;
    ctx.clearRect(0,0,W,H);
    let maxY = 1;
    for (let n = 1; n <= LIM; n++) maxY = Math.max(maxY, cs.f(n), c*cs.g(n));
    const x = n => P + (n/LIM) * (W - P - 16);
    const y = v => H - P - (v/maxY) * (H - 2*P);

    ctx.fillStyle = '#f3f8f6';
    ctx.fillRect(x(N), P-12, W - 16 - x(N), H - P - (P-12));
    ctx.strokeStyle = '#9fb3ac'; ctx.setLineDash([5,4]); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(x(N), P-12); ctx.lineTo(x(N), H-P); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#6d827b'; ctx.font = '11px Consolas, monospace';
    ctx.fillText('n ≥ N', x(N)+6, P-1);

    ctx.strokeStyle = '#b9c6c1';
    ctx.beginPath(); ctx.moveTo(P, P-12); ctx.lineTo(P, H-P); ctx.lineTo(W-16, H-P); ctx.stroke();
    ctx.fillText('n', W-26, H-P+16);

    function curve(fn, color){
      ctx.strokeStyle = color; ctx.lineWidth = 2.4; ctx.beginPath();
      for (let n = 1; n <= LIM; n++){
        const py = Math.max(P-14, y(fn(n)));
        if (n === 1) ctx.moveTo(x(n), py); else ctx.lineTo(x(n), py);
      }
      ctx.stroke();
    }
    curve(n => c*cs.g(n), '#1f9f6b');
    curve(cs.f, '#c2543f');

    verdict.className = 'feedback show ' + (holds ? 'good' : 'bad');
    verdict.innerHTML = holds
      ? '<strong>It holds.</strong> With c = ' + c + ' and N = ' + N + ', f(n) ≤ c·g(n) for every n ≥ N — so f(n) is O(g(n)). ' + cs.note
      : '<strong>Not yet.</strong> At n = ' + firstFail + ', f(n) = ' + Math.round(cs.f(firstFail)) +
        ' but c·g(n) = ' + Math.round(c*cs.g(firstFail)) + '. Raise c, or push N further right.';
  }
  pick.addEventListener('change', draw);
  cIn.addEventListener('input', draw);
  nIn.addEventListener('input', draw);
  draw();
};

/* ============================================================
   5 — Insertion sort, pass by pass
   ============================================================ */
WIDGETS.insertionSort = function(host){
  const {box, body} = shell('Insertion sort, pass by pass', 'Lab 5');
  host.appendChild(box);

  let arr = [], i = 1, j = 0, key = null, phase = 'start', comps = 0, shifts = 0, timer = null;

  const preset = el('select', {}, [
    el('option', {value:'random',  text:'random order'}),
    el('option', {value:'reverse', text:'reverse sorted (worst case)'}),
    el('option', {value:'sorted',  text:'already sorted (best case)'})
  ]);
  const sizeIn = el('input', {type:'number', min:'5', max:'14', value:'9', style:'width:70px'});
  const cells = el('div', {class:'cells'});
  const cStat = statEl('comparisons:');
  const sStat = statEl('shifts:');
  const kStat = statEl('key:');
  const status = el('div', {class:'log'});
  const stepBtn = el('button', {class:'btn', text:'Step'});
  const runBtn  = el('button', {class:'btn sec', text:'Run'});
  const newBtn  = el('button', {class:'btn sec', text:'New array'});
  const expect  = el('div', {class:'w-controls'});

  body.appendChild(el('div', {class:'w-controls'}, [ el('label', {}, ['Start from', preset]), el('label', {}, ['n =', sizeIn]) ]));
  body.appendChild(cells);
  body.appendChild(el('div', {class:'w-controls'}, [kStat.node, cStat.node, sStat.node]));
  body.appendChild(el('div', {class:'btnrow'}, [stepBtn, runBtn, newBtn]));
  body.appendChild(status);
  body.appendChild(expect);

  function build(){
    stop();
    const n = Math.max(5, Math.min(14, +sizeIn.value || 9));
    arr = [];
    for (let k = 0; k < n; k++) arr.push(k+1);
    if (preset.value === 'reverse') arr.reverse();
    else if (preset.value === 'random'){
      for (let k = arr.length-1; k > 0; k--){ const r = Math.floor(Math.random()*(k+1)); [arr[k],arr[r]] = [arr[r],arr[k]]; }
    }
    i = 1; j = 0; key = null; phase = 'start'; comps = 0; shifts = 0;
    status.innerHTML = '';
    say('n = ' + n + '. Worst case would be ' + (n*(n-1)/2) + ' comparisons, best case ' + (n-1) + '.');
    expect.innerHTML = '';
    const w = statEl('worst n(n−1)/2 ='); w.set(n*(n-1)/2);
    const b = statEl('best n−1 =');       b.set(n-1);
    expect.appendChild(w.node); expect.appendChild(b.node);
    draw();
  }
  function say(t, hl){ status.appendChild(el('div', {class: hl ? 'hl' : '', text:t})); status.scrollTop = status.scrollHeight; }
  function draw(){
    cells.innerHTML = '';
    arr.forEach((v,idx) => {
      let c = 'cell';
      if (phase === 'done'){ c += ' sorted'; }
      else {
        if (idx < i) c += ' sorted';
        if (phase === 'compare'){
          if (idx === j)      c += ' probe';   // the element being compared
          else if (idx === j+1) c += ' key';   // the hole the key will drop into
        }
      }
      cells.appendChild(el('div', {class:c, text:v}));
    });
    cStat.set(comps); sStat.set(shifts);
    kStat.set(phase === 'compare' && key !== null ? key : '—');
  }
  function step(){
    if (phase === 'done') return;
    if (phase === 'start' || phase === 'place'){
      if (i >= arr.length){
        phase = 'done'; stop();
        say('Sorted in ' + comps + ' comparisons and ' + shifts + ' shifts.', true);
        draw(); return;
      }
      key = arr[i]; j = i - 1; phase = 'compare';
      say('Pass i = ' + i + ': key = ' + key);
      draw(); return;
    }
    if (phase === 'compare'){
      if (j >= 0){
        comps++;
        if (arr[j] > key){
          say('  ' + arr[j] + ' > ' + key + ' — shift it right, keep looking left');
          arr[j+1] = arr[j]; shifts++; j--;
        } else {
          arr[j+1] = key; i++; phase = 'place';
          say('  arr[' + j + '] ≤ key — insert here');
        }
      } else {
        arr[0] = key; i++; phase = 'place';
        say('  reached the front — insert at 0');
      }
      draw();
    }
  }
  function run(){
    stop();
    timer = setInterval(() => {
      if (phase === 'done' || !document.body.contains(box)){ stop(); return; }
      step();
    }, 260);
  }
  function stop(){ if (timer){ clearInterval(timer); timer = null; } }

  preset.addEventListener('change', build);
  sizeIn.addEventListener('change', build);
  stepBtn.addEventListener('click', step);
  runBtn.addEventListener('click', run);
  newBtn.addEventListener('click', build);
  build();
};

/* ============================================================
   6 — Average case simulator
   ============================================================ */
WIDGETS.avgCase = function(host){
  const {box, body} = shell('A(n) for sequential search, by experiment', 'Lab 6');
  host.appendChild(box);

  const nIn = el('input', {type:'number', min:'2', max:'500', value:'100', style:'width:80px'});
  const pIn = el('input', {type:'range', min:'0', max:'100', value:'100'});
  const pOut = el('span', {class:'stat'}, ['p = ', el('b', {text:'1.00'})]);
  const trialsIn = el('select', {}, [
    el('option', {value:'1000',  text:'1,000 searches'}),
    el('option', {value:'10000', text:'10,000 searches'}),
    el('option', {value:'100000',text:'100,000 searches'})
  ]);
  const runBtn = el('button', {class:'btn', text:'Run the experiment'});
  const out = el('div', {class:'feedback show hint', html:'Set n and p, then run. p is the probability that the key is actually in the array.'});

  body.appendChild(el('p', {html:'The formula says <code>A(n) = n(1 − p/2) + p/2</code>. Averaging enough random searches should land on the same number.'}));
  body.appendChild(el('div', {class:'w-controls'}, [
    el('label', {}, ['n =', nIn]),
    el('label', {}, ['probability present', pIn]), pOut,
    el('label', {}, ['trials', trialsIn])
  ]));
  body.appendChild(el('div', {class:'btnrow'}, [runBtn]));
  body.appendChild(out);

  pIn.addEventListener('input', () => pOut.querySelector('b').textContent = (pIn.value/100).toFixed(2));

  runBtn.addEventListener('click', () => {
    const n = Math.max(2, Math.min(500, +nIn.value || 100));
    const p = +pIn.value / 100;
    const trials = +trialsIn.value;
    let total = 0;
    for (let t = 0; t < trials; t++){
      if (Math.random() < p) total += Math.floor(Math.random() * n) + 1;   // found at a uniformly random slot
      else total += n;                                                     // full failed scan
    }
    const emp = total / trials;
    const formula = n * (1 - p/2) + p/2;
    const diff = Math.abs(emp - formula);
    out.className = 'feedback show ' + (diff < Math.max(0.6, n*0.02) ? 'good' : 'hint');
    out.innerHTML =
      '<strong>Measured average:</strong> ' + emp.toFixed(3) + ' comparisons over ' + trials.toLocaleString() + ' searches.<br>' +
      '<strong>Formula A(n) = n(1 − p/2) + p/2:</strong> ' + formula.toFixed(3) + '<br>' +
      '<strong>Difference:</strong> ' + diff.toFixed(3) +
      (p === 1 ? '<br><br>With p = 1 the formula collapses to (n+1)/2 = ' + ((n+1)/2).toFixed(1) + '.' : '') +
      (p === 0 ? '<br><br>With p = 0 every search fails and scans all n slots.' : '');
  });
};
