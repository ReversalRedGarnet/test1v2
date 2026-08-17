/* ============================================================
   CS214 Revise — router, renderer, activities, progress
   ============================================================ */

/* ---------- storage that never throws ---------- */
const Store = (function(){
  let ok = true, mem = {};
  try { localStorage.setItem('__t','1'); localStorage.removeItem('__t'); }
  catch(e){ ok = false; }
  return {
    get(k, dflt){
      try { const v = ok ? localStorage.getItem(k) : mem[k];
            return v == null ? dflt : JSON.parse(v); }
      catch(e){ return dflt; }
    },
    set(k, v){
      try { const s = JSON.stringify(v); if (ok) localStorage.setItem(k, s); else mem[k] = s; }
      catch(e){ /* private browsing — carry on */ }
    },
    clear(){
      try { if (ok){ ['cs214.done','cs214.answers','cs214.quiz'].forEach(k => localStorage.removeItem(k)); } mem = {}; }
      catch(e){}
    }
  };
})();

let DONE    = Store.get('cs214.done', {});
let ANSWERS = Store.get('cs214.answers', {});

function markDone(id){
  if (!id || DONE[id]) return;
  DONE[id] = true;
  Store.set('cs214.done', DONE);
  paintProgress();
}
function saveAnswer(id, val){ ANSWERS[id] = val; Store.set('cs214.answers', ANSWERS); }

/* ---------- activity census ---------- */
const ACTIVITY_TYPES = {mcq:1, fill:1, reveal:1, order:1, pairs:1};
function activityIds(section){
  return (section.blocks || []).filter(b => ACTIVITY_TYPES[b.t] && b.id).map(b => b.id);
}
const ALL_ACTIVITIES = SECTIONS.reduce((a,s) => a.concat(activityIds(s)), []);

function paintProgress(){
  const total = ALL_ACTIVITIES.length;
  const done  = ALL_ACTIVITIES.filter(id => DONE[id]).length;
  const pct   = total ? Math.round(done/total*100) : 0;
  const ring  = document.getElementById('ringFg');
  const C = 2 * Math.PI * 15.5;
  ring.style.strokeDasharray  = C;
  ring.style.strokeDashoffset = C * (1 - pct/100);
  document.getElementById('progressText').textContent = pct + '%';
  document.getElementById('progressPill').title = done + ' of ' + total + ' activities completed';
  document.querySelectorAll('#nav a').forEach(a => {
    const sec = SECTIONS.find(s => '#/' + s.id === a.getAttribute('href'));
    if (!sec) return;
    const ids = activityIds(sec);
    a.classList.toggle('done', ids.length > 0 && ids.every(i => DONE[i]));
  });
}

/* ---------- text helpers ---------- */
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

/* inline markdown: **bold** and `code`; raw HTML in the source is allowed through */
function md(s){
  return String(s)
    .replace(/`([^`]+)`/g, (m,c) => '<code>' + esc(c) + '</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

const JAVA_KW = new Set(('abstract assert boolean break byte case catch char class const continue default do double else enum ' +
  'extends final finally float for goto if implements import instanceof int interface long native new package private ' +
  'protected public return short static strictfp super switch synchronized this throw throws transient try void volatile ' +
  'while true false null').split(' '));

function highlight(src, lang){
  if (lang === 'text') return esc(src);
  const re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*")|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][A-Za-z0-9_$]*)/g;
  let out = '', last = 0, m;
  while ((m = re.exec(src)) !== null){
    out += esc(src.slice(last, m.index));
    if (m[1])      out += '<span class="c">' + esc(m[1]) + '</span>';
    else if (m[2]) out += '<span class="s">' + esc(m[2]) + '</span>';
    else if (m[3]) out += '<span class="n">' + esc(m[3]) + '</span>';
    else {
      const w = m[4];
      if (JAVA_KW.has(w))                       out += '<span class="k">' + esc(w) + '</span>';
      else if (/^[A-Z]/.test(w) && w.length > 1) out += '<span class="t">' + esc(w) + '</span>';
      else                                       out += esc(w);
    }
    last = re.lastIndex;
  }
  out += esc(src.slice(last));
  return out;
}

function norm(s){ return String(s == null ? '' : s).trim().toLowerCase().replace(/\s+/g,' '); }

/* ============================================================
   Block renderers
   ============================================================ */
const R = {};

R.h  = b => el('h2', {html: md(b.x)});
R.h3 = b => el('h3', {html: md(b.x)});
R.p  = b => el('p',  {html: md(b.x)});
R.ul = b => el('ul', {}, b.x.map(i => el('li', {html: md(i)})));
R.ol = b => el('ol', {}, b.x.map(i => el('li', {html: md(i)})));
R.formula = b => el('div', {class:'formula'}, [el('pre', {style:'margin:0;font:inherit;white-space:pre-wrap', text:b.x})]);

R.code = b => {
  const head = el('div', {class:'codebox-head'}, [
    el('span', {class:'tag', text: b.lang === 'text' ? 'pseudocode' : 'java'}),
    el('span', {text: b.cap || ''})
  ]);
  const pre = el('pre'); pre.innerHTML = highlight(b.x, b.lang);
  return el('div', {class:'codebox'}, [head, pre]);
};

R.note = b => el('div', {class:'note ' + (b.k || '')}, [
  el('div', {class:'note-title', text: b.title || 'Note'}),
  el('div', {html: md(b.x)})
]);

R.table = b => {
  let h = '<table><thead><tr>';
  b.head.forEach(x => h += '<th>' + md(x) + '</th>');
  h += '</tr></thead><tbody>';
  b.rows.forEach(r => { h += '<tr>'; r.forEach(c => h += '<td>' + md(c) + '</td>'); h += '</tr>'; });
  h += '</tbody></table>';
  return el('div', {class:'tablewrap', html:h});
};

R.cards = b => el('div', {class:'cards'}, b.x.map(c =>
  el('a', {class:'card', href:c.to}, [
    el('div', {class:'kick', text:c.kick}),
    el('h3', {text:c.h}),
    el('p', {text:c.p})
  ])
));

R.widget = b => {
  const host = el('div');
  if (WIDGETS[b.w]) { try { WIDGETS[b.w](host); } catch(e){
    host.appendChild(el('p', {text:'This lab could not start in your browser.'}));
  } }
  return host;
};

/* ---------- multiple choice ---------- */
R.mcq = b => {
  const {box, body} = activityShell('Check yourself', b.id);
  body.appendChild(el('p', {html: md(b.q)}));
  const fb = el('div', {class:'feedback'});
  const list = el('ul', {class:'choices'});
  const keys = 'ABCD'.split('');
  const btns = [];

  b.opts.forEach((opt,i) => {
    const btn = el('button', {class:'choice', type:'button'}, [
      el('span', {class:'key', text:keys[i]}),
      el('span', {html: md(opt)})
    ]);
    btn.addEventListener('click', () => answer(i));
    btns.push(btn);
    list.appendChild(el('li', {}, [btn]));
  });

  function answer(i){
    btns.forEach((bt,k) => {
      bt.disabled = true;
      if (k === b.a) bt.classList.add('correct');
      else if (k === i) bt.classList.add('incorrect');
    });
    const right = i === b.a;
    fb.className = 'feedback show ' + (right ? 'good' : 'bad');
    fb.innerHTML = (right ? '<strong>Correct.</strong> ' : '<strong>Not quite — the answer is ' + keys[b.a] + '.</strong> ') + md(b.why);
    saveAnswer(b.id, i);
    markDone(b.id);
    setState(box, right ? 'correct' : 'answered');
  }

  body.appendChild(list);
  body.appendChild(fb);
  if (ANSWERS[b.id] != null) setTimeout(() => answer(ANSWERS[b.id]), 0);
  return box;
};

/* ---------- fill in the blanks ---------- */
R.fill = b => {
  const {box, body} = activityShell(b.title || 'Complete the code', b.id);
  if (b.prompt) body.appendChild(el('p', {html: md(b.prompt)}));

  const pre = el('pre', {class:'plaincode', style:'white-space:pre-wrap'});
  const parts = b.code.split(/\{\{(\d+)\}\}/);
  const inputs = [];
  parts.forEach((part,i) => {
    if (i % 2 === 0){
      const span = el('span'); span.innerHTML = highlight(part, b.lang || 'java'); pre.appendChild(span);
    } else {
      const idx = +part;
      const width = Math.max(6, Math.min(20, (b.answers[idx][0] || '').length + 3));
      const inp = el('input', {type:'text', class:'fill', 'aria-label':'blank ' + (idx+1), style:'width:' + width + 'ch'});
      inputs[idx] = inp;
      pre.appendChild(inp);
    }
  });

  const fb = el('div', {class:'feedback'});
  const checkBtn = el('button', {class:'btn', text:'Check answer'});
  const hintBtn  = el('button', {class:'btn sec', text:'Hint'});
  const solBtn   = el('button', {class:'btn sec', text:'Show solution'});

  function check(quiet){
    let allRight = true;
    inputs.forEach((inp,i) => {
      const blank = norm(inp.value) === '';
      const ok = b.answers[i].some(a => norm(a) === norm(inp.value));
      inp.className = 'fill ' + (ok ? 'right' : (blank && quiet ? '' : 'wrong'));
      if (!ok) allRight = false;
    });
    saveAnswer(b.id, inputs.map(i => i.value));
    if (quiet && !allRight){ fb.className = 'feedback'; return; }
    fb.className = 'feedback show ' + (allRight ? 'good' : 'bad');
    fb.innerHTML = allRight
      ? '<strong>All correct.</strong> ' + md(b.sol || '')
      : '<strong>Some blanks are not right yet.</strong> Try the hint, or reveal the solution.';
    if (allRight){ markDone(b.id); setState(box, 'correct'); }
  }
  hintBtn.addEventListener('click', () => {
    fb.className = 'feedback show hint';
    fb.innerHTML = '<strong>Hint.</strong> ' + md(b.hint || 'Read the surrounding lines carefully.');
  });
  solBtn.addEventListener('click', () => {
    inputs.forEach((inp,i) => { inp.value = b.answers[i][0]; inp.className = 'fill right'; });
    fb.className = 'feedback show hint';
    fb.innerHTML = '<strong>Solution.</strong> ' + md(b.sol || '');
    markDone(b.id); setState(box, 'reviewed');
  });
  checkBtn.addEventListener('click', () => check(false));
  pre.addEventListener('keydown', e => { if (e.key === 'Enter'){ e.preventDefault(); check(false); } });

  body.appendChild(pre);
  body.appendChild(el('div', {class:'btnrow'}, [checkBtn, hintBtn, solBtn]));
  body.appendChild(fb);

  const saved = ANSWERS[b.id];
  if (Array.isArray(saved)){
    inputs.forEach((inp,i) => inp.value = saved[i] || '');
    if (saved.some(v => v)) check(true);
  }
  return box;
};

/* ---------- write-then-reveal ---------- */
R.reveal = b => {
  const {box, body} = activityShell(b.title || 'Short answer', b.id);
  body.appendChild(el('p', {html: md(b.q)}));
  let ta = null;
  if (b.scratch){
    ta = el('textarea', {class:'scratch', placeholder:'Write your answer here before revealing…'});
    ta.value = ANSWERS[b.id] || '';
    ta.addEventListener('input', () => saveAnswer(b.id, ta.value));
    body.appendChild(ta);
  }
  const ans = el('div', {class:'reveal-body'}, [
    el('div', {class:'note', style:'margin:0'}, [
      el('div', {class:'note-title', text:'Model answer'}),
      el('div', {html: md(b.ans)})
    ])
  ]);
  const btn = el('button', {class:'btn', text:'Reveal the answer'});
  btn.addEventListener('click', () => {
    ans.classList.add('show');
    btn.style.display = 'none';
    markDone(b.id);
    setState(box, 'reviewed');
  });
  body.appendChild(el('div', {class:'btnrow'}, [btn]));
  body.appendChild(ans);
  return box;
};

/* ---------- put in order ---------- */
R.order = b => {
  const {box, body} = activityShell(b.title || 'Put these in order', b.id);
  if (b.prompt) body.appendChild(el('p', {html: md(b.prompt)}));

  let items = ANSWERS[b.id];
  if (!Array.isArray(items) || items.length !== b.items.length || !items.every(x => b.items.indexOf(x) >= 0)){
    items = b.items.slice();
    if (items.length > 1){
      let guard = 0;
      do { for (let k = items.length-1; k > 0; k--){ const r = Math.floor(Math.random()*(k+1)); [items[k],items[r]] = [items[r],items[k]]; } }
      while (items.join('|') === b.items.join('|') && ++guard < 20);
    }
  }

  const list = el('ol', {class:'order-list'});
  const fb = el('div', {class:'feedback'});

  function render(){
    list.innerHTML = '';
    items.forEach((it,i) => {
      const up = el('button', {type:'button', text:'↑', 'aria-label':'move up'});
      const dn = el('button', {type:'button', text:'↓', 'aria-label':'move down'});
      up.addEventListener('click', () => { if (i>0){ [items[i-1],items[i]] = [items[i],items[i-1]]; save(); render(); } });
      dn.addEventListener('click', () => { if (i<items.length-1){ [items[i+1],items[i]] = [items[i],items[i+1]]; save(); render(); } });
      list.appendChild(el('li', {}, [
        el('span', {text: (i+1) + '.'}),
        el('span', {html: md(it)}),
        el('span', {class:'order-btns'}, [up, dn])
      ]));
    });
  }
  function save(){ saveAnswer(b.id, items); fb.className = 'feedback'; }

  const checkBtn = el('button', {class:'btn', text:'Check order'});
  checkBtn.addEventListener('click', () => {
    let right = true;
    [...list.children].forEach((li,i) => {
      const ok = items[i] === b.items[i];
      li.className = ok ? 'ok' : 'no';
      if (!ok) right = false;
    });
    fb.className = 'feedback show ' + (right ? 'good' : 'bad');
    fb.innerHTML = right
      ? '<strong>Correct order.</strong> ' + md(b.ok || '')
      : '<strong>Not yet.</strong> The rows in green are in the right place. ' + md(b.no || '');
    if (right){ markDone(b.id); setState(box, 'correct'); }
  });

  body.appendChild(list);
  body.appendChild(el('div', {class:'btnrow'}, [checkBtn]));
  body.appendChild(fb);
  render();
  return box;
};

/* ---------- classify each item ---------- */
R.pairs = b => {
  const {box, body} = activityShell(b.title || 'Classify these', b.id);
  if (b.prompt) body.appendChild(el('p', {html: md(b.prompt)}));

  const saved = ANSWERS[b.id] || {};
  const rows = el('div');
  const selects = [];

  b.items.forEach((it,i) => {
    const sel = el('select');
    sel.appendChild(el('option', {value:'', text:'— choose —'}));
    b.cats.forEach(c => sel.appendChild(el('option', {value:c, text:c})));
    if (saved[i]) sel.value = saved[i];
    const row = el('div', {class:'pair-row'}, [
      el('span', {class:'pair-text', html: md(it.x)}),
      sel
    ]);
    sel.addEventListener('change', () => {
      const cur = ANSWERS[b.id] || {}; cur[i] = sel.value; saveAnswer(b.id, cur);
      fb.className = 'feedback'; row.className = 'pair-row';
    });
    selects.push(sel);
    rows.appendChild(row);
  });

  const fb = el('div', {class:'feedback'});
  const btn = el('button', {class:'btn', text:'Check answers'});
  btn.addEventListener('click', () => {
    let n = 0;
    selects.forEach((sel,i) => {
      const ok = sel.value === b.items[i].a;
      sel.parentNode.className = 'pair-row ' + (ok ? 'ok' : 'no');
      if (ok) n++;
    });
    const all = n === b.items.length;
    fb.className = 'feedback show ' + (all ? 'good' : 'bad');
    fb.innerHTML = all
      ? '<strong>All ' + n + ' correct.</strong>'
      : '<strong>' + n + ' of ' + b.items.length + ' correct.</strong> The rows shaded red need another look.';
    if (all){ markDone(b.id); setState(box, 'correct'); }
  });

  body.appendChild(rows);
  body.appendChild(el('div', {class:'btnrow'}, [btn]));
  body.appendChild(fb);
  return box;
};

/* ---------- activity chrome ---------- */
function activityShell(title, id){
  const state = el('span', {class:'activity-state', text:''});
  const body  = el('div', {class:'activity-body'});
  const box   = el('div', {class:'activity'}, [
    el('div', {class:'activity-head'}, [
      el('span', {class:'activity-kind', text:'Activity'}),
      el('span', {class:'activity-title', text:title}),
      state
    ]),
    body
  ]);
  box._state = state;
  if (id && DONE[id]) setState(box, 'done');
  return {box, body};
}
function setState(box, kind){
  const s = box._state; if (!s) return;
  const label = {correct:'✓ correct', answered:'answered', reviewed:'✓ reviewed', done:'✓ done'}[kind] || '';
  s.textContent = label;
  s.className = 'activity-state' + (kind === 'correct' || kind === 'reviewed' || kind === 'done' ? ' ok' : '');
}

/* ============================================================
   Quiz
   ============================================================ */
R.quiz = () => {
  const wrap = el('div');
  const state = Store.get('cs214.quiz', {best:0, taken:0});
  const topics = ['All topics', ...new Set(QUIZ_BANK.map(q => q.topic))];
  const topicSel = el('select');
  topics.forEach(t => topicSel.appendChild(el('option', {value:t, text:t})));
  const newBtn = el('button', {class:'btn', text:'Start a new set'});
  const scoreStat = el('span', {class:'stat'}, ['score: ', el('b', {text:'0 / 0'})]);
  const bestStat  = el('span', {class:'stat'}, ['best: ', el('b', {text: state.best + '%'})]);

  const qArea = el('div');
  const summary = el('div');

  wrap.appendChild(el('div', {class:'quiz-meta'}, [
    el('label', {style:'display:flex;gap:7px;align-items:center;font-size:13.5px'}, ['Topic', topicSel]),
    newBtn, scoreStat, bestStat
  ]));
  wrap.appendChild(summary);
  wrap.appendChild(qArea);

  let answered = 0, correct = 0, total = 0;

  function build(){
    const t = topicSel.value;
    let pool = QUIZ_BANK.filter(q => t === 'All topics' || q.topic === t);
    pool = pool.slice();
    for (let k = pool.length-1; k > 0; k--){ const r = Math.floor(Math.random()*(k+1)); [pool[k],pool[r]] = [pool[r],pool[k]]; }
    const set = pool.slice(0, Math.min(10, pool.length));
    total = set.length; answered = 0; correct = 0;
    summary.innerHTML = '';
    qArea.innerHTML = '';
    scoreStat.querySelector('b').textContent = '0 / ' + total;

    set.forEach((q,i) => {
      const {box, body} = activityShell('Question ' + (i+1) + ' · ' + q.topic, null);
      body.appendChild(el('p', {html: md(q.q)}));
      const fb = el('div', {class:'feedback'});
      const list = el('ul', {class:'choices'});
      const keys = 'ABCD'.split('');
      const btns = [];
      q.opts.forEach((opt,k) => {
        const btn = el('button', {class:'choice', type:'button'}, [
          el('span', {class:'key', text:keys[k]}),
          el('span', {html: md(opt)})
        ]);
        btn.addEventListener('click', () => {
          if (btns[0].disabled) return;
          btns.forEach((bt,z) => {
            bt.disabled = true;
            if (z === q.a) bt.classList.add('correct');
            else if (z === k) bt.classList.add('incorrect');
          });
          const right = k === q.a;
          if (right) correct++;
          answered++;
          fb.className = 'feedback show ' + (right ? 'good' : 'bad');
          fb.innerHTML = (right ? '<strong>Correct.</strong> ' : '<strong>The answer is ' + keys[q.a] + '.</strong> ') + md(q.why);
          setState(box, right ? 'correct' : 'answered');
          scoreStat.querySelector('b').textContent = correct + ' / ' + total;
          if (answered === total) finish();
        });
        btns.push(btn);
        list.appendChild(el('li', {}, [btn]));
      });
      body.appendChild(list);
      body.appendChild(fb);
      qArea.appendChild(box);
    });
  }

  function finish(){
    const pct = Math.round(correct/total*100);
    const st = Store.get('cs214.quiz', {best:0, taken:0});
    st.taken++; if (pct > st.best) st.best = pct;
    Store.set('cs214.quiz', st);
    bestStat.querySelector('b').textContent = st.best + '%';
    const verdict = pct >= 80 ? 'Solid. Move on to the exercises and the sample test.'
                  : pct >= 50 ? 'Halfway there. Re-read the pages behind the ones you missed and take another set.'
                  : 'Worth going back through the lesson pages before another set — the explanations above tell you which pages.';
    summary.innerHTML = '';
    summary.appendChild(el('div', {class:'scorecard'}, [
      el('div', {class:'big', text: pct + '%'}),
      el('div', {class:'bar'}, [el('i', {style:'width:' + pct + '%'})]),
      el('p', {style:'margin:0', html:'<strong>' + correct + ' out of ' + total + ' correct.</strong> ' + verdict})
    ]));
    if (summary.scrollIntoView) summary.scrollIntoView({block:'nearest'});
  }

  newBtn.addEventListener('click', build);
  topicSel.addEventListener('change', build);
  build();
  return wrap;
};

/* ============================================================
   Page rendering + routing
   ============================================================ */
function buildNav(){
  const nav = document.getElementById('nav');
  let group = null;
  SECTIONS.forEach(s => {
    if (s.group !== group){
      group = s.group;
      nav.appendChild(el('div', {class:'nav-group', text:group}));
    }
    nav.appendChild(el('a', {href:'#/' + s.id}, [
      el('span', {text: s.nav || s.title}),
      el('span', {class:'tick', text:'✓'})
    ]));
  });
}

function renderSection(sec){
  const page = document.getElementById('page');
  page.innerHTML = '';
  if (sec.eyebrow) page.appendChild(el('p', {class:'eyebrow', text:sec.eyebrow}));
  page.appendChild(el('h1', {text:sec.title}));
  if (sec.lede) page.appendChild(el('p', {class:'lede', html: md(sec.lede)}));

  (sec.blocks || []).forEach(b => {
    const fn = R[b.t];
    if (!fn) return;
    try { page.appendChild(fn(b)); }
    catch(e){ console.error('block failed', b, e); }
  });

  // pager
  const pager = document.getElementById('pager');
  pager.innerHTML = '';
  const i = SECTIONS.indexOf(sec);
  if (i > 0){
    const p = SECTIONS[i-1];
    pager.appendChild(el('a', {class:'prev', href:'#/' + p.id}, [
      el('span', {text:'Previous'}), el('strong', {text: p.nav || p.title})
    ]));
  }
  if (i < SECTIONS.length - 1){
    const nx = SECTIONS[i+1];
    pager.appendChild(el('a', {class:'next', href:'#/' + nx.id}, [
      el('span', {text:'Next'}), el('strong', {text: nx.nav || nx.title})
    ]));
  }

  document.querySelectorAll('#nav a').forEach(a =>
    a.classList.toggle('active', a.getAttribute('href') === '#/' + sec.id));
  document.title = sec.title + ' — CS214 Revise';
  paintProgress();
}

function route(){
  const id = (location.hash || '#/start').replace('#/','');
  const sec = SECTIONS.find(s => s.id === id);
  if (!sec){                                    // unknown hash — normalise the URL
    if (location.replace) location.replace('#/' + SECTIONS[0].id);
    else location.hash = '#/' + SECTIONS[0].id;
    renderSection(SECTIONS[0]);
    return;
  }
  renderSection(sec);
  document.body.classList.remove('nav-open');
  window.scrollTo(0,0);
  document.getElementById('main').focus({preventScroll:true});
}

/* ---------- boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  buildNav();
  window.addEventListener('hashchange', route);
  route();

  const toggle = document.getElementById('navToggle');
  toggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.getElementById('scrim').addEventListener('click', () => document.body.classList.remove('nav-open'));

  document.getElementById('resetBtn').addEventListener('click', () => {
    if (!confirm('Clear every saved answer, score and tick? This cannot be undone.')) return;
    Store.clear();
    DONE = {}; ANSWERS = {};
    paintProgress();
    route();
  });
});
