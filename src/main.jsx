import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AccountTree,
  AlertTriangle,
  ArrowLeft,
  Bell,
  Check,
  ChevronRight,
  CirclePlus,
  Compass,
  Download,
  Edit3,
  Eye,
  EyeOff,
  Fit,
  GalleryHorizontalEnd,
  Heart,
  Home,
  KeyRound,
  Link2,
  LogIn,
  LogOut,
  Map,
  Megaphone,
  Minus,
  Network,
  Palette,
  Plus,
  Save,
  Search,
  Settings,
  Shield,
  Sparkles,
  Swords,
  Trash2,
  Upload,
  User,
  Users,
  X
} from "lucide-react";
import "./styles.css";

const STORAGE_KEY = "oc-archive-local-prototype-v1";

const uid = (prefix) => `${prefix}_${Math.random().toString(36).slice(2, 9)}`;

const sampleImages = {
  city:
    "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=80",
  forest:
    "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80",
  castle:
    "https://images.unsplash.com/photo-1520637836862-4d197d17c95a?auto=format&fit=crop&w=1200&q=80",
  portrait1:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
  portrait2:
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
  portrait3:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
  portrait4:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  map:
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
};

const seedData = {
  users: [
    { id: "u_nova", username: "Nova", role: "user" },
    { id: "u_admin", username: "admin", role: "admin" }
  ],
  currentUserId: "u_nova",
  adminPassword: "hos5555",
  worlds: [
    {
      id: "w_neo",
      name: "Neo-Veridia",
      genre: "Sci-Fi",
      status: "Active",
      accent: "#e64394",
      image: sampleImages.city,
      description:
        "A sprawling metropolis run by warring corporate syndicates and rogue AI constructs."
    },
    {
      id: "w_eldo",
      name: "Eldoria",
      genre: "High Fantasy",
      status: "Draft",
      accent: "#6063ee",
      image: sampleImages.forest,
      description:
        "An ancient realm fractured by wild magic and forgotten gods slumbering beneath the earth."
    },
    {
      id: "w_aeth",
      name: "Aethelgard",
      genre: "Mythic Court",
      status: "Active",
      accent: "#0f9f88",
      image: sampleImages.castle,
      description:
        "A high-fantasy realm recovering from the First Sundering, where artifacts are surfacing again."
    }
  ],
  characters: [
    {
      id: "c_kael",
      worldIds: ["w_neo"],
      name: "Kaelen Vance",
      age: "26",
      gender: "Male",
      role: "Freelance Information Broker",
      status: "Active",
      bio:
        "Born in the lower sectors of Neo-Veridia, Kaelen learned that information was the only currency that truly mattered. He now operates from a mobile server node.",
      personality:
        "Pragmatic, observant, sarcastic under pressure, and fiercely protective of the few people he trusts.",
      tags: ["Chaotic Neutral", "Tech-Savvy", "Cynical", "Hacker"],
      likes: ["Black coffee", "Vintage hardware", "Rain noise", "Solving puzzles"],
      dislikes: ["Corporate suits", "Bright lights", "Small talk", "Unnecessary risks"],
      image: sampleImages.portrait2,
      stats: { Intelligence: 92, Agility: 75, Endurance: 54, Strength: 46, Charisma: 58, Perception: 86 }
    },
    {
      id: "c_aria",
      worldIds: ["w_eldo", "w_aeth"],
      name: "Aria Solis",
      age: "23",
      gender: "Female",
      role: "Relic Cartographer",
      status: "Alive",
      bio:
        "A mapmaker of forbidden ley routes who can read the residue left behind by old portals.",
      personality:
        "Gentle in ordinary moments, relentless when a mystery catches fire, and terrible at admitting fear.",
      tags: ["Cartographer", "Empath", "Relic-Bound"],
      likes: ["Tea roses", "Old vellum", "Sunlit ruins", "Quiet inns"],
      dislikes: ["Closed borders", "Empty promises", "Cold iron", "Being followed"],
      image: sampleImages.portrait1,
      stats: { Intelligence: 84, Agility: 68, Endurance: 61, Strength: 39, Charisma: 82, Perception: 91 }
    },
    {
      id: "c_elara",
      worldIds: ["w_eldo"],
      name: "Elara Vance",
      age: "31",
      gender: "Female",
      role: "Captain of the Silver Vanguard",
      status: "Alive",
      bio:
        "A decorated knight bound to a cursed blade after the western gate fell during the First Sundering.",
      personality:
        "Disciplined, dryly funny, duty-first, and privately exhausted by the price of command.",
      tags: ["Protagonist", "Knight", "Cursed Blade"],
      likes: ["Dawn patrols", "Honest steel", "Spiced bread", "Old ballads"],
      dislikes: ["Cowardice", "Court politics", "Unsealed ruins", "Being pitied"],
      image: sampleImages.portrait3,
      stats: { Intelligence: 70, Agility: 62, Endurance: 88, Strength: 86, Charisma: 64, Perception: 66 }
    },
    {
      id: "c_thorne",
      worldIds: ["w_aeth"],
      name: "Thorne",
      age: "54",
      gender: "Male",
      role: "Exiled Archmage",
      status: "Missing",
      bio:
        "Once the Iron Concord's brightest theoretician, Thorne vanished after exposing a sealed prophecy.",
      personality:
        "Patient, haunted, precise, and unexpectedly tender with apprentices.",
      tags: ["Mentor", "Mage", "Exile"],
      likes: ["Ink stones", "Winter pears", "Locked libraries", "Second chances"],
      dislikes: ["Public trials", "Silver bells", "Wasteful magic", "Oaths made lightly"],
      image: sampleImages.portrait4,
      stats: { Intelligence: 96, Agility: 38, Endurance: 49, Strength: 31, Charisma: 72, Perception: 89 }
    }
  ],
  relationships: [
    {
      id: "r_1",
      worldId: "w_eldo",
      from: "c_aria",
      to: "c_thorne",
      type: "Family",
      subtype: "Former Mentor",
      label: "Complicated",
      color: "#6063ee",
      direction: "forward",
      notes:
        "Aria still blames Thorne for the Spire incident, though she relies on his research network."
    },
    {
      id: "r_2",
      worldId: "w_eldo",
      from: "c_elara",
      to: "c_aria",
      type: "Social",
      subtype: "Protective Alliance",
      label: "Keeps Watch",
      color: "#0f9f88",
      direction: "both",
      notes:
        "Elara distrusts Aria's relic work, but keeps her alive because the maps matter."
    },
    {
      id: "r_3",
      worldId: "w_neo",
      from: "c_kael",
      to: "c_aria",
      type: "Romantic",
      subtype: "Long-Distance",
      label: "Unsent Letters",
      color: "#e64394",
      direction: "none",
      notes:
        "Two versions of the same city keep showing up in their dreams."
    }
  ],
  graphPositions: {
    w_eldo: {
      c_aria: { x: 470, y: 285 },
      c_thorne: { x: 760, y: 185 },
      c_elara: { x: 240, y: 250 }
    },
    w_neo: {
      c_kael: { x: 350, y: 260 },
      c_aria: { x: 660, y: 330 }
    },
    w_aeth: {
      c_aria: { x: 390, y: 260 },
      c_thorne: { x: 640, y: 240 }
    }
  },
  familyTrees: {
    w_eldo: {
      nodes: [
        { id: "f_arthur", characterId: "", name: "Arthur Vancleef", title: "Patriarch", x: 420, y: 60 },
        { id: "f_eleanor", characterId: "", name: "Eleanor Vancleef", title: "Matriarch", x: 610, y: 60 },
        { id: "f_elara", characterId: "c_elara", name: "Elara Vance", title: "Granddaughter", x: 350, y: 280 },
        { id: "f_aria", characterId: "c_aria", name: "Aria Solis", title: "Ward", x: 570, y: 280 }
      ],
      links: [
        { id: "fl_1", from: "f_arthur", to: "f_eleanor", kind: "spouse" },
        { id: "fl_2", from: "f_arthur", to: "f_elara", kind: "parent" },
        { id: "fl_3", from: "f_eleanor", to: "f_aria", kind: "guardian" }
      ]
    }
  },
  maps: [
    {
      id: "m_1",
      worldId: "w_eldo",
      title: "Old Borderlands",
      image: sampleImages.map,
      notes: "Trade road annotations and sealed ruin markers."
    }
  ],
  announcements: [
    {
      id: "a_1",
      title: "System Update V2.4",
      body: "New relationship graph rendering tools are live. Try the Relationship Map inside a world.",
      pinned: true,
      createdAt: "2026-04-25"
    }
  ]
};

function useLocalArchive() {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : seedData;
    } catch {
      return seedData;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const update = (recipe) => {
    setData((current) => {
      const copy = structuredClone(current);
      recipe(copy);
      return copy;
    });
  };

  return [data, update, setData];
}

function App() {
  const [data, update, setData] = useLocalArchive();
  const [route, setRoute] = useHashRoute();
  const [modal, setModal] = useState(null);
  const currentUser = data.users.find((user) => user.id === data.currentUserId) ?? data.users[0];
  const isAdmin = currentUser?.role === "admin";

  const navigate = (nextRoute) => {
    window.location.hash = nextRoute;
    setRoute(nextRoute);
  };

  const actions = {
    navigate,
    openModal: setModal,
    update,
    resetDemo: () => setData(seedData),
    loginAdmin: (username, password) => {
      if (username.trim().toLowerCase() === "admin" && password === data.adminPassword) {
        update((draft) => {
          draft.currentUserId = "u_admin";
        });
        navigate("/");
        return true;
      }
      return false;
    },
    logoutAdmin: () => {
      update((draft) => {
        draft.currentUserId = "u_nova";
      });
      navigate("/");
    }
  };

  const page = resolveRoute(route, data, actions, isAdmin);
  const hideShell = route === "/admin-login";

  return (
    <div className="app">
      {!hideShell && <Sidebar route={route} data={data} isAdmin={isAdmin} actions={actions} />}
      {!hideShell && <Topbar currentUser={currentUser} actions={actions} />}
      <main className={hideShell ? "auth-main" : "main-shell"}>{page}</main>
      {modal && (
        <EntityModal
          modal={modal}
          data={data}
          update={update}
          close={() => setModal(null)}
          navigate={navigate}
        />
      )}
    </div>
  );
}

function useHashRoute() {
  const normalize = () => window.location.hash.replace(/^#/, "") || "/";
  const [route, setRoute] = useState(normalize);

  useEffect(() => {
    const onHash = () => setRoute(normalize());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return [route, setRoute];
}

function resolveRoute(route, data, actions, isAdmin) {
  if (route === "/characters") return <CharactersPage data={data} actions={actions} />;
  if (route === "/admin-login") return <AdminLogin data={data} actions={actions} />;
  if (route === "/admin") return isAdmin ? <AdminDashboard data={data} actions={actions} /> : <AdminLogin data={data} actions={actions} />;
  const worldMatch = route.match(/^\/world\/([^/]+)(?:\/([^/]+))?/);
  if (worldMatch) {
    const world = data.worlds.find((item) => item.id === worldMatch[1]) ?? data.worlds[0];
    return <WorldPage data={data} world={world} activeTab={worldMatch[2] || "characters"} actions={actions} />;
  }
  return <HomePage data={data} actions={actions} />;
}

function Sidebar({ route, data, isAdmin, actions }) {
  const activeWorld = route.match(/^\/world\/([^/]+)/)?.[1];
  return (
    <aside className="sidebar">
      <button className="brand" onClick={() => actions.navigate("/")}>
        <span className="brand-mark">
          <Palette size={19} />
        </span>
        <span>
          <strong>Creator Workspace</strong>
          <small>Refined Utility</small>
        </span>
      </button>
      <nav className="nav-list">
        <NavButton active={route === "/"} icon={<Home />} label="Home" onClick={() => actions.navigate("/")} />
        <NavButton
          active={route === "/characters"}
          icon={<Users />}
          label="Global Characters"
          onClick={() => actions.navigate("/characters")}
        />
        <div className="nav-group-title">Worlds</div>
        {data.worlds.map((world) => (
          <button
            key={world.id}
            className={`nav-world ${activeWorld === world.id ? "active" : ""}`}
            onClick={() => actions.navigate(`/world/${world.id}/characters`)}
          >
            <span style={{ background: world.accent }} />
            {world.name}
          </button>
        ))}
        {isAdmin && <NavButton active={route === "/admin"} icon={<Shield />} label="Admin" onClick={() => actions.navigate("/admin")} />}
      </nav>
      <button className="primary-action" onClick={() => actions.openModal({ type: "character" })}>
        <Plus size={18} />
        Add New Character
      </button>
    </aside>
  );
}

function NavButton({ active, icon, label, onClick }) {
  return (
    <button className={`nav-button ${active ? "active" : ""}`} onClick={onClick}>
      {React.cloneElement(icon, { size: 19 })}
      {label}
    </button>
  );
}

function Topbar({ currentUser, actions }) {
  const isAdmin = currentUser?.role === "admin";
  return (
    <header className="topbar">
      <div className="topbar-left">
        <strong>OC Archive</strong>
        <label className="search-box">
          <Search size={18} />
          <input placeholder="Search archive..." />
        </label>
      </div>
      <div className="topbar-actions">
        <button className="icon-button" aria-label="Settings" onClick={() => actions.navigate("/settings")}>
          <Settings size={18} />
        </button>
        {isAdmin ? (
          <button className="ghost-button compact" onClick={actions.logoutAdmin}>
            <LogOut size={16} />
            Admin logout
          </button>
        ) : (
          <button className="ghost-button compact" onClick={() => actions.navigate("/admin-login")}>
            <Shield size={16} />
            Admin
          </button>
        )}
        <button className="fountain-button" type="button" aria-label="Fun Fountain Dew Roll" title="Fun Fountain Dew Roll">⛲</button>
      </div>
    </header>
  );
}

function HomePage({ data, actions }) {
  const currentUser = data.users.find((user) => user.id === data.currentUserId) ?? data.users[0];
  const pinned = data.announcements.filter((announcement) => announcement.pinned);
  return (
    <section className="page-stack">
      {pinned.map((announcement) => (
        <div className="announcement" key={announcement.id}>
          <span className="announcement-icon">
            <Megaphone size={20} />
          </span>
          <div>
            <strong>{announcement.title}</strong>
            <p>{announcement.body}</p>
          </div>
        </div>
      ))}
      <div className="page-heading row-between">
        <div>
          <h1>Hello, CREATOR {currentUser.username}</h1>
          <p>Here is an overview of your archival database.</p>
        </div>
        <button className="ghost-button" onClick={() => actions.navigate("/characters")}>
          <Users size={18} />
          Global Characters
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="world-grid">
        {data.worlds.map((world) => (
          <WorldCard key={world.id} world={world} data={data} actions={actions} />
        ))}
        <button className="create-card" onClick={() => actions.openModal({ type: "world" })}>
          <CirclePlus size={34} />
          <strong>Initialize Hub</strong>
          <span>Create a new world sandbox for upcoming characters.</span>
        </button>
      </div>
    </section>
  );
}

function WorldCard({ world, data, actions }) {
  const count = data.characters.filter((character) => character.worldIds.includes(world.id)).length;
  return (
    <article className="world-card" onClick={() => actions.navigate(`/world/${world.id}/characters`)}>
      <div className="accent-line" style={{ background: world.accent }} />
      <div className="world-image">
        <img src={world.image} alt="" />
        <span className="chip glass" style={{ "--chip-color": world.accent }}>
          {world.genre}
        </span>
      </div>
      <div className="world-body">
        <h3>{world.name}</h3>
        <p>{world.description}</p>
        <dl>
          <div>
            <dt>Characters</dt>
            <dd>{count}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{world.status}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

function CharactersPage({ data, actions }) {
  const [query, setQuery] = useState("");
  const characters = data.characters.filter((character) =>
    `${character.name} ${character.role} ${character.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <section className="page-stack">
      <div className="page-heading row-between">
        <div>
          <h1>Global Characters</h1>
          <p>Create, edit, and move characters across worlds.</p>
        </div>
        <button className="primary-button" onClick={() => actions.openModal({ type: "character" })}>
          <Plus size={18} />
          Add Character
        </button>
      </div>
      <div className="toolbar">
        <label className="search-box large">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search characters..." />
        </label>
      </div>
      <div className="character-grid">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} data={data} actions={actions} />
        ))}
      </div>
    </section>
  );
}

function CharacterCard({ character, data, actions }) {
  const world = data.worlds.find((item) => character.worldIds.includes(item.id));
  return (
    <article className="character-card">
      <div className="portrait">
        {character.image ? <img src={character.image} alt="" /> : <User size={48} />}
        <span className="badge">{character.status}</span>
      </div>
      <div className="character-body">
        <h3>{character.name}</h3>
        <p>{character.role}</p>
        <div className="card-footer">
          <span style={{ color: world?.accent }}>{world?.name ?? "Unassigned"}</span>
          <button className="icon-button small" onClick={() => actions.openModal({ type: "character", id: character.id })}>
            <Edit3 size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}

function WorldPage({ data, world, activeTab, actions }) {
  const tabs = [
    ["characters", "Characters", Users],
    ["relationships", "Relationship Map", Network],
    ["family", "Family Tree", AccountTree],
    ["maps", "Uploaded Maps", Map]
  ];
  const worldCharacters = data.characters.filter((character) => character.worldIds.includes(world.id));
  return (
    <section className="page-stack">
      <div className="world-hero">
        <img src={world.image} alt="" />
        <div>
          <span className="status-pill" style={{ "--accent": world.accent }}>
            {world.status} Setting
          </span>
          <h1>{world.name}</h1>
          <p>{world.description}</p>
          <button className="ghost-button invert" onClick={() => actions.openModal({ type: "world", id: world.id })}>
            <Edit3 size={16} />
            Edit World
          </button>
        </div>
      </div>
      <div className="tabs">
        {tabs.map(([key, label, Icon]) => (
          <button
            key={key}
            className={activeTab === key ? "active" : ""}
            onClick={() => actions.navigate(`/world/${world.id}/${key}`)}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>
      {activeTab === "relationships" && <RelationshipMap data={data} world={world} actions={actions} />}
      {activeTab === "family" && <FamilyTree data={data} world={world} actions={actions} />}
      {activeTab === "maps" && <UploadedMaps data={data} world={world} actions={actions} />}
      {activeTab === "characters" && (
        <section className="page-stack">
          <div className="row-between">
            <span className="muted">{worldCharacters.length} Characters in {world.name}</span>
            <div className="button-row">
              <button className="ghost-button" onClick={() => actions.openModal({ type: "move-character", worldId: world.id })}>
                <Download size={17} />
                Move Into World
              </button>
              <button className="primary-button" onClick={() => actions.openModal({ type: "character", worldId: world.id })}>
                <Plus size={18} />
                Add New
              </button>
            </div>
          </div>
          <div className="character-grid">
            {worldCharacters.map((character) => (
              <CharacterProfileCard key={character.id} character={character} data={data} actions={actions} />
            ))}
          </div>
        </section>
      )}
    </section>
  );
}

function CharacterProfileCard({ character, data, actions }) {
  return (
    <article className="profile-card">
      <div className="profile-image">{character.image ? <img src={character.image} alt="" /> : <User size={58} />}</div>
      <div className="profile-content">
        <div className="row-between">
          <div>
            <h3>{character.name}</h3>
            <p>{character.role}</p>
          </div>
          <button className="icon-button small" onClick={() => actions.openModal({ type: "character", id: character.id })}>
            <Edit3 size={16} />
          </button>
        </div>
        <p>{character.bio}</p>
        <div className="tag-row">
          {character.tags.slice(0, 4).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <RadarChart stats={character.stats} color={data.worlds.find((world) => character.worldIds.includes(world.id))?.accent} />
      </div>
    </article>
  );
}

function RadarChart({ stats, color = "#6063ee" }) {
  const entries = Object.entries(stats ?? {});
  const center = 95;
  const radius = 64;
  const points = entries
    .map(([, value], index) => {
      const angle = -Math.PI / 2 + (Math.PI * 2 * index) / entries.length;
      const scale = Number(value) / 100;
      return `${center + Math.cos(angle) * radius * scale},${center + Math.sin(angle) * radius * scale}`;
    })
    .join(" ");
  const ring = (scale) =>
    entries
      .map(([,], index) => {
        const angle = -Math.PI / 2 + (Math.PI * 2 * index) / entries.length;
        return `${center + Math.cos(angle) * radius * scale},${center + Math.sin(angle) * radius * scale}`;
      })
      .join(" ");
  return (
    <div className="radar">
      <svg viewBox="0 0 190 190" aria-label="Character stats radar chart">
        {[0.25, 0.5, 0.75, 1].map((scale) => (
          <polygon key={scale} points={ring(scale)} fill="none" stroke="#d4d4d8" />
        ))}
        {entries.map(([,], index) => {
          const angle = -Math.PI / 2 + (Math.PI * 2 * index) / entries.length;
          return <line key={index} x1={center} y1={center} x2={center + Math.cos(angle) * radius} y2={center + Math.sin(angle) * radius} stroke="#e4e4e7" />;
        })}
        <polygon points={points} fill={`${color}33`} stroke={color} strokeWidth="3" />
      </svg>
      <div>
        {entries.map(([label, value]) => (
          <span key={label}>
            {label}: <strong>{value}</strong>
          </span>
        ))}
      </div>
    </div>
  );
}

function RelationshipMap({ data, world, actions }) {
  const [filter, setFilter] = useState("All");
  const [zoom, setZoom] = useState(1);
  const [selected, setSelected] = useState(null);
  const [draft, setDraft] = useState(null);
  const worldCharacters = data.characters.filter((character) => character.worldIds.includes(world.id));
  const positions = data.graphPositions[world.id] ?? {};
  const relationships = data.relationships.filter(
    (relationship) => relationship.worldId === world.id && (filter === "All" || relationship.type === filter)
  );

  const selectRelationship = (relationship) => {
    setSelected(relationship.id);
    setDraft({ ...relationship });
  };

  const saveRelationship = () => {
    if (!draft) return;
    actions.update((state) => {
      const index = state.relationships.findIndex((relationship) => relationship.id === draft.id);
      if (index >= 0) state.relationships[index] = draft;
    });
  };

  const removeRelationship = () => {
    if (!draft || !confirm("Remove this relationship?")) return;
    actions.update((state) => {
      state.relationships = state.relationships.filter((relationship) => relationship.id !== draft.id);
    });
    setDraft(null);
    setSelected(null);
  };

  const createRelationship = () => {
    if (worldCharacters.length < 2) return;
    const first = worldCharacters[0].id;
    const second = worldCharacters[1].id;
    const created = {
      id: uid("r"),
      worldId: world.id,
      from: first,
      to: second,
      type: "Social",
      subtype: "New Link",
      label: "New Relationship",
      color: world.accent,
      direction: "both",
      notes: ""
    };
    actions.update((state) => {
      state.relationships.push(created);
    });
    setDraft(created);
    setSelected(created.id);
  };

  return (
    <section className="graph-shell">
      <div className="graph-canvas">
        <div className="floating-filter">
          {["All", "Family", "Romantic", "Social"].map((item) => (
            <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className="zoom-controls">
          <button onClick={() => setZoom((value) => Math.min(1.7, value + 0.1))}><Plus size={18} /></button>
          <button onClick={() => setZoom((value) => Math.max(0.6, value - 0.1))}><Minus size={18} /></button>
          <button onClick={() => setZoom(1)}><Fit size={18} /></button>
        </div>
        <svg className="relationship-svg" viewBox="0 0 1000 560" style={{ transform: `scale(${zoom})` }}>
          <defs>
            {relationships.map((relationship) => (
              <marker key={relationship.id} id={`arrow-${relationship.id}`} markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill={relationship.color} />
              </marker>
            ))}
          </defs>
          {relationships.map((relationship, index) => {
            const from = positions[relationship.from] ?? fallbackPosition(index, "from");
            const to = positions[relationship.to] ?? fallbackPosition(index, "to");
            const both = relationship.direction === "both";
            return (
              <g key={relationship.id} onClick={() => selectRelationship(relationship)} className={selected === relationship.id ? "selected-link" : ""}>
                <path
                  d={`M ${from.x} ${from.y} C ${(from.x + to.x) / 2} ${from.y - 80 - index * 18}, ${(from.x + to.x) / 2} ${to.y + 80 + index * 18}, ${to.x} ${to.y}`}
                  fill="none"
                  stroke={relationship.color}
                  strokeWidth={selected === relationship.id ? 4 : 2.5}
                  markerEnd={relationship.direction !== "none" ? `url(#arrow-${relationship.id})` : ""}
                  markerStart={both ? `url(#arrow-${relationship.id})` : ""}
                />
                <text x={(from.x + to.x) / 2} y={(from.y + to.y) / 2 - 16 - index * 8} textAnchor="middle">
                  {relationship.label}
                </text>
              </g>
            );
          })}
          {worldCharacters.map((character, index) => {
            const pos = positions[character.id] ?? fallbackPosition(index, "node");
            return (
              <DraggableNode
                key={character.id}
                character={character}
                position={pos}
                world={world}
                updatePosition={(next) =>
                  actions.update((state) => {
                    state.graphPositions[world.id] = state.graphPositions[world.id] ?? {};
                    state.graphPositions[world.id][character.id] = next;
                  })
                }
              />
            );
          })}
        </svg>
      </div>
      <aside className="side-editor">
        <div className="editor-header">
          <h2>Connection Setup</h2>
          <button className="icon-button small" onClick={createRelationship}><Plus size={16} /></button>
        </div>
        {draft ? (
          <div className="form-stack">
            <SelectField
              label="From Character"
              value={draft.from}
              onChange={(value) => setDraft({ ...draft, from: value })}
              options={worldCharacters.map((character) => [character.id, character.name])}
            />
            <SelectField
              label="To Character"
              value={draft.to}
              onChange={(value) => setDraft({ ...draft, to: value })}
              options={worldCharacters.map((character) => [character.id, character.name])}
            />
            <SelectField label="Primary Category" value={draft.type} onChange={(value) => setDraft({ ...draft, type: value })} options={["Family", "Romantic", "Social", "Antagonistic", "Professional"]} />
            <InputField label="Specific Label" value={draft.subtype} onChange={(value) => setDraft({ ...draft, subtype: value })} />
            <InputField label="Visible Label" value={draft.label} onChange={(value) => setDraft({ ...draft, label: value })} />
            <ColorField label="Custom Color" value={draft.color} onChange={(value) => setDraft({ ...draft, color: value })} />
            <SelectField label="Direction" value={draft.direction} onChange={(value) => setDraft({ ...draft, direction: value })} options={["none", "forward", "both"]} />
            <TextAreaField label="Story Notes" value={draft.notes} onChange={(value) => setDraft({ ...draft, notes: value })} />
            <button className="primary-button full" onClick={saveRelationship}><Save size={17} />Save Changes</button>
            <button className="danger-button full" onClick={removeRelationship}><Trash2 size={17} />Remove Connection</button>
          </div>
        ) : (
          <div className="empty-state">
            <Link2 size={26} />
            <p>Select a connection or create a new relationship.</p>
            <button className="primary-button" onClick={createRelationship}>Create Relationship</button>
          </div>
        )}
      </aside>
    </section>
  );
}

function fallbackPosition(index, type) {
  if (type === "to") return { x: 700, y: 220 + index * 70 };
  if (type === "from") return { x: 250, y: 240 + index * 60 };
  return { x: 220 + index * 180, y: 190 + (index % 2) * 150 };
}

function DraggableNode({ character, position, world, updatePosition }) {
  const dragging = useRef(false);
  const onPointerDown = (event) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event) => {
    if (!dragging.current) return;
    updatePosition({
      x: Math.max(70, Math.min(930, position.x + event.movementX)),
      y: Math.max(80, Math.min(500, position.y + event.movementY))
    });
  };
  const onPointerUp = () => {
    dragging.current = false;
  };
  return (
    <g className="graph-node" transform={`translate(${position.x} ${position.y})`} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
      <circle r="38" fill="white" stroke={world.accent} strokeWidth="3" />
      <clipPath id={`clip-${character.id}`}>
        <circle r="31" />
      </clipPath>
      {character.image && <image href={character.image} x="-31" y="-31" width="62" height="62" clipPath={`url(#clip-${character.id})`} preserveAspectRatio="xMidYMid slice" />}
      <circle cx="28" cy="28" r="9" fill={world.accent} stroke="white" strokeWidth="3" />
      <rect x="-58" y="48" width="116" height="28" rx="9" fill="rgba(255,255,255,.88)" stroke="#d4d4d8" />
      <text y="67" textAnchor="middle">{character.name}</text>
    </g>
  );
}

function FamilyTree({ data, world, actions }) {
  const tree = data.familyTrees[world.id] ?? { nodes: [], links: [] };
  const [zoom, setZoom] = useState(1);
  const addRelative = () => {
    actions.update((state) => {
      state.familyTrees[world.id] = state.familyTrees[world.id] ?? { nodes: [], links: [] };
      const treeDraft = state.familyTrees[world.id];
      const newNode = {
        id: uid("f"),
        characterId: "",
        name: "New Relative",
        title: "Draft",
        x: 500 + treeDraft.nodes.length * 24,
        y: 430 + treeDraft.nodes.length * 16
      };
      if (treeDraft.nodes[0]) treeDraft.links.push({ id: uid("fl"), from: treeDraft.nodes[0].id, to: newNode.id, kind: "parent" });
      treeDraft.nodes.push(newNode);
    });
  };
  return (
    <section className="family-canvas">
      <div className="tree-toolbar">
        <button onClick={() => setZoom((value) => Math.min(1.4, value + 0.1))}><Plus size={18} /></button>
        <span>{Math.round(zoom * 100)}%</span>
        <button onClick={() => setZoom((value) => Math.max(0.7, value - 0.1))}><Minus size={18} /></button>
        <button className="primary-button compact" onClick={addRelative}><CirclePlus size={17} />Add Relative</button>
      </div>
      <svg className="tree-svg" viewBox="0 0 1000 650" style={{ transform: `scale(${zoom})` }}>
        {tree.links.map((link) => {
          const from = tree.nodes.find((node) => node.id === link.from);
          const to = tree.nodes.find((node) => node.id === link.to);
          if (!from || !to) return null;
          const spouse = link.kind === "spouse";
          return (
            <path
              key={link.id}
              d={spouse ? `M ${from.x + 80} ${from.y + 50} L ${to.x - 80} ${to.y + 50}` : `M ${from.x} ${from.y + 100} L ${from.x} ${(from.y + to.y) / 2} L ${to.x} ${(from.y + to.y) / 2} L ${to.x} ${to.y}`}
              fill="none"
              stroke={spouse ? world.accent : "#a1a1aa"}
              strokeWidth="2.5"
            />
          );
        })}
        {tree.nodes.map((node) => {
          const character = data.characters.find((item) => item.id === node.characterId);
          return (
            <g key={node.id} className="tree-node" transform={`translate(${node.x - 90} ${node.y})`} onClick={() => actions.openModal({ type: "family-node", worldId: world.id, nodeId: node.id })}>
              <rect width="180" height="112" rx="14" fill="white" stroke={node.characterId ? world.accent : "#d4d4d8"} />
              {character?.image ? (
                <image href={character.image} x="60" y="12" width="60" height="60" clipPath="circle(30px)" preserveAspectRatio="xMidYMid slice" />
              ) : (
                <circle cx="90" cy="42" r="30" fill="#f4f4f5" />
              )}
              <text x="90" y="88" textAnchor="middle">{node.name}</text>
              <text x="90" y="104" textAnchor="middle" className="muted-svg">{node.title}</text>
            </g>
          );
        })}
      </svg>
    </section>
  );
}

function UploadedMaps({ data, world, actions }) {
  const maps = data.maps.filter((map) => map.worldId === world.id);
  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      actions.update((state) => {
        state.maps.push({
          id: uid("m"),
          worldId: world.id,
          title: file.name.replace(/\.[^.]+$/, ""),
          image: reader.result,
          notes: "Uploaded world map."
        });
      });
    };
    reader.readAsDataURL(file);
  };
  const remove = (id) => {
    if (!confirm("Delete this uploaded map?")) return;
    actions.update((state) => {
      state.maps = state.maps.filter((map) => map.id !== id);
    });
  };
  return (
    <section className="page-stack">
      <label className="upload-zone">
        <Upload size={24} />
        <strong>Upload Map</strong>
        <span>Images are stored locally in your browser for this prototype.</span>
        <input type="file" accept="image/*" onChange={handleFile} />
      </label>
      <div className="map-grid">
        {maps.map((map) => (
          <article className="map-card" key={map.id}>
            <img src={map.image} alt="" />
            <div>
              <h3>{map.title}</h3>
              <p>{map.notes}</p>
              <button className="danger-button compact" onClick={() => remove(map.id)}><Trash2 size={15} />Delete</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AdminLogin({ data, actions }) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const submit = (event) => {
    event.preventDefault();
    if (!actions.loginAdmin(username, password)) setError("That username or password does not match the local admin account.");
  };
  return (
    <section className="login-wrap">
      <button className="back-link" onClick={() => actions.navigate("/")}>
        <ArrowLeft size={17} />
        Back to Home
      </button>
      <form className="login-card" onSubmit={submit}>
        <span className="login-icon"><Shield size={24} /></span>
        <h1>Archivist</h1>
        <p>Secure Workspace Access</p>
        <InputField label="Username" value={username} onChange={setUsername} icon={<User size={18} />} />
        <div className="field">
          <label>Password</label>
          <div className="input-with-icon">
            <KeyRound size={18} />
            <input value={password} onChange={(event) => setPassword(event.target.value)} type={visible ? "text" : "password"} placeholder="Enter admin password" />
            <button type="button" onClick={() => setVisible((value) => !value)}>{visible ? <EyeOff size={17} /> : <Eye size={17} />}</button>
          </div>
        </div>
        {error && <p className="form-error">{error}</p>}
        <button className="primary-button full" type="submit"><LogIn size={18} />Admin Login</button>
      </form>
    </section>
  );
}

function AdminDashboard({ data, actions }) {
  const [selected, setSelected] = useState([]);
  const [type, setType] = useState("All");
  const [announcement, setAnnouncement] = useState({ title: "", body: "", pinned: true });
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const rows = [
    ...data.characters.map((character) => ({ id: character.id, entity: "Character", name: character.name, author: "@user_nova" })),
    ...data.worlds.map((world) => ({ id: world.id, entity: "World", name: world.name, author: "@user_nova" }))
  ].filter((row) => type === "All" || row.entity === type);

  const massDelete = () => {
    if (!selected.length || !confirm(`Delete ${selected.length} selected item(s)? This cannot be undone.`)) return;
    actions.update((state) => {
      const selectedSet = new Set(selected);
      state.characters = state.characters.filter((character) => !selectedSet.has(character.id));
      state.worlds = state.worlds.filter((world) => !selectedSet.has(world.id));
      state.relationships = state.relationships.filter((rel) => !selectedSet.has(rel.from) && !selectedSet.has(rel.to) && !selectedSet.has(rel.worldId));
      state.maps = state.maps.filter((map) => !selectedSet.has(map.worldId));
    });
    setSelected([]);
  };

  const publish = () => {
    if (!announcement.title.trim() || !announcement.body.trim()) return;
    actions.update((state) => {
      state.announcements.unshift({ id: uid("a"), ...announcement, createdAt: new Date().toISOString().slice(0, 10) });
    });
    setAnnouncement({ title: "", body: "", pinned: true });
  };

  const changePassword = () => {
    if (passwords.current !== data.adminPassword) return alert("Current password is incorrect.");
    if (!passwords.next || passwords.next !== passwords.confirm) return alert("New passwords must match.");
    actions.update((state) => {
      state.adminPassword = passwords.next;
    });
    setPasswords({ current: "", next: "", confirm: "" });
    alert("Admin password changed.");
  };

  return (
    <section className="page-stack">
      <div className="page-heading row-between">
        <div>
          <h1>System Administration</h1>
          <p>Manage global content, broadcast announcements, and protect admin access.</p>
        </div>
      </div>
      <div className="admin-grid">
        <section className="panel wide">
          <div className="row-between panel-header">
            <div>
              <h2><Shield size={20} />Bulk Content Management</h2>
              <p>Select entities to apply batch operations.</p>
            </div>
            <div className="button-row">
              <select value={type} onChange={(event) => setType(event.target.value)}>
                <option>All</option>
                <option>Character</option>
                <option>World</option>
              </select>
              <button className="danger-button" onClick={massDelete}><Trash2 size={17} />Mass Delete</button>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th><input type="checkbox" checked={selected.length === rows.length && rows.length > 0} onChange={(event) => setSelected(event.target.checked ? rows.map((row) => row.id) : [])} /></th>
                  <th>ID</th>
                  <th>Entity Name</th>
                  <th>Type</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td><input type="checkbox" checked={selected.includes(row.id)} onChange={(event) => setSelected((items) => event.target.checked ? [...items, row.id] : items.filter((id) => id !== row.id))} /></td>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td><span className="tag">{row.entity}</span></td>
                    <td>{row.author}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="panel">
          <h2><Megaphone size={20} />Global Announcement</h2>
          <div className="form-stack">
            <InputField label="Announcement Title" value={announcement.title} onChange={(value) => setAnnouncement({ ...announcement, title: value })} />
            <TextAreaField label="Message Body" value={announcement.body} onChange={(value) => setAnnouncement({ ...announcement, body: value })} />
            <label className="check-line"><input type="checkbox" checked={announcement.pinned} onChange={(event) => setAnnouncement({ ...announcement, pinned: event.target.checked })} />Pin to top of Dashboard</label>
            <button className="primary-button" onClick={publish}><Megaphone size={17} />Publish</button>
          </div>
        </section>
        <section className="panel">
          <h2><KeyRound size={20} />Security Settings</h2>
          <div className="form-stack">
            <InputField label="Current Password" type="password" value={passwords.current} onChange={(value) => setPasswords({ ...passwords, current: value })} />
            <InputField label="New Password" type="password" value={passwords.next} onChange={(value) => setPasswords({ ...passwords, next: value })} />
            <InputField label="Confirm New Password" type="password" value={passwords.confirm} onChange={(value) => setPasswords({ ...passwords, confirm: value })} />
            <button className="ghost-button full" onClick={changePassword}><Save size={17} />Update Password</button>
          </div>
        </section>
        <section className="panel danger-panel">
          <h2><AlertTriangle size={20} />Danger Zone</h2>
          <p>Actions below are destructive and ask for confirmation before continuing.</p>
          <button className="danger-button" onClick={() => confirm("Reset all local demo data?") && actions.resetDemo()}>
            <AlertTriangle size={17} />
            Reset Local Demo
          </button>
        </section>
      </div>
    </section>
  );
}

function EntityModal({ modal, data, update, close, navigate }) {
  if (modal.type === "world") return <WorldModal modal={modal} data={data} update={update} close={close} />;
  if (modal.type === "move-character") return <MoveCharacterModal modal={modal} data={data} update={update} close={close} />;
  if (modal.type === "family-node") return <FamilyNodeModal modal={modal} data={data} update={update} close={close} />;
  return <CharacterModal modal={modal} data={data} update={update} close={close} navigate={navigate} />;
}

function CharacterModal({ modal, data, update, close }) {
  const existing = data.characters.find((character) => character.id === modal.id);
  const [form, setForm] = useState(
    existing ?? {
      id: uid("c"),
      worldIds: modal.worldId ? [modal.worldId] : [],
      name: "",
      age: "",
      gender: "",
      role: "",
      status: "Active",
      bio: "",
      personality: "",
      tags: [],
      likes: [],
      dislikes: [],
      image: "",
      stats: { Intelligence: 50, Agility: 50, Endurance: 50, Strength: 50, Charisma: 50, Perception: 50 }
    }
  );

  const save = () => {
    if (!form.name.trim()) return;
    update((state) => {
      const index = state.characters.findIndex((character) => character.id === form.id);
      if (index >= 0) state.characters[index] = form;
      else state.characters.push(form);
    });
    close();
  };

  return (
    <ModalFrame title={existing ? "Edit Character" : "Create Character"} close={close}>
      <div className="modal-grid">
        <InputField label="Name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
        <InputField label="Age" value={form.age} onChange={(value) => setForm({ ...form, age: value })} />
        <InputField label="Gender" value={form.gender} onChange={(value) => setForm({ ...form, gender: value })} />
        <InputField label="Role" value={form.role} onChange={(value) => setForm({ ...form, role: value })} />
        <SelectField label="Worlds" multiple value={form.worldIds} onChange={(value) => setForm({ ...form, worldIds: value })} options={data.worlds.map((world) => [world.id, world.name])} />
        <InputField label="Image URL" value={form.image} onChange={(value) => setForm({ ...form, image: value })} />
        <TextAreaField label="Biography" value={form.bio} onChange={(value) => setForm({ ...form, bio: value })} />
        <TextAreaField label="Personality" value={form.personality} onChange={(value) => setForm({ ...form, personality: value })} />
        <InputField label="Tags (comma separated)" value={form.tags.join(", ")} onChange={(value) => setForm({ ...form, tags: splitList(value) })} />
        <InputField label="Likes (comma separated)" value={form.likes.join(", ")} onChange={(value) => setForm({ ...form, likes: splitList(value) })} />
        <InputField label="Dislikes (comma separated)" value={form.dislikes.join(", ")} onChange={(value) => setForm({ ...form, dislikes: splitList(value) })} />
      </div>
      <div className="stat-editor">
        {Object.entries(form.stats).map(([key, value]) => (
          <label key={key}>
            {key}
            <input type="range" min="0" max="100" value={value} onChange={(event) => setForm({ ...form, stats: { ...form.stats, [key]: Number(event.target.value) } })} />
            <span>{value}</span>
          </label>
        ))}
      </div>
      <button className="primary-button full" onClick={save}><Save size={17} />Save Character</button>
    </ModalFrame>
  );
}

function WorldModal({ modal, data, update, close }) {
  const existing = data.worlds.find((world) => world.id === modal.id);
  const [form, setForm] = useState(
    existing ?? { id: uid("w"), name: "", genre: "", status: "Draft", accent: "#6063ee", image: "", description: "" }
  );
  const save = () => {
    if (!form.name.trim()) return;
    update((state) => {
      const index = state.worlds.findIndex((world) => world.id === form.id);
      if (index >= 0) state.worlds[index] = form;
      else state.worlds.push(form);
    });
    close();
  };
  return (
    <ModalFrame title={existing ? "Edit World" : "Create World"} close={close}>
      <InputField label="World Name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
      <InputField label="Genre" value={form.genre} onChange={(value) => setForm({ ...form, genre: value })} />
      <InputField label="Image URL" value={form.image} onChange={(value) => setForm({ ...form, image: value })} />
      <ColorField label="Accent Color" value={form.accent} onChange={(value) => setForm({ ...form, accent: value })} />
      <TextAreaField label="Description" value={form.description} onChange={(value) => setForm({ ...form, description: value })} />
      <button className="primary-button full" onClick={save}><Save size={17} />Save World</button>
    </ModalFrame>
  );
}

function MoveCharacterModal({ modal, data, update, close }) {
  const [characterId, setCharacterId] = useState(data.characters[0]?.id ?? "");
  const move = () => {
    update((state) => {
      const character = state.characters.find((item) => item.id === characterId);
      if (character && !character.worldIds.includes(modal.worldId)) character.worldIds.push(modal.worldId);
    });
    close();
  };
  return (
    <ModalFrame title="Move Character Into World" close={close}>
      <SelectField label="Character" value={characterId} onChange={setCharacterId} options={data.characters.map((character) => [character.id, character.name])} />
      <button className="primary-button full" onClick={move}><Check size={17} />Move Character</button>
    </ModalFrame>
  );
}

function FamilyNodeModal({ modal, data, update, close }) {
  const node = data.familyTrees[modal.worldId]?.nodes.find((item) => item.id === modal.nodeId);
  const [form, setForm] = useState(node ?? { name: "", title: "", characterId: "" });
  const save = () => {
    update((state) => {
      const draftNode = state.familyTrees[modal.worldId]?.nodes.find((item) => item.id === modal.nodeId);
      if (draftNode) Object.assign(draftNode, form);
    });
    close();
  };
  return (
    <ModalFrame title="Edit Family Tree Node" close={close}>
      <InputField label="Name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
      <InputField label="Title" value={form.title} onChange={(value) => setForm({ ...form, title: value })} />
      <SelectField label="Linked Character" value={form.characterId} onChange={(value) => setForm({ ...form, characterId: value })} options={[["", "No linked character"], ...data.characters.map((character) => [character.id, character.name])]} />
      <button className="primary-button full" onClick={save}><Save size={17} />Save Relative</button>
    </ModalFrame>
  );
}

function ModalFrame({ title, children, close }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="icon-button" onClick={close}><X size={18} /></button>
        </div>
        <div className="form-stack">{children}</div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, type = "text", icon }) {
  return (
    <label className="field">
      <span>{label}</span>
      <div className={icon ? "input-with-icon" : ""}>
        {icon}
        <input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
      </div>
    </label>
  );
}

function TextAreaField({ label, value, onChange }) {
  return (
    <label className="field full-span">
      <span>{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows="4" />
    </label>
  );
}

function SelectField({ label, value, onChange, options, multiple = false }) {
  const normalized = options.map((option) => (Array.isArray(option) ? option : [option, option]));
  return (
    <label className="field">
      <span>{label}</span>
      <select
        multiple={multiple}
        value={value}
        onChange={(event) =>
          onChange(multiple ? Array.from(event.target.selectedOptions).map((option) => option.value) : event.target.value)
        }
      >
        {normalized.map(([optionValue, labelValue]) => (
          <option key={optionValue} value={optionValue}>
            {labelValue}
          </option>
        ))}
      </select>
    </label>
  );
}

function ColorField({ label, value, onChange }) {
  return (
    <label className="field color-field">
      <span>{label}</span>
      <input type="color" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function splitList(value) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

createRoot(document.getElementById("root")).render(<App />);
