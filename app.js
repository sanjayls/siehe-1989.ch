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
    String(n.getHours()).padStart(2, '0') + ':' +
    String(n.getMinutes()).padStart(2, '0') + ':' +
    String(n.getSeconds()).padStart(2, '0');
}
tick();
setInterval(tick, 1000);

// ---------- helpers ----------
function makeInteractive(el, handler, label, opts = {}) {
  el.tabIndex = 0;
  el.setAttribute('role', 'button');
  if (label) el.setAttribute('aria-label', label);
  if (opts.hasPopup) el.setAttribute('aria-haspopup', 'dialog');

  el.addEventListener('click', handler);
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handler();
    }
  });
}

function fmtRecord(r) {
  if (!r) return '—';
  const pts = r.pts != null ? ` · ${r.pts} P` : '';
  return `${r.p} SP · ${r.w}S ${r.d}U ${r.l}N · ${r.gf}:${r.ga}${pts}`;
}

function formatLineupStatus(status) {
  if (!status) return '';
  const map = {
    reconstructed: 'AUFSTELLUNG REKONSTRUIERT'
  };
  return map[status] || String(status).toUpperCase();
}

// ---------- boot ----------
const boot = document.getElementById('boot');
const BOOT_KEY = 'siehe1989.boot.dismissed.v3';
let bootHideTimer = null;

function hideBoot(persist = true) {
  if (!boot || boot.dataset.hidden === '1') return;
  boot.dataset.hidden = '1';
  boot.classList.add('hidden');
  if (persist) {
    try { localStorage.setItem(BOOT_KEY, '1'); } catch (e) {}
  }
  window.clearTimeout(bootHideTimer);
  window.setTimeout(() => {
    boot.style.display = 'none';
  }, 220);
}

if (boot) {
  let bootDismissed = false;
  try {
    bootDismissed = localStorage.getItem(BOOT_KEY) === '1';
  } catch (e) {}

  if (bootDismissed) {
    boot.style.display = 'none';
    boot.dataset.hidden = '1';
  } else {
    bootHideTimer = window.setTimeout(() => hideBoot(true), 4500);
    ['click', 'touchstart', 'keydown'].forEach(evt => {
      window.addEventListener(evt, () => hideBoot(true), { once: true, passive: true });
    });
  }
}

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
    const pageInput = document.getElementById('pageInput');
    const pageLabel = document.getElementById('pageLabel');
    if (pageInput) pageInput.value = pnum;
    if (pageLabel) pageLabel.textContent = 'SEITE ' + pnum;
  }

  try {
    localStorage.setItem('siehe1989.page.v3', pageId);
  } catch (e) {}
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
    if (PAGE_BY_NUM[v]) {
      goTo(PAGE_BY_NUM[v]);
    } else {
      pageInput.style.color = '#f33';
      setTimeout(() => { pageInput.style.color = ''; }, 600);
    }
  }
});
pageInput.addEventListener('focus', () => pageInput.select());

// keyboard shortcuts
document.addEventListener('keydown', e => {
  if (e.target && e.target.matches('input, textarea, select, [contenteditable="true"]')) return;

  const map = {
    '1': 'ticker',
    '2': 'timeline',
    '3': 'standings',
    '4': 'crosstable',
    '5': 'matchesq',
    '6': 'matchesf',
    '7': 'scorers',
    '8': 'squad',
    '9': 'portrait',
    '0': 'method'
  };
  if (map[e.key]) goTo(map[e.key]);
  if (e.key === 'Escape') closeModal();
});

// restore last page, else default to standings
try {
  const last = localStorage.getItem('siehe1989.page.v3') || localStorage.getItem('siehe1989.page.v2');
  if (last && document.getElementById(last)) {
    goTo(last);
  } else {
    goTo('standings');
  }
} catch (e) {
  goTo('standings');
}

// ============================================================
// STANDINGS
// ============================================================
function buildTable(data, containerId, showNote, targetPage) {
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
    div.className = 'tt-row ' + (i % 2 === 0 ? 'even' : 'odd') + (row.champion ? ' champion' : '');
    div.dataset.club = row.club;
    div.innerHTML =
      `<div class="col-rank">${row.r}</div>` +
      `<div class="col-club ${row.champion ? 'champion-club' : row.dim ? 'dim-club' : ''}">${row.club}</div>` +
      `<div class="col-p">${row.p}</div>` +
      `<div class="col-w">${row.w}</div>` +
      `<div class="col-d">${row.d}</div>` +
      `<div class="col-l">${row.l}</div>` +
      `<div class="col-gd">${row.gf}:${row.ga}</div>` +
      `<div class="col-pts">${row.pts}</div>` +
      (showNote ? `<div class="col-note">${row.note || ''}</div>` : '');

    makeInteractive(
      div,
      () => filterByClub(row.club, targetPage),
      `Spiele von ${row.club} filtern`,
      { hasPopup: false }
    );

    el.appendChild(div);
  });
}

buildTable(D.QP_STANDINGS, 'qp-table', false, 'matchesq');
buildTable(D.FG_STANDINGS, 'fg-table', true, 'matchesf');

// ============================================================
// CROSSTABLE
// ============================================================
document.getElementById('ct-qp').innerHTML = D.CT_QP_TEXT;
document.getElementById('ct-fg').innerHTML = D.CT_FG_TEXT;

// ============================================================
// MATCHES
// ============================================================
function matchKey(m) {
  return `${m.h}-${m.a}-${m.s}`;
}

function renderMatches(data, containerId, filterClub) {
  const el = document.getElementById(containerId);
  el.innerHTML = '';
  let shown = 0;

  data.forEach(round => {
    const filtered = filterClub
      ? round.m.filter(m => m.h.includes(filterClub) || m.a.includes(filterClub))
      : round.m;

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

      div.className =
        'match-row' +
        (m.luzern ? ' luzern-match' : '') +
        (hasDetail ? ' has-detail' : '');

      const homeClass = m.luzern ? 'luzern-name' : (a > b ? 'winner-name' : a < b ? 'loser-name' : '');
      const awayClass = m.luzern ? 'luzern-name' : (b > a ? 'winner-name' : b < a ? 'loser-name' : '');

      div.innerHTML =
        `<div class="m-home ${homeClass}">${m.h}</div>` +
        `<div class="m-score">${m.s}</div>` +
        `<div class="m-away ${awayClass}">${m.a}</div>` +
        `<div class="m-goals">${m.g}</div>`;

      if (hasDetail) {
        makeInteractive(
          div,
          () => openMatch(detailKey),
          `Matchdetail öffnen: ${m.h} ${m.s} ${m.a}`,
          { hasPopup: true }
        );
      }

      el.appendChild(div);
      shown++;
    });
  });

  if (!shown) {
    el.innerHTML = '<div style="color:#888;padding:20px 4px;text-align:center;font-size:16px;">KEINE SPIELE FÜR DIESEN KLUB.</div>';
  }
}

function buildFilterBar(containerId, filterClub) {
  const el = document.getElementById(containerId);
  if (!filterClub) {
    el.innerHTML = '';
    return;
  }

  el.innerHTML = `<div class="match-filter-bar">
    <span>▼ FILTER: <b style="color:var(--green)">${filterClub.toUpperCase()}</b></span>
    <button class="clear" onclick="clearFilter()">✕ ALLE SPIELE</button>
  </div>`;
}

let currentFilter = '';

function filterByClub(club, targetPage = 'matchesq') {
  const shortMap = {
    'FC Luzern': 'Luzern',
    'Grasshopper Club Zürich': 'Grasshopper',
    'AC Bellinzona': 'Bellinzona',
    'FC Sion': 'Sion',
    'FC Wettingen': 'Wettingen',
    'BSC Young Boys': 'Young Boys',
    'Neuchâtel Xamax FC': 'Xamax',
    'Servette FC Genève': 'Servette',
    'FC Aarau': 'Aarau',
    'Lausanne-Sports': 'Lausanne',
    'FC St.Gallen': 'St.Gallen',
    'FC Lugano': 'Lugano'
  };

  const short = shortMap[club] || club;
  currentFilter = short;

  document.querySelectorAll('.tt-row').forEach(r => {
    r.classList.toggle('selected', r.dataset.club === club);
  });

  renderMatches(D.MATCHES_QP, 'mq-content', short);
  renderMatches(D.MATCHES_FG, 'mf-content', short);
  buildFilterBar('mq-filter-bar', short);
  buildFilterBar('mf-filter-bar', short);
  goTo(targetPage);
}

window.clearFilter = function () {
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
    const bioKey =
      D.PLAYER_BIO[s.name.replace(/\s+\(.*\)$/, '')] ||
      D.PLAYER_BIO[s.name]
        ? s.name
        : null;

    div.className = 'sc-row';
    div.innerHTML =
      `<div class="sc-rank">${s.r}</div>` +
      `<div class="sc-name ${s.luzern ? 'sc-luzern' : ''}">${s.name}</div>` +
      (showQpFg
        ? `<div class="sc-qp">${s.qp}</div><div class="sc-fg">${s.fg}</div>`
        : `<div class="sc-qp" style="width:72px"></div>`) +
      `<div class="sc-tot">${s.tot}</div>` +
      `<div class="sc-club ${s.luzern ? 'sc-luzern' : ''}">${s.club}</div>`;

    if (bioKey) {
      makeInteractive(
        div,
        () => openPlayer(s.name),
        `Spielerprofil öffnen: ${s.name}`,
        { hasPopup: true }
      );
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
    `<div class="sq-goals" style="color:${p.goals > 0 ? '#ffff00' : '#555'}">${p.goals > 0 ? p.goals : '─'}</div>` +
    `<div class="sq-note">${p.note}</div>`;

  makeInteractive(
    div,
    () => openPlayer(p.name),
    `Spielerprofil öffnen: ${p.name}`,
    { hasPopup: true }
  );

  sqEl.appendChild(div);
});

// ============================================================
// TICKER
// ============================================================
(function initTicker() {
  const el = document.getElementById('ticker-list');
  const scrollEl = document.getElementById('scrollText');
  const times = ['17:34', '16:02', '14:58', '12:17', '10:45', '09:21', '08:03', '07:44'];

  D.TICKER.forEach((t, i) => {
    const d = document.createElement('div');
    d.className = 'tk-line';
    const pri = i < 2 ? 'FLASH' : (i < 4 ? 'NEWS ' : 'INFO ');
    const cls = i < 2 ? '' : (i < 4 ? 'std' : 'old');

    d.innerHTML =
      `<span class="tk-time">${times[i] || '—'}</span>` +
      `<span class="tk-pri" style="color:${i < 2 ? 'var(--red)' : i < 4 ? 'var(--cyan)' : 'var(--dim2)'}">${pri}</span>` +
      `<span class="tk-msg ${cls}">► ${t}</span>`;

    el.appendChild(d);
  });

  const txt = D.TICKER.join('   ✦   ') + '   ✦   ';
  scrollEl.textContent = txt + txt;
})();

// ============================================================
// TIMELINE
// ============================================================
(function initTimeline() {
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

  const axis = document.getElementById('tl-axis');
  const months = ['JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ', '—', 'MÄR', 'APR', 'MAI', 'JUN'];

  months.forEach((m, i) => {
    const d = document.createElement('div');
    d.className = 'tl-month';
    d.style.left = (i * (100 / months.length)) + '%';
    d.style.width = (100 / months.length) + '%';
    d.textContent = m;
    if (m === '—') d.style.borderLeft = '1px dashed #555';
    axis.appendChild(d);
  });
})();

// ============================================================
// PORTRAIT
// ============================================================
(function initPortrait() {
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

  const sCard = document.createElement('div');
  sCard.className = 'pr-card';
  sCard.innerHTML =
    `<div class="pr-title">${P.stadion.name}</div>` +
    `<div class="pr-facts">${P.stadion.facts.map(f => `<div class="k">${f.k}</div><div class="v">${f.v}</div>`).join('')}</div>` +
    `<div class="pr-desc">${P.stadion.desc}</div>` +
    `<pre class="pitch-art">${pitchArt}</pre>`;
  grid.appendChild(sCard);

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

  const h = document.getElementById('heroes-grid');
  P.heroes.forEach(hero => {
    const c = document.createElement('div');
    c.className = 'hero-card';
    c.innerHTML =
      `<div class="hero-n">${hero.n}</div>` +
      `<div class="hero-r">${hero.r}</div>` +
      `<div class="hero-st">${hero.st}</div>` +
      `<div class="hero-q">« ${hero.q} »</div>`;

    const biokey = Object.keys(D.PLAYER_BIO).find(k => k.toUpperCase().includes(hero.n));
    if (biokey) {
      makeInteractive(
        c,
        () => openPlayer(biokey),
        `Spielerprofil öffnen: ${biokey}`,
        { hasPopup: true }
      );
    }

    h.appendChild(c);
  });
})();

// ============================================================
// METHOD / DATA STATUS
// ============================================================
(function initMethod() {
  const el = document.getElementById('method-content');
  if (!el) return;

  const M = D.SEASON_META || {};
  const N = D.DATA_NOTES || {};
  const S = D.SOURCES || {};
  const corrections = Array.isArray(N.corrections_applied) ? N.corrections_applied : [];
  const unresolved = Array.isArray(N.unresolved) ? N.unresolved : [];

  el.innerHTML =
    `<div class="method-card">` +
      `<div class="method-title">PROJEKTSTATUS</div>` +
      `<div class="method-meta">` +
        `<div class="k">SAISON</div><div class="v">${M.season || '—'}</div>` +
        `<div class="k">WETTBEWERB</div><div class="v">${M.competition || '—'}</div>` +
        `<div class="k">FORMAT</div><div class="v">${M.format || '—'}</div>` +
        `<div class="k">MEISTER</div><div class="v">${M.champion || '—'}</div>` +
        `<div class="k">TITELMATCH</div><div class="v">${M.title_match || '—'}</div>` +
        `<div class="k">GESAMTBILANZ</div><div class="v">${fmtRecord(M.total_record)}</div>` +
      `</div>` +
    `</div>` +

    `<div class="method-card">` +
      `<div class="method-title">DATENHINWEISE</div>` +
      `<div class="method-note">` +
        `Diese Seite ist eine statische Präsentationsschicht. Der Datenstand enthält bereits Korrekturhinweise und offene Punkte, aber keine vollständige record-level Provenienz je Eintrag.` +
      `</div>` +
      `<div class="method-note" style="margin-top:8px">` +
        `Quellstatus: ${N.sanity_checked ? 'Sanity check durchgeführt' : 'kein Sanity-Check vermerkt'} · ${N.repo_compatible ? 'Repo-kompatible Datenstruktur' : 'ohne Repo-Hinweis'}` +
      `</div>` +
    `</div>` +

    `<div class="method-card">` +
      `<div class="method-title">KORREKTUREN</div>` +
      `<ul class="method-list">` +
        corrections.map(item => `<li>${item}</li>`).join('') +
      `</ul>` +
    `</div>` +

    `<div class="method-card">` +
      `<div class="method-title">OFFENE PUNKTE</div>` +
      `<ul class="method-list">` +
        unresolved.map(item => `<li>${item}</li>`).join('') +
      `</ul>` +
    `</div>` +

    `<div class="method-card">` +
      `<div class="method-title">BEDIENUNG</div>` +
      `<ul class="method-list">` +
        `<li>Seitenwahl über P-Feld oben rechts oder über die Zifferntasten 1–9; 0 öffnet diese Methodenseite.</li>` +
        `<li>Tabellenzeilen filtern beide Spielpläne; Klick auf Qualifikations- und Finalrundentabelle führt in den jeweiligen Spielblock.</li>` +
        `<li>Spieler- und Matchkarten sind per Enter oder Leertaste aktivierbar; Escape schließt geöffnete Dialoge.</li>` +
      `</ul>` +
    `</div>` +

    `<div class="method-card">` +
      `<div class="method-title">QUELLEN / REPO</div>` +
      `<div class="method-note">` +
        (S.repo ? `Repository: <a class="method-link" href="${S.repo}" target="_blank" rel="noopener noreferrer">${S.repo}</a><br>` : '') +
        `${S.note || ''}` +
      `</div>` +
    `</div>`;
})();

// ============================================================
// MODAL
// ============================================================
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalCloseBtn = document.getElementById('modalCloseBtn');
let lastFocusedElement = null;

function openModal(title, html) {
  lastFocusedElement = document.activeElement;
  modalTitle.textContent = title;
  modalBody.innerHTML = html;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  window.requestAnimationFrame(() => {
    if (modalCloseBtn) modalCloseBtn.focus();
    else if (modalContent) modalContent.focus();
  });
}

window.closeModal = function () {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    window.setTimeout(() => lastFocusedElement.focus(), 0);
  }
};

modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

// ---------- match detail ----------
function openMatch(key) {
  const m = D.MATCH_DETAILS[key];
  if (!m) return;

  const parts = key.split('-');
  const a = parseInt(parts[parts.length - 2], 10);
  const b = parseInt(parts[parts.length - 1], 10);

  const winH = a > b;
  const winA = b > a;

  const axisMarks = [15, 30, 45, 60, 75, 90];
  const axisHtml = axisMarks.map(mm => {
    const pct = (mm / 90) * 100;
    return `<div class="md-tl-mark" style="left:${pct}%"></div>` +
           `<div class="md-tl-label" style="left:${pct}%">${mm}'</div>`;
  }).join('');

  const goalsHtml = (m.timeline || [])
    .filter(t => t.ev === '⚽')
    .map(t => {
      const pct = Math.min(100, (parseInt(t.m, 10) / 90) * 100);
      return `<div class="md-tl-goal ${t.team === 'h' ? 'home' : 'away'}" style="left:${pct}%">${t.m}' ${t.p}</div>`;
    })
    .join('');

  const eventsHtml = (m.timeline || []).map(t =>
    `<li>` +
      `<span class="md-ev ${t.team === 'h' ? 'home' : 'away'}">${t.team === 'h' ? '◀' : '▶'}</span>` +
      `<span class="md-min">${t.m}'</span>` +
      `<span class="md-ev">${t.ev}</span>` +
      `<span class="md-player">${t.p}${t.note ? ` <span class="md-note">· ${t.note}</span>` : ''}</span>` +
    `</li>`
  ).join('');

  const statusHtml = m.lineup_status
    ? `<div class="md-status">QUELLENSTATUS · ${formatLineupStatus(m.lineup_status)}</div>`
    : '';

  const html =
    (m.note ? `<div style="background:var(--red);color:#fff;padding:1px 8px;letter-spacing:2px;text-align:center;font-size:15px">★ ${m.note} ★</div>` : '') +
    `<div class="md-score-line">` +
      `<div class="md-team home ${winH ? 'win' : ''}">${m.home}</div>` +
      `<div class="md-score-big">${a}  :  ${b}</div>` +
      `<div class="md-team away ${winA ? 'win' : ''}">${m.away}</div>` +
    `</div>` +
    `<div class="md-meta">` +
      `<span><b>DATUM</b> ${m.date}</span>` +
      `<span><b>STADION</b> ${m.venue}</span>` +
      `<span><b>ZUSCHAUER</b> ${m.attendance}</span>` +
      `<span><b>SR</b> ${m.ref}</span>` +
    `</div>` +
    statusHtml +
    `<div style="color:var(--cyan);font-size:14px;letter-spacing:2px;margin-top:10px">TORCHRONIK 0' — 90'</div>` +
    `<div class="md-timeline"><div class="md-tl-axis">${axisHtml}${goalsHtml}</div></div>` +
    `<div style="display:flex;gap:16px;font-size:12px;color:#888;margin-top:28px;margin-bottom:10px">` +
      `<span><span style="display:inline-block;width:10px;height:10px;background:var(--yellow);vertical-align:middle;margin-right:4px"></span>HEIM-TOR</span>` +
      `<span><span style="display:inline-block;width:10px;height:10px;background:var(--cyan);vertical-align:middle;margin-right:4px"></span>GÄSTE-TOR</span>` +
    `</div>` +
    (eventsHtml ? `<ul class="md-events">${eventsHtml}</ul>` : `<div style="color:#666;text-align:center;padding:14px 0">KEIN TOR — 0:0</div>`) +
    (m.fcl ? `<div class="md-lineup">` +
      `<div class="md-lineup-title">▣ FCL AUFSTELLUNG · 4-4-2</div>` +
      `<div class="md-lineup-list">${m.fcl.map((n, i) => `${i === 0 ? '[GK] ' : ''}${n}`).join(' · ')}</div>` +
    `</div>` : '');

  openModal(`${m.home} ${a}:${b} ${m.away}`, html);
}

// ---------- player bio ----------
function openPlayer(nameInput) {
  let bio = D.PLAYER_BIO[nameInput];
  let key = nameInput;

  if (!bio) {
    const k = Object.keys(D.PLAYER_BIO).find(k =>
      k.toUpperCase().startsWith(nameInput.toUpperCase().split(' ').slice(0, 2).join(' ').toUpperCase()) ||
      nameInput.toUpperCase().includes(k.split(' ')[0].toUpperCase())
    );
    if (k) {
      bio = D.PLAYER_BIO[k];
      key = k;
    }
  }

  if (!bio) {
    const sqFallback = D.SQUAD.find(p => p.name === nameInput);
    if (sqFallback) {
      openModal(
        sqFallback.name.toUpperCase(),
        `<div class="pb-profile">Keine ausführliche Biografie in dieser Ausgabe verfügbar.<br><br>Saison 1988/89: ${sqFallback.apps} Einsätze, ${sqFallback.goals} Tore, Position ${sqFallback.pos}.</div>`
      );
    }
    return;
  }

  const sq = D.SQUAD.find(p => p.name === key) || D.SQUAD.find(p => p.name === nameInput) || { apps: 0, goals: 0, pos: '—' };
  const birth = bio.birth || '—';
  const from = bio.from || '—';
  const pos = bio.pos || sq.pos || '—';
  const height = bio.height ? `${bio.height} CM` : '—';
  const profile = bio.profile || 'Keine ausführliche Biografie in dieser Ausgabe verfügbar.';

  const html =
    `<div style="color:var(--yellow);font-size:22px;letter-spacing:2px;padding-top:2px">${key.toUpperCase()}</div>` +
    `<div style="color:var(--cyan);font-size:14px;letter-spacing:1px;margin-bottom:8px">${pos} · FC LUZERN</div>` +
    `<div class="pb-grid">` +
      `<div class="k">GEBOREN</div><div class="v">${birth}</div>` +
      `<div class="k">HERKUNFT</div><div class="v">${from}</div>` +
      `<div class="k">POSITION</div><div class="v">${pos}</div>` +
      `<div class="k">GRÖSSE</div><div class="v">${height}</div>` +
      `<div class="k">SPIELE 88/89</div><div class="v" style="color:var(--cyan)">${sq.apps} / 36</div>` +
      `<div class="k">TORE 88/89</div><div class="v" style="color:var(--yellow)">${sq.goals}</div>` +
    `</div>` +
    `<div class="pb-profile">${profile}</div>`;

  openModal(key.toUpperCase(), html);
}
