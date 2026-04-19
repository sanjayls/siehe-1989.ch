// Season data for Siehe 1989
// Nationalliga A 1988/89 
// Corrected version: Beta 1.1

const QP_STANDINGS = [
  { r:1,  club:'FC Luzern',               p:22, w:10, d:8,  l:4,  gf:27, ga:25, pts:28, champion:true },
  { r:2,  club:'Grasshopper Club Zürich', p:22, w:10, d:7,  l:5,  gf:41, ga:29, pts:27 },
  { r:3,  club:'AC Bellinzona',           p:22, w:9,  d:7,  l:6,  gf:34, ga:27, pts:25 },
  { r:4,  club:'FC Sion',                 p:22, w:8,  d:8,  l:6,  gf:25, ga:21, pts:24 },
  { r:5,  club:'FC Wettingen',            p:22, w:5,  d:14, l:3,  gf:23, ga:21, pts:24 },
  { r:6,  club:'BSC Young Boys',          p:22, w:8,  d:7,  l:7,  gf:45, ga:36, pts:23 },
  { r:7,  club:'Neuchâtel Xamax FC',      p:22, w:7,  d:9,  l:6,  gf:39, ga:33, pts:23 },
  { r:8,  club:'Servette FC Genève',      p:22, w:8,  d:6,  l:8,  gf:39, ga:34, pts:22 },
  { r:'─', sep:true },
  { r:9,  club:'FC Aarau',                p:22, w:5,  d:8,  l:9,  gf:27, ga:29, pts:18, dim:true },
  { r:10, club:'Lausanne-Sports',         p:22, w:5,  d:8,  l:9,  gf:27, ga:34, pts:18, dim:true },
  { r:11, club:'FC St.Gallen',            p:22, w:5,  d:6,  l:11, gf:29, ga:44, pts:16, dim:true },
  { r:12, club:'FC Lugano',               p:22, w:3,  d:10, l:9,  gf:23, ga:46, pts:16, dim:true },
];

// Finalrunde stats are round-only; pts are cumulative after bonus/halving.
const FG_STANDINGS = [
  { r:1,  club:'FC Luzern',               p:14, w:7, d:5, l:2, gf:17, ga:11, pts:33, frPts:19, bonus:14, note:'MEISTER', champion:true },
  { r:'─', sep:true },
  { r:2,  club:'Grasshopper Club Zürich', p:14, w:7, d:2, l:5, gf:20, ga:18, pts:30, frPts:16, bonus:14 },
  { r:3,  club:'FC Sion',                 p:14, w:6, d:5, l:3, gf:22, ga:15, pts:29, frPts:17, bonus:12 },
  { r:4,  club:'FC Wettingen',            p:14, w:7, d:2, l:5, gf:22, ga:14, pts:28, frPts:16, bonus:12 },
  { r:5,  club:'BSC Young Boys',          p:14, w:6, d:3, l:5, gf:36, ga:22, pts:27, frPts:15, bonus:12 },
  { r:6,  club:'Neuchâtel Xamax FC',      p:14, w:4, d:3, l:7, gf:23, ga:26, pts:23, frPts:11, bonus:12 },
  { r:7,  club:'AC Bellinzona',           p:14, w:2, d:4, l:8, gf:9,  ga:26, pts:21, frPts:8,  bonus:13 },
  { r:8,  club:'Servette FC Genève',      p:14, w:3, d:4, l:7, gf:25, ga:42, pts:21, frPts:10, bonus:11 },
];

const CT_QP_TEXT =
`<span style="color:#555">         LUZ  GCZ  BEL  SIO  WET  YBB  XAM  SER  AAR  LAU  STG  LUG
</span><span style="color:#333">         ────────────────────────────────────────────────────────────────
</span><span style="color:#00ff00">Luzern   ···  2:0  2:1  2:1  2:2  1:3  1:0  1:1  1:0  0:0  3:2  2:1
</span>Grassh.  4:1  ···  2:2  1:0  2:0  2:2  2:2  4:0  1:0  3:2  3:0  3:0
Bellinz. 3:1  2:1  ···  0:2  1:1  3:0  2:1  4:0  1:0  1:1  1:1  0:0
Sion     3:0  0:0  0:2  ···  2:0  1:1  1:1  2:1  2:0  1:0  2:2  0:0
Wettig.  0:0  1:1  1:0  1:1  ···  1:1  2:0  2:2  0:0  1:1  0:0  1:1
Y.Boys   0:2  4:3  4:1  0:0  1:2  ···  2:2  2:3  4:0  3:1  2:0  3:3
Xamax    0:0  4:0  2:2  3:1  2:2  2:5  ···  2:1  1:1  0:2  3:1  5:1
Servette 0:1  2:1  2:3  0:1  1:1  3:2  0:1  ···  1:0  1:1  7:1  1:1
Aarau    1:1  1:2  2:1  4:1  0:2  2:1  1:1  2:2  ···  1:1  5:0  2:2
Lausanne 0:0  0:2  2:2  1:1  1:2  1:4  2:4  1:4  0:2  ···  2:1  4:0
St.Gall. 0:1  2:2  2:0  2:0  2:1  2:0  3:3  0:1  2:2  1:2  ···  4:1
Lugano   3:3  2:2  0:2  0:3  0:0  1:1  1:0  1:6  2:1  0:2  3:1  ···`;

const CT_FG_TEXT =
`<span style="color:#555">         LUZ  GCZ  SIO  WET  YBB  XAM  BEL  SER
</span><span style="color:#333">         ─────────────────────────────────────────
</span><span style="color:#00ff00">Luzern   ···  1-0  1-0  1-0  3-3  2-0  1-1  1-0
</span>Grassh.  2-1  ···  2-1  2-1  1-4  2-1  2-0  6-1
Sion     1-1  2-0  ···  2-1  3-0  2-2  1-0  3-2
Wettg.   1-0  2-0  0-2  ···  3-1  1-2  3-0  6-2
Y.Boys   1-2  2-0  2-2  1-1  ···  5-1  6-0  7-0
Xamax    0-1  0-1  2-2  1-2  3-2  ···  3-0  6-3
Bellinz. 0-0  0-0  1-0  0-1  3-0  0-0  ···  2-5
Servette 2-2  2-2  1-1  0-0  0-2  3-2  4-2  ···`;

const MATCHES_QP = [
  { r:'1. RUNDE', d:'23. Juli', m:[
    { h:'Lausanne',  s:'0-2', a:'Aarau',       g:'Kilian 16, Knup 64' },
    { h:'Lugano',    s:'1-1', a:'Young Boys',  g:'Penzavalli 39; Közle 61' },
    { h:'Luzern',    s:'3-2', a:'St.Gallen',   g:'Gretarsson 61, Burri 63, Mohr 70; Braschler 53, Piserchia 90', luzern:true },
    { h:'Xamax',     s:'2-2', a:'Bellinzona',  g:'Lei-Ravello 14p, Decastel 91; og 36, Mapuata 61' },
    { h:'Servette',  s:'0-1', a:'Sion',        g:'Cina 68p' },
    { h:'Wettingen', s:'1-1', a:'Grasshopper', g:'Peterhans 84; Sutter 36' },
  ]},
  { r:'2. RUNDE', d:'27. Juli', m:[
    { h:'Aarau',       s:'1-1', a:'Luzern',      g:'Kühni 28; Mohr 80', luzern:true },
    { h:'Bellinzona',  s:'4-0', a:'Servette',    g:'Jacobacci 6, 90, Hannes 24, Mapuata 60' },
    { h:'Grasshopper', s:'3-0', a:'Lugano',      g:'Rufer 55, 89, Bickel 68' },
    { h:'St.Gallen',   s:'1-2', a:'Lausanne',    g:'Metzler 59; Chapuisat 17, Bregy 55' },
    { h:'Sion',        s:'1-1', a:'Xamax',       g:'Cina 18; Zwicker 63' },
    { h:'Young Boys',  s:'1-2', a:'Wettingen',   g:'Közle 53; Baumgartner 25, Remark 41' },
  ]},
  { r:'3. RUNDE', d:'30. Juli', m:[
    { h:'Lausanne',  s:'1-1', a:'Sion',        g:'Thychosen 19; Cina 39' },
    { h:'Lugano',    s:'2-1', a:'Aarau',       g:'Pelosi 36, Gorter 68; Knup 88' },
    { h:'Luzern',    s:'2-0', a:'Grasshopper', g:'Burri 5, Gretarsson 81', luzern:true },
    { h:'Xamax',     s:'3-1', a:'St.Gallen',   g:'Mottiez 3, Lei-Ravello 16, Zwicker 25; Piserchia 31' },
    { h:'Servette',  s:'3-2', a:'Young Boys',  g:'Eriksen 14, Besnard 65, Rummenigge 72; Rapolder 77, Zuffi 87' },
    { h:'Wettingen', s:'1-0', a:'Bellinzona',  g:'Remark 27' },
  ]},
  { r:'4. RUNDE', d:'6. Aug.', m:[
    { h:'Aarau',       s:'1-1', a:'Xamax',      g:'Matthey 70; Decastel 41' },
    { h:'Bellinzona',  s:'1-1', a:'Lausanne',   g:'Türkyilmaz 82p; Thychosen 18' },
    { h:'Grasshopper', s:'4-0', a:'Servette',   g:'Bianchi 45, Rufer 47, 60, Gren 69' },
    { h:'St.Gallen',   s:'4-1', a:'Lugano',     g:'Zamorano 3, 47, 83, Piserchia 6; Jensen 60' },
    { h:'Sion',        s:'2-0', a:'Wettingen',  g:'Piffaretti 35, Baljic 77' },
    { h:'Young Boys',  s:'0-2', a:'Luzern',     g:'Nadig 65, Friberg 87', luzern:true },
  ]},
  { r:'5. RUNDE', d:'10. Aug.', m:[
    { h:'Lausanne',  s:'0-2', a:'Grasshopper', g:'A.Sutter 52, Andermatt 89' },
    { h:'Luzern',    s:'2-1', a:'Sion',        g:'Bernaschina 25, Friberg 89; Baljic 68', luzern:true },
    { h:'Xamax',     s:'2-5', a:'Young Boys',  g:'Lei-Ravello 59, B.Sutter 69; Zuffi 77, 78, 81og' },
    { h:'Servette',  s:'7-1', a:'St.Gallen',   g:'Rummenigge 28, 39p, 47, 84; Zamorano 90' },
    { h:'Wettingen', s:'0-0', a:'Aarau',       g:'' },
    { h:'Lugano',    s:'0-2', a:'Bellinzona',  g:'Türkyilmaz 22, 85' },
  ]},
  { r:'6. RUNDE', d:'13. Aug.', m:[
    { h:'Aarau',       s:'2-2', a:'Servette',   g:"Opoku-N'Ti 10, Van der Gijp 25; Fargeon 19, Bonvin 41" },
    { h:'Bellinzona',  s:'3-1', a:'Luzern',     g:'Türkyilmaz 15, 90, Mapuata 21; Burri 29', luzern:true },
    { h:'Grasshopper', s:'2-2', a:'Xamax',      g:'Rufer 39, P.Cesar 43p; A.Sutter 7, Zwicker 78' },
    { h:'St.Gallen',   s:'2-1', a:'Wettingen',  g:'Hegi 24, 71p; Peterhans 84' },
    { h:'Sion',        s:'0-0', a:'Lugano',     g:'' },
    { h:'Young Boys',  s:'3-1', a:'Lausanne',   g:'Nilsson 56, Hänzi 69, Zuffi 83; Hartmann 88' },
  ]},
  { r:'7. RUNDE', d:'20. Aug.', m:[
    { h:'Grasshopper', s:'1-0', a:'Aarau',      g:'Egli 8' },
    { h:'Luzern',      s:'2-1', a:'Lugano',     g:'Gretarsson 72, Nadig 86; Leva 64', luzern:true },
    { h:'Xamax',       s:'2-1', a:'Servette',   g:'Mottiez 38, Fasel 54; Rummenigge 83p' },
    { h:'St.Gallen',   s:'2-0', a:'Young Boys', g:'Hegi 9, Zamorano 74' },
    { h:'Wettingen',   s:'1-1', a:'Lausanne',   g:'Remark 89p; Bregy 9p' },
    { h:'Bellinzona',  s:'0-2', a:'Sion',       g:'Cina 35, De Siebenthal 45' },
  ]},
  { r:'8. RUNDE', d:'27. Aug.', m:[
    { h:'Aarau',      s:'5-0', a:'St.Gallen',   g:'Matthey 23, 68, Herberth 41, 48, Barth 88' },
    { h:'Lausanne',   s:'0-0', a:'Luzern',      g:'', luzern:true },
    { h:'Lugano',     s:'1-0', a:'Xamax',       g:'Gorter 22p' },
    { h:'Servette',   s:'1-1', a:'Wettingen',   g:'Sinval 74; Heldmann 28' },
    { h:'Sion',       s:'0-0', a:'Grasshopper', g:'' },
    { h:'Young Boys', s:'4-1', a:'Bellinzona',  g:'Nilsson 26, Jeitziner 28, 89, Limpar 44; Türkyilmaz 86' },
  ]},
  { r:'9. RUNDE', d:'30.–31. Aug.', m:[
    { h:'Aarau',      s:'2-1', a:'Young Boys',  g:'Herberth 4, Knup 9; Hänzi 73' },
    { h:'Bellinzona', s:'2-1', a:'Grasshopper', g:'Tami 21, Mapuata 63; A.Sutter 58' },
    { h:'Lausanne',   s:'4-0', a:'Lugano',      g:'Thychosen 27, 79, Hottiger 36, Douglas 74' },
    { h:'Luzern',     s:'1-1', a:'Servette',    g:'Nadig 24; Fargeon 29', luzern:true },
    { h:'St.Gallen',  s:'2-0', a:'Sion',        g:'Braschler 18, Metzler 72' },
    { h:'Xamax',      s:'2-2', a:'Wettingen',   g:'Lüthi 19, Chassot 48; Heldmann 16, Bertelsen 61' },
  ]},
  { r:'10. RUNDE', d:'10. Sept.', m:[
    { h:'Bellinzona',  s:'1-1', a:'St.Gallen',   g:'Hannes 77; Filomeno 90' },
    { h:'Grasshopper', s:'2-2', a:'Young Boys',  g:'Stiel 35, W.Rufer 39; Weber 55, Zuffi 66' },
    { h:'Xamax',       s:'0-2', a:'Lausanne',    g:'Ohrel 71, Fernandez 86' },
    { h:'Servette',    s:'1-1', a:'Lugano',      g:'Grossenbacher 34; Jensen 77' },
    { h:'Sion',        s:'2-0', a:'Aarau',       g:'De Siebenthal 15p, Cina 46' },
    { h:'Wettingen',   s:'0-0', a:'Luzern',      g:'', luzern:true },
  ]},
  { r:'11. RUNDE', d:'14. Sept.', m:[
    { h:'Aarau',      s:'2-1', a:'Bellinzona',  g:'T.Wyss 42, Knup 78; og 82' },
    { h:'Lausanne',   s:'1-4', a:'Servette',    g:'Tychosen 36; Rummenigge 28p, 35, Favre 67, 68' },
    { h:'Lugano',     s:'0-0', a:'Wettingen',   g:'' },
    { h:'Luzern',     s:'1-0', a:'Xamax',       g:'Gretarsson 32', luzern:true },
    { h:'St.Gallen',  s:'2-2', a:'Grasshopper', g:'Irisik 15, Piserchia 54; P.Cesar 74, W.Rufer 78' },
    { h:'Young Boys', s:'0-0', a:'Sion',        g:'' },
  ]},
  { r:'12. RUNDE', d:'24. Sept.', m:[
    { h:'Aarau',       s:'1-1', a:'Lausanne',   g:'Matthey 29; Tychosen 18' },
    { h:'Young Boys',  s:'3-3', a:'Lugano',     g:'Baumann 67, Maissen 71, Zuffi 73; Leva 13, Jensen 60, Manfreda 86' },
    { h:'St.Gallen',   s:'0-1', a:'Luzern',     g:'Gretarsson 53', luzern:true },
    { h:'Bellinzona',  s:'2-1', a:'Xamax',      g:'Hannes 41, 61; Nielsen 68' },
    { h:'Sion',        s:'2-1', a:'Servette',   g:'Fargeon 10, Baljic 56p; De Siebenthal 40' },
    { h:'Grasshopper', s:'2-0', a:'Wettingen',  g:'Gren 21, Andermatt 47' },
  ]},
  { r:'13. RUNDE', d:'28. Sept.', m:[
    { h:'Luzern',      s:'1-0', a:'Aarau',       g:'Schönenberger 45', luzern:true },
    { h:'Servette',    s:'2-3', a:'Bellinzona',  g:'Rummenigge 76p, Bonvin 80; Türkyilmaz 30, Fregno 37, Hannes 88' },
    { h:'Lugano',      s:'2-2', a:'Grasshopper', g:'Gorter 6, Colombo 24; Gren 18, Pedrotti 83' },
    { h:'Lausanne',    s:'2-1', a:'St.Gallen',   g:'Hottiger 52, Douglas 72; Zamorano 55' },
    { h:'Xamax',       s:'3-1', a:'Sion',        g:'Lei-Ravello 45p, B.Sutter 59, Decastel 89; Brigger 63p' },
    { h:'Wettingen',   s:'1-1', a:'Young Boys',  g:'Rueda 58; Maissen 65' },
  ]},
  { r:'14. RUNDE', d:'9.–10. Okt.', m:[
    { h:'Aarau',       s:'2-2', a:'Lugano',      g:'Matthey 24, Knup 49; Colombo 13, 58' },
    { h:'Bellinzona',  s:'1-1', a:'Wettingen',   g:'Mapuata 2; Bertelsen 45' },
    { h:'Sion',        s:'1-0', a:'Lausanne',    g:'Baljic 29' },
    { h:'Grasshopper', s:'4-1', a:'Luzern',      g:'Koller 9, Stiel 38, 66, In-Albon 58; M.Müller 22', luzern:true },
    { h:'St.Gallen',   s:'3-3', a:'Xamax',       g:'Jurkemik 24, Zamorano 53, Fischer 77; Smajic 30, Lüthi 81, 91' },
    { h:'Young Boys',  s:'2-3', a:'Servette',    g:'Zuffi 10, 34; Rummenigge 27, Fargeon 67, Bonvin 71' },
  ]},
  { r:'15. RUNDE', d:'12.–13. Okt.', m:[
    { h:'Xamax',      s:'1-1', a:'Aarau',        g:'Smajic 83p; Knup 35' },
    { h:'Lausanne',   s:'2-2', a:'Bellinzona',   g:'Bregy 55p, Schürmann 64; Türkyilmaz 29, Tami 51' },
    { h:'Wettingen',  s:'1-1', a:'Sion',         g:'Kundert 62; Piffaretti 12' },
    { h:'Luzern',     s:'1-3', a:'Young Boys',   g:'M.Müller 90; Maissen 45, Zuffi 60, Közle 74', luzern:true },
    { h:'Servette',   s:'2-1', a:'Grasshopper',  g:'Sinval 49, Rummenigge 62; Koller 57' },
    { h:'Lugano',     s:'3-1', a:'St.Gallen',    g:'Gorter 37, Manfreda 66, Pelosi 91; Irizik 88' },
  ]},
  { r:'16. RUNDE', d:'22.–23. Okt.', m:[
    { h:'Grasshopper', s:'3-2', a:'Lausanne',    g:'W.Rufer 41, P.Cesar 47, Sforza 54; Douglas 84, Tychosen 88' },
    { h:'Sion',        s:'3-0', a:'Luzern',      g:'Baljic 26p, Brigger 29, Praz 86', luzern:true },
    { h:'Young Boys',  s:'2-2', a:'Xamax',       g:'Fimian 48, Zuffi 74; Lüthi 14, H.Hermann 40' },
    { h:'St.Gallen',   s:'0-1', a:'Servette',    g:'Eriksen 72' },
    { h:'Aarau',       s:'0-2', a:'Wettingen',   g:'Baumgartner 38, Pellegrini 82' },
    { h:'Bellinzona',  s:'0-0', a:'Lugano',      g:'' },
  ]},
  { r:'17. RUNDE', d:'29.–30. Okt.', m:[
    { h:'Xamax',      s:'4-0', a:'Grasshopper',  g:'H.Hermann 27, Decastel 28, Lüthi 56, Chassot 81' },
    { h:'Lausanne',   s:'1-4', a:'Young Boys',   g:'Hottiger 85; Közle 13, Hänzi 30, Nilsson 54, Zuffi 83' },
    { h:'Servette',   s:'1-0', a:'Aarau',        g:'Rummenigge 89' },
    { h:'Luzern',     s:'2-1', a:'Bellinzona',   g:'Nadig 31, 58; Türkyilmaz 81', luzern:true },
    { h:'Wettingen',  s:'0-0', a:'St.Gallen',    g:'' },
    { h:'Lugano',     s:'0-3', a:'Sion',         g:'Albertoni 59, Cina 81, Baljic 83' },
  ]},
  { r:'18. RUNDE', d:'3.–6. Nov.', m:[
    { h:'Servette',   s:'0-1', a:'Xamax',       g:'Lei-Ravello 57p' },
    { h:'Young Boys', s:'2-0', a:'St.Gallen',   g:'R.Sutter 20, 70' },
    { h:'Aarau',      s:'1-2', a:'Grasshopper', g:'og 83; Gren 18, W.Rufer 42' },
    { h:'Lugano',     s:'3-3', a:'Luzern',      g:'Gorter 41p, Jensen 55, 62; Gretarsson 39, Mohr 34, 80', luzern:true },
    { h:'Lausanne',   s:'1-2', a:'Wettingen',   g:'Bregy 17; Bertelsen 28, Romano 84' },
    { h:'Sion',       s:'0-2', a:'Bellinzona',  g:'Türkyilmaz 44, Jacobacci 77' },
  ]},
  { r:'19. RUNDE', d:'19.–20. Nov.', m:[
    { h:'Xamax',       s:'5-1', a:'Lugano',      g:'Lüthi 15, 59, Decastel 22, H.Hermann 24, Nielsen 68; Jensen 76' },
    { h:'St.Gallen',   s:'2-2', a:'Aarau',       g:'Zamorano 50, 60; T.Wyss 9, Matthey 52' },
    { h:'Luzern',      s:'0-0', a:'Lausanne',    g:'', luzern:true },
    { h:'Wettingen',   s:'2-2', a:'Servette',    g:'og 70, Pellegrini 82; Rummenigge 61, 73' },
    { h:'Grasshopper', s:'1-0', a:'Sion',        g:'A.Sutter 84' },
    { h:'Bellinzona',  s:'3-0', a:'Young Boys',  g:'Jacobacci 16, Marchand 73, Türkyilmaz 75' },
  ]},
  { r:'20. RUNDE', d:'27. Nov.', m:[
    { h:'Young Boys',  s:'4-0', a:'Aarau',       g:'Közle 6, 30, 85, Zuffi 13p' },
    { h:'Grasshopper', s:'2-2', a:'Bellinzona',  g:'Bickel 30, P.Cesar 63p; Türkyilmaz 74, 76p' },
    { h:'Lugano',      s:'0-2', a:'Lausanne',    g:'Antognoni 39, Hartmann 91' },
    { h:'Servette',    s:'0-1', a:'Luzern',      g:'Wehrli 24p', luzern:true },
    { h:'Wettingen',   s:'2-0', a:'Xamax',       g:'Germann 38, Pellegrini 45' },
    { h:'Sion',        s:'2-2', a:'St.Gallen',   g:'O.Rey 4, Brigger 58; Hengartner 16, Zamorano 77' },
  ]},
  { r:'21. RUNDE', d:'4. Dez.', m:[
    { h:'St.Gallen',   s:'2-0', a:'Bellinzona',  g:'Piserchia 62, Rietmann 65' },
    { h:'Young Boys',  s:'4-3', a:'Grasshopper', g:'Fimian 4, R.Sutter 10, Jeitziner 23, Közle 36; Andermatt 53, 75, 90' },
    { h:'Lausanne',    s:'2-4', a:'Xamax',       g:'Herr 3, Hartmann 15; Lüthi 16, 34, Thévenaz 65, Chassot 89' },
    { h:'Lugano',      s:'1-6', a:'Servette',    g:'Leva 76; Cacciapaglia 8, Rummenigge 15, 22, 59, Eriksen 18, Favre 60' },
    { h:'Aarau',       s:'4-1', a:'Sion',        g:'T.Wyss 7, 52, Kilian 19, Triebold 89; Pascolo 84p' },
    { h:'Luzern',      s:'2-2', a:'Wettingen',   g:'Friberg 8, Nadig 50; Bertelsen 84, Peterhans 91', luzern:true },
  ]},
  { r:'22. RUNDE', d:'11. Dez.', m:[
    { h:'Bellinzona',  s:'1-0', a:'Aarau',       g:'Fregno 46' },
    { h:'Servette',    s:'1-1', a:'Lausanne',    g:'Rummenigge 31; Hartmann 21' },
    { h:'Wettingen',   s:'1-1', a:'Lugano',      g:'Pellegrini 30p; Leva 20' },
    { h:'Xamax',       s:'0-0', a:'Luzern',      g:'', luzern:true },
    { h:'Grasshopper', s:'3-0', a:'St.Gallen',   g:'W.Rufer 61, 74, 78' },
    { h:'Sion',        s:'1-1', a:'Young Boys',  g:'Cina 46; Zuffi 48' },
  ]},
];

const MATCHES_FG = [
  { r:'1. RUNDE', d:'18.–19. März', m:[
    { h:'Wettingen',   s:'2-0', a:'Grasshopper', g:'Romano 36, Häusermann 79' },
    { h:'Bellinzona',  s:'0-0', a:'Xamax',       g:'' },
    { h:'Sion',        s:'3-2', a:'Servette',    g:'Baljic 23p, 55, Balet 50; Favre 47, Eriksen 80' },
    { h:'Young Boys',  s:'1-2', a:'Luzern',      g:'Közle 12; Schönenberger 51, Birrer 76', luzern:true },
  ]},
  { r:'2. RUNDE', d:'25.–27. März', m:[
    { h:'Xamax',       s:'2-2', a:'Sion',        g:'H.Hermann 6, Lüthi 29; Brigger 34, O.Rey 89' },
    { h:'Servette',    s:'0-0', a:'Wettingen',   g:'' },
    { h:'Grasshopper', s:'1-4', a:'Young Boys',  g:'W.Rufer 39; Zuffi 32, 85, R.Sutter 37p, Limpar 83' },
    { h:'Luzern',      s:'1-1', a:'Bellinzona',  g:'Nadig 46; Türkyilmaz 4', luzern:true },
  ]},
  { r:'3. RUNDE', d:'1. April', m:[
    { h:'Bellinzona',  s:'0-0', a:'Grasshopper', g:'' },
    { h:'Sion',        s:'1-1', a:'Luzern',      g:'Baljic 58; Nadig 29', luzern:true },
    { h:'Wettingen',   s:'1-2', a:'Xamax',       g:'Rueda 84; Lüthi 31, B.Sutter 87' },
    { h:'Young Boys',  s:'7-0', a:'Servette',    g:'Limpar 20, 81, Zuffi 27, 45, 48p, Jeitziner 55, Fimian 84' },
  ]},
  { r:'4. RUNDE', d:'8.–18. April', m:[
    { h:'Grasshopper', s:'2-1', a:'Luzern',      g:'Halter 49, T.Wyss 63; Gretarsson 84p', luzern:true },
    { h:'Xamax',       s:'6-3', a:'Servette',    g:'Lüthi 6, Lei-Ravello 39p, Mottiez 45, B.Sutter 51, 60, Chassot 90; Mourelle 25, og 68, Favre 85' },
    { h:'Wettingen',   s:'0-2', a:'Sion',        g:'Baljic 27, Balet 30' },
    { h:'Bellinzona',  s:'3-0', a:'Young Boys',  g:'Türkyilmaz 14, 69, 89p' },
  ]},
  { r:'5. RUNDE', d:'15. April', m:[
    { h:'Sion',        s:'1-0', a:'Bellinzona',  g:'Sauthier 45' },
    { h:'Luzern',      s:'2-0', a:'Xamax',       g:'Mohr 15, Nadig 65', luzern:true },
    { h:'Young Boys',  s:'1-1', a:'Wettingen',   g:'Fimian 69; Rueda 40p' },
    { h:'Servette',    s:'2-2', a:'Grasshopper', g:'Eriksen 33, Rummenigge 45; Gren 20, Andermatt 76' },
  ]},
  { r:'6. RUNDE', d:'29.–30. April', m:[
    { h:'Xamax',       s:'0-1', a:'Grasshopper', g:'W.Rufer 82' },
    { h:'Servette',    s:'2-2', a:'Luzern',      g:'Favre 22, Eriksen 27; Nadig 41, 83', luzern:true },
    { h:'Sion',        s:'3-0', a:'Young Boys',  g:'Balet 25, Cina 59, 79' },
    { h:'Wettingen',   s:'3-0', a:'Bellinzona',  g:'Rueda 45, Bertelsen 57, og 67' },
  ]},
  { r:'7. RUNDE', d:'6. Mai', m:[
    { h:'Bellinzona',  s:'2-5', a:'Servette',    g:'Mapuata 66, Türkyilmaz 84p; og 10, Eriksen 21, 87, Rummenigge 26, 57' },
    { h:'Grasshopper', s:'2-1', a:'Sion',        g:'Gren 53, A.Sutter 72; Cina 13' },
    { h:'Luzern',      s:'1-0', a:'Wettingen',   g:'Gretarsson 55', luzern:true },
    { h:'Young Boys',  s:'5-1', a:'Xamax',       g:'Közle 14, 30, Fimian 48, Baumann 58, Rölli 62; B.Sutter 31' },
  ]},
  { r:'8. RUNDE', d:'11. Mai', m:[
    { h:'Xamax',       s:'3-0', a:'Bellinzona',  g:'Ryf 18, B.Sutter 23, Lüthi 53' },
    { h:'Servette',    s:'1-1', a:'Sion',        g:'Eriksen 29; Sauthier 82' },
    { h:'Grasshopper', s:'2-1', a:'Wettingen',   g:'Gren 4, P.Cesar 58p; Schepull 76' },
    { h:'Luzern',      s:'3-3', a:'Young Boys',  g:'Nadig 34, 85, Wehrli 79p; Közle 43, Rapolder 64, Zuffi 74', luzern:true },
  ]},
  { r:'9. RUNDE', d:'20. Mai', m:[
    { h:'Sion',        s:'2-2', a:'Xamax',       g:'Brigger 43, Baljic 88p; Lei-Ravello 10, B.Sutter 72' },
    { h:'Wettingen',   s:'6-2', a:'Servette',    g:'Rueda 15p, 85, Svensson 21, Germann 63, Baumgartner 75, Bertelsen 90; Besnard 18, Rummenigge 79' },
    { h:'Young Boys',  s:'2-0', a:'Grasshopper', g:'R.Müller 48p, Közle 75' },
    { h:'Bellinzona',  s:'0-0', a:'Luzern',      g:'', luzern:true },
  ]},
  { r:'10. RUNDE', d:'23. Mai', m:[
    { h:'Grasshopper', s:'2-0', a:'Bellinzona',  g:'W.Rufer 62p, Halter 63' },
    { h:'Luzern',      s:'1-0', a:'Sion',        g:'Nadig 61', luzern:true },
    { h:'Xamax',       s:'1-2', a:'Wettingen',   g:'B.Sutter 33; Heldmann 64, Bertelsen 85' },
    { h:'Servette',    s:'0-2', a:'Young Boys',  g:'Jeitziner 37, Limpar 64' },
  ]},
  { r:'11. RUNDE', d:'27. Mai', m:[
    { h:'Luzern',      s:'1-0', a:'Grasshopper', g:'Martin Müller 82', luzern:true },
    { h:'Servette',    s:'3-2', a:'Xamax',       g:'Bamert 35, Sinval 57, Rummenigge 87p; Zwicker 32, Lei-Ravello 62p' },
    { h:'Sion',        s:'2-1', a:'Wettingen',   g:'Brigger 27, Cina 43; Svensson 47' },
    { h:'Young Boys',  s:'6-0', a:'Bellinzona',  g:'R.Sutter 26p, Jeitziner 41, 78, Wittwer 57, Fimian 64, Hänzi 80' },
  ]},
  { r:'12. RUNDE', d:'31. Mai', m:[
    { h:'Bellinzona',  s:'1-0', a:'Sion',        g:'Türkyilmaz 47' },
    { h:'Xamax',       s:'0-1', a:'Luzern',      g:'Nadig 79', luzern:true },
    { h:'Wettingen',   s:'3-1', a:'Young Boys',  g:'Rueda 28p, Bertelsen 53, 90; Közle 83' },
    { h:'Grasshopper', s:'6-1', a:'Servette',    g:'Halter 3, 53, 75, W.Rufer 33, 84, Stiel 71; Eriksen 13' },
  ]},
  { r:'13. RUNDE', d:'10. Juni', m:[
    { h:'Grasshopper', s:'2-1', a:'Xamax',       g:'W.Rufer 39, Stiel 75; og 89' },
    { h:'Luzern',      s:'1-0', a:'Servette',    g:'Mohr 61', luzern:true },
    { h:'Young Boys',  s:'2-2', a:'Sion',        g:'Közle 51, 53; Piffaretti 18, Baljic 50' },
    { h:'Bellinzona',  s:'0-1', a:'Wettingen',   g:'Schepull 55' },
  ]},
  { r:'14. RUNDE', d:'14. Juni', m:[
    { h:'Servette',    s:'4-2', a:'Bellinzona',  g:'Rummenigge 25, Favre 71, Hertig 77, Sinval 78; U.Meier 79, Türkyilmaz 80' },
    { h:'Sion',        s:'2-0', a:'Grasshopper', g:'Cina 32, Baljic 68' },
    { h:'Wettingen',   s:'1-0', a:'Luzern',      g:'Kundert 85', luzern:true },
    { h:'Xamax',       s:'3-2', a:'Young Boys',  g:'Lüthi 2, Chassot 13, Widmer 74; Zuffi 4, Közle 17' },
  ]},
];

const SCORERS = [
  { r:1,  name:'Rummenigge K.-H. (GER)',  qp:18, fg:6,  tot:24, club:'Servette Genève' },
  { r:2,  name:'Türkyilmaz Kubilay',      qp:13, fg:6,  tot:19, club:'AC Bellinzona' },
  { r:2,  name:'Zuffi Dario',             qp:12, fg:7,  tot:19, club:'BSC Young Boys' },
  { r:4,  name:'Rufer Wynton (NZL)',      qp:12, fg:6,  tot:18, club:'Grasshopper Club' },
  { r:5,  name:'Közle Peter (GER)',       qp:8,  fg:9,  tot:17, club:'BSC Young Boys' },
  { r:6,  name:'Nadig Peter',             qp:6,  fg:9,  tot:15, club:'FC Luzern', luzern:true },
  { r:7,  name:'Lüthi Robert',            qp:9,  fg:5,  tot:14, club:'Neuchâtel Xamax' },
  { r:8,  name:'Baljic Mirsad (YUG)',     qp:6,  fg:7,  tot:13, club:'FC Sion' },
  { r:9,  name:'Cina Dominique',          qp:7,  fg:5,  tot:12, club:'FC Sion' },
  { r:10, name:'Eriksen John (DEN)',      qp:4,  fg:7,  tot:11, club:'Servette Genève' },
  { r:11, name:'Sutter Beat',             qp:3,  fg:7,  tot:10, club:'Neuchâtel Xamax' },
  { r:11, name:'Bertelsen Brian (DEN)',   qp:5,  fg:5,  tot:10, club:'FC Wettingen' },
  { r:13, name:'Gretarsson S. (ICE)',     qp:6,  fg:2,  tot:8,  club:'FC Luzern', luzern:true },
  { r:14, name:'Fimian André',            qp:3,  fg:4,  tot:7,  club:'BSC Young Boys' },
  { r:14, name:'Lei-Ravello Robert',      qp:5,  fg:2,  tot:7,  club:'Neuchâtel Xamax' },
  { r:14, name:'Mapuata Richard (ZAIR)',  qp:6,  fg:1,  tot:7,  club:'AC Bellinzona' },
  { r:17, name:'Andermatt Martin',        qp:5,  fg:1,  tot:7,  club:'Grasshopper Club' },
  { r:17, name:'Limpar Anders (SWE)',     qp:2,  fg:4,  tot:6,  club:'BSC Young Boys' },
  { r:17, name:'Rueda Martin',            qp:1,  fg:5,  tot:6,  club:'FC Wettingen' },
  { r:20, name:'Favre Lucien',            qp:3,  fg:2,  tot:5,  club:'Servette Genève' },
  { r:20, name:'Halter André',            qp:0,  fg:5,  tot:5,  club:'Grasshopper Club' },
];

const SCORERS_FG = [
  { r:1, name:'Nadig Peter',             tot:9, club:'FC Luzern', luzern:true },
  { r:1, name:'Közle Peter (GER)',       tot:9, club:'BSC Young Boys' },
  { r:3, name:'Baljic Mirsad (YUG)',     tot:7, club:'FC Sion' },
  { r:3, name:'Eriksen John (DEN)',      tot:7, club:'Servette Genève' },
  { r:3, name:'Sutter Beat',             tot:7, club:'Neuchâtel Xamax' },
  { r:3, name:'Zuffi Dario',             tot:7, club:'BSC Young Boys' },
  { r:7, name:'Rummenigge K.-H. (GER)',  tot:6, club:'Servette Genève' },
  { r:7, name:'Türkyilmaz Kubilay',      tot:6, club:'AC Bellinzona' },
  { r:7, name:'Rufer Wynton (NZL)',      tot:6, club:'Grasshopper Club' },
];

const SQUAD = [
  { name:'Roger Tschudin',            apps:29, goals:0,  pos:'GK', note:'Stammtorhüter der Meistermannschaft' },
  { name:'Martin Müller',             apps:36, goals:3,  pos:'MF', note:'Kopfballtor gegen GC am 27.05.1989' },
  { name:'Roger Wehrli',              apps:36, goals:2,  pos:'DF', note:'Captain der Meistermannschaft' },
  { name:'Herbert Baumann',           apps:34, goals:0,  pos:'DF', note:'Linker Verteidiger' },
  { name:'Urs Birrer',                apps:32, goals:1,  pos:'DF', note:'' },
  { name:'Hanspeter Burri',           apps:32, goals:3,  pos:'DF', note:'' },
  { name:'Jürgen Mohr (GER)',         apps:30, goals:6,  pos:'MF', note:'Meistertor gegen Servette' },
  { name:'Peter Nadig',               apps:30, goals:15, pos:'MF/ST', note:'Topscorer des FCL' },
  { name:'Urs Schönenberger',         apps:30, goals:2,  pos:'DF/MF', note:'' },
  { name:'Sigurdur Gretarsson (IS)',  apps:29, goals:8,  pos:'ST', note:'Isländischer Torjäger' },
  { name:'Hanspeter Kaufmann',        apps:29, goals:0,  pos:'DF/MF', note:'' },
  { name:'Paul Friberg',              apps:22, goals:3,  pos:'MF', note:'' },
  { name:'Stefan Marini',             apps:21, goals:0,  pos:'DF', note:'' },
  { name:'Marco Bernaschina',         apps:19, goals:1,  pos:'MF', note:'' },
  { name:'Heinz Moser',               apps:15, goals:0,  pos:'DF/MF', note:'' },
  { name:'Giorgio Mellacina',         apps:6,  goals:0,  pos:'GK', note:'Ersatztorhüter' },
  { name:'Peter Gmür',                apps:9,  goals:0,  pos:'MF', note:'' },
  { name:'Manfred Joller',            apps:2,  goals:0,  pos:'DF', note:'' },
  { name:'Bruce Murray (USA)',        apps:2,  goals:0,  pos:'ST', note:'US-Nationalspieler' },
  { name:'Alain Béguin',              apps:1,  goals:0,  pos:'ST', note:'' },
  { name:'Marcel Kälin',              apps:1,  goals:0,  pos:'MF', note:'' },
  { name:'Marcel Peter',              apps:1,  goals:0,  pos:'MF', note:'' },
];

// ===== NEW DATA =====

const TICKER = [
  'MEISTER FC LUZERN — FRIEDEL RAUSCH FÜHRT DIE INNERSCHWEIZER AUF DEN THRON',
  'NADIG 9 TORE IN DER FINALRUNDE — TOPSCORER GEMEINSAM MIT KÖZLE (YB)',
  'TSCHUDIN IM TOR — FCL MIT DRITTBESTEM GEGENTORVERHÄLTNIS DER LIGA (36 GT)',
  'FINALRUNDE: WETTINGEN 1-0 LUZERN — MEISTERSCHAFT BEREITS ENTSCHIEDEN',
  'RUMMENIGGE LIGA-TORSCHÜTZENKÖNIG MIT 24 TOREN FÜR SERVETTE',
  'GC ZWEIGETEILT — ZWEITER IN QP UND FINALRUNDE, KEIN TITEL',
  'ALLMEND AUSVERKAUFT — DIE INNERSCHWEIZ FEIERT IHRE HELDEN',
  'MEISTERKADER — BREITE, DISZIPLIN, 1 TRAUM',
];

const TIMELINE = [
  { d:'23.07.1988', t:'AUFTAKT', c:'AUF DER ALLMEND', desc:'FC Luzern 3-2 St.Gallen. Gretarsson, Burri und Mohr treffen zum Saisonstart.' },
  { d:'30.07.1988', t:'STATEMENT', c:'FCL 2-0 GC', desc:'Früher Sieg gegen den Favoriten Grasshopper — Luzern meldet Titelambitionen an.' },
  { d:'06.08.1988', t:'AUSWÄRTSCOUP', c:'YB 0-2 LUZERN', desc:'Nadig und Friberg bringen die Punkte aus dem Wankdorf mit.' },
  { d:'11.12.1988', t:'QP ABGESCHLOSSEN', c:'TABELLENFÜHRER', desc:'FCL beendet die Qualifikationsphase auf Rang 1 mit 28 Punkten vor GC (27).' },
  { d:'18.03.1989', t:'FINALRUNDE', c:'YB 1-2 LUZERN', desc:'Start der Finalrunde mit Auswärtssieg. Schönenberger und Birrer treffen.' },
  { d:'06.05.1989', t:'WEICHENSTELLUNG', c:'FCL 1-0 WETTINGEN', desc:'Gretarsson schiesst Luzern zum Sieg gegen den gefährlichsten Verfolger.' },
  { d:'27.05.1989', t:'KRIMI IM TITELKAMPF', c:'FCL 1-0 GC', desc:'Martin Müller köpft in der 82. Minute. Die Allmend explodiert.' },
  { d:'31.05.1989', t:'MATCHBALL', c:'XAMAX 0-1 LUZERN', desc:'Nadig trifft in der 79. Minute — Titel zum Greifen nahe.' },
  { d:'10.06.1989', t:'MEISTERMATCH', c:'FCL 1-0 SERVETTE', desc:'Mohr trifft in der 61. Minute — MEISTER! FC LUZERN ZUM ERSTEN MAL SCHWEIZER MEISTER.' },
  { d:'14.06.1989', t:'EHRENRUNDE', c:'WETTINGEN 1-0 FCL', desc:'Formsache zum Abschluss — die Meisterfeier in Luzern geht weiter.' },
];

const PORTRAIT = {
  stadion: {
    name: 'STADION ALLMEND',
    facts: [
      { k:'KAPAZITÄT', v:'26 000' },
      { k:'ERÖFFNUNG', v:'1934' },
      { k:'RASEN', v:'NATURRASEN 105×68 M' },
      { k:'HEIMSPIELE 88/89', v:'18 (QP+FR)' },
      { k:'HEIMBILANZ', v:'10S 7U 1N' },
      { k:'HEIMTORE', v:'23 : 10' },
    ],
    desc: 'Die Allmend ist seit 1934 die Heimstätte des FC Luzern. In der Meistersaison 1988/89 verlor der FCL hier nur ein einziges Ligaspiel — das 1:3 gegen BSC Young Boys am 12. Oktober 1988.'
  },
  trainer: {
    name: 'FRIEDEL RAUSCH',
    nation: 'DEUTSCHLAND',
    born:'21.02.1940, Essen',
    facts: [
      { k:'TRAINIERT FCL', v:'SEIT 1985' },
      { k:'VORHER', v:'SCHALKE 04, NÜRNBERG' },
      { k:'SYSTEM', v:'4-4-2 KOMPAKT' },
      { k:'PRINZIP', v:'DEFENSIVE DISZIPLIN' },
    ],
    desc: 'Der deutsche Coach verwandelte Luzern vom grauen Mittelfeldklub in einen Meister. Kompakte Defensive, schnelles Umschaltspiel, eiserne Disziplin — die Rausch-Schule.'
  },
  heroes: [
    { n:'PETER NADIG',        r:'OFFENSIVSPIELER', st:'15 TORE · 9 IN DER FINALRUNDE', q:'Der Mann für die entscheidenden Momente.' },
    { n:'ROGER TSCHUDIN',     r:'TORHÜTER',        st:'29 SPIELE · 36 GEGENTORE',      q:'Die Nummer 1 im Meisterjahr.' },
    { n:'SIGURDUR GRETARSSON',r:'STÜRMER',         st:'29 SPIELE · 8 TORE · ISLAND',    q:'Nordische Kaltschnäuzigkeit.' },
    { n:'JÜRGEN MOHR',        r:'MITTELFELD',      st:'30 SPIELE · 6 TORE · DEUTSCHLAND', q:'Meistertor in der 61. Minute.' },
    { n:'MARTIN MÜLLER',      r:'SPIELMACHER',     st:'36 SPIELE · 3 TORE',             q:'Das Kopfballtor gegen GC — 27.05.1989.' },
    { n:'ROGER WEHRLI',       r:'LIBERO',          st:'36 SPIELE · 2 TORE',             q:'Eine Mauer und der Captain der Meistermannschaft.' },
  ]
};

const PLAYER_BIO = {
  'Peter Nadig': {
    birth:'20.02.1965',
    from:'FC BASEL',
    pos:'OFFENSIVES MITTELFELD / STURM',
    height:'180',
    profile:'Der offensiv prägende Spieler der Meistersaison. 15 Ligatore, davon 9 in der Finalrunde — darunter der entscheidende Treffer in Xamax am 31.05.1989.'
  },
  'Sigurdur Gretarsson (IS)': {
    birth:'18.09.1962',
    from:'BVB STOCKHOLM',
    pos:'STÜRMER',
    height:'183',
    profile:'Der isländische Angreifer des FCL. Schnell, kopfballstark und in grossen Spielen präsent — unter anderem mit dem Siegtreffer gegen Wettingen in der Finalrunde.'
  },
  'Jürgen Mohr (GER)': {
    birth:'18.08.1958',
    from:'1. FC SAARBRÜCKEN',
    pos:'MITTELFELD',
    height:'187',
    profile:'Strateg im Luzerner Zentrum. Schoss am 10.06.1989 im Meisterspiel gegen Servette das entscheidende 1:0.'
  },
  'Roger Tschudin': {
    birth:'21.07.1966',
    from:'FCL EIGENGEWÄCHS',
    pos:'TORHÜTER',
    height:'190',
    profile:'Die Nummer 1 der Meistermannschaft. Stand 1988/89 im Luzerner Tor und war zentral für das drittbeste Gegentorverhältnis der Liga.'
  },
  'Herbert Baumann': {
    birth:'16.09.1964',
    from:'FC LITTAU / FC EMMENBRÜCKE',
    pos:'LINKER VERTEIDIGER',
    height:'170',
    profile:'Defensivspieler der Meistermannschaft. Kein Torhüter, sondern linker Verteidiger mit hoher taktischer Disziplin.'
  },
  'Martin Müller': {
    birth:'28.01.1957',
    from:'GRASSHOPPER CLUB',
    pos:'MITTELFELD',
    height:'178',
    profile:'Erfahrener Spielmacher des FCL. Köpfte am 27.05.1989 gegen GC den enorm wichtigen 1:0-Siegtreffer.'
  },
  'Roger Wehrli': {
    birth:'18.03.1956',
    from:'GRASSHOPPER CLUB',
    pos:'LIBERO / VERTEIDIGER',
    height:'176',
    profile:'Captain der Meistermannschaft und defensiver Organisator. Brachte internationale Routine und Führungsstärke ins Team.'
  },
  'Hanspeter Burri': {
    birth:'11.05.1961',
    from:'FCL EIGENGEWÄCHS',
    pos:'ABWEHR / MITTELFELD',
    height:'177',
    profile:'Vielseitiger Spieler mit grossem Laufpensum. Erzielte unter anderem den Führungstreffer am ersten Spieltag gegen St.Gallen.'
  },
  'Paul Friberg': {
    birth:'13.04.1963',
    from:'AUFSTEIGER',
    pos:'MITTELFELD',
    height:'179',
    profile:'Joker und Allrounder. Traf unter anderem beim wichtigen 2:0-Auswärtssieg in Bern gegen YB.'
  },
  'Urs Birrer': {
    birth:'15.01.1961',
    from:'LUGANO',
    pos:'VERTEIDIGER',
    height:'178',
    profile:'Solider Defensivspieler mit dem 2:1-Siegtreffer in der Finalrunde gegen YB.'
  },
  'Urs Schönenberger': {
    birth:'10.02.1960',
    from:'ST.GALLEN',
    pos:'MITTELFELD',
    height:'176',
    profile:'Zuverlässiger und arbeitsstarker Spieler im Rausch-System. Traf unter anderem in Bern zum 1:1 gegen YB in der Finalrunde.'
  },
};

const MATCH_DETAILS = {
  'Luzern-St.Gallen-3-2': {
    date:'23.07.1988',
    venue:'ALLMEND, LUZERN',
    attendance:'8 400',
    ref:'ROLAND BIANCHI (MESSEN)',
    home:'FC LUZERN',
    away:'FC ST.GALLEN',
    timeline:[
      { m:'53', team:'a', ev:'⚽', p:'Braschler', note:'Kopfball' },
      { m:'61', team:'h', ev:'⚽', p:'Gretarsson' },
      { m:'63', team:'h', ev:'⚽', p:'Burri' },
      { m:'70', team:'h', ev:'⚽', p:'Mohr' },
      { m:'90', team:'a', ev:'⚽', p:'Piserchia' },
    ],
    fcl:['Roger Tschudin', 'Wehrli', 'Marini', 'Kaufmann', 'Birrer', 'M.Müller', 'Mohr', 'Burri', 'Schönenberger', 'Gretarsson', 'Nadig']
  },
  'Luzern-Grasshopper-2-0': {
    date:'30.07.1988',
    venue:'ALLMEND, LUZERN',
    attendance:'14 200',
    ref:'BRUNO GALLER (KIRCHBERG)',
    home:'FC LUZERN',
    away:'GRASSHOPPER CLUB ZÜRICH',
    timeline:[
      { m:'5',  team:'h', ev:'⚽', p:'Burri', note:'Kopfball nach Ecke' },
      { m:'81', team:'h', ev:'⚽', p:'Gretarsson' },
    ],
    fcl:['Roger Tschudin', 'Wehrli', 'Marini', 'Kaufmann', 'Birrer', 'M.Müller', 'Mohr', 'Burri', 'Schönenberger', 'Gretarsson', 'Nadig']
  },
  'Luzern-Servette-1-0': {
    date:'10.06.1989',
    venue:'ALLMEND, LUZERN',
    attendance:'26 000',
    ref:'PHILIPPE MERCIER (PULLY)',
    home:'FC LUZERN',
    away:'SERVETTE FC GENÈVE',
    note:'MEISTERMATCH',
    timeline:[
      { m:'61', team:'h', ev:'⚽', p:'Mohr', note:'DAS MEISTERTOR' },
    ],
    fcl:['Roger Tschudin', 'Wehrli', 'Marini', 'Kaufmann', 'Schönenberger', 'Burri', 'M.Müller', 'Mohr', 'Baumann', 'Gretarsson', 'Nadig']
  },
  'Luzern-Grasshopper-1-0': {
    date:'27.05.1989',
    venue:'ALLMEND, LUZERN',
    attendance:'22 400',
    ref:'URS MEIER (WÜRENLOS)',
    home:'FC LUZERN',
    away:'GRASSHOPPER CLUB ZÜRICH',
    timeline:[
      { m:'82', team:'h', ev:'⚽', p:'M.Müller', note:'Kopfball · Vorlage Mohr' },
    ],
    fcl:['Roger Tschudin', 'Wehrli', 'Birrer', 'Marini', 'Kaufmann', 'M.Müller', 'Mohr', 'Schönenberger', 'Baumann', 'Gretarsson', 'Nadig']
  },
  'Young Boys-Luzern-1-2': {
    date:'18.03.1989',
    venue:'WANKDORF, BERN',
    attendance:'18 500',
    ref:'KURT RÖTHLISBERGER (SUHR)',
    home:'BSC YOUNG BOYS',
    away:'FC LUZERN',
    timeline:[
      { m:'12', team:'h', ev:'⚽', p:'Közle' },
      { m:'51', team:'a', ev:'⚽', p:'Schönenberger' },
      { m:'76', team:'a', ev:'⚽', p:'Birrer', note:'Weitschuss aus 22 m' },
    ],
    fcl:['Roger Tschudin', 'Wehrli', 'Marini', 'Kaufmann', 'Birrer', 'M.Müller', 'Mohr', 'Burri', 'Schönenberger', 'Gretarsson', 'Nadig']
  },
};

window.SIEHE_DATA = {
  QP_STANDINGS,
  FG_STANDINGS,
  CT_QP_TEXT,
  CT_FG_TEXT,
  MATCHES_QP,
  MATCHES_FG,
  SCORERS,
  SCORERS_FG,
  SQUAD,
  TICKER,
  TIMELINE,
  PORTRAIT,
  PLAYER_BIO,
  MATCH_DETAILS
};
