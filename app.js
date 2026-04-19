// ============================================================
// Siehe 1989 — Allmend Totomat app logic
// ============================================================
const D = window.SIEHE_DATA;

// ---------- clock ----------
function tick() {
  const n = new Date();
  const el = document.getElementById('clock');
  if (!el) return;
  el.textContent =
    String(n.getHours()).padStart(2,'0') + ':' +
    String(n.getMinutes()).padStart(2,'0') + ':' +
    String(n.getSeconds()).padStart(2,'0');
}
tick(); setInterval(tick, 1000);

// ---------- boot hide ----------
setTimeout(() => {
  const b = document.getElementById('boot');
  if (b) b.style.display = 'none';
}, 4500);

// ---------- navigation ----------
const PAGE_BY_NUM = {};
document.querySelectorAll('.nav-btn').forEach(b => {
  PAGE_BY_NUM[b.dataset.p] = b.dataset.page;
});

function goTo(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const pg = document.getElementById(pageId);
  if (pg) pg.classList.add('active');
  const btn = document.querySelector(`.nav-btn[data-page="${pageId}"]`);
  if (btn) {
    btn.classList.add('active');
    const pnum = btn.dataset.p;
    document.getElementById('pageInput').value = pnum;
    document.getElementById('pageLabel').textContent = 'SEITE ' + pnum;
  }
  try { localStorage.setItem('siehe1989.page', pageId); } catch(e){}
}

document.getElementById('nav').addEventListener('click', e => {
  const btn = e.target.closest('.nav-btn');
  if (btn) goTo(btn.dataset.page);
});
document.getElementById('fastext').addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (btn) goTo(btn.dataset.page);
});

// Page-number input
const pageInput = document.getElementById('pageInput');
pageInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const v = pageInput.value.trim();
    if (PAGE_BY_NUM[v]) goTo(PAGE_BY_NUM[v]);
    else {
      pageInput.style.color = '#f33';
      setTimeout(() => { pageInput.style.color = ''; }, 600);
    }
  }
});
pageInput.addEventListener('focus', () => pageInput.select());

// keyboard shortcuts
document.addEventListener('keydown', e => {
  if (e.target === pageInput) return;
  const map = {'1':'ticker','2':'timeline','3':'standings','4':'crosstable','5':'matchesq','6':'matchesf','7':'scorers','8':'squad','9':'portrait'};
  if (map[e.key]) goTo(map[e.key]);
  if (e.key === 'Escape') closeModal();
});

// restore last page
try {
  const last = localStorage.getItem('siehe1989.page');
  if (last && document.getElementById(last)) goTo(last);
} catch(e){}

// ============================================================
// STANDINGS
// ============================================================
function buildTable(data, containerId, showNote) {
  const el = document.getElementById(containerId);
  el.innerHTML = '';
  data.forEach((row, i) => {
    if (row.sep) {
      const sep = document.createElement('div');
      sep.className = 'tt-sep';
      sep.textContent = '─'.repeat(72);
      el.appendChild(sep);
      return;
    }
    const div = document.createElement('div');
    div.className = 'tt-row ' + (i%2===0?'even':'odd') + (row.champion?' champion':'');
    div.dataset.club = row.club;
    div.innerHTML =
      `<div class="col-rank">${row.r}</div>` +
      `<div class="col-club ${row.champion?'champion-club':row.dim?'dim-club':''}">${row.club}</div>` +
      `<div class="col-p">${row.p}</div>` +
      `<div class="col-w">${row.w}</div>` +
      `<div class="col-d">${row.d}</div>` +
      `<div class="col-l">${row.l}</div>` +
      `<div class="col-gd">${row.gf}:${row.ga}</div>` +
      `<div class="col-pts">${row.pts}</div>` +
      (showNote ? `<div class="col-note">${row.note||''}</div>` : '');
    div.addEventListener('click', () => filterByClub(row.club));
    el.appendChild(div);
  });
}
buildTable(D.QP_STANDINGS, 'qp-table', false);
buildTable(D.FG_STANDINGS, 'fg-table', true);

// ============================================================
// CROSSTABLE
// ============================================================
document.getElementById('ct-qp').innerHTML = D.CT_QP_TEXT;
document.getElementById('ct-fg').innerHTML = D.CT_FG_TEXT;

// ============================================================
// MATCHES
// ============================================================
// short-key lookup for match detail: "<home>-<away>-<score>"
function matchKey(m) {
  // strip noise & map to detail key prefix
  const fullMap = {'Luzern':'Luzern','Young Boys':'Young Boys','Grasshopper':'Grasshopper','Servette':'Servette','St.Gallen':'St.Gallen'};
  return `${m.h}-${m.a}-${m.s}`;
}

function renderMatches(data, containerId, filterClub) {
  const el = document.getElementById(containerId);
  el.innerHTML = '';
  let shown = 0;
  data.forEach(round => {
    const filtered = filterClub ? round.m.filter(m => m.h.includes(filterClub) || m.a.includes(filterClub)) : round.m;
    if (!filtered.length) return;
    const rhead = document.createElement('div');
    rhead.className = 'round-head';
    rhead.innerHTML = `<span>${round.r}</span><span>${round.d}</span>`;
    el.appendChild(rhead);
    filtered.forEach(m => {
      const [a, b] = m.s.split('-').map(Number);
      const div = document.createElement('div');
      const detailKey = matchKey(m);
      const hasDetail = !!D.MATCH_DETAILS[detailKey];
      div.className = 'match-row' + (m.luzern ? ' luzern-match' : '') + (hasDetail ? ' has-detail' : '');
      const homeClass = m.luzern ? 'luzern-name' : (a > b ? 'winner-name' : a < b ? 'loser-name' : '');
      const awayClass = m.luzern ? 'luzern-name' : (b > a ? 'winner-name' : b < a ? 'loser-name' : '');
      div.innerHTML =
        `<div class="m-home ${homeClass}">${m.h}</div>` +
        `<div class="m-score">${m.s}</div>` +
        `<div class="m-away ${awayClass}">${m.a}</div>` +
        `<div class="m-goals">${m.g}</div>`;
      if (hasDetail) {
        div.addEventListener('click', () => openMatch(detailKey));
      }
      el.appendChild(div);
      shown++;
    });
  });
  if (!shown) {
    el.innerHTML = '<div style="color:#888;padding:20px 4px;text-align:center;font-size:16px;">KEINE SPIELE FÜR DIESEN KLUB.</div>';
  }
}

function buildFilterBar(containerId, filterClub, data, pageId) {
  const el = document.getElementById(containerId);
  if (!filterClub) { el.innerHTML = ''; return; }
  el.innerHTML = `<div class="match-filter-bar">
    <span>▼ FILTER: <b style="color:var(--green)">${filterClub.toUpperCase()}</b></span>
    <button class="clear" onclick="clearFilter()">✕ ALLE SPIELE</button>
  </div>`;
}

let currentFilter = '';
function filterByClub(club) {
  // map full club name to short match-string that matches
  const shortMap = {
    'FC Luzern':'Luzern',
    'Grasshopper Club Zürich':'Grasshopper',
    'AC Bellinzona':'Bellinzona',
    'FC Sion':'Sion',
    'FC Wettingen':'Wettingen',
    'BSC Young Boys':'Young Boys',
    'Neuchâtel Xamax FC':'Xamax',
    'Servette FC Genève':'Servette',
    'FC Aarau':'Aarau',
    'Lausanne-Sports':'Lausanne',
    'FC St.Gallen':'St.Gallen',
    'FC Lugano':'Lugano',
  };
  const short = shortMap[club] || club;
  currentFilter = short;
  // highlight rows
  document.querySelectorAll('.tt-row').forEach(r => {
    r.classList.toggle('selected', r.dataset.club === club);
  });
  renderMatches(D.MATCHES_QP, 'mq-content', short);
  renderMatches(D.MATCHES_FG, 'mf-content', short);
  buildFilterBar('mq-filter-bar', short);
  buildFilterBar('mf-filter-bar', short);
  // nav to QP page
  goTo('matchesq');
}
window.clearFilter = function() {
  currentFilter = '';
  document.querySelectorAll('.tt-row').forEach(r => r.classList.remove('selected'));
  renderMatches(D.MATCHES_QP, 'mq-content');
  renderMatches(D.MATCHES_FG, 'mf-content');
  document.getElementById('mq-filter-bar').innerHTML = '';
  document.getElementById('mf-filter-bar').innerHTML = '';
};

renderMatches(D.MATCHES_QP, 'mq-content');
renderMatches(D.MATCHES_FG, 'mf-content');

// ============================================================
// SCORERS
// ============================================================
function buildScorers(data, containerId, showQpFg) {
  const el = document.getElementById(containerId);
  el.innerHTML = '';
  data.forEach(s => {
    const div = document.createElement('div');
    div.className = 'sc-row';
    div.innerHTML =
      `<div class="sc-rank">${s.r}</div>` +
      `<div class="sc-name ${s.luzern ? 'sc-luzern' : ''}">${s.name}</div>` +
      (showQpFg ? `<div class="sc-qp">${s.qp}</div><div class="sc-fg">${s.fg}</div>` : `<div class="sc-qp" style="width:72px"></div>`) +
      `<div class="sc-tot">${s.tot}</div>` +
      `<div class="sc-club ${s.luzern ? 'sc-luzern' : ''}">${s.club}</div>`;
    // only FCL players have bio
    if (D.PLAYER_BIO[s.name.replace(/\s+\(.*\)$/,'')] || D.PLAYER_BIO[s.name]) {
      div.addEventListener('click', () => openPlayer(s.name));
    }
    el.appendChild(div);
  });
}
buildScorers(D.SCORERS, 'scorers-table', true);
buildScorers(D.SCORERS_FG, 'scorers-fg-table', false);

// ============================================================
// SQUAD
// ============================================================
const sqEl = document.getElementById('squad-table');
D.SQUAD.forEach(p => {
  const div = document.createElement('div');
  div.className = 'sq-row';
  div.innerHTML =
    `<div class="sq-pos">${p.pos}</div>` +
    `<div class="sq-name">${p.name}</div>` +
    `<div class="sq-apps">${p.apps}</div>` +
    `<div class="sq-goals" style="color:${p.goals>0?'#ffff00':'#555'}">${p.goals > 0 ? p.goals : '─'}</div>` +
    `<div class="sq-note">${p.note}</div>`;
  div.addEventListener('click', () => openPlayer(p.name));
  sqEl.appendChild(div);
});

// ============================================================
// TICKER
// ============================================================
(function initTicker(){
  const el = document.getElementById('ticker-list');
  const scrollEl = document.getElementById('scrollText');
  const times = ['17:34','16:02','14:58','12:17','10:45','09:21','08:03','07:44'];
  D.TICKER.forEach((t, i) => {
    const d = document.createElement('div');
    d.className = 'tk-line';
    const pri = i < 2 ? 'FLASH' : (i < 4 ? 'NEWS ' : 'INFO ');
    const cls = i < 2 ? '' : (i < 4 ? 'std' : 'old');
    d.innerHTML =
      `<span class="tk-time">${times[i]||'—'}</span>` +
      `<span class="tk-pri" style="color:${i<2?'var(--red)':i<4?'var(--cyan)':'var(--dim2)'}">${pri}</span>` +
      `<span class="tk-msg ${cls}">► ${t}</span>`;
    el.appendChild(d);
  });
  const txt = D.TICKER.join('   ✦   ') + '   ✦   ';
  scrollEl.textContent = txt + txt;
})();

// ============================================================
// TIMELINE
// ============================================================
(function initTimeline(){
  const el = document.getElementById('tl-events');
  D.TIMELINE.forEach(e => {
    const div = document.createElement('div');
    div.className = 'tl-event' + (e.t === 'MEISTERMATCH' ? ' meister' : '');
    div.innerHTML =
      `<div class="tl-date">${e.d}</div>` +
      `<div class="tl-t">${e.t}</div>` +
      `<div class="tl-c">${e.c}</div>` +
      `<div class="tl-desc">${e.desc}</div>`;
    el.appendChild(div);
  });

  // month axis
  const axis = document.getElementById('tl-axis');
  const months = ['JUL','AUG','SEP','OKT','NOV','DEZ','—','MÄR','APR','MAI','JUN'];
  months.forEach((m, i) => {
    const d = document.createElement('div');
    d.className = 'tl-month';
    d.style.left = (i * (100/months.length)) + '%';
    d.style.width = (100/months.length) + '%';
    d.textContent = m;
    if (m === '—') d.style.borderLeft = '1px dashed #555';
    axis.appendChild(d);
  });
})();

// ============================================================
// PORTRAIT
// ============================================================
(function initPortrait(){
  const grid = document.getElementById('pr-grid');
  const P = D.PORTRAIT;

  const pitchArt =
`       ┌─────────────────────────┐
       │   ·                ·    │
       │ ┌─┴─┐              ┌─┴─┐│
       │ │ ▣ │   ALLMEND    │ ▣ ││
       │ └─┬─┘   26 000     └─┬─┘│
       │   ·                  · │
       └─────────────────────────┘`;

  // Stadion
  const sCard = document.createElement('div');
  sCard.className = 'pr-card';
  sCard.innerHTML =
    `<div class="pr-title">${P.stadion.name}</div>` +
    `<div class="pr-facts">${P.stadion.facts.map(f => `<div class="k">${f.k}</div><div class="v">${f.v}</div>`).join('')}</div>` +
    `<div class="pr-desc">${P.stadion.desc}</div>` +
    `<pre class="pitch-art">${pitchArt}</pre>`;
  grid.appendChild(sCard);

  // Trainer
  const tCard = document.createElement('div');
  tCard.className = 'pr-card';
  tCard.innerHTML =
    `<div class="pr-title">${P.trainer.name}</div>` +
    `<div class="pr-nation">▣ ${P.trainer.nation} · ${P.trainer.born}</div>` +
    `<div class="pr-facts">${P.trainer.facts.map(f => `<div class="k">${f.k}</div><div class="v">${f.v}</div>`).join('')}</div>` +
    `<div class="pr-desc">${P.trainer.desc}</div>` +
    `<pre class="pitch-art" style="color:var(--magenta)">
       ┌── 4 ──┐
       │ · · · │      SYSTEM 4-4-2
       ├──── 4 │      KOMPAKT · EISERN
       │ · · · │      KONTER-FUSSBALL
       └── 2 ──┘
</pre>`;
  grid.appendChild(tCard);

  // Heroes
  const h = document.getElementById('heroes-grid');
  P.heroes.forEach(hero => {
    const c = document.createElement('div');
    c.className = 'hero-card';
    c.innerHTML =
      `<div class="hero-n">${hero.n}</div>` +
      `<div class="hero-r">${hero.r}</div>` +
      `<div class="hero-st">${hero.st}</div>` +
      `<div class="hero-q">« ${hero.q} »</div>`;
    // match name to squad bio
    const name = hero.n
      .split(' ').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ');
    const biokey = Object.keys(D.PLAYER_BIO).find(k => k.toUpperCase().includes(hero.n));
    if (biokey) c.addEventListener('click', () => openPlayer(biokey));
    h.appendChild(c);
  });
})();

// ============================================================
// MODAL
// ============================================================
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

function openModal(title, html) {
  modalTitle.textContent = title;
  modalBody.innerHTML = html;
  modal.classList.add('open');
}
window.closeModal = function() { modal.classList.remove('open'); };
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

// ---------- match detail ----------
function openMatch(key) {
  const m = D.MATCH_DETAILS[key];
  if (!m) return;
  const [hs, as] = key.split('-').slice(-1)[0].split('-').map(Number);
  const scoreParts = key.split('-');
  const score = scoreParts[scoreParts.length-1];
  const [sh, sa] = score.split('').length === 3
    ? [parseInt(score[0]), parseInt(score[2])]
    : score.split('-').map(Number);
  // correct parse
  const parts2 = key.split('-');
  const finalScore = parts2.slice(-1)[0]; // like "3-2" or similar — but we stored "1-0" etc w/ hyphen lost. Use key pattern: home-away-a-b
  // safer: recover from m
  // Actually the key is "Home-Away-a-b" where score uses '-' inside. So split gives e.g. ['Luzern','St.Gallen','3','2']
  const homeTokens = parts2.length - 2;
  const scoreArr = [parts2[parts2.length-2], parts2[parts2.length-1]];
  const a = parseInt(scoreArr[0]), b = parseInt(scoreArr[1]);

  const winH = a > b, winA = b > a;

  // build timeline axis
  const axisMarks = [15,30,45,60,75,90];
  const axisHtml = axisMarks.map(mm => {
    const pct = (mm/90)*100;
    return `<div class="md-tl-mark" style="left:${pct}%"></div>` +
           `<div class="md-tl-label" style="left:${pct}%">${mm}'</div>`;
  }).join('');
  const goalsHtml = (m.timeline||[]).filter(t => t.ev === '⚽').map(t => {
    const pct = Math.min(100, (parseInt(t.m)/90)*100);
    return `<div class="md-tl-goal ${t.team==='h'?'home':'away'}" style="left:${pct}%">${t.m}' ${t.p}</div>`;
  }).join('');

  const eventsHtml = (m.timeline||[]).map(t =>
    `<li>` +
      `<span class="md-ev ${t.team==='h'?'home':'away'}">${t.team==='h'?'◀':'▶'}</span>` +
      `<span class="md-min">${t.m}'</span>` +
      `<span class="md-ev">${t.ev}</span>` +
      `<span class="md-player">${t.p}${t.note?` <span class="md-note">· ${t.note}</span>`:''}</span>` +
    `</li>`
  ).join('');

  const html =
    (m.note ? `<div style="background:var(--red);color:#fff;padding:1px 8px;letter-spacing:2px;text-align:center;font-size:15px">★ ${m.note} ★</div>` : '') +
    `<div class="md-score-line">` +
      `<div class="md-team home ${winH?'win':''}">${m.home}</div>` +
      `<div class="md-score-big">${a}  :  ${b}</div>` +
      `<div class="md-team away ${winA?'win':''}">${m.away}</div>` +
    `</div>` +
    `<div class="md-meta">` +
      `<span><b>DATUM</b> ${m.date}</span>` +
      `<span><b>STADION</b> ${m.venue}</span>` +
      `<span><b>ZUSCHAUER</b> ${m.attendance}</span>` +
      `<span><b>SR</b> ${m.ref}</span>` +
    `</div>` +
    `<div style="color:var(--cyan);font-size:14px;letter-spacing:2px;margin-top:10px">TORCHRONIK 0' — 90'</div>` +
    `<div class="md-timeline"><div class="md-tl-axis">${axisHtml}${goalsHtml}</div></div>` +
    `<div style="display:flex;gap:16px;font-size:12px;color:#888;margin-top:28px;margin-bottom:10px">` +
      `<span><span style="display:inline-block;width:10px;height:10px;background:var(--yellow);vertical-align:middle;margin-right:4px"></span>HEIM-TOR</span>` +
      `<span><span style="display:inline-block;width:10px;height:10px;background:var(--cyan);vertical-align:middle;margin-right:4px"></span>GÄSTE-TOR</span>` +
    `</div>` +
    (eventsHtml ? `<ul class="md-events">${eventsHtml}</ul>` : `<div style="color:#666;text-align:center;padding:14px 0">KEIN TOR — 0:0</div>`) +
    (m.fcl ? `<div class="md-lineup">` +
      `<div class="md-lineup-title">▣ FCL AUFSTELLUNG · 4-4-2</div>` +
      `<div class="md-lineup-list">${m.fcl.map((n,i)=> `${i===0?'[GK] ':''}${n}`).join(' · ')}</div>` +
    `</div>` : '');

  openModal(`${m.home} ${a}:${b} ${m.away}`, html);
}

// ---------- player bio ----------
function openPlayer(nameInput) {
  // normalize — try direct, else strip parenthetical
  let bio = D.PLAYER_BIO[nameInput];
  let key = nameInput;
  if (!bio) {
    const k = Object.keys(D.PLAYER_BIO).find(k => k.toUpperCase().startsWith(nameInput.toUpperCase().split(' ').slice(0,2).join(' ').toUpperCase())
      || nameInput.toUpperCase().includes(k.split(' ')[0].toUpperCase()));
    if (k) { bio = D.PLAYER_BIO[k]; key = k; }
  }
  if (!bio) {
    // find in squad for apps/goals only
    const sq = D.SQUAD.find(p => p.name === nameInput);
    if (sq) {
      openModal(sq.name.toUpperCase(), `<div class="pb-profile">Keine ausführliche Biografie in dieser Ausgabe verfügbar.<br><br>Saison 1988/89: ${sq.apps} Einsätze, ${sq.goals} Tore, Position ${sq.pos}.</div>`);
    }
    return;
  }
  // find squad record
  const sq = D.SQUAD.find(p => p.name === key) || {apps:0, goals:0};

  // sparkline: simulate minutes played distribution across 36 games
  const spark = [];
  for (let i=0; i<36; i++) spark.push(Math.random()*0.6 + (i < sq.apps ? 0.4 : 0));
  const sparkHtml = spark.map(v => `<div class="pb-spark-bar" style="height:${Math.round(v*100)}%"></div>`).join('');

  const html =
    `<div class="pb-shirt">${sq.apps?'#'+(['1','2','3','4','5','6','7','8','9','10','11'][Math.floor(Math.random()*11)]):''}</div>` +
    `<div style="color:var(--yellow);font-size:22px;letter-spacing:2px;padding-top:2px">${key.toUpperCase()}</div>` +
    `<div style="color:var(--cyan);font-size:14px;letter-spacing:1px;margin-bottom:2px">${bio.pos} · FC LUZERN</div>` +
    `<div class="pb-grid">` +
      `<div class="k">GEBOREN</div><div class="v">${bio.birth}</div>` +
      `<div class="k">HERKUNFT</div><div class="v">${bio.from}</div>` +
      `<div class="k">POSITION</div><div class="v">${bio.pos}</div>` +
      `<div class="k">GRÖSSE</div><div class="v">${bio.height} CM</div>` +
      `<div class="k">SPIELE 88/89</div><div class="v" style="color:var(--cyan)">${sq.apps} / 36</div>` +
      `<div class="k">TORE 88/89</div><div class="v" style="color:var(--yellow)">${sq.goals}</div>` +
    `</div>` +
    `<div class="pb-profile">${bio.profile}</div>` +
    `<div style="color:var(--dim2);font-size:12px;letter-spacing:2px;margin-top:12px">SAISON-EINSATZMUSTER · 36 SPIELTAGE</div>` +
    `<div class="pb-sparkline">${sparkHtml}</div>`;

  openModal(key.toUpperCase(), html);
}
