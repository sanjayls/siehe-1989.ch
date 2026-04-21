import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  BookOpen,
  Clock3,
  Database,
  FileText,
  Filter,
  MapPin,
  Search,
  ShieldCheck,
} from 'lucide-react';

type ClaimStatus = 'supported' | 'supported_with_caution' | 'open_caution';

type Claim = {
  id: string;
  title: string;
  statement: string;
  status: ClaimStatus;
  period: string;
  scope: string;
  confidence: number;
  tags: string[];
  sourceIds: string[];
  notes: string;
};

type Source = {
  id: string;
  title: string;
  type: string;
  year: string;
  locality: string;
  reliability: string;
  relevance: string;
  summary: string;
};

type Evidence = {
  id: string;
  claimId: string;
  sourceId: string;
  kind: string;
  locality: string;
  temporalProximity: string;
  text: string;
};

type Gap = {
  id: string;
  title: string;
  priority: string;
  detail: string;
};

const claims: Claim[] = [
  {
    id: 'C-001',
    title: 'Sanierungs- und Wiederaufstiegslogik unter Edy Renggli',
    statement:
      'Mit dem Amtsantritt von Edy Renggli 1969 verband der FC Luzern sportliche Ambition mit dem Ziel, die finanzielle Schieflage zu ordnen.',
    status: 'supported',
    period: '1969',
    scope: 'FC Luzern',
    confidence: 0.84,
    tags: ['Governance', 'Finanzen', 'Präsidium'],
    sourceIds: ['S-001', 'S-002'],
    notes:
      'Der Claim ist innerhalb der Vereinsüberlieferung gut gestützt, benötigt für institutionelles Niveau jedoch zusätzliche Gegenprüfung durch zeitgenössische Presse.',
  },
  {
    id: 'C-002',
    title: 'Klassenverbleib 1970/71 bei struktureller Fragilität',
    statement:
      'Der Ligaerhalt 1970/71 beseitigte die institutionellen und finanziellen Spannungen des FC Luzern nicht.',
    status: 'supported_with_caution',
    period: '1970/71',
    scope: 'FC Luzern',
    confidence: 0.72,
    tags: ['Sport', 'Institutionen', 'Risiko'],
    sourceIds: ['S-001', 'S-004'],
    notes:
      'Sportlicher Befund ist klar. Der Zusammenhang mit institutioneller Fragilität ist eine vorsichtige Synthese aus mehreren Einzelquellen.',
  },
  {
    id: 'C-003',
    title: 'Flower-Power-Trikots als Sichtbarkeits- und Distinktionsversuch',
    statement:
      'Die farbigen Luzerner Trikots von 1970 sind als kultureller Distinktions- und Sichtbarkeitsversuch belegbar, nicht aber als ökonomisch wirksame Sanierungsmaßnahme.',
    status: 'supported',
    period: '1970',
    scope: 'FC Luzern',
    confidence: 0.81,
    tags: ['Kultur', 'Medien', 'Symbolik'],
    sourceIds: ['S-003', 'S-006'],
    notes:
      'Die Symbolik ist belegbar. Jeder weitergehende Nachweis eines finanziellen Effekts fehlt bislang.',
  },
  {
    id: 'C-004',
    title: 'Abstieg 1971/72 als Teil einer tieferen Strukturkrise',
    statement:
      'Der Abstieg 1971/72 kann im Licht der Quellen als sportlicher Ausdruck einer tieferen organisatorischen und finanziellen Fragilität gelesen werden.',
    status: 'supported_with_caution',
    period: '1971/72',
    scope: 'FC Luzern',
    confidence: 0.7,
    tags: ['Abstieg', 'Organisation', 'Finanzen'],
    sourceIds: ['S-004', 'S-007'],
    notes:
      'Der Abstieg ist gesichert. Die strukturgeschichtliche Deutung bleibt Interpretation, wenn auch gut begründet.',
  },
  {
    id: 'C-005',
    title: 'Prekäre Finanzlage und Teil-Ausverkauf des Kaders',
    statement:
      '1974/75 zwang die prekäre Finanzlage den FC Luzern zu personellen Abgaben und Notmaßnahmen.',
    status: 'supported',
    period: '1974/75',
    scope: 'FC Luzern',
    confidence: 0.9,
    tags: ['Liquidität', 'Kader', 'Krise'],
    sourceIds: ['S-007', 'S-008', 'S-009'],
    notes:
      'Starker Claim auf Basis mehrerer Quellenebenen; dennoch weiterhin Ausbau mit wörtlichen Zeitungszitaten sinnvoll.',
  },
  {
    id: 'C-006',
    title: 'Akute Überschuldung und drohender Konkurs 1974/75',
    statement:
      'Spätestens 1974/75 ist beim FC Luzern eine akute Überschuldung bzw. Konkursgefahr klar dokumentiert.',
    status: 'supported',
    period: '1974/75',
    scope: 'FC Luzern',
    confidence: 0.92,
    tags: ['Überschuldung', 'Konkursgefahr', 'Finanzgeschichte'],
    sourceIds: ['S-008', 'S-009'],
    notes: 'Dies ist einer der robustesten Claims des Dossiers.',
  },
  {
    id: 'C-007',
    title: 'Darlehensgesuch an die Stadt Luzern',
    statement:
      'Der FC Luzern ersuchte die Stadt Luzern um finanzielle Hilfe; das Darlehensgesuch wurde politisch verhandelt und abgelehnt.',
    status: 'supported',
    period: '1975',
    scope: 'FC Luzern / Stadt Luzern',
    confidence: 0.89,
    tags: ['Stadtpolitik', 'Darlehen', 'Öffentliche Hilfe'],
    sourceIds: ['S-009', 'S-010'],
    notes:
      'Hoher Erkenntniswert, weil hier Vereins- und Stadtgeschichte direkt zusammenfallen.',
  },
  {
    id: 'C-008',
    title: 'Rundschau 1971 als Makrokontext, nicht als FCL-Spezifikum',
    statement:
      'Die SRF-Rundschau von 1971 belegt die nationale Schuldenproblematik im Schweizer Fussball, kann aber ohne zusätzliche Luzern-spezifische Evidenz nicht direkt als FCL-Beweis dienen.',
    status: 'supported',
    period: '1971',
    scope: 'Schweiz',
    confidence: 0.87,
    tags: ['SRF', 'Makrokontext', 'Methodik'],
    sourceIds: ['S-011'],
    notes: 'Methodisch zentral, um Fehlableitungen zu vermeiden.',
  },
  {
    id: 'C-009',
    title: 'Ambition ohne ausreichend kapitalisierte Erlösbasis',
    statement:
      'Die Quellen legen nahe, dass sportliche Ambition und finanzielle Tragfähigkeit beim FC Luzern Anfang der 1970er nicht deckungsgleich waren.',
    status: 'supported_with_caution',
    period: '1969–1975',
    scope: 'FC Luzern',
    confidence: 0.76,
    tags: ['Ökonomie', 'Erlösmodell', 'Strategie'],
    sourceIds: ['S-001', 'S-007', 'S-008'],
    notes:
      'Analytisch stark, aber aus mehreren Quellen synthetisiert. Kein Einzelbeleg formuliert dies exakt so.',
  },
  {
    id: 'C-010',
    title: 'Kudi Müller als Epochenfigur, nicht als Schuldenbeweis',
    statement:
      'Kudi Müller ist für die Epoche sporthistorisch relevant, trägt aber den ökonomischen Krisenclaim allein nicht.',
    status: 'open_caution',
    period: '1970–1972',
    scope: 'FC Luzern',
    confidence: 0.51,
    tags: ['Kudi Müller', 'Methodik', 'Personalisierung'],
    sourceIds: ['S-005', 'S-011'],
    notes:
      'Wichtiger methodischer Korrekturclaim gegen narrative Überdehnung.',
  },
  {
    id: 'C-011',
    title: 'Institutionelle Krise statt rein sportlicher Krise',
    statement:
      'Für den FC Luzern der frühen 1970er ist eher von einer institutionellen Krise als von einer bloß sportlichen Schwächephase zu sprechen.',
    status: 'supported_with_caution',
    period: '1969–1975',
    scope: 'FC Luzern',
    confidence: 0.78,
    tags: ['Institutionen', 'Governance', 'Langfristigkeit'],
    sourceIds: ['S-001', 'S-007', 'S-008', 'S-009'],
    notes:
      'Als Synthese derzeit tragfähig. Für Publikation auf hohem Niveau sollten mehr externe Primärquellen ergänzt werden.',
  },
];

const sources: Source[] = [
  {
    id: 'S-001',
    title: '120 Jahre FC Luzern – 1961–1971',
    type: 'Vereinschronik',
    year: '2021 (überliefert für 1969–1971)',
    locality: 'Luzern',
    reliability: 'mittel-hoch',
    relevance: 'hoch',
    summary:
      'Dokumentiert die Lage bei Amtsantritt Edy Rengglis, sportliche Zielsetzungen und finanzielle Schieflage des Vereins.',
  },
  {
    id: 'S-002',
    title: 'Lokale Presse zu Präsidium und Sanierungsrhetorik',
    type: 'Zeitung',
    year: '1969/70',
    locality: 'Luzern',
    reliability: 'mittel',
    relevance: 'hoch',
    summary:
      'Frühe Berichterstattung zur Neuordnung des Vereins, Donatoren und Wiederaufstiegsrhetorik.',
  },
  {
    id: 'S-003',
    title: 'Berichte zu den farbigen Trikots / Flower-Power-Ästhetik',
    type: 'Zeitung / Bildbericht',
    year: '1970',
    locality: 'Luzern',
    reliability: 'mittel',
    relevance: 'mittel-hoch',
    summary:
      'Belegt die symbolische und mediale Aufladung des Vereinsauftritts im Herbst 1970.',
  },
  {
    id: 'S-004',
    title: 'Abstieg und Barrage gegen St. Gallen',
    type: 'Vereinschronik / Presse',
    year: '1972',
    locality: 'Luzern / Schweiz',
    reliability: 'hoch',
    relevance: 'hoch',
    summary: 'Absicherung des sportlichen Befunds zum Abstieg 1971/72.',
  },
  {
    id: 'S-005',
    title: 'Kudi Müller – biografischer Kontext',
    type: 'Porträt / Sekundärquelle',
    year: 'später, rückblickend',
    locality: 'Luzern',
    reliability: 'mittel',
    relevance: 'mittel',
    summary:
      'Nützlich für Personenbezug, aber begrenzt für institutionenökonomische Claims.',
  },
  {
    id: 'S-006',
    title: 'Rückschau auf die Blumenkinder-Ära',
    type: 'Erinnerungsquelle',
    year: 'später, rückblickend',
    locality: 'Luzern',
    reliability: 'mittel-niedrig',
    relevance: 'mittel',
    summary: 'Kulturell ergiebig, methodisch mit Vorsicht zu verwenden.',
  },
  {
    id: 'S-007',
    title: '120 Jahre FC Luzern – 1971–1981',
    type: 'Vereinschronik',
    year: '2021 (überliefert für 1971–1981)',
    locality: 'Luzern',
    reliability: 'mittel-hoch',
    relevance: 'hoch',
    summary:
      'Enthält die robustesten Hinweise auf prekäre Finanzlage, Teil-Ausverkauf und politische Hilfeersuchen.',
  },
  {
    id: 'S-008',
    title: 'Berichte zur Überschuldung und Konkursgefahr',
    type: 'Lokalpresse',
    year: '1974/75',
    locality: 'Luzern',
    reliability: 'hoch',
    relevance: 'hoch',
    summary: 'Zeitgenössische Stützung für akute finanzielle Zuspitzung.',
  },
  {
    id: 'S-009',
    title: 'Darlehensgesuch an die Stadt Luzern',
    type: 'Presse / Politikberichterstattung',
    year: '1975',
    locality: 'Stadt Luzern',
    reliability: 'hoch',
    relevance: 'hoch',
    summary:
      'Zentral für die institutionelle Verflechtung von Club und Stadtpolitik.',
  },
  {
    id: 'S-010',
    title: 'Städtische Debatte / Grossstadtrat',
    type: 'Kommunalquelle',
    year: '1975',
    locality: 'Stadt Luzern',
    reliability: 'hoch',
    relevance: 'hoch',
    summary: 'Methodisch besonders wertvoll, da extern zur Vereinsüberlieferung.',
  },
  {
    id: 'S-011',
    title: 'SRF Rundschau – Schuldenkrise im Schweizer Fussball',
    type: 'TV-Primärquelle',
    year: '1971',
    locality: 'Schweiz',
    reliability: 'hoch',
    relevance: 'mittel-hoch',
    summary:
      'Robuster Makrokontext zur nationalen Kosten- und Schuldenproblematik, aber ohne direkte Luzern-Spezifik.',
  },
];

const evidence: Evidence[] = [
  {
    id: 'E-001',
    claimId: 'C-001',
    sourceId: 'S-001',
    kind: 'summary_excerpt',
    locality: 'Luzern',
    temporalProximity: 'mittel',
    text:
      'Die Vereinsüberlieferung beschreibt Edy Rengglis Amtsantritt 1969 ausdrücklich entlang der Doppelaufgabe Wiederaufstieg und Ordnung der finanziellen Schieflage.',
  },
  {
    id: 'E-002',
    claimId: 'C-003',
    sourceId: 'S-003',
    kind: 'press_excerpt',
    locality: 'Luzern',
    temporalProximity: 'hoch',
    text:
      'Die Berichterstattung zu den farbigen Trikots von 1970 bestätigt deren mediale Wirkung und symbolische Sichtbarkeit.',
  },
  {
    id: 'E-003',
    claimId: 'C-005',
    sourceId: 'S-007',
    kind: 'summary_excerpt',
    locality: 'Luzern',
    temporalProximity: 'mittel',
    text:
      'Für 1974/75 wird eine prekäre Finanzlage genannt, die einen Teil-Ausverkauf des Kaders erforderlich gemacht habe.',
  },
  {
    id: 'E-004',
    claimId: 'C-006',
    sourceId: 'S-008',
    kind: 'press_excerpt',
    locality: 'Luzern',
    temporalProximity: 'hoch',
    text: 'Zeitgenössische Lokalberichte sprechen von Überschuldung und realer Konkursgefahr.',
  },
  {
    id: 'E-005',
    claimId: 'C-007',
    sourceId: 'S-009',
    kind: 'press_excerpt',
    locality: 'Stadt Luzern',
    temporalProximity: 'hoch',
    text: 'Das Gesuch um ein städtisches Darlehen wurde öffentlich diskutiert und scheiterte politisch.',
  },
  {
    id: 'E-006',
    claimId: 'C-008',
    sourceId: 'S-011',
    kind: 'tv_context',
    locality: 'Schweiz',
    temporalProximity: 'hoch',
    text:
      'Die SRF-Rundschau benennt 1971 steigende Spielerlöhne und Transfersummen als Ursachen der Schuldenproblematik im Schweizer Fussball.',
  },
  {
    id: 'E-007',
    claimId: 'C-011',
    sourceId: 'S-010',
    kind: 'institutional_context',
    locality: 'Stadt Luzern',
    temporalProximity: 'hoch',
    text:
      'Die Verhandlung im kommunalen Raum zeigt, dass die Krise des Vereins über den sportlichen Bereich hinaus als öffentliches Problem sichtbar wurde.',
  },
];

const gaps: Gap[] = [
  {
    id: 'G-001',
    title: 'Verbatim-Zitate aus Luzerner Zeitungen',
    priority: 'hoch',
    detail:
      'Für Publikationsniveau fehlen exakte Wortlaute mit Datum, Seite und Zeitungstitel aus Luzerner Tagblatt, Vaterland oder LNN.',
  },
  {
    id: 'G-002',
    title: 'Kommunalprotokolle zum Darlehensgesuch',
    priority: 'hoch',
    detail:
      'Der politische Vorgang sollte mit Ratsprotokollen oder offiziellen Vorlagen externalisiert werden.',
  },
  {
    id: 'G-003',
    title: 'Transkript oder Sichtung der Rundschau 1971',
    priority: 'hoch',
    detail:
      'Der Makrokontext ist stark, aber ohne vollständiges Transkript bleibt die TV-Quelle nur eingeschränkt granular nutzbar.',
  },
  {
    id: 'G-004',
    title: 'Zahlen zu Zuschauererlösen, Löhnen, Transfers',
    priority: 'mittel-hoch',
    detail:
      'Der strukturelle Krisenclaim wäre mit quantitativen Reihen deutlich stärker.',
  },
  {
    id: 'G-005',
    title: 'Externe Gegenquellen zur Vereinschronik',
    priority: 'mittel',
    detail:
      'Die Vereinsüberlieferung ist stark, sollte aber systematisch mit unabhängiger Presse und Verwaltung gegengeprüft werden.',
  },
];

function statusTone(status: ClaimStatus): string {
  switch (status) {
    case 'supported':
      return 'tone-success';
    case 'supported_with_caution':
      return 'tone-warning';
    default:
      return 'tone-muted';
  }
}

function confidenceLabel(value: number): string {
  if (value >= 0.85) return 'hoch';
  if (value >= 0.7) return 'mittel-hoch';
  if (value >= 0.55) return 'mittel';
  return 'offen';
}

type TabKey = 'claims' | 'sources' | 'gaps' | 'about';

export default function App() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ClaimStatus>('all');
  const [selectedClaim, setSelectedClaim] = useState(claims[0].id);
  const [activeTab, setActiveTab] = useState<TabKey>('claims');

  const filteredClaims = useMemo(() => {
    return claims.filter((claim) => {
      const matchesQuery =
        !query ||
        [claim.id, claim.title, claim.statement, claim.scope, ...claim.tags]
          .join(' ')
          .toLowerCase()
          .includes(query.toLowerCase());
      const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  const activeClaim =
    filteredClaims.find((claim) => claim.id === selectedClaim) ?? filteredClaims[0] ?? null;

  const activeEvidence = evidence.filter((item) => item.claimId === activeClaim?.id);
  const activeSources = sources.filter((src) => activeClaim?.sourceIds.includes(src.id));

  return (
    <div className="page-shell">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="hero-grid"
        >
          <section className="panel hero-panel">
            <div className="panel-header">
              <div className="eyebrow">
                <Database size={14} /> Research Explorer · Claim / Evidence / Source Layer
              </div>
              <h1>FC Luzern – Strukturkrise 1969–1976</h1>
              <p className="lede">
                Arbeitsfähiger Prototyp für ein institutionelles Forschungsinterface. Ziel ist nicht narrative Glättung,
                sondern die sichtbare Trennung von Befund, Evidenz, Unsicherheit und Forschungslücke.
              </p>
            </div>
            <div className="metric-grid">
              <MetricCard icon={<ShieldCheck size={16} />} label="Claims" value={String(claims.length)} detail="institutionell formuliert" />
              <MetricCard icon={<BookOpen size={16} />} label="Quellen" value={String(sources.length)} detail="lokal + national" />
              <MetricCard icon={<FileText size={16} />} label="Evidence" value={String(evidence.length)} detail="claim-relevant" />
              <MetricCard icon={<AlertTriangle size={16} />} label="Gaps" value={String(gaps.length)} detail="offene Validierung" />
            </div>
          </section>

          <section className="panel status-panel">
            <div className="panel-header compact">
              <h2>Epistemischer Status</h2>
              <p>Der Prototyp zeigt bereits einen belastbaren Layer für Luzern, aber noch keinen vollständigen Satz verifizierter Vollzitate.</p>
            </div>
            <div className="status-list">
              <p><strong>Fakt:</strong> Mehrere Claims zu Finanzlage, Darlehensgesuch und Überschuldung sind tragfähig.</p>
              <p><strong>Annahme:</strong> Die institutionelle Tiefenstruktur lässt sich mit weiterer Lokalpresse noch präziser modellieren.</p>
              <p><strong>Interpretation:</strong> Der FCL ist ein lokaler Fall einer breiteren Transformationsphase des Schweizer Fussballs.</p>
            </div>
          </section>
        </motion.div>

        <nav className="tabs">
          {[
            ['claims', 'Claims'],
            ['sources', 'Quellen'],
            ['gaps', 'Research Gaps'],
            ['about', 'Methodik'],
          ].map(([key, label]) => (
            <button
              key={key}
              className={activeTab === key ? 'tab active' : 'tab'}
              onClick={() => setActiveTab(key as TabKey)}
            >
              {label}
            </button>
          ))}
        </nav>

        {activeTab === 'claims' && (
          <section className="claims-grid">
            <aside className="panel sidebar-panel">
              <div className="panel-header compact">
                <h2>Claim Index</h2>
                <p>Filter nach Text oder Evidenzstatus.</p>
              </div>

              <div className="controls">
                <label className="search-box">
                  <Search size={16} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Claim, Zeitraum, Tag ..."
                  />
                </label>

                <div className="select-block">
                  <div className="select-label"><Filter size={14} /> Status</div>
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as 'all' | ClaimStatus)}>
                    <option value="all">Alle</option>
                    <option value="supported">supported</option>
                    <option value="supported_with_caution">supported_with_caution</option>
                    <option value="open_caution">open_caution</option>
                  </select>
                </div>
              </div>

              <div className="claim-list">
                {filteredClaims.map((claim) => (
                  <button
                    key={claim.id}
                    onClick={() => setSelectedClaim(claim.id)}
                    className={selectedClaim === claim.id ? 'claim-item active' : 'claim-item'}
                  >
                    <div className="claim-meta-row">
                      <span className={`status-pill ${selectedClaim === claim.id ? 'status-invert' : statusTone(claim.status)}`}>
                        {claim.status}
                      </span>
                      <span className="claim-id">{claim.id}</span>
                    </div>
                    <div className="claim-item-title">{claim.title}</div>
                    <div className="claim-item-subtitle">{claim.period} · {claim.scope}</div>
                  </button>
                ))}
              </div>
            </aside>

            <div className="detail-column">
              {activeClaim ? (
                <>
                  <section className="panel detail-panel">
                    <div className="panel-header">
                      <div className="badges-row">
                        <span className={`status-pill ${statusTone(activeClaim.status)}`}>{activeClaim.status}</span>
                        <span className="outline-pill">{activeClaim.id}</span>
                        <span className="outline-pill">Confidence: {confidenceLabel(activeClaim.confidence)}</span>
                      </div>
                      <h2>{activeClaim.title}</h2>
                      <p className="detail-statement">{activeClaim.statement}</p>
                    </div>

                    <div className="tag-row">
                      {activeClaim.tags.map((tag) => (
                        <span key={tag} className="soft-pill">{tag}</span>
                      ))}
                    </div>

                    <div className="mini-grid">
                      <MiniInfo icon={<Clock3 size={15} />} label="Zeitraum" value={activeClaim.period} />
                      <MiniInfo icon={<MapPin size={15} />} label="Scope" value={activeClaim.scope} />
                      <MiniInfo icon={<ShieldCheck size={15} />} label="Konfidenz" value={String(activeClaim.confidence)} />
                    </div>

                    <div className="method-box">
                      <strong>Methodischer Hinweis:</strong> {activeClaim.notes}
                    </div>
                  </section>

                  <div className="evidence-grid">
                    <section className="panel">
                      <div className="panel-header compact">
                        <h3>Evidenz</h3>
                        <p>Claim-relevante Exzerpte und Kontextbausteine.</p>
                      </div>
                      <div className="stack">
                        {activeEvidence.map((item) => (
                          <article key={item.id} className="inner-card">
                            <div className="badges-row small">
                              <span className="outline-pill">{item.id}</span>
                              <span className="outline-pill">{item.kind}</span>
                              <span className="outline-pill">Temporal proximity: {item.temporalProximity}</span>
                            </div>
                            <p>{item.text}</p>
                            <div className="subtle">Quelle: {item.sourceId} · {item.locality}</div>
                          </article>
                        ))}
                      </div>
                    </section>

                    <section className="panel">
                      <div className="panel-header compact">
                        <h3>Quellen zum Claim</h3>
                        <p>Trägerquellen mit grober Qualitätsklassifikation.</p>
                      </div>
                      <div className="stack">
                        {activeSources.map((src) => (
                          <article key={src.id} className="inner-card">
                            <div className="source-topline">
                              <div>
                                <div className="source-title">{src.title}</div>
                                <div className="subtle">{src.id} · {src.type}</div>
                              </div>
                              <span className="outline-pill">{src.year}</span>
                            </div>
                            <div className="source-grid">
                              <div><strong>Lokalität:</strong> {src.locality}</div>
                              <div><strong>Reliability:</strong> {src.reliability}</div>
                              <div><strong>Relevanz:</strong> {src.relevance}</div>
                            </div>
                            <p>{src.summary}</p>
                          </article>
                        ))}
                      </div>
                    </section>
                  </div>
                </>
              ) : (
                <section className="panel"><p>Keine Claims gefunden.</p></section>
              )}
            </div>
          </section>
        )}

        {activeTab === 'sources' && (
          <section className="card-grid three">
            {sources.map((src) => (
              <article key={src.id} className="panel">
                <div className="source-topline">
                  <span className="outline-pill">{src.id}</span>
                  <span className="soft-pill">{src.type}</span>
                </div>
                <h3>{src.title}</h3>
                <p className="subtle">{src.year} · {src.locality}</p>
                <div className="stack compact">
                  <div><strong>Reliability:</strong> {src.reliability}</div>
                  <div><strong>Relevanz:</strong> {src.relevance}</div>
                </div>
                <p>{src.summary}</p>
              </article>
            ))}
          </section>
        )}

        {activeTab === 'gaps' && (
          <section className="card-grid two">
            {gaps.map((gap) => (
              <article key={gap.id} className="panel">
                <div className="source-topline">
                  <span className="outline-pill">{gap.id}</span>
                  <span className={gap.priority === 'hoch' ? 'status-pill tone-danger' : 'status-pill tone-warning'}>{gap.priority}</span>
                </div>
                <h3>{gap.title}</h3>
                <p>{gap.detail}</p>
              </article>
            ))}
          </section>
        )}

        {activeTab === 'about' && (
          <section className="panel">
            <div className="panel-header">
              <h2>Methodischer Rahmen</h2>
              <p>Claim-zentriertes Modell für historisch-institutionelle Forschung.</p>
            </div>
            <div className="card-grid three text-grid">
              <article>
                <h3>1. Source Layer</h3>
                <p>
                  Quellen werden zunächst als Trägerobjekte erfasst: Vereinschronik, Zeitung, TV, Kommunalquelle. Aussagekraft und Grenzen werden explizit markiert.
                </p>
              </article>
              <article>
                <h3>2. Evidence Layer</h3>
                <p>
                  Nicht jede Quelle ist bereits Evidenz. Erst exzerpierte, claim-relevante Textstellen oder Sendungsaussagen werden als Evidence-Objekte geführt.
                </p>
              </article>
              <article>
                <h3>3. Claim Layer</h3>
                <p>
                  Claims bleiben von Quellen getrennt. Dadurch werden Unsicherheit, Gegenhypothesen und spätere Revisionen sichtbar statt überschrieben.
                </p>
              </article>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="metric-card">
      <div className="metric-label">{icon} {label}</div>
      <div className="metric-value">{value}</div>
      <div className="subtle">{detail}</div>
    </div>
  );
}

function MiniInfo({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="mini-card">
      <div className="metric-label">{icon} {label}</div>
      <div className="source-title">{value}</div>
    </div>
  );
}
