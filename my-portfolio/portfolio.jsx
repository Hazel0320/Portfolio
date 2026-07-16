import React, { useState, useEffect, useRef, useCallback } from "react";
import profile from "./src/assets/2x2.png";
import sqlCert from "./src/assets/TESTDOME.png";
import benessugCert from "./src/assets/benessug.jpeg";
import paperlessCert from "./src/assets/paperless.jpeg";
// ══════════════════════════════════════════════════════════════
// ── THEME TOKENS ─────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════
const themes = {
  dark: {
    bg:      "#0a0a0f", bg2: "#12121a", bg3: "#1a1a26",
    surface: "#1e1e2e",
    border:  "rgba(255,255,255,0.08)", border2: "rgba(255,255,255,0.14)",
    accent:  "#a78bfa", accent2: "#7c3aed", accent3: "#c4b5fd",
    teal: "#2dd4bf", pink: "#f472b6",
    text: "#f1f0f5", text2: "#a09eb8", text3: "#6b6985",
    inputBg: "#1a1a26",
    shadow: "rgba(0,0,0,0.3)",
    navBg: "rgba(10,10,15,0.92)",
    heroGlow: "rgba(167,139,250,0.15)",
    tagBg: "rgba(167,139,250,0.12)",
    tagBorder: "rgba(167,139,250,0.2)",
    timeline: "rgba(255,255,255,0.08)",
    certBg: "#1a1a26",
    certBorder: "#3b1f6b",
    greenBadge: "#065f46",
    greenText: "#6ee7b7",
    fabBg: "#7c3aed",
    fabShadow: "rgba(124,58,237,0.45)",
    footerBg: "#0a0a0f",
  },
  light: {
    bg:      "#f8f9fa", bg2: "#eef0f2", bg3: "#e2e5e9",
    surface: "#ffffff",
    border:  "rgba(0,0,0,0.08)", border2: "rgba(0,0,0,0.14)",
    accent:  "#7c3aed", accent2: "#6d28d9", accent3: "#5b21b6",
    teal: "#0d9488", pink: "#db2777",
    text: "#1a1a2e", text2: "#4b5563", text3: "#6b7280",
    inputBg: "#f3f4f6", 
    shadow: "rgba(0,0,0,0.08)",
    navBg: "rgba(248,249,250,0.92)",
    heroGlow: "rgba(124,58,237,0.08)",
    tagBg: "rgba(124,58,237,0.08)",
    tagBorder: "rgba(124,58,237,0.15)",
    timeline: "rgba(0,0,0,0.08)",
    certBg: "#f3f4f6",
    certBorder: "#c4b5fd",
    greenBadge: "#d1fae5",
    greenText: "#059669",
    fabBg: "#6d28d9",
    fabShadow: "rgba(124,58,237,0.3)",
    footerBg: "#eef0f2",
  }
};

function useTheme() {
  const [mode, setMode] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch {}
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  useEffect(() => {
    try { localStorage.setItem("theme", mode); } catch {}
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);
  const toggle = useCallback(() => setMode(m => m === "dark" ? "light" : "dark"), []);
  const C = themes[mode];
  return { mode, toggle, C };
}

// ── GRADIENT TEXT helper ─────────────────────────────────────
function GradientText({ children, from, to, style = {} }) {
  return (
    <span
      style={{
        background: `linear-gradient(135deg, ${from}, ${to})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: "transparent",
        display: "inline",
        transform: "translateZ(0)",
        isolation: "isolate",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

// ══════════════════════════════════════════════════════════════
// ── CV PDF EXPORT ────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════
function exportCV() {
  const link = document.createElement("a");
  link.href = "/AsuncionHazelFaithM.-RESUME.pdf";
  link.download = "AsuncionHazelFaithM.-RESUME.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
// ══════════════════════════════════════════════════════════════
// ── CSV EXPORT ───────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════
// ── EXPORT FAB ───────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════
function ExportFAB({ C }) {
  const [open, setOpen] = useState(false);
  const [cvDone, setCvDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCV = useCallback(async () => {
    setLoading(true);
    try {
      await exportCV(C);
      setCvDone(true);
      setTimeout(() => setCvDone(false), 2500);
    } catch (err) {
      console.error("CV export failed:", err);
      alert("Failed to generate PDF. Please try again.");
    }
    setLoading(false);
    setOpen(false);
  }, [C]);

  const fabBase = { display:"flex", alignItems:"center", gap:8, border:"none", cursor:"pointer", fontFamily:"Inter,sans-serif", fontWeight:600, borderRadius:999, transition:"all 0.2s" };

  return (
    <div style={{ position:"fixed", bottom:"2rem", right:"2rem", zIndex:200 }}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:10, marginBottom:10, opacity:open?1:0, transform:open?"translateY(0)":"translateY(12px)", pointerEvents:open?"all":"none", transition:"opacity 0.2s, transform 0.2s" }}>
        <button onClick={handleCV} disabled={loading} style={{ ...fabBase, background:cvDone?"#059669":C.fabBg, color:"#fff", fontSize:"0.82rem", padding:"0.6rem 1.2rem", boxShadow:`0 3px 16px ${C.fabShadow}`, opacity:loading?0.7:1 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            {cvDone ? <polyline points="20 6 9 17 4 12"/> : <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>}
          </svg>
          {loading ? "Generating…" : cvDone ? "Downloaded!" : "Export CV (PDF)"}
        </button>
      </div>
      <button onClick={() => setOpen(o => !o)} style={{ ...fabBase, background:open?C.surface:C.fabBg, color:"#fff", fontSize:"0.88rem", padding:"0.75rem 1.5rem", boxShadow:`0 4px 24px ${C.fabShadow}`, transform:open?"rotate(45deg) scale(0.95)":"none" }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
          {open ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>}
        </svg>
        {open ? "Close" : "Export"}
      </button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// ── GLOBAL STYLES ────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════
function GlobalStyles({ C }) {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body {
        background: ${C.bg};
        color: ${C.text};
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        line-height: 1.7;
        overflow-x: hidden;
        transition: background 0.3s ease, color 0.3s ease;
      }
      a { color: inherit; text-decoration: none; }
      .fade-up { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
      .fade-up.visible { opacity: 1; transform: translateY(0); }

      .grad-text {
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip: text !important;
        color: transparent !important;
        display: inline !important;
        transform: translateZ(0);
        will-change: transform;
        isolation: isolate;
        position: relative;
        z-index: 0;
      }

      @media (max-width: 768px) {
        .hero-grid  { grid-template-columns: 1fr !important; }
        .about-grid { grid-template-columns: 1fr !important; }
        .contact-grid { grid-template-columns: 1fr !important; }
        .hero-card-wrap { order: -1; }
        nav { padding: 1rem 1.5rem !important; }
        .nav-links { display: none !important; }
        .section-container { padding: 4rem 1.5rem !important; }
        .hero-section { padding: 5rem 1.5rem 3rem !important; }
      }
      @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.8)} }
    `}</style>
  );
}

// ── FADE-IN HOOK ─────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return ref;
}

// ── NAVBAR ───────────────────────────────────────────────────
function Navbar({ C, mode, toggle }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["About","Skills","Certifications","Experience","Projects","Contact"];
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1.2rem 3rem", background: scrolled ? C.navBg : (mode==="dark"?"rgba(10,10,15,0.7)":"rgba(248,249,250,0.7)"), backdropFilter:"blur(12px)", borderBottom:`0.5px solid ${C.border}`, transition:"background 0.3s, border-color 0.3s" }}>
      <span style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.3rem", fontWeight:700 }}>
        <GradientText from={C.accent3} to={C.teal}>HFA</GradientText>
      </span>
      <div style={{ display:"flex", alignItems:"center", gap:"2rem" }}>
        <button onClick={toggle} style={{ background:"none", border:`0.5px solid ${C.border}`, borderRadius:8, padding:"0.4rem 0.8rem", cursor:"pointer", color:C.text2, fontSize:"0.8rem", fontFamily:"Inter,sans-serif", transition:"border-color 0.2s, color 0.2s" }}
          onMouseEnter={e => { e.target.style.borderColor = C.accent; e.target.style.color = C.text; }}
          onMouseLeave={e => { e.target.style.borderColor = C.border; e.target.style.color = C.text2; }}>
          {mode === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
        <ul className="nav-links" style={{ display:"flex", gap:"2rem", listStyle:"none" }}>
          {links.map(l => (
            <li key={l}><a href={`#${l.toLowerCase()}`} style={{ color:C.text2, fontSize:"0.875rem", letterSpacing:"0.04em", transition:"color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.text}
              onMouseLeave={e => e.target.style.color = C.text2}>{l}</a></li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

// ── HERO ─────────────────────────────────────────────────────
function Hero({ C }) {
  const infoRows = [
    { icon:"🎂", label:"Age",           val:"22 years old" },
    { icon:"🎓", label:"Education",     val:"PRMSU — Main Iba Campus" },
    { icon:"🏢", label:"Experience",    val:"Sanyo Denki Philippines" },
    { icon:"💻", label:"Specialty",     val:"C# · ASP.NET · WinForms" },
    { icon:"🏆", label:"Certification", val:"TestDome SQL (Top 10%)" },
  ];


  return (
    <section id="hero" className="hero-section" style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:"6rem 3rem 4rem", maxWidth:1100, margin:"0 auto" }}>
      <div className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap:"4rem", alignItems:"center", width:"100%" }}>
        <div>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:C.tagBg, border:`0.5px solid ${C.tagBorder}`, borderRadius:999, padding:"0.35rem 1rem", fontSize:"0.8rem", color:C.accent3, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:"1.5rem" }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:C.teal, display:"inline-block", animation:"pulse 2s ease-in-out infinite" }}/>
            Available for opportunities
          </div>

          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2.8rem,6vw,5rem)", fontWeight:900, lineHeight:1.05, letterSpacing:"-0.02em", marginBottom:"0.5rem", color:C.text }}>
            Hazel Faith<br/>
            <span
              className="grad-text"
              style={{
                background: `linear-gradient(135deg, ${C.accent}, ${C.teal})`,
                display: "inline-block",
              }}
            >
              Asuncion
            </span>
          </h1>

          <p style={{ fontSize:"1.1rem", color:C.text2, marginBottom:"1.5rem", fontWeight:400 }}>System Developer &amp; Web Programmer</p>
          <p style={{ fontSize:"1rem", color:C.text2, maxWidth:480, lineHeight:1.85, marginBottom:"2.5rem" }}>
            Building efficient, reliable systems with a focus on .NET ecosystems and desktop application development. Experienced in enterprise software with a growing full-stack skillset.
          </p>
          <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
            <a href="#experience" style={{ display:"inline-flex", alignItems:"center", gap:8, background:C.accent2, color:"#fff", padding:"0.75rem 1.75rem", borderRadius:12, fontSize:"0.9rem", fontWeight:500, transition:"background 0.2s,transform 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.background="#6d28d9"; e.currentTarget.style.transform="translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background=C.accent2; e.currentTarget.style.transform="none"; }}>
              View Experience →
            </a>
            <a href="#contact" style={{ display:"inline-flex", alignItems:"center", gap:8, border:`0.5px solid ${C.border2}`, color:C.text, padding:"0.75rem 1.75rem", borderRadius:12, fontSize:"0.9rem", fontWeight:500, transition:"background 0.2s,transform 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.background=C.surface; e.currentTarget.style.transform="translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.transform="none"; }}>
              Get in Touch
            </a>
          </div>
        </div>

        {/* info card */}
        <div className="hero-card-wrap" style={{ background:C.surface, border:`0.5px solid ${C.border}`, borderRadius:20, padding:"2.5rem", position:"relative", overflow:"hidden", transition:"background 0.3s, border-color 0.3s" }}>
          <div style={{ position:"absolute", top:-60, right:-60, width:200, height:200, background:`radial-gradient(circle,${C.heroGlow} 0%,transparent 70%)`, pointerEvents:"none" }}/>
          {/* FIX: Replaced undefined `profile` with an initials avatar */}
        <img
          src={profile}
          alt="Hazel Faith Asuncion"
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            objectFit: "cover",
            display: "block",
            margin: "0 auto 1.5rem",
            border: `4px solid ${C.accent2}`,
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          }}
        />
          <p style={{ textAlign:"center", fontWeight:600, fontSize:"1.1rem", marginBottom:"0.25rem", color:C.text }}>Hazel Faith Asuncion</p>
          <p style={{ textAlign:"center", fontSize:"0.8rem", color:C.text2, marginBottom:"1.5rem" }}>System Developer / Programmer</p>
          {infoRows.map(({ icon, label, val }) => (
            <div key={label} style={{ display:"flex", alignItems:"center", gap:10, padding:"0.65rem 0", borderTop:`0.5px solid ${C.border}` }}>
              <div style={{ width:28, height:28, borderRadius:8, background:C.tagBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.85rem", flexShrink:0 }}>{icon}</div>
              <div><div style={{ color:C.text3, fontSize:"0.72rem" }}>{label}</div><div style={{ color:C.text, fontSize:"0.85rem" }}>{val}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SECTION HEADER ───────────────────────────────────────────
function SectionHeader({ eyebrow, title, accent, C }) {
  return (
    <div style={{ marginBottom:"3rem" }}>
      <span style={{ fontSize:"0.75rem", textTransform:"uppercase", letterSpacing:"0.1em", color:C.accent3, marginBottom:"0.75rem", display:"block" }}>{eyebrow}</span>
      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,4vw,3rem)", fontWeight:700, lineHeight:1.1, color:C.text }}>
        {title}<br/>
        <em style={{ fontStyle:"italic", color:C.accent3 }}>{accent}</em>
      </h2>
    </div>
  );
}

// ── ABOUT ────────────────────────────────────────────────────
function About({ C }) {
  const leftRef = useFadeIn(), rightRef = useFadeIn();
  const stats = [
    { num:"1+",   label:"Year professional experience" },
    { num:"C#",   label:"Primary language" },
    { num:".NET", label:"Core ecosystem" },
    { num:"BS CpE", label:"Degree" },
  ];
  const cards = [
    { school:"PRMSU — Main Iba Campus",  degree:"Bachelor of Science in Computer Engineering", year:"Graduated 2025 · Iba, Zambales", accent:false },
    { school:"Sanyo Denki Philippines",  degree:"System Developer / Programmer",               year:"Aug 2025 – Present",            accent:false },
    { school:"Currently Expanding",      degree:"Kotlin · Node.js · TypeScript · JavaScript",  year:"Self-directed learning & growth",accent:true  },
  ];
  return (
    <section id="about" style={{ background:C.bg2, transition:"background 0.3s ease" }}>
      <div className="section-container" style={{ maxWidth:1100, margin:"0 auto", padding:"5rem 3rem" }}>
        <SectionHeader eyebrow="Who I Am" title="Crafting systems that" accent="actually work" C={C}/>
        <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"start" }}>
          <div ref={leftRef} className="fade-up">
            {[
              "I'm a 22-year-old System Developer and Programmer based in the Philippines, recently graduated from PRMSU — Main Iba Campus. I'm passionate about building structured, maintainable software that solves real operational problems.",
              "My professional experience at Sanyo Denki Philippines gave me hands-on exposure to enterprise system development — working with C# and the .NET ecosystem to build and maintain internal business applications and Windows-based tools.",
              "Beyond the .NET world, I've been expanding my skills into mobile development with Kotlin for Android, and exploring modern web development through Node.js, TypeScript, and JavaScript.",
            ].map((p,i) => <p key={i} style={{ color:C.text2, marginBottom:"1rem", lineHeight:1.85 }}>{p}</p>)}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginTop:"2rem" }}>
              {stats.map(({ num, label }) => (
                <div key={label} style={{ background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:12, padding:"1.25rem", transition:"background 0.3s, border-color 0.3s" }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"2rem", fontWeight:700, color:C.accent3 }}>{num}</div>
                  <div style={{ fontSize:"0.8rem", color:C.text3, marginTop:"0.25rem" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div ref={rightRef} className="fade-up">
            {cards.map(({ school, degree, year, accent }) => (
              <div key={school} style={{ background:accent?C.tagBg:C.bg3, border:`0.5px solid ${accent?C.tagBorder:C.border}`, borderRadius:12, padding:"1.75rem", marginBottom:"1rem", transition:"background 0.3s, border-color 0.3s" }}>
                <div style={{ fontWeight:600, fontSize:"1rem", color:accent?C.accent3:C.text, marginBottom:"0.25rem" }}>{school}</div>
                <div style={{ fontSize:"0.85rem", color:accent?C.teal:C.accent3, marginBottom:"0.5rem" }}>{degree}</div>
                <div style={{ fontSize:"0.8rem", color:C.text3 }}>{year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SKILLS ───────────────────────────────────────────────────
// FIX: Extracted SkillCard to a separate component so useFadeIn() is called
// at the top level, not inside a map loop (violates Rules of Hooks)
function SkillCard({ icon, iconBg, iconColor, title, tags, tagStyle, C }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className="fade-up" style={{ background:C.surface, border:`0.5px solid ${C.border}`, borderRadius:12, padding:"1.75rem", transition:"background 0.3s, border-color 0.3s" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:"1.25rem" }}>
        <div style={{ width:36, height:36, borderRadius:10, background:iconBg, color:iconColor, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem" }}>{icon}</div>
        <span style={{ fontWeight:600, fontSize:"0.95rem", color:C.text }}>{title}</span>
      </div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
        {tags.map(t => <span key={t} style={{ padding:"0.3rem 0.85rem", borderRadius:999, fontSize:"0.78rem", fontWeight:500, ...tagStyle }}>{t}</span>)}
      </div>
    </div>
  );
}

function Skills({ C }) {
  const categories = [
    { icon:"⚡", iconBg:C.tagBg, iconColor:C.accent3, title:"Core / Proficient",    tags:["C#","ASP.NET","ASPX","WinForms","HTML",".NET Framework"],                    tagStyle:{ background:C.tagBg, color:C.accent3, border:`0.5px solid ${C.tagBorder}` } },
    { icon:"🌱", iconBg:"rgba(45,212,191,0.1)", iconColor:C.teal, title:"Foundational Knowledge", tags:["Kotlin","Android Dev","Node.js","TypeScript","JavaScript"],       tagStyle:{ background:"rgba(45,212,191,0.08)", color:C.teal, border:"0.5px solid rgba(45,212,191,0.15)" } },
    { icon:"🎯", iconBg:"rgba(244,114,182,0.1)", iconColor:C.pink, title:"Domain Expertise",      tags:["Windows Desktop Apps","Enterprise Systems","Web Applications (.NET)","Mobile Development"], tagStyle:{ background:C.tagBg, color:C.accent3, border:`0.5px solid ${C.tagBorder}` } },
  ];
  return (
    <section id="skills" style={{ background:C.bg, transition:"background 0.3s ease" }}>
      <div className="section-container" style={{ maxWidth:1100, margin:"0 auto", padding:"5rem 3rem" }}>
        <SectionHeader eyebrow="Technical Stack" title="Languages &" accent="Technologies" C={C}/>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"1.25rem" }}>
          {categories.map((cat) => (
            <SkillCard key={cat.title} {...cat} C={C} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Certifications({ C }) {
  const [selected, setSelected] = useState(null);

  const certs = [
    {
      title: "SQL Certification",
      issuer: "TestDome",
      achievement: "Top 10%",
      date: "March 2026",
      icon: "🏆",
      image: sqlCert,
      desc:
        "Successfully passed the TestDome SQL assessment, ranking in the Top 10% globally.",
    },
    {
      title: "Benessug Certificate",
      issuer: "Sanyo Denki Philippines",
      achievement: "Completed",
      date: "2026",
      icon: "📜",
      image: benessugCert,
      desc:
        "Certificate awarded for Benessug participation and accomplishment.",
    },
    {
      title: "Paperless Project Certificate",
      issuer: "Sanyo Denki Philippines",
      achievement: "Project Recognition",
      date: "2026",
      icon: "💡",
      image: paperlessCert,
      desc:
        "Recognition for developing the Paperless Jig Checker Sheet project.",
    },
  ];

  return (
    <>
      <section
        id="certifications"
        style={{ background: C.bg, transition: "background .3s" }}
      >
        <div
          className="section-container"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "5rem 3rem",
          }}
        >
          <SectionHeader
            eyebrow="Achievements"
            title="Certifications &"
            accent="Recognition"
            C={C}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
              gap: "1.5rem",
            }}
          >
            {certs.map((cert) => (
              <div
                key={cert.title}
                onClick={() => setSelected(cert)}
                style={{
                  cursor: "pointer",
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 18,
                  overflow: "hidden",
                  transition: ".25s",
                  boxShadow: "0 10px 25px rgba(0,0,0,.08)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  style={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                  }}
                />

                <div style={{ padding: "1.5rem" }}>
                  <div style={{ fontSize: "2rem" }}>{cert.icon}</div>

                  <h3
                    style={{
                      marginTop: ".5rem",
                      marginBottom: ".4rem",
                      color: C.text,
                    }}
                  >
                    {cert.title}
                  </h3>

                  <p style={{ color: C.accent3 }}>
                    {cert.issuer} • {cert.date}
                  </p>

                  <p
                    style={{
                      marginTop: "1rem",
                      color: C.text2,
                      lineHeight: 1.7,
                    }}
                  >
                    {cert.desc}
                  </p>

                  <span
                    style={{
                      marginTop: "1rem",
                      display: "inline-block",
                      padding: ".45rem .9rem",
                      borderRadius: 999,
                      background: C.tagBg,
                      color: C.accent3,
                      fontWeight: 600,
                      fontSize: ".8rem",
                    }}
                  >
                    Click to View
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "2rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 900,
              width: "100%",
              background: C.surface,
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <img
              src={selected.image}
              alt={selected.title}
              style={{
                width: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
                background: "#000",
              }}
            />

            <div style={{ padding: "1.5rem" }}>
              <h2>{selected.title}</h2>

              <p style={{ color: C.text2 }}>
                {selected.issuer} • {selected.date}
              </p>

              <button
                onClick={() => setSelected(null)}
                style={{
                  marginTop: "1rem",
                  padding: ".7rem 1.5rem",
                  border: "none",
                  borderRadius: 10,
                  cursor: "pointer",
                  background: C.accent2,
                  color: "#fff",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── EXPERIENCE ───────────────────────────────────────────────
// FIX: Extracted ExperienceItem to separate component for proper hook usage
function ExperienceItem({ company, role, period, desc, tags, C }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className="fade-up" style={{ position:"relative", marginBottom:"3rem" }}>
      <div style={{ position:"absolute", left:"-2rem", top:8, width:10, height:10, borderRadius:"50%", background:C.accent2, border:`2px solid ${C.bg2}`, transform:"translateX(-4px)" }}/>
      <div style={{ fontSize:"0.75rem", textTransform:"uppercase", letterSpacing:"0.08em", color:C.teal, marginBottom:"0.35rem" }}>{company}</div>
      <div style={{ fontSize:"1.15rem", fontWeight:600, marginBottom:"0.25rem", color:C.text }}>{role}</div>
      <div style={{ fontSize:"0.78rem", color:C.text3, marginBottom:"1rem" }}>{period}</div>
      <p style={{ color:C.text2, fontSize:"0.9rem", lineHeight:1.8, marginBottom:"1rem" }}>{desc}</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
        {tags.map(t => <span key={t} style={{ padding:"0.2rem 0.7rem", borderRadius:6, fontSize:"0.75rem", background:C.bg3, color:C.text2, border:`0.5px solid ${C.border}` }}>{t}</span>)}
      </div>
    </div>
  );
}

function Experience({ C }) {
  const items = [
    { company:"Sanyo Denki Philippines", role:"System Developer / Programmer", period:"Aug 2025 – Present · Philippines", desc:"Develop and deploy internal web applications aimed at automating factory processes and improving overall production efficiency. Key contributor to the EMS (Engineering Management Web System): assist in building and maintaining a comprehensive engineering tool used to monitor factory stocks, hardware inventory, component registration, and battery replacements. Implement modules within the EMS for real-time machine monitoring, program tracking, and machine trouble handling to reduce operational downtime. Design and maintain efficient database structures to support high-volume manufacturing data logs.", tags:["C#","ASP.NET","WinForms","ASPX","HTML",".NET Framework","SQL Server"] },
    { company:"PRMSU — Main Iba Campus", role:"BS Computer Engineering Graduate", period:"Graduated 2025 · Iba, Zambales", desc:"Completed a Bachelor of Science in Computer Engineering, gaining a solid foundation in software development principles, systems design, database management, and web programming. Academic projects spanned desktop systems, web applications, and mobile development.", tags:["Software Engineering","Database Management","Web Development","Systems Analysis"] },
  ];
  return (
    <section id="experience" style={{ background:C.bg2, transition:"background 0.3s ease" }}>
      <div className="section-container" style={{ maxWidth:1100, margin:"0 auto", padding:"5rem 3rem" }}>
        <SectionHeader eyebrow="Career" title="Professional" accent="Experience" C={C}/>
        <div style={{ position:"relative", paddingLeft:"2rem" }}>
          <div style={{ position:"absolute", left:0, top:8, bottom:0, width:"0.5px", background:C.timeline }}/>
          {items.map((item) => (
            <ExperienceItem key={item.company} {...item} C={C} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PROJECTS ─────────────────────────────────────────────────
// FIX: Extracted ProjectCard to separate component for proper hook usage
function ProjectCard({ icon, iconBg, type, name, desc, stack, C }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className="fade-up" style={{ background:C.surface, border:`0.5px solid ${C.border}`, borderRadius:12, padding:"1.75rem", transition:"border-color 0.2s,transform 0.2s,background 0.3s" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor=C.border2; e.currentTarget.style.transform="translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor=C.border;  e.currentTarget.style.transform="none"; }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1rem" }}>
        <div style={{ width:44, height:44, borderRadius:10, background:iconBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem" }}>{icon}</div>
        <span style={{ fontSize:"0.72rem", textTransform:"uppercase", letterSpacing:"0.06em", color:C.text3, padding:"0.25rem 0.65rem", border:`0.5px solid ${C.border}`, borderRadius:999 }}>{type}</span>
      </div>
      <div style={{ fontSize:"1.05rem", fontWeight:600, marginBottom:"0.5rem", color:C.text }}>{name}</div>
      <p style={{ fontSize:"0.85rem", color:C.text2, lineHeight:1.75, marginBottom:"1.25rem" }}>{desc}</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
        {stack.map(s => <span key={s} style={{ padding:"0.2rem 0.65rem", borderRadius:6, fontSize:"0.72rem", background:C.tagBg, color:C.accent3, border:`0.5px solid ${C.tagBorder}` }}>{s}</span>)}
      </div>
    </div>
  );
}

function Projects({ C }) {
  const projects = [
    { icon:"🖥️", iconBg:"rgba(167,139,250,0.1)", type:"Desktop App",  name:"Fabrication Request System",             desc:"A Windows Forms application for managing fabrication requests, work orders, and production workflows. Features a paperless Jig Checker Sheet system that replaces manual inspection forms with digital records, automated document generation, PDF export functionality, and centralized database storage for improved traceability and record management.", stack:["C#","WinForms","SQL Server"] },
    { icon:"🌐", iconBg:"rgba(45,212,191,0.1)",  type:"Web System",   name:"Employee Tasking Web",                   desc:"An ASP.NET web application providing employees access to schedules, announcements, and internal request forms, with role-based access control.", stack:["ASP.NET","C#","SQL Server","HTML","CSS","JavaScript"] },
    { icon:"⚙️", iconBg:"rgba(251,191,36,0.1)",  type:"Web System",   name:"Machine Preventive Maintenance System",  desc:"A web-based preventive maintenance system that digitizes paper-based maintenance forms, enables online editing, automatic document formatting, PDF export, maintenance scheduling, and centralized database storage for efficient record management and reporting.", stack:["ASP.NET","C#","SQL Server","HTML","CSS","JavaScript"] },
    { icon:"📱", iconBg:"rgba(244,114,182,0.1)", type:"Mobile App",   name:"Android Utility App",                    desc:"A Kotlin-based Android application developed as part of foundational mobile development learning. Demonstrates basic Android UI components, navigation, and data handling.", stack:["Kotlin","Android SDK","XML Layouts"] },
  ];
  return (
    <section id="projects" style={{ background:C.bg, transition:"background 0.3s ease" }}>
      <div className="section-container" style={{ maxWidth:1100, margin:"0 auto", padding:"5rem 3rem" }}>
        <SectionHeader eyebrow="Work" title="Featured" accent="Projects" C={C}/>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"1.25rem" }}>
          {projects.map((proj) => (
            <ProjectCard key={proj.name} {...proj} C={C} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ──────────────────────────────────────────────────
function Contact({ C }) {
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [sent, setSent] = useState(false);
  const leftRef = useFadeIn(), rightRef = useFadeIn();
 const links = [
  {
    icon: "✉️",
    label: "Email",
    val: "hazelfaithasuncion@gmail.com",
    href: "mailto:hazelfaithasuncion@gmail.com",
  },
  {
    icon: "💼",
    label: "LinkedIn",
    val: "linkedin.com/in/hazelfaithasuncion",
    href: "https://linkedin.com/in/hazelfaithasuncion",
  },
  {
    icon: "🐙",
    label: "GitHub",
    val: "github.com/hazelfaith",
    href: "https://github.com/hazelfaith",
  },
  {
    icon: "📷",
    label: "Instagram",
    val: "@faithyatp",
    href: "https://instagram.com/yourusername",
  },
  {
    icon: "📘",
    label: "Facebook",
    val: "Hazel Faith Asuncion",
    href: "https://facebook.com/yourprofile",
  },
];
  const iStyle = { background:C.inputBg, border:`0.5px solid ${C.border}`, borderRadius:12, padding:"0.75rem 1rem", color:C.text, fontFamily:"Inter,sans-serif", fontSize:"0.9rem", outline:"none", width:"100%", transition:"border-color 0.2s, background 0.3s" };
  const handleSubmit = useCallback(e => { e.preventDefault(); setSent(true); setForm({ name:"", email:"", message:"" }); setTimeout(() => setSent(false), 3000); }, []);
  return (
    <section id="contact" style={{ background:C.bg2, transition:"background 0.3s ease" }}>
      <div className="section-container" style={{ maxWidth:1100, margin:"0 auto", padding:"5rem 3rem" }}>
        <SectionHeader eyebrow="Let's Connect" title="Open to new" accent="opportunities" C={C}/>
        <div className="contact-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"start" }}>
          <div ref={leftRef} className="fade-up">
            <p style={{ color:C.text2, lineHeight:1.85, marginBottom:"2rem" }}>Whether you're looking for a dedicated system developer with .NET expertise, or someone ready to grow into full-stack and mobile roles, I'd love to hear from you. Let's build something great.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
              {links.map(({ icon, label, val, href }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} style={{ display:"flex", alignItems:"center", gap:14, color:C.text, padding:"1rem 1.25rem", background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:12, fontSize:"0.9rem", transition:"border-color 0.2s,background 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = C.border2}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                  <div style={{ width:36, height:36, borderRadius:8, background:C.tagBg, display:"flex", alignItems:"center", justifyContent:"center", color:C.accent3, fontSize:"1rem" }}>{icon}</div>
                  <div><div style={{ fontSize:"0.78rem", color:C.text3, marginBottom:2 }}>{label}</div>{val}</div>
                </a>
              ))}
            </div>
          </div>
          <div ref={rightRef} className="fade-up">
            <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
              {[
                { id:"name",  label:"Your name",     type:"text",  placeholder:"Enter your name" },
                { id:"email", label:"Email address", type:"email", placeholder:"Enter your email" },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id} style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <label htmlFor={id} style={{ fontSize:"0.8rem", color:C.text3, letterSpacing:"0.02em" }}>{label}</label>
                  <input id={id} type={type} placeholder={placeholder} value={form[id]} onChange={e => setForm(p => ({ ...p, [id]: e.target.value }))} style={iStyle}
                    onFocus={e => e.target.style.borderColor = "rgba(167,139,250,0.4)"}
                    onBlur={e  => e.target.style.borderColor = C.border}/>
                </div>
              ))}
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <label htmlFor="message" style={{ fontSize:"0.8rem", color:C.text3, letterSpacing:"0.02em" }}>Message</label>
                <textarea id="message" placeholder="Tell me about the opportunity..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} style={{ ...iStyle, minHeight:120, resize:"vertical" }}
                  onFocus={e => e.target.style.borderColor = "rgba(167,139,250,0.4)"}
                  onBlur={e  => e.target.style.borderColor = C.border}/>
              </div>
              <button type="submit" style={{ background:sent?"#059669":C.accent2, color:"#fff", border:"none", padding:"0.8rem 1.75rem", borderRadius:12, fontSize:"0.9rem", fontWeight:500, cursor:"pointer", transition:"background 0.2s", alignSelf:"flex-start", fontFamily:"Inter,sans-serif" }}
                onMouseEnter={e => { if (!sent) e.currentTarget.style.background = "#6d28d9"; }}
                onMouseLeave={e => { if (!sent) e.currentTarget.style.background = C.accent2;  }}>
                {sent ? "Message sent ✓" : "Send Message →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ───────────────────────────────────────────────────
function Footer({ C }) {
  return (
    <footer style={{ textAlign:"center", padding:"2.5rem 3rem", borderTop:`0.5px solid ${C.border}`, fontSize:"0.8rem", color:C.text3, background:C.footerBg, transition:"background 0.3s ease" }}>
      © 2026 Hazel Faith Asuncion · Designed &amp; built with care · Philippines 🇵🇭
    </footer>
  );
}

// ── APP ──────────────────────────────────────────────────────
export default function App() {
  const { mode, toggle, C } = useTheme();
  return (
    <>
      <GlobalStyles C={C}/>
      <Navbar C={C} mode={mode} toggle={toggle}/>
      <Hero C={C}/>
      <About C={C}/>
      <Skills C={C}/>
      <Certifications C={C}/>
      <Experience C={C}/>
      <Projects C={C}/>
      <Contact C={C}/>
      <Footer C={C}/>
      <ExportFAB C={C}/>
    </>
  );
}
