const KEY = "oc-archive-local-prototype-v5";
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const uid = (p) => `${p}_${Math.random().toString(36).slice(2, 9)}`;
const icon = (name) => `<span class="text-icon" aria-hidden="true">${name}</span>`;

const img = {
  city: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=80",
  forest: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80",
  castle: "https://images.unsplash.com/photo-1520637836862-4d197d17c95a?auto=format&fit=crop&w=1200&q=80",
  portrait1: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
  portrait2: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
  portrait3: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
  portrait4: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  map: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
};

const seed = {
  users: [{ id: "u_nova", username: "Nova", role: "user" }, { id: "u_admin", username: "admin", role: "admin" }],
  currentUserId: "u_nova",
  adminPassword: "hos5555",
  supabase: {
    url: "",
    publishableKey: "sb_publishable_3s8S0xRgjWdCqDF_MpP19g_6kl1nlQp",
    status: "Needs project URL",
    lastChecked: ""
  },
  worlds: [
    { id: "w_neo", name: "Neo-Veridia", genre: "Sci-Fi", status: "Active", accent: "#e64394", image: img.city, description: "A sprawling metropolis run by warring corporate syndicates and rogue AI constructs." },
    { id: "w_eldo", name: "Eldoria", genre: "High Fantasy", status: "Draft", accent: "#6063ee", image: img.forest, description: "An ancient realm fractured by wild magic and forgotten gods slumbering beneath the earth." },
    { id: "w_aeth", name: "Aethelgard", genre: "Mythic Court", status: "Active", accent: "#0f9f88", image: img.castle, description: "A high-fantasy realm recovering from the First Sundering, where artifacts are surfacing again." }
  ],
  characters: [
    { id: "c_kael", worldIds: ["w_neo"], name: "Kaelen Vance", age: "26", gender: "Male", role: "Freelance Information Broker", status: "Active", bio: "Born in the lower sectors of Neo-Veridia, Kaelen learned that information was the only currency that truly mattered.", personality: "Pragmatic, observant, sarcastic under pressure, and protective of the few people he trusts.", tags: ["Chaotic Neutral", "Tech-Savvy", "Cynical", "Hacker"], likes: ["Black coffee", "Vintage hardware", "Rain noise"], dislikes: ["Corporate suits", "Bright lights", "Small talk"], image: img.portrait2, stats: { Intelligence: 92, Agility: 75, Endurance: 54, Strength: 46, Charisma: 58, Perception: 86 } },
    { id: "c_aria", worldIds: ["w_eldo", "w_aeth"], name: "Aria Solis", age: "23", gender: "Female", role: "Relic Cartographer", status: "Alive", bio: "A mapmaker of forbidden ley routes who can read the residue left behind by old portals.", personality: "Gentle in ordinary moments, relentless when a mystery catches fire, and terrible at admitting fear.", tags: ["Cartographer", "Empath", "Relic-Bound"], likes: ["Tea roses", "Old vellum", "Sunlit ruins"], dislikes: ["Closed borders", "Empty promises"], image: img.portrait1, stats: { Intelligence: 84, Agility: 68, Endurance: 61, Strength: 39, Charisma: 82, Perception: 91 } },
    { id: "c_elara", worldIds: ["w_eldo"], name: "Elara Vance", age: "31", gender: "Female", role: "Captain of the Silver Vanguard", status: "Alive", bio: "A decorated knight bound to a cursed blade after the western gate fell during the First Sundering.", personality: "Disciplined, dryly funny, duty-first, and privately exhausted by the price of command.", tags: ["Protagonist", "Knight", "Cursed Blade"], likes: ["Dawn patrols", "Honest steel"], dislikes: ["Cowardice", "Court politics"], image: img.portrait3, stats: { Intelligence: 70, Agility: 62, Endurance: 88, Strength: 86, Charisma: 64, Perception: 66 } },
    { id: "c_thorne", worldIds: ["w_aeth", "w_eldo"], name: "Thorne", age: "54", gender: "Male", role: "Exiled Archmage", status: "Missing", bio: "Once the Iron Concord's brightest theoretician, Thorne vanished after exposing a sealed prophecy.", personality: "Patient, haunted, precise, and unexpectedly tender with apprentices.", tags: ["Mentor", "Mage", "Exile"], likes: ["Ink stones", "Locked libraries"], dislikes: ["Public trials", "Silver bells"], image: img.portrait4, stats: { Intelligence: 96, Agility: 38, Endurance: 49, Strength: 31, Charisma: 72, Perception: 89 } }
  ],
  relationships: [
    { id: "r_1", worldId: "w_eldo", from: "c_aria", to: "c_thorne", type: "Family", subtype: "Former Mentor", label: "Complicated", color: "#6063ee", direction: "forward", notes: "Aria still blames Thorne for the Spire incident, though she relies on his research network." },
    { id: "r_2", worldId: "w_eldo", from: "c_elara", to: "c_aria", type: "Social", subtype: "Protective Alliance", label: "Keeps Watch", color: "#0f9f88", direction: "both", notes: "Elara distrusts Aria's relic work, but keeps her alive because the maps matter." },
    { id: "r_3", worldId: "w_neo", from: "c_kael", to: "c_aria", type: "Romantic", subtype: "Long-Distance", label: "Unsent Letters", color: "#e64394", direction: "none", notes: "Two versions of the same city keep showing up in their dreams." }
  ],
  graphPositions: { w_eldo: { c_aria: { x: 470, y: 285 }, c_thorne: { x: 760, y: 185 }, c_elara: { x: 240, y: 250 } }, w_neo: { c_kael: { x: 350, y: 260 }, c_aria: { x: 660, y: 330 } }, w_aeth: { c_aria: { x: 390, y: 260 }, c_thorne: { x: 640, y: 240 } } },
  familyTrees: { w_eldo: { nodes: [{ id: "f_arthur", name: "Arthur Vancleef", title: "Patriarch", characterId: "", x: 420, y: 60 }, { id: "f_eleanor", name: "Eleanor Vancleef", title: "Matriarch", characterId: "", x: 610, y: 60 }, { id: "f_elara", name: "Elara Vance", title: "Granddaughter", characterId: "c_elara", x: 350, y: 280 }, { id: "f_aria", name: "Aria Solis", title: "Ward", characterId: "c_aria", x: 570, y: 280 }], links: [{ from: "f_arthur", to: "f_eleanor", kind: "spouse" }, { from: "f_arthur", to: "f_elara", kind: "parent" }, { from: "f_eleanor", to: "f_aria", kind: "guardian" }] } },
  maps: [{ id: "m_1", worldId: "w_eldo", title: "Old Borderlands", image: img.map, notes: "Trade road annotations and sealed ruin markers." }],
  announcements: [{ id: "a_1", title: "Gnome Jokes", body: "A Gnome Joke a Day Keeps Boerdom Away!", pinned: true, createdAt: "2026-04-25" }]
};

let state = load();
hydrateState();
let relFilter = "All";
let selectedRel = null;
let fountainRoll = null;

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || structuredClone(seed); } catch { return structuredClone(seed); }
}
function save() { localStorage.setItem(KEY, JSON.stringify(state)); }
function hydrateState() {
  state.supabase ||= structuredClone(seed.supabase);
  state.supabase.publishableKey ||= seed.supabase.publishableKey;
  state.supabase.status ||= state.supabase.url ? "Saved locally" : "Needs project URL";
  state.supabase.lastChecked ||= "";
  const defaultAnnouncement = state.announcements?.find((a) => a.id === "a_1");
  if (defaultAnnouncement) {
    if (defaultAnnouncement.title === "System Update V2.4") defaultAnnouncement.title = "Gnome Jokes";
    if (defaultAnnouncement.body === "New relationship graph rendering tools are live. Try the Relationship Map inside a world.") {
      defaultAnnouncement.body = "A Gnome Joke a Day Keeps Boerdom Away!";
    }
  }
  save();
}
function route() { return location.hash.replace(/^#/, "") || "/"; }
function nav(to) { location.hash = to; render(); }
function user() { return state.users.find((u) => u.id === state.currentUserId) || state.users[0]; }
function isAdmin() { return user().role === "admin"; }
function world(id) { return state.worlds.find((w) => w.id === id) || state.worlds[0]; }
function character(id) { return state.characters.find((c) => c.id === id); }

function render() {
  const root = $("#root");
  const r = route();
  const noShell = r === "/admin-login";
  root.innerHTML = `${noShell ? "" : sidebar(r)}${noShell ? "" : topbar()}<main class="${noShell ? "auth-main" : "main-shell"}">${page(r)}</main><div id="modal"></div>`;
  bind();
}

function sidebar(r) {
  const activeWorld = (r.match(/^\/world\/([^/]+)/) || [])[1];
  return `<aside class="sidebar">
    <button class="brand" data-nav="/"><span class="brand-mark">${icon("◇")}</span><span><strong>Creator Workspace</strong><small>Refined Utility</small></span></button>
    <nav class="nav-list">
      ${navButton("/", "⌂", "Home", r === "/")}
      ${navButton("/characters", "◎", "Global Characters", r === "/characters")}
      <div class="nav-group-title">Worlds</div>
      ${state.worlds.map((w) => `<button class="nav-world ${activeWorld === w.id ? "active" : ""}" data-nav="/world/${w.id}/characters"><span style="background:${w.accent}"></span>${w.name}</button>`).join("")}
      ${isAdmin() ? navButton("/admin", "▣", "Admin", r === "/admin") : ""}
    </nav>
    <button class="primary-action" data-modal="character">${icon("+")}Add New Character</button>
  </aside>`;
}
function navButton(to, i, label, active) { return `<button class="nav-button ${active ? "active" : ""}" data-nav="${to}">${icon(i)}${label}</button>`; }
function topbar() {
  return `<header class="topbar"><div class="topbar-left"><strong>OC Archive</strong><label class="search-box">${icon("⌕")}<input placeholder="Search archive..."></label></div>
    <div class="topbar-actions"><button class="icon-button" data-nav="/settings" aria-label="Settings">${icon("⚙")}</button>
    ${isAdmin() ? `<button class="ghost-button compact" id="logoutAdmin">${icon("⇥")}Admin logout</button>` : `<button class="ghost-button compact" data-nav="/admin-login">${icon("▣")}Admin</button>`}
    <button class="fountain-button" id="fountainRoll" aria-label="Fun Fountain Dew Roll" title="Fun Fountain Dew Roll">⛲</button>
    ${fountainRoll ? fountainPopup() : ""}</div></header>`;
}

function page(r) {
  if (r === "/characters") return charactersPage();
  if (r === "/settings") return settingsPage();
  if (r === "/admin-login") return loginPage();
  if (r === "/admin") return isAdmin() ? adminPage() : loginPage();
  const m = r.match(/^\/world\/([^/]+)(?:\/([^/]+))?/);
  if (m) return worldPage(world(m[1]), m[2] || "characters");
  return homePage();
}

function homePage() {
  const pinned = state.announcements.filter((a) => a.pinned);
  return `<section class="page-stack">
    ${pinned.map((a) => `<div class="announcement"><span class="announcement-icon">${icon("!")}</span><div><strong>${esc(a.title)}</strong><p>${esc(a.body)}</p></div></div>`).join("")}
    <div class="page-heading row-between"><div><h1>Hello, CREATOR ${esc(user().username)}</h1><p>Here is an overview of your archival database.</p></div><button class="ghost-button" data-nav="/characters">${icon("◎")}Global Characters ${icon("›")}</button></div>
    <div class="world-grid">${state.worlds.map(worldCard).join("")}<button class="create-card" data-modal="world">${icon("+")}<strong>Initialize Hub</strong><span>Create a new world sandbox for upcoming characters.</span></button></div>
  </section>`;
}
function worldCard(w) {
  const count = state.characters.filter((c) => c.worldIds.includes(w.id)).length;
  return `<article class="world-card" data-nav="/world/${w.id}/characters"><div class="accent-line" style="background:${w.accent}"></div><div class="world-image"><img src="${w.image}" alt=""><span class="chip glass" style="--chip-color:${w.accent}">${esc(w.genre)}</span></div><div class="world-body"><h3>${esc(w.name)}</h3><p>${esc(w.description)}</p><dl><div><dt>Characters</dt><dd>${count}</dd></div><div><dt>Status</dt><dd>${esc(w.status)}</dd></div></dl></div></article>`;
}

function charactersPage(list = state.characters) {
  return `<section class="page-stack"><div class="page-heading row-between"><div><h1>Global Characters</h1><p>Create, edit, and move characters across worlds.</p></div><button class="primary-button" data-modal="character">${icon("+")}Add Character</button></div><div class="character-grid">${list.map(characterCard).join("")}</div></section>`;
}
function characterCard(c) {
  const w = state.worlds.find((x) => c.worldIds.includes(x.id));
  return `<article class="character-card"><div class="portrait"><img src="${c.image}" alt=""><span class="badge">${esc(c.status)}</span></div><div class="character-body"><h3>${esc(c.name)}</h3><p>${esc(c.role)}</p><div class="card-footer"><span style="color:${w?.accent || "#4648d4"}">${esc(w?.name || "Unassigned")}</span><button class="icon-button small" data-modal="character:${c.id}">${icon("✎")}</button></div></div></article>`;
}

function worldPage(w, tab) {
  const chars = state.characters.filter((c) => c.worldIds.includes(w.id));
  return `<section class="page-stack"><div class="world-hero"><img src="${w.image}" alt=""><div><span class="status-pill" style="--accent:${w.accent}">${esc(w.status)} Setting</span><h1>${esc(w.name)}</h1><p>${esc(w.description)}</p><button class="ghost-button invert" data-modal="world:${w.id}">${icon("✎")}Edit World</button></div></div>
    <div class="tabs">${tabBtn(w.id, "characters", "◎", "Characters", tab)}${tabBtn(w.id, "relationships", "⌘", "Relationship Map", tab)}${tabBtn(w.id, "family", "♢", "Family Tree", tab)}${tabBtn(w.id, "maps", "▧", "Uploaded Maps", tab)}</div>
    ${tab === "relationships" ? relationshipPage(w) : tab === "family" ? familyPage(w) : tab === "maps" ? mapsPage(w) : `<section class="page-stack"><div class="row-between"><span class="muted">${chars.length} Characters in ${esc(w.name)}</span><div class="button-row"><button class="ghost-button" data-modal="move:${w.id}">${icon("↧")}Move Into World</button><button class="primary-button" data-modal="character:new:${w.id}">${icon("+")}Add New</button></div></div><div class="character-grid">${chars.map(profileCard).join("")}</div></section>`}
  </section>`;
}
function tabBtn(id, key, i, label, active) { return `<button class="${active === key ? "active" : ""}" data-nav="/world/${id}/${key}">${icon(i)}${label}</button>`; }
function profileCard(c) {
  return `<article class="profile-card"><div class="profile-image"><img src="${c.image}" alt=""><label class="portrait-upload">${icon("⇧")}Upload Portrait<input type="file" accept="image/*" data-upload-portrait="${c.id}"></label></div><div class="profile-content"><div class="row-between"><div><h3>${esc(c.name)}</h3><p>${esc(c.role)}</p></div><button class="icon-button small" data-modal="character:${c.id}">${icon("✎")}</button></div><p>${esc(c.bio)}</p><div class="tag-row">${c.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>${radar(c)}</div></article>`;
}
function radar(c) {
  const entries = Object.entries(c.stats || {});
  const rows = entries.map(([k, v]) => `<span>${esc(k)}: <strong>${v}</strong></span>`).join("");
  return `<div class="radar"><svg viewBox="0 0 190 190"><polygon points="95,20 160,57 160,132 95,170 30,132 30,57" fill="none" stroke="#d4d4d8"></polygon><polygon points="${entries.map(([, v], i) => { const a = -Math.PI/2 + Math.PI*2*i/entries.length; return `${95 + Math.cos(a)*65*v/100},${95 + Math.sin(a)*65*v/100}`; }).join(" ")}" fill="#6063ee33" stroke="#6063ee" stroke-width="3"></polygon></svg><div>${rows}</div></div>`;
}

function relationshipPage(w) {
  const chars = state.characters.filter((c) => c.worldIds.includes(w.id));
  const rels = state.relationships.filter((r) => r.worldId === w.id && (relFilter === "All" || r.type === relFilter));
  const pos = state.graphPositions[w.id] || {};
  const svg = rels.map((r, idx) => {
    const a = pos[r.from] || { x: 220 + idx * 80, y: 200 };
    const b = pos[r.to] || { x: 620, y: 260 + idx * 50 };
    return `<g data-rel="${r.id}" class="${selectedRel === r.id ? "selected-link" : ""}"><path d="M ${a.x} ${a.y} C ${(a.x+b.x)/2} ${a.y-80-idx*18}, ${(a.x+b.x)/2} ${b.y+80+idx*18}, ${b.x} ${b.y}" fill="none" stroke="${r.color}" stroke-width="${selectedRel === r.id ? 4 : 2.5}"></path><text x="${(a.x+b.x)/2}" y="${(a.y+b.y)/2 - 12 - idx*8}" text-anchor="middle">${esc(r.label)}</text></g>`;
  }).join("");
  const nodes = chars.map((c, i) => {
    const p = pos[c.id] || { x: 200 + i * 180, y: 220 + (i % 2) * 120 };
    return `<g class="graph-node" data-node="${c.id}" transform="translate(${p.x} ${p.y})"><circle r="38" fill="white" stroke="${w.accent}" stroke-width="3"></circle><image href="${c.image}" x="-31" y="-31" width="62" height="62" clip-path="circle(31px)"></image><circle cx="28" cy="28" r="9" fill="${w.accent}" stroke="white" stroke-width="3"></circle><rect x="-58" y="48" width="116" height="28" rx="9" fill="rgba(255,255,255,.9)" stroke="#d4d4d8"></rect><text y="67" text-anchor="middle">${esc(c.name)}</text></g>`;
  }).join("");
  const rel = state.relationships.find((r) => r.id === selectedRel) || state.relationships.find((r) => r.worldId === w.id);
  return `<section class="graph-shell"><div class="graph-canvas"><div class="floating-filter">${["All","Family","Romantic","Social"].map((f) => `<button class="${relFilter === f ? "active" : ""}" data-filter="${f}">${f}</button>`).join("")}</div><div class="zoom-controls"><button>${icon("+")}</button><button>${icon("−")}</button><button>${icon("□")}</button></div><svg class="relationship-svg" viewBox="0 0 1000 560">${svg}${nodes}</svg></div><aside class="side-editor"><div class="editor-header"><h2>Connection Setup</h2><button class="icon-button small" data-add-rel="${w.id}">${icon("+")}</button></div>${relEditor(w, rel, chars)}</aside></section>`;
}
function relEditor(w, rel, chars) {
  if (!rel) return `<div class="empty-state"><p>Create at least two characters, then add a relationship.</p></div>`;
  return `<div class="form-stack" data-rel-form="${rel.id}">
    ${select("From Character", "from", rel.from, chars.map((c) => [c.id, c.name]))}
    ${select("To Character", "to", rel.to, chars.map((c) => [c.id, c.name]))}
    ${select("Primary Category", "type", rel.type, ["Family","Romantic","Social","Antagonistic","Professional"].map((x) => [x,x]))}
    ${field("Specific Label", "subtype", rel.subtype)}${field("Visible Label", "label", rel.label)}
    <label class="field color-field"><span>Custom Color</span><input name="color" type="color" value="${rel.color}"></label>
    ${select("Direction", "direction", rel.direction, ["none","forward","both"].map((x) => [x,x]))}
    <label class="field full-span"><span>Story Notes</span><textarea name="notes" rows="4">${esc(rel.notes)}</textarea></label>
    <button class="primary-button full" data-save-rel="${rel.id}">${icon("✓")}Save Changes</button>
    <button class="danger-button full" data-delete-rel="${rel.id}">${icon("×")}Remove Connection</button>
  </div>`;
}

function familyPage(w) {
  const tree = state.familyTrees[w.id] || { nodes: [], links: [] };
  const paths = tree.links.map((l) => { const a = tree.nodes.find((n) => n.id === l.from), b = tree.nodes.find((n) => n.id === l.to); if (!a || !b) return ""; return l.kind === "spouse" ? `<path d="M ${a.x+80} ${a.y+50} L ${b.x-80} ${b.y+50}" fill="none" stroke="${w.accent}" stroke-width="2.5"></path>` : `<path d="M ${a.x} ${a.y+100} L ${a.x} ${(a.y+b.y)/2} L ${b.x} ${(a.y+b.y)/2} L ${b.x} ${b.y}" fill="none" stroke="#a1a1aa" stroke-width="2.5"></path>`; }).join("");
  const nodes = tree.nodes.map((n) => { const c = character(n.characterId); return `<g class="tree-node" data-family="${w.id}:${n.id}" transform="translate(${n.x-90} ${n.y})"><rect width="180" height="112" rx="14" fill="white" stroke="${n.characterId ? w.accent : "#d4d4d8"}"></rect>${c ? `<image href="${c.image}" x="60" y="12" width="60" height="60" clip-path="circle(30px)"></image>` : `<circle cx="90" cy="42" r="30" fill="#f4f4f5"></circle>`}<text x="90" y="88" text-anchor="middle">${esc(n.name)}</text><text x="90" y="104" text-anchor="middle" class="muted-svg">${esc(n.title)}</text></g>`; }).join("");
  return `<section class="family-canvas"><div class="tree-toolbar"><button>${icon("+")}</button><span>100%</span><button>${icon("−")}</button><button class="primary-button compact" data-add-family="${w.id}">${icon("+")}Add Relative</button></div><svg class="tree-svg" viewBox="0 0 1000 650">${paths}${nodes}</svg></section>`;
}

function mapsPage(w) {
  const maps = state.maps.filter((m) => m.worldId === w.id);
  return `<section class="page-stack"><label class="upload-zone">${icon("⇧")}<strong>Upload Map</strong><span>Images are stored locally in your browser.</span><input type="file" accept="image/*" data-upload-map="${w.id}"></label><div class="map-grid">${maps.map((m) => `<article class="map-card"><img src="${m.image}" alt=""><div><h3>${esc(m.title)}</h3><p>${esc(m.notes)}</p><button class="danger-button compact" data-delete-map="${m.id}">${icon("×")}Delete</button></div></article>`).join("")}</div></section>`;
}

function loginPage() {
  return `<section class="login-wrap"><button class="back-link" data-nav="/">${icon("‹")}Back to Home</button><form class="login-card" id="loginForm"><span class="login-icon">${icon("▣")}</span><h1>Archivist</h1><p>Secure Workspace Access</p>${field("Username", "username", "admin")}${field("Password", "password", "", "password")}<p class="form-error" id="loginError" hidden></p><button class="primary-button full">${icon("⇢")}Admin Login</button></form></section>`;
}

function settingsPage() {
  const supabase = state.supabase || seed.supabase;
  return `<section class="page-stack"><div class="page-heading"><h1>Settings</h1><p>Adjust local workspace preferences and review how this prototype stores data.</p></div><div class="admin-grid"><section class="panel"><h2>${icon("⚙")}Workspace</h2><div class="settings-list"><div><strong>Current creator</strong><span>${esc(user().username)}</span></div><div><strong>Storage mode</strong><span>Local browser storage with optional Supabase connection</span></div><div><strong>Admin area</strong><span>${isAdmin() ? "Unlocked" : "Locked behind admin login"}</span></div></div></section><section class="panel"><h2>${icon("⛲")}Fun Fountain Dew Roll</h2><p>Use the fountain button in the top bar to roll a d4 any time.</p><button class="primary-button" id="settingsRoll">${icon("⛲")}Roll d4</button></section><section class="panel wide"><h2>${icon("⇄")}Archive Transfer</h2><p>Download every local change as a JSON file, then upload that file in another browser to restore the same worlds, characters, maps, relationships, family trees, announcements, and settings.</p><div class="transfer-actions"><button class="primary-button" id="downloadArchive">${icon("⇩")}Download JSON Backup</button><label class="ghost-button file-button">${icon("⇧")}Upload JSON Backup<input type="file" accept="application/json,.json" id="uploadArchive"></label></div><p class="setting-note">Backups include local admin settings and connection settings, so share them only with people who should have the full archive.</p></section><section class="panel wide"><h2>${icon("◇")}Supabase Connection</h2><p>Connect this local prototype to your Supabase project by adding the project URL. The publishable key is already saved locally.</p><div class="form-stack supabase-form" id="supabaseForm">${field("Project URL", "supabaseUrl", supabase.url || "")}${field("Publishable API Key", "supabaseKey", supabase.publishableKey || seed.supabase.publishableKey)}<div class="connection-status ${supabase.status === "Connected" ? "is-connected" : ""}"><strong>Status</strong><span>${esc(supabase.status || "Not connected")}</span>${supabase.lastChecked ? `<small>Last checked ${esc(supabase.lastChecked)}</small>` : ""}</div><div class="button-row"><button class="primary-button" id="saveSupabase">${icon("✓")}Save Connection</button><button class="ghost-button" id="testSupabase">${icon("⇢")}Test Connection</button></div></div></section><section class="panel danger-panel"><h2>${icon("!")}Local Data</h2><p>Resetting returns the app to the seeded demo data.</p><button class="danger-button" id="resetDemo">${icon("×")}Reset Local Demo</button></section></div></section>`;
}

function fountainPopup() {
  const lines = {
    1: "Roll a Constitution Saving Throw!",
    2: "You are Silenced!",
    3: "YOU CHANGE SEX!",
    4: "You Gain Temperary HP!"
  };
  return `<div class="fountain-popover"><div class="fountain-heading">Fun Fountain Dew Roll, roll d4!</div><p>your reselt: <strong>${fountainRoll}</strong></p><p class="fountain-result">${lines[fountainRoll]}</p><div class="button-row"><button class="primary-button compact" id="rollAgain">${icon("⛲")}Roll again</button><button class="ghost-button compact" id="closeFountain">Close</button></div></div>`;
}

function adminPage() {
  const rows = [...state.characters.map((c) => ({ id: c.id, type: "Character", name: c.name })), ...state.worlds.map((w) => ({ id: w.id, type: "World", name: w.name }))];
  return `<section class="page-stack"><div class="page-heading row-between"><div><h1>System Administration</h1><p>Manage global content, broadcast announcements, and protect admin access.</p></div></div><div class="admin-grid"><section class="panel wide"><div class="row-between panel-header"><div><h2>${icon("▣")}Bulk Content Management</h2><p>Select entities to apply batch operations.</p></div><button class="danger-button" id="massDelete">${icon("×")}Mass Delete</button></div><div class="table-wrap"><table><thead><tr><th></th><th>ID</th><th>Entity Name</th><th>Type</th><th>Author</th></tr></thead><tbody>${rows.map((r) => `<tr><td><input type="checkbox" class="bulk" value="${r.id}"></td><td>${r.id}</td><td>${esc(r.name)}</td><td><span class="tag">${r.type}</span></td><td>@user_nova</td></tr>`).join("")}</tbody></table></div></section><section class="panel"><h2>${icon("!")}Global Announcement</h2><div class="form-stack">${field("Announcement Title","annTitle","")}<label class="field"><span>Message Body</span><textarea name="annBody" rows="4"></textarea></label><label class="check-line"><input name="annPinned" type="checkbox" checked>Pin to top of Dashboard</label><button class="primary-button" id="publishAnn">${icon("✓")}Publish</button></div></section><section class="panel"><h2>${icon("⚿")}Security Settings</h2><div class="form-stack">${field("Current Password","current","","password")}${field("New Password","next","","password")}${field("Confirm New Password","confirm","","password")}<button class="ghost-button full" id="changePass">${icon("✓")}Update Password</button></div></section><section class="panel danger-panel"><h2>${icon("!")}Danger Zone</h2><p>Actions below are destructive and ask for confirmation.</p><button class="danger-button" id="resetDemo">${icon("×")}Reset Local Demo</button></section></div></section>`;
}

function field(label, name, value = "", type = "text") {
  return `<label class="field"><span>${label}</span><input name="${name}" type="${type}" value="${esc(value)}"></label>`;
}
function select(label, name, value, options) {
  return `<label class="field"><span>${label}</span><select name="${name}">${options.map(([v, l]) => `<option value="${v}" ${v === value ? "selected" : ""}>${esc(l)}</option>`).join("")}</select></label>`;
}

function bind() {
  $$("[data-nav]").forEach((el) => el.addEventListener("click", () => nav(el.dataset.nav)));
  $$("[data-modal]").forEach((el) => el.addEventListener("click", () => openModal(el.dataset.modal)));
  $("#logoutAdmin")?.addEventListener("click", () => { state.currentUserId = "u_nova"; save(); nav("/"); });
  $("#fountainRoll")?.addEventListener("click", rollFountain);
  $("#rollAgain")?.addEventListener("click", rollFountain);
  $("#settingsRoll")?.addEventListener("click", rollFountain);
  $("#closeFountain")?.addEventListener("click", () => { fountainRoll = null; render(); });
  $("#downloadArchive")?.addEventListener("click", downloadArchive);
  $("#uploadArchive")?.addEventListener("change", uploadArchive);
  $("#saveSupabase")?.addEventListener("click", saveSupabaseSettings);
  $("#testSupabase")?.addEventListener("click", testSupabaseConnection);
  $("#loginForm")?.addEventListener("submit", login);
  $$("[data-filter]").forEach((b) => b.addEventListener("click", () => { relFilter = b.dataset.filter; render(); }));
  $$("[data-rel]").forEach((g) => g.addEventListener("click", () => { selectedRel = g.dataset.rel; render(); }));
  $$("[data-save-rel]").forEach((b) => b.addEventListener("click", () => saveRel(b.dataset.saveRel)));
  $$("[data-delete-rel]").forEach((b) => b.addEventListener("click", () => deleteRel(b.dataset.deleteRel)));
  $$("[data-add-rel]").forEach((b) => b.addEventListener("click", () => addRel(b.dataset.addRel)));
  $$("[data-add-family]").forEach((b) => b.addEventListener("click", () => addFamily(b.dataset.addFamily)));
  $$("[data-family]").forEach((n) => n.addEventListener("click", () => openModal(`family:${n.dataset.family}`)));
  $$("[data-upload-map]").forEach((input) => input.addEventListener("change", uploadMap));
  $$("[data-upload-portrait]").forEach((input) => input.addEventListener("change", uploadPortrait));
  $$("[data-file-to-image]").forEach((input) => input.addEventListener("change", fileToImageField));
  $$("[data-delete-map]").forEach((b) => b.addEventListener("click", () => deleteMap(b.dataset.deleteMap)));
  $("#massDelete")?.addEventListener("click", massDelete);
  $("#publishAnn")?.addEventListener("click", publishAnn);
  $("#changePass")?.addEventListener("click", changePass);
  $("#resetDemo")?.addEventListener("click", () => { if (confirm("Reset all local demo data?")) { state = structuredClone(seed); save(); render(); } });
  dragGraphNodes();
}

function rollFountain() {
  fountainRoll = Math.floor(Math.random() * 4) + 1;
  render();
}

function openModal(spec) {
  const modal = $("#modal");
  let html = "";
  const [type, id, extra] = spec.split(":");
  if (type === "world") html = worldForm(id);
  if (type === "character") html = characterForm(id === "new" ? null : id, extra);
  if (type === "move") html = moveForm(id);
  if (type === "family") html = familyForm(id, extra);
  modal.innerHTML = `<div class="modal-backdrop"><div class="modal-card"><div class="modal-header"><h2>${type === "world" ? "World" : type === "family" ? "Family Tree Node" : "Character"}</h2><button class="icon-button" id="closeModal">${icon("×")}</button></div>${html}</div></div>`;
  $("#closeModal").onclick = () => modal.innerHTML = "";
  $("#saveWorld")?.addEventListener("click", saveWorld);
  $("#saveCharacter")?.addEventListener("click", saveCharacter);
  $("#moveCharacter")?.addEventListener("click", moveCharacter);
  $("#saveFamily")?.addEventListener("click", saveFamily);
  $$("[data-file-to-image]", modal).forEach((input) => input.addEventListener("change", fileToImageField));
}
function worldForm(id) {
  const w = state.worlds.find((x) => x.id === id) || { id: uid("w"), name: "", genre: "", status: "Draft", accent: "#6063ee", image: "", description: "" };
  return `<div class="form-stack" data-world-id="${w.id}">${field("World Name","name",w.name)}${field("Genre","genre",w.genre)}${field("Status","status",w.status)}${field("Image URL","image",w.image)}<label class="field color-field"><span>Accent Color</span><input name="accent" type="color" value="${w.accent}"></label><label class="field"><span>Description</span><textarea name="description" rows="4">${esc(w.description)}</textarea></label><button class="primary-button full" id="saveWorld">${icon("✓")}Save World</button></div>`;
}
function characterForm(id, worldId = "") {
  const c = state.characters.find((x) => x.id === id) || { id: uid("c"), worldIds: worldId ? [worldId] : [], name: "", age: "", gender: "", role: "", status: "Active", bio: "", personality: "", tags: [], likes: [], dislikes: [], image: "", stats: { Intelligence: 50, Agility: 50, Endurance: 50, Strength: 50, Charisma: 50, Perception: 50 } };
  return `<div class="form-stack" data-character-id="${c.id}"><div class="modal-grid">${field("Name","name",c.name)}${field("Age","age",c.age)}${field("Gender","gender",c.gender)}${field("Role","role",c.role)}${field("Status","status",c.status)}${field("Image URL","image",c.image)}<label class="field full-span"><span>Upload Portrait</span><input type="file" accept="image/*" data-file-to-image></label>${field("Tags (comma separated)","tags",c.tags.join(", "))}${field("Likes (comma separated)","likes",c.likes.join(", "))}${field("Dislikes (comma separated)","dislikes",c.dislikes.join(", "))}<label class="field full-span"><span>Biography</span><textarea name="bio" rows="4">${esc(c.bio)}</textarea></label><label class="field full-span"><span>Personality</span><textarea name="personality" rows="3">${esc(c.personality)}</textarea></label></div><div class="stat-editor">${Object.entries(c.stats).map(([k,v]) => `<label>${k}<input name="stat-${k}" type="range" min="0" max="100" value="${v}"><span>${v}</span></label>`).join("")}</div><input name="worldIds" type="hidden" value="${c.worldIds.join(",")}"><button class="primary-button full" id="saveCharacter">${icon("✓")}Save Character</button></div>`;
}
function moveForm(worldId) {
  return `<div class="form-stack" data-world-id="${worldId}">${select("Character", "characterId", state.characters[0]?.id || "", state.characters.map((c) => [c.id, c.name]))}<button class="primary-button full" id="moveCharacter">${icon("✓")}Move Character</button></div>`;
}
function familyForm(worldId, nodeId) {
  const n = state.familyTrees[worldId]?.nodes.find((x) => x.id === nodeId) || {};
  return `<div class="form-stack" data-world-id="${worldId}" data-node-id="${nodeId}">${field("Name","name",n.name || "")}${field("Title","title",n.title || "")}${select("Linked Character","characterId",n.characterId || "", [["","No linked character"], ...state.characters.map((c) => [c.id,c.name])])}<button class="primary-button full" id="saveFamily">${icon("✓")}Save Relative</button></div>`;
}

function formData(container) {
  const data = {};
  $$("input, textarea, select", container).forEach((el) => {
    if (!el.name || el.type === "file") return;
    data[el.name] = el.type === "checkbox" ? (el.checked ? "on" : "") : el.value;
  });
  return data;
}
function saveWorld() {
  const box = $("[data-world-id]"), v = formData(box);
  const item = { id: box.dataset.worldId, name: v.name, genre: v.genre, status: v.status, accent: v.accent, image: v.image || img.forest, description: v.description };
  const i = state.worlds.findIndex((w) => w.id === item.id); i >= 0 ? state.worlds[i] = item : state.worlds.push(item);
  save(); $("#modal").innerHTML = ""; render();
}
function saveCharacter() {
  const box = $("[data-character-id]"), v = formData(box);
  const old = state.characters.find((c) => c.id === box.dataset.characterId);
  const stats = {}; Object.keys(seed.characters[0].stats).forEach((k) => stats[k] = Number(v[`stat-${k}`] || 50));
  const item = { id: box.dataset.characterId, worldIds: (v.worldIds || old?.worldIds?.join(",") || "").split(",").filter(Boolean), name: v.name, age: v.age, gender: v.gender, role: v.role, status: v.status, bio: v.bio, personality: v.personality, tags: split(v.tags), likes: split(v.likes), dislikes: split(v.dislikes), image: v.image || img.portrait1, stats };
  const i = state.characters.findIndex((c) => c.id === item.id); i >= 0 ? state.characters[i] = item : state.characters.push(item);
  save(); $("#modal").innerHTML = ""; render();
}
function moveCharacter() {
  const box = $("[data-world-id]"), v = formData(box), c = character(v.characterId);
  if (c && !c.worldIds.includes(box.dataset.worldId)) c.worldIds.push(box.dataset.worldId);
  save(); $("#modal").innerHTML = ""; render();
}
function saveFamily() {
  const box = $("[data-node-id]"), v = formData(box);
  const n = state.familyTrees[box.dataset.worldId]?.nodes.find((x) => x.id === box.dataset.nodeId);
  if (n) Object.assign(n, { name: v.name, title: v.title, characterId: v.characterId });
  save(); $("#modal").innerHTML = ""; render();
}
function saveRel(id) {
  const box = $(`[data-rel-form="${id}"]`), v = formData(box), r = state.relationships.find((x) => x.id === id);
  Object.assign(r, v); save(); render();
}
function deleteRel(id) { if (confirm("Remove this relationship?")) { state.relationships = state.relationships.filter((r) => r.id !== id); selectedRel = null; save(); render(); } }
function addRel(worldId) {
  const chars = state.characters.filter((c) => c.worldIds.includes(worldId)); if (chars.length < 2) return alert("Add at least two characters first.");
  const r = { id: uid("r"), worldId, from: chars[0].id, to: chars[1].id, type: "Social", subtype: "New Link", label: "New Relationship", color: world(worldId).accent, direction: "both", notes: "" };
  state.relationships.push(r); selectedRel = r.id; save(); render();
}
function addFamily(worldId) {
  state.familyTrees[worldId] ||= { nodes: [], links: [] };
  const t = state.familyTrees[worldId], n = { id: uid("f"), name: "New Relative", title: "Draft", characterId: "", x: 500 + t.nodes.length * 25, y: 430 };
  if (t.nodes[0]) t.links.push({ from: t.nodes[0].id, to: n.id, kind: "parent" });
  t.nodes.push(n); save(); render();
}
function uploadMap(e) {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = () => { state.maps.push({ id: uid("m"), worldId: e.target.dataset.uploadMap, title: file.name.replace(/\.[^.]+$/, ""), image: reader.result, notes: "Uploaded world map." }); save(); render(); };
  reader.readAsDataURL(file);
}
function uploadPortrait(e) {
  const file = e.target.files[0], id = e.target.dataset.uploadPortrait;
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const c = character(id);
    if (c) c.image = reader.result;
    save();
    render();
  };
  reader.readAsDataURL(file);
}
function fileToImageField(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const box = e.target.closest("[data-character-id]");
    const imageInput = box?.querySelector("[name=image]");
    if (imageInput) imageInput.value = reader.result;
  };
  reader.readAsDataURL(file);
}
function deleteMap(id) { if (confirm("Delete this uploaded map?")) { state.maps = state.maps.filter((m) => m.id !== id); save(); render(); } }
function login(e) {
  e.preventDefault(); const v = formData(e.target);
  if (v.username.toLowerCase() === "admin" && v.password === state.adminPassword) { state.currentUserId = "u_admin"; save(); nav("/"); }
  else { $("#loginError").hidden = false; $("#loginError").textContent = "That username or password does not match the local admin account."; }
}
function massDelete() {
  const ids = $$(".bulk:checked").map((x) => x.value); if (!ids.length || !confirm(`Delete ${ids.length} selected item(s)? This cannot be undone.`)) return;
  const set = new Set(ids); state.characters = state.characters.filter((c) => !set.has(c.id)); state.worlds = state.worlds.filter((w) => !set.has(w.id)); state.relationships = state.relationships.filter((r) => !set.has(r.from) && !set.has(r.to) && !set.has(r.worldId)); state.maps = state.maps.filter((m) => !set.has(m.worldId)); save(); render();
}
function publishAnn() {
  const title = $("[name=annTitle]").value.trim(), body = $("[name=annBody]").value.trim(); if (!title || !body) return;
  state.announcements.unshift({ id: uid("a"), title, body, pinned: $("[name=annPinned]").checked, createdAt: new Date().toISOString().slice(0, 10) }); save(); render();
}
function changePass() {
  const current = $("[name=current]").value, next = $("[name=next]").value, confirmValue = $("[name=confirm]").value;
  if (current !== state.adminPassword) return alert("Current password is incorrect.");
  if (!next || next !== confirmValue) return alert("New passwords must match.");
  state.adminPassword = next; save(); alert("Admin password changed.");
}
function downloadArchive() {
  const payload = {
    app: "OC Archive",
    version: 1,
    storageKey: KEY,
    exportedAt: new Date().toISOString(),
    state
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `oc-archive-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 500);
}
function uploadArchive(e) {
  const file = e.target.files[0];
  e.target.value = "";
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      const importedState = parsed.state || parsed;
      if (!isValidArchiveState(importedState)) throw new Error("This JSON does not look like an OC Archive backup.");
      if (!confirm("Upload this backup and replace the current local archive?")) return;
      state = importedState;
      hydrateState();
      save();
      render();
      alert("Archive backup uploaded.");
    } catch (error) {
      alert(`Could not upload backup: ${error.message}`);
    }
  };
  reader.readAsText(file);
}
function isValidArchiveState(value) {
  return Boolean(value && Array.isArray(value.users) && Array.isArray(value.worlds) && Array.isArray(value.characters) && Array.isArray(value.relationships) && value.familyTrees && Array.isArray(value.maps) && Array.isArray(value.announcements));
}
function saveSupabaseSettings() {
  const url = normalizeSupabaseUrl($("[name=supabaseUrl]")?.value || "");
  const publishableKey = ($("[name=supabaseKey]")?.value || "").trim();
  state.supabase = {
    ...state.supabase,
    url,
    publishableKey,
    status: url && publishableKey ? "Saved locally" : "Needs project URL",
    lastChecked: ""
  };
  save();
  render();
}
async function testSupabaseConnection() {
  saveSupabaseSettings();
  const { url, publishableKey } = state.supabase;
  if (!url || !publishableKey) {
    state.supabase.status = "Add your Supabase project URL first";
    save();
    render();
    return;
  }
  state.supabase.status = "Testing...";
  save();
  render();
  try {
    const response = await fetch(`${url}/rest/v1/`, {
      headers: {
        apikey: publishableKey,
        Authorization: `Bearer ${publishableKey}`
      }
    });
    state.supabase.status = response.ok ? "Connected" : `Supabase responded ${response.status}`;
  } catch (error) {
    state.supabase.status = `Connection failed: ${error.message}`;
  }
  state.supabase.lastChecked = new Date().toLocaleString();
  save();
  render();
}
function normalizeSupabaseUrl(value) {
  return value.trim().replace(/\/+$/, "");
}
function dragGraphNodes() {
  let target = null, id = "", worldId = (route().match(/^\/world\/([^/]+)/) || [])[1];
  $$(".graph-node").forEach((n) => n.addEventListener("pointerdown", (e) => { target = n; id = n.dataset.node; n.setPointerCapture(e.pointerId); }));
  addEventListener("pointermove", (e) => {
    if (!target || !worldId) return;
    const p = state.graphPositions[worldId][id] || { x: 200, y: 200 };
    p.x = Math.max(70, Math.min(930, p.x + e.movementX)); p.y = Math.max(80, Math.min(500, p.y + e.movementY));
    state.graphPositions[worldId][id] = p; target.setAttribute("transform", `translate(${p.x} ${p.y})`);
  });
  addEventListener("pointerup", () => { if (target) save(); target = null; });
}
function split(s) { return (s || "").split(",").map((x) => x.trim()).filter(Boolean); }
function esc(s = "") { return String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])); }

addEventListener("hashchange", render);
render();
