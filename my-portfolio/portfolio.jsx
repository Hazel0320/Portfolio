import React, { useState, useEffect, useRef, useCallback } from "react";
import profile from "./src/assets/2x2.png";
import sqlCert from "./src/assets/TESTDOME.png";
import benessugCert from "./src/assets/benessug.jpeg";
import paperlessCert from "./src/assets/paperless.jpeg";
import fab1 from "./src/assets/fabrication/fab1.png";
import fab2 from "./src/assets/fabrication/fab2.png";
import fab3 from "./src/assets/fabrication/fab3.png";
import fab4 from "./src/assets/fabrication/fab4.png";
import fab5 from "./src/assets/fabrication/fab5.png";
import fab6 from "./src/assets/fabrication/fab6.png";
import tasking1 from "./src/assets/tasking/task1.png";
import tasking2 from "./src/assets/tasking/task2.png";
import pm1 from "./src/assets/preventive/pm1.png";
import pm2 from "./src/assets/preventive/pm2.png";
import pm3 from "./src/assets/preventive/pm3.png";
import pm4 from "./src/assets/preventive/pm4.png";
import android2 from "./src/assets/androids/android2.png";                                                                                                                                                                                                                                                               
import android3 from "./src/assets/androids/android3.png";
// ── Fabrication 3D Viewer ──
import fab3d1 from "./src/assets/fabrication3d/fab3d1.png";
import fab3d2 from "./src/assets/fabrication3d/fab3d2.png";
import fab3d3 from "./src/assets/fabrication3d/fab3d3.png";
// ── Fixed Asset Inventory ──
import fa1 from "./src/assets/fixedasset/fa1.png";
import fa2 from "./src/assets/fixedasset/fa2.png";
import fa3 from "./src/assets/fixedasset/fa3.png";


// ══════════════════════════════════════════════════════════════
// ── THEME TOKENS ─────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════
const themes = {
  dark: {
    bg: "#0a0a0f", bg2: "#12121a", bg3: "#1a1a26",
    surface: "#1e1e2e",
    border: "rgba(255,255,255,0.08)", border2: "rgba(255,255,255,0.14)",
    accent: "#a78bfa", accent2: "#7c3aed", accent3: "#c4b5fd",
    teal: "#2dd4bf", pink: "#f472b6",
    text: "#f1f0f5", text2: "#a09eb8", text3: "#6b6985",
    inputBg: "#1a1a26",
    shadow: "rgba(0,0,0,0.3)",
    navBg: "rgba(10,10,15,0.92)",
    heroGlow: "rgba(167,139,250,0.15)",
    tagBg: "rgba(167,139,250,0.12)",
    tagBorder: "rgba(167,139,250,0.2)",
    timeline: "rgba(255,255,255,0.08)",
    certBg: "#1a1a26", certBorder: "#3b1f6b",
    greenBadge: "#065f46", greenText: "#6ee7b7",
    fabBg: "#7c3aed", fabShadow: "rgba(124,58,237,0.45)",
    footerBg: "#0a0a0f",
  },
  light: {
    bg: "#f8f9fa", bg2: "#eef0f2", bg3: "#e2e5e9",
    surface: "#ffffff",
    border: "rgba(0,0,0,0.08)", border2: "rgba(0,0,0,0.14)",
    accent: "#7c3aed", accent2: "#6d28d9", accent3: "#5b21b6",
    teal: "#0d9488", pink: "#db2777",
    text: "#1a1a2e", text2: "#4b5563", text3: "#6b7280",
    inputBg: "#f3f4f6",
    shadow: "rgba(0,0,0,0.08)",
    navBg: "rgba(248,249,250,0.92)",
    heroGlow: "rgba(124,58,237,0.08)",
    tagBg: "rgba(124,58,237,0.08)",
    tagBorder: "rgba(124,58,237,0.15)",
    timeline: "rgba(0,0,0,0.08)",
    certBg: "#f3f4f6", certBorder: "#c4b5fd",
    greenBadge: "#d1fae5", greenText: "#059669",
    fabBg: "#6d28d9", fabShadow: "rgba(124,58,237,0.3)",
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
  return { mode, toggle, C: themes[mode] };
}

function GradientText({ children, from, to, style = {} }) {
  return (
    <span style={{
      background: `linear-gradient(135deg, ${from}, ${to})`,
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      backgroundClip: "text", color: "transparent",
      display: "inline-block", transform: "translateZ(0)", isolation: "isolate",
      ...style,
    }}>{children}</span>
  );
}

// ══════════════════════════════════════════════════════════════
// ── PROJECT DATA ─────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════
const PROJECT_DATA = [
  {
    id: "fab",
    icon: "🖥️",
    iconBg: "rgba(167,139,250,0.1)",
    type: "Desktop + Web System",
    name: "Fabrication Request System",
    shortDesc: "End-to-end jig fabrication request and approval management for Sanyo Denki Philippines.",
    stack: ["C#", "ASP.NET", "WinForms", "SQL Server", "HTML", "CSS", "JavaScript"],
    // Replace these string paths with real imported image variables once you add the files
    // e.g. screens: [fabReq1, fabReq2, fabReq3, fabReq4, fabReq5, fabReq6]
    screens: [
      { src: fab1,  caption: "Request tab — new FAB request form with Dept/Sect, Jig Name, Reason, Before/After details" },
      { src: fab2,  caption: "1st Approval tab — list of pending requests awaiting first-level sign-off" },
      { src: fab3,  caption: "2nd Approval tab — checker sign-off with approval date and required date fields" },
      { src: fab4,  caption: "3rd Approval tab — final management approval with three-level sign-off chain" },
      { src: fab5,  caption: "Fabrication tab — requests released for physical fabrication work" },
      { src: fab6,  caption: "JCS (Jig Checker Sheet) tab — digital checklist replacing the paper form" },
    ],
    definition: `The Fabrication Request System is an internal web-based and desktop application built for the Production Engineering – Production Improvement team at Sanyo Denki Philippines. It digitises the entire lifecycle of a jig fabrication request — from initial submission through multi-level approval to physical fabrication and final Jig Checker Sheet sign-off.`,
    purpose: `Before this system, all fabrication requests were handled through paper forms that were slow to route, easy to lose, and impossible to query historically. This system eliminates those pain points by centralising every request in a shared database and providing role-based access so each approver sees only the queue relevant to them.`,
    features: [
      "New FAB Request form with Dept/Sect, Jig Name, Reason, Before/After description, Remarks, and Requested By",
      "Parts tab — bill-of-materials list attached to each request",
      "Attachments tab — upload supporting drawings or photos",
      "1st Approval queue — Noted By sign-off with accept/reject controls",
      "2nd Approval queue — Checked By sign-off with date tracking",
      "3rd Approval queue — Approved By sign-off, Required/Target/Completion dates",
      "Fabrication queue — view requests cleared for shop-floor work",
      "JCS (Jig Checker Sheet) — digital Engineering Dept. checklist with 10+ quality checkpoints, Using Dept. and digitalize export of Jig Checker Sheet per In-Charge columns",
      "Status dashboard — real-time badge counts across all workflow stages",
      "Pagination and department filter on every list",
      "Auto-generated Fabrication IDs (FR-YYMM-NNN format)",
    ],
    impact: "Reduced average approval cycle time, eliminated paper routing, and created a fully searchable audit trail for all fabrication requests across departments.",
  },
  {
    id: "tasking",
    icon: "🌐",
    iconBg: "rgba(45,212,191,0.1)",
    type: "Web System",
    name: "Employee Tasking Web",
    shortDesc: "Task assignment and monitoring portal for production team members with role-based access.",
    stack: ["ASP.NET", "C#", "SQL Server", "HTML", "CSS", "JavaScript"],
    screens: [
  {
    src: tasking1,
    caption:
      "Task Dashboard — Displays all work orders assigned to employees with priority, status, due dates, and department filters.",
  },
  {
    src: tasking2,
    caption:
      "Task Details — Shows task information, remarks, progress updates, notes, and completion monitoring.",
  },
],
    definition: `The Employee Tasking Web is an ASP.NET internal portal that allows team leaders to assign, update, and track tasks for each member of the Production Engineering team. It provides a centralised view of daily work distribution and progress.`,
    purpose: `Manual task assignment through verbal or paper-based instructions made it difficult to monitor workload balance and task completion. This system gives supervisors real-time visibility into who is doing what, and gives members a clear digital task list.`,
    features: [
      "Task creation with title, category, priority (Low / Medium / High), date range, PIC, and department",
      "Status tracking: Pending → In Progress → On Hold → Completed",
      "Per-member task count dashboard with colour-coded load indicators",
      "Notes tab — sub-task checklist with estimated hours and Mark Done functionality",
      "Remarks / chat tab — comment thread per task work order",
      "Work Order auto-generation (WO-YYMM-NNN format)",
      "Role-based access so only authorised users can update statuses",
      "Department dropdown filter to scope the view to one section",
      "Refresh and Back navigation without full page reload",
    ],
    impact: "Improved daily task visibility across all sections.",
  },
    {
      id: "pm",
      icon: "⚙️",
      iconBg: "rgba(251,191,36,0.1)",
      type: "Web System",
      name: "Machine Preventive Maintenance System",
      shortDesc: "Paperless PM scheduling and digital form management for factory equipment.",
      stack: ["ASP.NET", "C#", "SQL Server", "HTML", "CSS", "JavaScript"],
      screens: [
    {
      src: pm1,
      caption:
        "Machine List — Displays all registered machines and their maintenance schedules.",
    },
    {
      src: pm2,
      caption:
        "Preventive Maintenance Form — Digital checklist replacing paper forms.",
    },
    {
      src: pm3,
      caption:
        "Maintenance History — Displays previous maintenance records and technicians.",
    },
    {
      src: pm4,
      caption:
        "PM Dashboard — Shows upcoming, overdue, and completed maintenance activities.",
    },
  ],
    definition: `The Machine Preventive Maintenance System is a web application that replaces paper-based PM forms with structured digital records. It covers scheduling, execution logging, and auto-formatted PDF generation for each maintenance activity.`,
    purpose: `Paper PM forms were prone to loss, illegibility, and inconsistent formatting. This system standardises every PM record and makes historical data instantly searchable, helping the team meet ISO audit requirements and reduce unplanned machine downtime.`,
    features: [
      "Machine registry linked to PM schedule templates",
      "Calendar-based scheduling with due-date alerts",
      "Digital PM form with section-by-section check items",
      "Technician sign-off and supervisor verification fields",
      "Automatic PDF export with company header and formatted table",
      "History log — full audit trail per machine",
      "Status dashboard: Scheduled / In Progress / Completed / Overdue",
      "Email or in-app notifications for upcoming PM due dates",
      "Centralised SQL Server database shared across all PE sections",
    ],
    impact: "Eliminated lost paper forms, standardised PM documentation, and cut report generation time from hours to seconds.",
  },
  {
    id: "android",
    icon: "📱",
    iconBg: "rgba(244,114,182,0.1)",
    type: "Mobile Application",
    name: "IMPEX Mobile Application",
    shortDesc:
      "A mobile version of the IMPEX System developed to provide convenient access to shipment and inventory information anytime and anywhere.",

    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "ASP.NET Core Web API",
      "SQL Server",
    ],

    screens: [
      {
        src: android2,
        caption:
          "Login Screen — Secure authentication page for authorized IMPEX users.",
      },
      {
        src: android3,
        caption:
          "Dashboard — Mobile dashboard providing quick access to IMPEX modules and shipment information.",
      },
    ],

    definition:
      "The IMPEX Mobile Application is a React Native mobile version of the existing IMPEX System. It enables users to access shipment and inventory information through Android devices while connecting to the same backend database using ASP.NET Core Web API.",

    purpose:
      "The application was developed to improve accessibility by allowing users to monitor and manage IMPEX transactions without relying on a desktop computer. It provides a responsive and user-friendly interface for employees working inside or outside the office.",

    features: [
      "Secure user authentication",
      "Mobile dashboard with summary information",
      "Shipment monitoring",
      "Search and filter shipment records",
      "Real-time data retrieved through ASP.NET Core Web API",
      "Responsive interface optimized for Android devices",
      "Role-based user access",
      "Integration with the existing IMPEX SQL Server database",
    ],

    impact:
      "Improved accessibility to the IMPEX System by enabling employees to monitor shipment information and perform essential tasks through a mobile application, reducing dependency on desktop workstations.",
  },
    {
    id: "fab3d",
    icon: "🧊",
    iconBg: "rgba(59,130,246,0.1)",
    type: "Web System",
    name: "Fabrication 3D Viewer",
    shortDesc: "Interactive 3D visualization of fabricated jigs and parts, allowing engineers to inspect designs before fabrication.",
    stack: ["Three.js", "React Three Fiber", "JavaScript", "ASP.NET", "SQL Server"],
    screens: [
      { src: fab3d1, caption: "3D Viewer — interactive orbit/zoom/pan view of a fabricated jig model loaded in the browser." },
      { src: fab3d2, caption: "Part Explorer — model tree panel listing components with select-and-highlight in the 3D scene." },
      { src: fab3d3, caption: "Measurement & Dimensions — overlaid dimensions and section view for pre-fabrication review." },
    ],
    definition: `The Fabrication 3D Viewer is a web-based application that renders fabricated jig and part models in interactive 3D directly in the browser. It allows the Production Engineering team to visually inspect jig designs, orientations, and dimensions before and during the fabrication process — complementing the Fabrication Request System workflow.`,
    purpose: `Previously, engineers relied on static 2D screenshots and paper drawings to review jig designs, which made orientation, fit, and clearance issues easy to miss. The 3D Viewer eliminates this by giving everyone an interactive, rotatable, zoomable model — no CAD software or special license needed on the reviewer's machine.`,
    features: [
      "Interactive 3D scene with orbit, pan, and zoom controls",
      "Model tree panel — select a component to auto-focus and highlight it in the scene",
      "Wireframe / solid / exploded view toggle",
      "Measurement overlays and section views for dimension checking",
      "Loads standard model formats (e.g., GLTF/GLB, OBJ, STL)",
      "Embedded directly into the Fabrication Request System, linked per request record",
      "Responsive layout — works on office desktops and shared inspection stations",
    ],
    impact: "Reduced design misinterpretation before fabrication and cut down rework caused by unclear 2D references.",
  },
    {
    id: "fixedasset",
    icon: "🏢",
    iconBg: "rgba(16,185,129,0.1)",
    type: "Web System",
    name: "Fixed Asset Inventory System",
    shortDesc: "Company-wide fixed asset tracking with depreciation monitoring and one-click CSV report export in a fixed accounting layout.",
    stack: ["ASP.NET", "C#", "SQL Server", "HTML", "CSS", "JavaScript"],
    screens: [
      { src: fa1, caption: "Asset Dashboard — master list of all registered fixed assets with category, department, location, custodian, and status badges." },
      { src: fa2, caption: "Asset Registration — add/edit form with auto-generated asset code, acquisition date, cost, useful life, and depreciation setup." },
      { src: fa3, caption: "CSV Report Export — generated report following a fixed accounting layout: Asset Code, Description, Category, Location, Acquisition Date, Cost, Accumulated Depreciation, Book Value, and Status columns." },
    ],
    definition: `The Fixed Asset Inventory System is an internal web application that centralizes the tracking of company fixed assets — machinery, equipment, tools, and IT hardware. Each asset record holds its identification, category, physical location, custodian, acquisition details, depreciation info, and current status, with a built-in CSV report export that follows the company's standard accounting report layout.`,
    purpose: `Asset records were previously maintained in scattered Excel files, making annual physical inventory counts slow and reconciliation with Accounting tedious. This system provides a single source of truth for every asset, and its CSV export produces a report with a fixed column layout that Accounting can use directly — no manual reformatting.`,
    features: [
      "Asset registration with auto-generated asset codes (FA-YYMM-NNN format)",
      "Category, department, location, and custodian assignment per asset",
      "Straight-line depreciation tracking with computed book value",
      "Status lifecycle: Active → In Use → For Repair → For Disposal → Disposed",
      "One-click CSV report export with fixed layout — headers, column order, and formatting matched to the Accounting department's template",
      "Filters by category, department, location, status, and acquisition year",
      "Per-asset history / audit trail (transfers, custody changes, disposal)",
      "Dashboard summary — total asset count, total acquisition cost, and per-category breakdown",
      "Physical inventory count mode for annual asset verification",
    ],
    impact: "Replaced scattered Excel-based asset tracking with a centralized database and cut annual physical inventory preparation from days of manual consolidation to a single CSV export.",
  },
];

// ══════════════════════════════════════════════════════════════
// ── PROJECT DETAIL PAGE ───────────────────────────────────────
// ══════════════════════════════════════════════════════════════
function ProjectDetail({ project, C, onBack }) {
  const [activeImg, setActiveImg] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  // Lock body scroll while this page is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const hasScreens = project.screens && project.screens.length > 0;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 500,
      background: C.bg,
      overflowY: "auto",
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Lightbox */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 900,
            background: "rgba(0,0,0,0.92)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "2rem",
          }}
        >
          <img
            src={project.screens[lightbox].src}
            alt=""
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: "95vw", maxHeight: "80vh",
              objectFit: "contain", borderRadius: 12,
              border: `1px solid ${C.border2}`,
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            }}
          />
          <p style={{ color: "#a09eb8", marginTop: "1rem", fontSize: "0.85rem", textAlign: "center", maxWidth: 600 }}>
            {project.screens[lightbox].caption}
          </p>
          <p style={{ color: "#6b6985", marginTop: "0.5rem", fontSize: "0.75rem" }}>Click anywhere to close</p>
        </div>
      )}

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "2rem 2rem 5rem" }}>

        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "none", border: `0.5px solid ${C.border2}`,
            borderRadius: 10, padding: "0.55rem 1.2rem",
            color: C.text2, fontSize: "0.85rem", cursor: "pointer",
            fontFamily: "Inter,sans-serif", marginBottom: "2rem",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.text; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border2; e.currentTarget.style.color = C.text2; }}
        >
          ← Back to Projects
        </button>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem", marginBottom: "2.5rem" }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: project.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", flexShrink: 0 }}>
            {project.icon}
          </div>
          <div>
            <span style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em", color: C.text3, padding: "0.2rem 0.65rem", border: `0.5px solid ${C.border}`, borderRadius: 999, display: "inline-block", marginBottom: "0.5rem" }}>{project.type}</span>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 700, color: C.text, lineHeight: 1.1, marginBottom: "0.5rem" }}>{project.name}</h1>
            <p style={{ color: C.text2, fontSize: "1rem" }}>{project.shortDesc}</p>
          </div>
        </div>

        {/* Tech stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "2.5rem" }}>
          {project.stack.map(s => (
            <span key={s} style={{ padding: "0.3rem 0.85rem", borderRadius: 999, fontSize: "0.78rem", fontWeight: 500, background: C.tagBg, color: C.accent3, border: `0.5px solid ${C.tagBorder}` }}>{s}</span>
          ))}
        </div>

        {/* Screenshots */}
        {hasScreens && (
          <div style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 600, color: C.text, marginBottom: "1rem", letterSpacing: "0.02em" }}>
              Screenshots
            </h2>

            {/* Main viewer */}
            <div
              onClick={() => setLightbox(activeImg)}
              style={{
                width: "100%", aspectRatio: "16/9",
                background: C.bg3, borderRadius: 14,
                border: `0.5px solid ${C.border}`,
                overflow: "hidden", cursor: "zoom-in",
                position: "relative", marginBottom: "0.75rem",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <img
                src={project.screens[activeImg].src}
                alt={project.screens[activeImg].caption}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: imageFailed ? "none" : "block" }}
                onError={() => setImageFailed(true)}
              />
              {imageFailed && (
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: C.text3, fontSize: "0.85rem", pointerEvents: "none" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem", opacity: 0.3 }}>🖼</div>
                  <div style={{ opacity: 0.4, textAlign: "center", padding: "0 2rem" }}>{project.screens[activeImg].caption}</div>
                </div>
              )}
              {/* Zoom hint */}
              <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: "0.7rem", padding: "3px 8px", borderRadius: 6, backdropFilter: "blur(4px)" }}>
                🔍 Click to zoom
              </div>
            </div>

            {/* Caption */}
            <p style={{ color: C.text2, fontSize: "0.82rem", marginBottom: "1rem", lineHeight: 1.6 }}>
              <strong style={{ color: C.accent3 }}>Fig {activeImg + 1}:</strong> {project.screens[activeImg].caption}
            </p>

            {/* Thumbnails */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {project.screens.map((scr, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setImageFailed(false);
                    setActiveImg(i);
                  }}
                  style={{
                    width: 80, height: 52, padding: 0, border: "none",
                    borderRadius: 8, overflow: "hidden", cursor: "pointer",
                    outline: i === activeImg ? `2px solid ${C.accent}` : "2px solid transparent",
                    outlineOffset: 2,
                    background: C.bg3,
                    position: "relative",
                    transition: "outline 0.15s",
                    flexShrink: 0,
                  }}
                >
                  <img src={scr.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={e => { e.currentTarget.style.display = "none"; }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: C.text3, fontSize: "0.65rem" }}>
                    {i + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content cards */}
        {[
          {
            icon: "📖", label: "Definition",
            content: <p style={{ color: C.text2, lineHeight: 1.85 }}>{project.definition}</p>
          },
          {
            icon: "🎯", label: "Purpose & Problem Solved",
            content: <p style={{ color: C.text2, lineHeight: 1.85 }}>{project.purpose}</p>
          },
          {
            icon: "⚡", label: "Key Features & Functions",
            content: (
              <ul style={{ paddingLeft: "1.25rem", margin: 0 }}>
                {project.features.map((f, i) => (
                  <li key={i} style={{ color: C.text2, marginBottom: "0.6rem", lineHeight: 1.7, fontSize: "0.9rem" }}>
                    {f}
                  </li>
                ))}
              </ul>
            )
          },
          {
            icon: "📈", label: "Impact",
            content: <p style={{ color: C.text2, lineHeight: 1.85 }}>{project.impact}</p>
          },
        ].map(({ icon, label, content }) => (
          <div key={label} style={{
            background: C.surface,
            border: `0.5px solid ${C.border}`,
            borderRadius: 14, overflow: "hidden",
            marginBottom: "1rem",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "12px 18px",
              background: C.bg2,
              borderBottom: `0.5px solid ${C.border}`,
            }}>
              <span style={{ fontSize: "1.1rem" }}>{icon}</span>
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: C.text, letterSpacing: "0.02em" }}>{label}</span>
            </div>
            <div style={{ padding: "1.25rem 1.5rem" }}>
              {content}
            </div>
          </div>
        ))}

      </div>
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
      body { background:${C.bg}; color:${C.text}; font-family:'Inter',sans-serif; font-size:16px; line-height:1.7; overflow-x:hidden; transition:background 0.3s ease, color 0.3s ease; }
      a { color:inherit; text-decoration:none; }
      .fade-up { opacity:0; transform:translateY(24px); transition:opacity .6s ease,transform .6s ease; }
      .fade-up.visible { opacity:1; transform:translateY(0); }
      .grad-text {
        -webkit-background-clip:text!important; -webkit-text-fill-color:transparent!important;
        background-clip:text!important; color:transparent!important;
        display:inline-block!important; transform:translateZ(0); isolation:isolate; position:relative; z-index:0;
      }
      @media(max-width:768px){
        .hero-grid{grid-template-columns:1fr!important;}
        .about-grid{grid-template-columns:1fr!important;}
        .contact-grid{grid-template-columns:1fr!important;}
        .hero-card-wrap{order:-1;}
        nav{padding:1rem 1.5rem!important;}
        .nav-links{display:none!important;}
        .section-container{padding:4rem 1.5rem!important;}
        .hero-section{padding:5rem 1.5rem 3rem!important;}
      }
      @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
    `}</style>
  );
}

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return ref;
}

// ── CV export ─────────────────────────────────────────────────
function exportCV() {
  const link = document.createElement("a");
  link.href = "/AsuncionHazelFaithM.-RESUME.pdf";
  link.download = "AsuncionHazelFaithM.-RESUME.pdf";
  document.body.appendChild(link); link.click(); document.body.removeChild(link);
}

function ExportFAB({ C }) {
  const [open, setOpen] = useState(false);
  const [cvDone, setCvDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleCV = useCallback(async () => {
    setLoading(true);
    try { await exportCV(); setCvDone(true); setTimeout(() => setCvDone(false), 2500); } catch {}
    setLoading(false); setOpen(false);
  }, []);
  const fab = { display:"flex", alignItems:"center", gap:8, border:"none", cursor:"pointer", fontFamily:"Inter,sans-serif", fontWeight:600, borderRadius:999, transition:"all 0.2s" };
  return (
    <div style={{ position:"fixed", bottom:"2rem", right:"2rem", zIndex:200 }}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:10, marginBottom:10, opacity:open?1:0, transform:open?"translateY(0)":"translateY(12px)", pointerEvents:open?"all":"none", transition:"opacity 0.2s,transform 0.2s" }}>
        <button onClick={handleCV} disabled={loading} style={{ ...fab, background:cvDone?"#059669":C.fabBg, color:"#fff", fontSize:"0.82rem", padding:"0.6rem 1.2rem", boxShadow:`0 3px 16px ${C.fabShadow}`, opacity:loading?0.7:1 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">{cvDone?<polyline points="20 6 9 17 4 12"/>:<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>}</svg>
          {loading?"Generating…":cvDone?"Downloaded!":"Export CV (PDF)"}
        </button>
      </div>
      <button onClick={() => setOpen(o=>!o)} style={{ ...fab, background:open?C.surface:C.fabBg, color:"#fff", fontSize:"0.88rem", padding:"0.75rem 1.5rem", boxShadow:`0 4px 24px ${C.fabShadow}`, transform:open?"rotate(45deg) scale(0.95)":"none" }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">{open?<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>:<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>}</svg>
        {open?"Close":"Export"}
      </button>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────
function Navbar({ C, mode, toggle }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn=()=>setScrolled(window.scrollY>20); window.addEventListener("scroll",fn); return ()=>window.removeEventListener("scroll",fn); }, []);
  const links = ["About","Skills","Certifications","Experience","Projects","Contact"];
  return (
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1.2rem 3rem",background:scrolled?C.navBg:(mode==="dark"?"rgba(10,10,15,0.7)":"rgba(248,249,250,0.7)"),backdropFilter:"blur(12px)",borderBottom:`0.5px solid ${C.border}`,transition:"background 0.3s" }}>
      <span style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",fontWeight:700 }}>
        <GradientText from={C.accent3} to={C.teal}>HFA</GradientText>
      </span>
      <div style={{ display:"flex",alignItems:"center",gap:"2rem" }}>
        <button onClick={toggle} style={{ background:"none",border:`0.5px solid ${C.border}`,borderRadius:8,padding:"0.4rem 0.8rem",cursor:"pointer",color:C.text2,fontSize:"0.8rem",fontFamily:"Inter,sans-serif" }}
          onMouseEnter={e=>{e.target.style.borderColor=C.accent;e.target.style.color=C.text;}}
          onMouseLeave={e=>{e.target.style.borderColor=C.border;e.target.style.color=C.text2;}}>
          {mode==="dark"?"☀️ Light":"🌙 Dark"}
        </button>
        <ul className="nav-links" style={{ display:"flex",gap:"2rem",listStyle:"none" }}>
          {links.map(l=><li key={l}><a href={`#${l.toLowerCase()}`} style={{ color:C.text2,fontSize:"0.875rem",letterSpacing:"0.04em",transition:"color 0.2s" }} onMouseEnter={e=>e.target.style.color=C.text} onMouseLeave={e=>e.target.style.color=C.text2}>{l}</a></li>)}
        </ul>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────
function Hero({ C }) {
  const infoRows = [
    {icon:"🎂",label:"Age",val:"22 years old"},
    {icon:"🎓",label:"Education",val:"PRMSU — Main Iba Campus"},
    {icon:"🏢",label:"Experience",val:"Sanyo Denki Philippines"},
    {icon:"💻",label:"Specialty",val:"C# · ASP.NET · WinForms"},
    {icon:"🏆",label:"Certification",val:"TestDome SQL (Top 10%)"},
  ];
  return (
    <section id="hero" className="hero-section" style={{ minHeight:"100vh",display:"flex",alignItems:"center",padding:"6rem 3rem 4rem",maxWidth:1100,margin:"0 auto" }}>
      <div className="hero-grid" style={{ display:"grid",gridTemplateColumns:"1fr 380px",gap:"4rem",alignItems:"center",width:"100%" }}>
        <div>
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:C.tagBg,border:`0.5px solid ${C.tagBorder}`,borderRadius:999,padding:"0.35rem 1rem",fontSize:"0.8rem",color:C.accent3,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:"1.5rem" }}>
            <span style={{ width:6,height:6,borderRadius:"50%",background:C.teal,display:"inline-block",animation:"pulse 2s ease-in-out infinite" }}/>
            Available for opportunities
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(2.8rem,6vw,5rem)",fontWeight:900,lineHeight:1.05,letterSpacing:"-0.02em",marginBottom:"0.5rem",color:C.text }}>
            Hazel Faith<br/>
            <span className="grad-text" style={{ background:`linear-gradient(135deg,${C.accent},${C.teal})` }}>Asuncion</span>
          </h1>
          <p style={{ fontSize:"1.1rem",color:C.text2,marginBottom:"1.5rem",fontWeight:400 }}>System Developer &amp; Web Programmer</p>
          <p style={{ fontSize:"1rem",color:C.text2,maxWidth:480,lineHeight:1.85,marginBottom:"2.5rem" }}>Building efficient, reliable systems with a focus on .NET ecosystems and desktop application development. Experienced in enterprise software with a growing full-stack skillset.</p>
          <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap" }}>
            <a href="#experience" style={{ display:"inline-flex",alignItems:"center",gap:8,background:C.accent2,color:"#fff",padding:"0.75rem 1.75rem",borderRadius:12,fontSize:"0.9rem",fontWeight:500,transition:"background 0.2s,transform 0.15s" }} onMouseEnter={e=>{e.currentTarget.style.background="#6d28d9";e.currentTarget.style.transform="translateY(-1px)";}} onMouseLeave={e=>{e.currentTarget.style.background=C.accent2;e.currentTarget.style.transform="none";}}>View Experience →</a>
            <a href="#contact" style={{ display:"inline-flex",alignItems:"center",gap:8,border:`0.5px solid ${C.border2}`,color:C.text,padding:"0.75rem 1.75rem",borderRadius:12,fontSize:"0.9rem",fontWeight:500,transition:"background 0.2s,transform 0.15s" }} onMouseEnter={e=>{e.currentTarget.style.background=C.surface;e.currentTarget.style.transform="translateY(-1px)";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.transform="none";}}>Get in Touch</a>
          </div>
        </div>
        <div className="hero-card-wrap" style={{ background:C.surface,border:`0.5px solid ${C.border}`,borderRadius:20,padding:"2.5rem",position:"relative",overflow:"hidden",transition:"background 0.3s,border-color 0.3s" }}>
          <div style={{ position:"absolute",top:-60,right:-60,width:200,height:200,background:`radial-gradient(circle,${C.heroGlow} 0%,transparent 70%)`,pointerEvents:"none" }}/>
          <img src={profile} alt="Hazel Faith Asuncion" style={{ width:120,height:120,borderRadius:"50%",objectFit:"cover",display:"block",margin:"0 auto 1.5rem",border:`4px solid ${C.accent2}`,boxShadow:"0 10px 30px rgba(0,0,0,0.25)" }} />
          <p style={{ textAlign:"center",fontWeight:600,fontSize:"1.1rem",marginBottom:"0.25rem",color:C.text }}>Hazel Faith Asuncion</p>
          <p style={{ textAlign:"center",fontSize:"0.8rem",color:C.text2,marginBottom:"1.5rem" }}>System Developer / Programmer</p>
          {infoRows.map(({icon,label,val})=>(
            <div key={label} style={{ display:"flex",alignItems:"center",gap:10,padding:"0.65rem 0",borderTop:`0.5px solid ${C.border}` }}>
              <div style={{ width:28,height:28,borderRadius:8,background:C.tagBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem",flexShrink:0 }}>{icon}</div>
              <div><div style={{ color:C.text3,fontSize:"0.72rem" }}>{label}</div><div style={{ color:C.text,fontSize:"0.85rem" }}>{val}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({eyebrow,title,accent,C}) {
  return (
    <div style={{ marginBottom:"3rem" }}>
      <span style={{ fontSize:"0.75rem",textTransform:"uppercase",letterSpacing:"0.1em",color:C.accent3,marginBottom:"0.75rem",display:"block" }}>{eyebrow}</span>
      <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,lineHeight:1.1,color:C.text }}>
        {title}<br/><em style={{ fontStyle:"italic",color:C.accent3 }}>{accent}</em>
      </h2>
    </div>
  );
}

function About({C}) {
  const leftRef=useFadeIn(), rightRef=useFadeIn();
  const stats=[{num:"1+",label:"Year professional experience"},{num:"C#",label:"Primary language"},{num:".NET",label:"Core ecosystem"},{num:"BS CpE",label:"Degree"}];
  const cards=[
    {school:"PRMSU — Main Iba Campus",degree:"Bachelor of Science in Computer Engineering",year:"Graduated 2025 · Iba, Zambales",accent:false},
    {school:"Sanyo Denki Philippines",degree:"System Developer / Programmer",year:"Aug 2025 – Present",accent:false},
    {school:"Currently Expanding",degree:"Kotlin · Node.js · TypeScript · JavaScript",year:"Self-directed learning & growth",accent:true},
  ];
  return (
    <section id="about" style={{ background:C.bg2,transition:"background 0.3s ease" }}>
      <div className="section-container" style={{ maxWidth:1100,margin:"0 auto",padding:"5rem 3rem" }}>
        <SectionHeader eyebrow="Who I Am" title="Crafting systems that" accent="actually work" C={C}/>
        <div className="about-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"start" }}>
          <div ref={leftRef} className="fade-up">
            {["I'm a 22-year-old System Developer and Programmer based in the Philippines, recently graduated from PRMSU — Main Iba Campus. I'm passionate about building structured, maintainable software that solves real operational problems.","My professional experience at Sanyo Denki Philippines gave me hands-on exposure to enterprise system development — working with C# and the .NET ecosystem to build and maintain internal business applications and Windows-based tools.","Beyond the .NET world, I've been expanding my skills into mobile development with Kotlin for Android, and exploring modern web development through Node.js, TypeScript, and JavaScript."].map((p,i)=><p key={i} style={{ color:C.text2,marginBottom:"1rem",lineHeight:1.85 }}>{p}</p>)}
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginTop:"2rem" }}>
              {stats.map(({num,label})=>(<div key={label} style={{ background:C.bg3,border:`0.5px solid ${C.border}`,borderRadius:12,padding:"1.25rem",transition:"background 0.3s" }}><div style={{ fontFamily:"'Playfair Display',serif",fontSize:"2rem",fontWeight:700,color:C.accent3 }}>{num}</div><div style={{ fontSize:"0.8rem",color:C.text3,marginTop:"0.25rem" }}>{label}</div></div>))}
            </div>
          </div>
          <div ref={rightRef} className="fade-up">
            {cards.map(({school,degree,year,accent})=>(<div key={school} style={{ background:accent?C.tagBg:C.bg3,border:`0.5px solid ${accent?C.tagBorder:C.border}`,borderRadius:12,padding:"1.75rem",marginBottom:"1rem" }}><div style={{ fontWeight:600,fontSize:"1rem",color:accent?C.accent3:C.text,marginBottom:"0.25rem" }}>{school}</div><div style={{ fontSize:"0.85rem",color:accent?C.teal:C.accent3,marginBottom:"0.5rem" }}>{degree}</div><div style={{ fontSize:"0.8rem",color:C.text3 }}>{year}</div></div>))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCard({icon,iconBg,iconColor,title,tags,tagStyle,C}) {
  const ref=useFadeIn();
  return (
    <div ref={ref} className="fade-up" style={{ background:C.surface,border:`0.5px solid ${C.border}`,borderRadius:12,padding:"1.75rem",transition:"background 0.3s" }}>
      <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:"1.25rem" }}>
        <div style={{ width:36,height:36,borderRadius:10,background:iconBg,color:iconColor,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem" }}>{icon}</div>
        <span style={{ fontWeight:600,fontSize:"0.95rem",color:C.text }}>{title}</span>
      </div>
      <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
        {tags.map(t=><span key={t} style={{ padding:"0.3rem 0.85rem",borderRadius:999,fontSize:"0.78rem",fontWeight:500,...tagStyle }}>{t}</span>)}
      </div>
    </div>
  );
}

function Skills({C}) {
  const cats=[
    {icon:"⚡",iconBg:C.tagBg,iconColor:C.accent3,title:"Core / Proficient",tags:["C#","ASP.NET","ASPX","WinForms","HTML",".NET Framework"],tagStyle:{background:C.tagBg,color:C.accent3,border:`0.5px solid ${C.tagBorder}`}},
    {icon:"🌱",iconBg:"rgba(45,212,191,0.1)",iconColor:C.teal,title:"Foundational Knowledge",tags:["Kotlin","Android Dev","Node.js","TypeScript","JavaScript"],tagStyle:{background:"rgba(45,212,191,0.08)",color:C.teal,border:"0.5px solid rgba(45,212,191,0.15)"}},
    {icon:"🎯",iconBg:"rgba(244,114,182,0.1)",iconColor:C.pink,title:"Domain Expertise",tags:["Windows Desktop Apps","Enterprise Systems","Web Applications (.NET)","Mobile Development"],tagStyle:{background:C.tagBg,color:C.accent3,border:`0.5px solid ${C.tagBorder}`}},
  ];
  return (
    <section id="skills" style={{ background:C.bg,transition:"background 0.3s ease" }}>
      <div className="section-container" style={{ maxWidth:1100,margin:"0 auto",padding:"5rem 3rem" }}>
        <SectionHeader eyebrow="Technical Stack" title="Languages &" accent="Technologies" C={C}/>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.25rem" }}>
          {cats.map(cat=><SkillCard key={cat.title} {...cat} C={C}/>)}
        </div>
      </div>
    </section>
  );
}

function Certifications({C}) {
  const [selected,setSelected]=useState(null);
  const certs=[
    {title:"SQL Certification",issuer:"TestDome",date:"March 2026",icon:"🏆",image:sqlCert,desc:"Successfully passed the TestDome SQL assessment, ranking in the Top 10% globally."},
    {title:"Benessug Certificate",issuer:"Sanyo Denki Philippines",date:"2026",icon:"📜",image:benessugCert,desc:"Certificate awarded for Benessug participation and accomplishment."},
    {title:"Paperless Project Certificate",issuer:"Sanyo Denki Philippines",date:"2026",icon:"💡",image:paperlessCert,desc:"Recognition for developing the Paperless Jig Checker Sheet project."},
  ];
  return (
    <>
      <section id="certifications" style={{ background:C.bg,transition:"background .3s" }}>
        <div className="section-container" style={{ maxWidth:1100,margin:"0 auto",padding:"5rem 3rem" }}>
          <SectionHeader eyebrow="Achievements" title="Certifications &" accent="Recognition" C={C}/>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:"1.5rem" }}>
            {certs.map(cert=>(
              <div key={cert.title} onClick={()=>setSelected(cert)} style={{ cursor:"pointer",background:C.surface,border:`1px solid ${C.border}`,borderRadius:18,overflow:"hidden",transition:".25s",boxShadow:"0 10px 25px rgba(0,0,0,.08)" }} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-5px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                <img src={cert.image} alt={cert.title} style={{ width:"100%",height:180,objectFit:"cover" }}/>
                <div style={{ padding:"1.5rem" }}>
                  <div style={{ fontSize:"2rem" }}>{cert.icon}</div>
                  <h3 style={{ marginTop:".5rem",marginBottom:".4rem",color:C.text }}>{cert.title}</h3>
                  <p style={{ color:C.accent3 }}>{cert.issuer} • {cert.date}</p>
                  <p style={{ marginTop:"1rem",color:C.text2,lineHeight:1.7 }}>{cert.desc}</p>
                  <span style={{ marginTop:"1rem",display:"inline-block",padding:".45rem .9rem",borderRadius:999,background:C.tagBg,color:C.accent3,fontWeight:600,fontSize:".8rem" }}>Click to View</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {selected&&(
        <div onClick={()=>setSelected(null)} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.85)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:9999,padding:"2rem" }}>
          <div onClick={e=>e.stopPropagation()} style={{ maxWidth:900,width:"100%",background:C.surface,borderRadius:20,overflow:"hidden" }}>
            <img src={selected.image} alt={selected.title} style={{ width:"100%",maxHeight:"80vh",objectFit:"contain",background:"#000" }}/>
            <div style={{ padding:"1.5rem" }}>
              <h2>{selected.title}</h2>
              <p style={{ color:C.text2 }}>{selected.issuer} • {selected.date}</p>
              <button onClick={()=>setSelected(null)} style={{ marginTop:"1rem",padding:".7rem 1.5rem",border:"none",borderRadius:10,cursor:"pointer",background:C.accent2,color:"#fff" }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ExperienceItem({company,role,period,desc,tags,C}) {
  const ref=useFadeIn();
  return (
    <div ref={ref} className="fade-up" style={{ position:"relative",marginBottom:"3rem" }}>
      <div style={{ position:"absolute",left:"-2rem",top:8,width:10,height:10,borderRadius:"50%",background:C.accent2,border:`2px solid ${C.bg2}`,transform:"translateX(-4px)" }}/>
      <div style={{ fontSize:"0.75rem",textTransform:"uppercase",letterSpacing:"0.08em",color:C.teal,marginBottom:"0.35rem" }}>{company}</div>
      <div style={{ fontSize:"1.15rem",fontWeight:600,marginBottom:"0.25rem",color:C.text }}>{role}</div>
      <div style={{ fontSize:"0.78rem",color:C.text3,marginBottom:"1rem" }}>{period}</div>
      <p style={{ color:C.text2,fontSize:"0.9rem",lineHeight:1.8,marginBottom:"1rem" }}>{desc}</p>
      <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
        {tags.map(t=><span key={t} style={{ padding:"0.2rem 0.7rem",borderRadius:6,fontSize:"0.75rem",background:C.bg3,color:C.text2,border:`0.5px solid ${C.border}` }}>{t}</span>)}
      </div>
    </div>
  );
}

function Experience({C}) {
  const items=[
    {company:"Sanyo Denki Philippines",role:"System Developer / Programmer",period:"Aug 2025 – Present · Philippines",desc:"Develop and deploy internal web applications aimed at automating factory processes and improving overall production efficiency. Key contributor to the EMS (Engineering Management Web System): assist in building and maintaining a comprehensive engineering tool used to monitor factory stocks, hardware inventory, component registration, and battery replacements. Implement modules within the EMS for real-time machine monitoring, program tracking, and machine trouble handling to reduce operational downtime.",tags:["C#","ASP.NET","WinForms","ASPX","HTML",".NET Framework","SQL Server"]},
    {company:"PRMSU — Main Iba Campus",role:"BS Computer Engineering Graduate",period:"Graduated 2025 · Iba, Zambales",desc:"Completed a Bachelor of Science in Computer Engineering, gaining a solid foundation in software development principles, systems design, database management, and web programming.",tags:["Software Engineering","Database Management","Web Development","Systems Analysis"]},
  ];
  return (
    <section id="experience" style={{ background:C.bg2,transition:"background 0.3s ease" }}>
      <div className="section-container" style={{ maxWidth:1100,margin:"0 auto",padding:"5rem 3rem" }}>
        <SectionHeader eyebrow="Career" title="Professional" accent="Experience" C={C}/>
        <div style={{ position:"relative",paddingLeft:"2rem" }}>
          <div style={{ position:"absolute",left:0,top:8,bottom:0,width:"0.5px",background:C.timeline }}/>
          {items.map(item=><ExperienceItem key={item.company} {...item} C={C}/>)}
        </div>
      </div>
    </section>
  );
}

// ── ProjectCard — clicking opens the detail page ───────────────
function ProjectCard({ project, C, onSelect }) {
  const ref = useFadeIn();
  return (
    <div
      ref={ref}
      className="fade-up"
      onClick={() => onSelect(project)}
      style={{
        background: C.surface, border: `0.5px solid ${C.border}`,
        borderRadius: 12, padding: "1.75rem",
        cursor: "pointer",
        transition: "border-color 0.2s, transform 0.2s, background 0.3s",
        position: "relative",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = C.border2; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "none"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: project.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>{project.icon}</div>
        <span style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em", color: C.text3, padding: "0.25rem 0.65rem", border: `0.5px solid ${C.border}`, borderRadius: 999 }}>{project.type}</span>
      </div>
      <div style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.5rem", color: C.text }}>{project.name}</div>
      <p style={{ fontSize: "0.85rem", color: C.text2, lineHeight: 1.75, marginBottom: "1.25rem" }}>{project.shortDesc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1.25rem" }}>
        {project.stack.map(s => <span key={s} style={{ padding: "0.2rem 0.65rem", borderRadius: 6, fontSize: "0.72rem", background: C.tagBg, color: C.accent3, border: `0.5px solid ${C.tagBorder}` }}>{s}</span>)}
      </div>
      {/* "View details" hint */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: "0.78rem", color: C.accent3, fontWeight: 500 }}>
        View details →
      </div>
    </div>
  );
}

function Projects({ C }) {
  const [activeProject, setActiveProject] = useState(null);

  if (activeProject) {
    return (
      <ProjectDetail
        project={activeProject}
        C={C}
        onBack={() => setActiveProject(null)}
      />
    );
  }

  return (
    <section id="projects" style={{ background: C.bg, transition: "background 0.3s ease" }}>
      <div className="section-container" style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 3rem" }}>
        <SectionHeader eyebrow="Work" title="Featured" accent="Projects" C={C} />
        <p style={{ color: C.text2, fontSize: "0.9rem", marginBottom: "2rem", marginTop: "-1.5rem" }}>
          Click any project card to see screenshots, full description, features, and impact.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.25rem" }}>
          {PROJECT_DATA.map(proj => (
            <ProjectCard key={proj.id} project={proj} C={C} onSelect={setActiveProject} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({C}) {
  const [form,setForm]=useState({name:"",email:"",message:""});
  const [sent,setSent]=useState(false);
  const leftRef=useFadeIn(), rightRef=useFadeIn();
  const links=[
    {icon:"✉️",label:"Email",val:"hazelfaithasuncion@gmail.com",href:"mailto:hazelfaithasuncion@gmail.com"},
    {icon:"💼",label:"LinkedIn",val:"linkedin.com/in/hazelfaithasuncion",href:"https://linkedin.com/in/hazelfaithasuncion"},
    {icon:"🐙",label:"GitHub",val:"github.com/hazelfaith",href:"https://github.com/hazelfaith"},
    {icon:"📷",label:"Instagram",val:"@faithyatp",href:"https://instagram.com/yourusername"},
    {icon:"📘",label:"Facebook",val:"Hazel Faith Asuncion",href:"https://facebook.com/yourprofile"},
  ];
  const iStyle={background:C.inputBg,border:`0.5px solid ${C.border}`,borderRadius:12,padding:"0.75rem 1rem",color:C.text,fontFamily:"Inter,sans-serif",fontSize:"0.9rem",outline:"none",width:"100%",transition:"border-color 0.2s"};
  const handleSubmit=useCallback(e=>{e.preventDefault();setSent(true);setForm({name:"",email:"",message:""});setTimeout(()=>setSent(false),3000);},[]);
  return (
    <section id="contact" style={{ background:C.bg2,transition:"background 0.3s ease" }}>
      <div className="section-container" style={{ maxWidth:1100,margin:"0 auto",padding:"5rem 3rem" }}>
        <SectionHeader eyebrow="Let's Connect" title="Open to new" accent="opportunities" C={C}/>
        <div className="contact-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"start" }}>
          <div ref={leftRef} className="fade-up">
            <p style={{ color:C.text2,lineHeight:1.85,marginBottom:"2rem" }}>Whether you're looking for a dedicated system developer with .NET expertise, or someone ready to grow into full-stack and mobile roles, I'd love to hear from you.</p>
            <div style={{ display:"flex",flexDirection:"column",gap:"1rem" }}>
              {links.map(({icon,label,val,href})=>(
                <a key={label} href={href} target={href.startsWith("http")?"_blank":undefined} rel={href.startsWith("http")?"noopener noreferrer":undefined} style={{ display:"flex",alignItems:"center",gap:14,color:C.text,padding:"1rem 1.25rem",background:C.bg3,border:`0.5px solid ${C.border}`,borderRadius:12,fontSize:"0.9rem",transition:"border-color 0.2s" }} onMouseEnter={e=>e.currentTarget.style.borderColor=C.border2} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                  <div style={{ width:36,height:36,borderRadius:8,background:C.tagBg,display:"flex",alignItems:"center",justifyContent:"center",color:C.accent3,fontSize:"1rem" }}>{icon}</div>
                  <div><div style={{ fontSize:"0.78rem",color:C.text3,marginBottom:2 }}>{label}</div>{val}</div>
                </a>
              ))}
            </div>
          </div>
          <div ref={rightRef} className="fade-up">
            <form onSubmit={handleSubmit} style={{ display:"flex",flexDirection:"column",gap:"1rem" }}>
              {[{id:"name",label:"Your name",type:"text",placeholder:"Enter your name"},{id:"email",label:"Email address",type:"email",placeholder:"Enter your email"}].map(({id,label,type,placeholder})=>(
                <div key={id} style={{ display:"flex",flexDirection:"column",gap:6 }}>
                  <label htmlFor={id} style={{ fontSize:"0.8rem",color:C.text3 }}>{label}</label>
                  <input id={id} type={type} placeholder={placeholder} value={form[id]} onChange={e=>setForm(p=>({...p,[id]:e.target.value}))} style={iStyle} onFocus={e=>e.target.style.borderColor="rgba(167,139,250,0.4)"} onBlur={e=>e.target.style.borderColor=C.border}/>
                </div>
              ))}
              <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
                <label htmlFor="message" style={{ fontSize:"0.8rem",color:C.text3 }}>Message</label>
                <textarea id="message" placeholder="Tell me about the opportunity..." value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))} style={{ ...iStyle,minHeight:120,resize:"vertical" }} onFocus={e=>e.target.style.borderColor="rgba(167,139,250,0.4)"} onBlur={e=>e.target.style.borderColor=C.border}/>
              </div>
              <button type="submit" style={{ background:sent?"#059669":C.accent2,color:"#fff",border:"none",padding:"0.8rem 1.75rem",borderRadius:12,fontSize:"0.9rem",fontWeight:500,cursor:"pointer",transition:"background 0.2s",alignSelf:"flex-start",fontFamily:"Inter,sans-serif" }} onMouseEnter={e=>{if(!sent)e.currentTarget.style.background="#6d28d9";}} onMouseLeave={e=>{if(!sent)e.currentTarget.style.background=C.accent2;}}>
                {sent?"Message sent ✓":"Send Message →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({C}) {
  return (
    <footer style={{ textAlign:"center",padding:"2.5rem 3rem",borderTop:`0.5px solid ${C.border}`,fontSize:"0.8rem",color:C.text3,background:C.footerBg,transition:"background 0.3s ease" }}>
      © 2026 Hazel Faith Asuncion · Designed &amp; built with care · Philippines 🇵🇭
    </footer>
  );
}

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