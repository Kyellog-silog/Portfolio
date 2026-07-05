"use client"

import { Fragment, useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import type { JSX } from "react"

// ── SVG Icons ────────────────────────────────────────────────────────────────
function IconCoffee() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" aria-hidden="true">
      <path d="M2 21h18v-2H2v2zm2-3h14V5H4v13zm2-11h10v9H6V7zm11-4H5a1 1 0 00-1 1v1h14V4a1 1 0 00-1-1zm2 3v6a2 2 0 000-4V6z" />
    </svg>
  )
}
function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" aria-hidden="true">
      <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2h-1V1h-2zm3 18H5V8h14v11z" />
    </svg>
  )
}
function IconWrench() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" aria-hidden="true">
      <path d="M15.5 2.1L11 6.6l1.4 4L8.6 14H5l-3 3 4 4 3-3v-3.6l3.4-3.4 4 1.4 4.5-4.5a6.08 6.08 0 01-1.4 5.9l1.4 1.4a8 8 0 000-11.3L15.5 2.1z" />
    </svg>
  )
}
function IconTask() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" aria-hidden="true">
      <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  )
}
function IconLung() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" aria-hidden="true">
      <path d="M12 3C8 3 4 5 4 9v7c0 2.2 1.8 4 4 4a4 4 0 004-4v-2h-2v2a2 2 0 01-4 0V9c0-2.3 2.2-4 6-4s6 1.7 6 4v7a2 2 0 01-4 0v-2h-2v2a4 4 0 004 4 4 4 0 004-4V9c0-4-4-6-8-6z" />
    </svg>
  )
}
function IconTruck() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" aria-hidden="true">
      <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  )
}
function IconBarbell() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" aria-hidden="true">
      <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z" />
    </svg>
  )
}

// ── Types ────────────────────────────────────────────────────────────────────
type Stage = {
  id: string
  label: string
  icon: JSX.Element
  tag: string
  tagClass: string
  status: "live" | "wip" | "done"
  statusLabel: string
  url?: string
  githubUrl?: string
  tagline: string // one-line value shown on the card face
  desc: string // longer write-up shown in the expanded panel
  client: string
  year: string
  role: string
  tech: string[] // plain tech tags (replaced self-assigned skill %)
  achievements: string[]
  screenshots?: string[]
  thumb?: string // card-face image override (falls back to screenshots[0])
  fullPage?: boolean
  underConstruction?: boolean // hazard-stripe banner over the card thumbnail
}

// ── Data ─────────────────────────────────────────────────────────────────────
const MAIN_STAGES: Stage[] = [
  {
    id: "STG-01",
    label: "KRAFTSTORIES",
    icon: <IconCoffee />,
    tag: "E-COMMERCE",
    tagClass: "tag-ecom",
    status: "live",
    statusLabel: "LIVE",
    url: "https://kraftstories.com",
    tagline: "End-to-end Shopify storefront across 4 US locations.",
    desc: "End-to-end Shopify store ownership — translating Figma designs into a fully operational storefront with product catalog, content management, inventory setup, and booking flow across 4 US locations.",
    client: "Kraftstories",
    year: "2025",
    role: "Shopify Developer",
    tech: ["Shopify", "Figma → UI", "SEO", "Web Ops"],
    achievements: [
      "Translated Figma designs to live Shopify theme",
      "Managed product catalog across 4 US locations",
      "Created and maintained content strategy",
      "Full store ownership from setup to daily ops",
    ],
    screenshots: [
      "/kraftstories-home.jpg",
      "/Kraftstories-classes.jpg",
      "/Kraftstories-NYC.jpg",
    ],
    fullPage: true,
  },
  {
    id: "STG-02",
    label: "KRAFT UNIVERSE",
    icon: <IconCalendar />,
    tag: "BOOKING",
    tagClass: "tag-booking",
    status: "live",
    statusLabel: "LIVE",
    url: "https://www.artandcraftny.com",
    tagline: "Wix maintenance, SEO & design for a NYC events company.",
    desc: "Wix website maintenance, SEO optimization, and ongoing web design updates for a NYC-based art & craft event company. Responsible for site performance, layout updates, and local search visibility.",
    client: "Kraft Universe",
    year: "2026",
    role: "Wix Dev / SEO",
    tech: ["Wix", "SEO", "Web Design", "UI/UX"],
    achievements: [
      "Ongoing maintenance and content updates",
      "SEO strategy for NYC local search",
      "Web design and layout modifications",
      "Responsive cross-device performance",
    ],
    screenshots: [
      "/Kraftuniverse-home.jpg",
      "/Kraftuniverse-public_workshop.jpg",
    ],
    fullPage: true,
  },
  {
    id: "STG-03",
    label: "CRAFT FOR TEAM",
    icon: <IconWrench />,
    tag: "DESIGN + SEO",
    tagClass: "tag-service",
    status: "live",
    statusLabel: "LIVE",
    url: "https://www.craftforteam.com",
    tagline: "Design overhaul & full SEO audit — SF & San Jose workshops.",
    desc: "Overhauled the design of the Craft for Team website and ran a full SEO audit. The site covers on-site team-building workshop locations across San Francisco (SoMa & FiDi) and San Jose.",
    client: "Craft for Team",
    year: "2026",
    role: "Web Design / SEO",
    tech: ["Web Design", "UI/UX", "SEO", "Web Ops"],
    achievements: [
      "Full design overhaul of the live site",
      "Conducted a comprehensive SEO audit",
      "Optimized for SF SoMa, FiDi & San Jose local search",
      "Improved layout, UX, and on-page structure",
    ],
    screenshots: [
      "/Craftforteam.jpg",
      "/craftforteam-workshop.jpg",
    ],
    fullPage: true,
  },
]

const SIDE_STAGES: Stage[] = [
  {
    id: "STG-04",
    label: "MILEPOST",
    icon: <IconTruck />,
    tag: "FULL-STACK",
    tagClass: "tag-fullstack",
    status: "live",
    statusLabel: "LIVE",
    url: "https://spotter-full-stack.vercel.app",
    githubUrl: "https://github.com/Kyellog-silog/spotter-full-stack",
    tagline: "HOS trip planner — mapped routes with stops plus FMCSA daily log sheets.",
    desc: "Full-stack Hours-of-Service trip planner built for the Spotter AI assessment. From four trip inputs, a pure-Python HOS engine simulates the trip against the federal clocks (11hr driving, 14hr window, 30-min break, 70hr/8day cycle), inserting breaks, resets, and fuel stops. The frontend renders the route on a Leaflet map and draws each day's ELD log on the real DOT grid as SVG. All routing and geocoding run server-side on free APIs — no keys in the browser.",
    client: "Spotter AI Assessment",
    year: "2026",
    role: "Full-Stack Dev",
    tech: ["React", "Django + DRF", "Leaflet", "Tailwind"],
    achievements: [
      "HOS engine covering all four FMCSA clocks",
      "SVG ELD log sheets, one per calendar day",
      "12 passing tests incl. FMCSA golden fixture",
      "Hardened prod security + resilient geocoding",
    ],
    screenshots: [
      "/milepost_1.png",
      "/milepost_2.png",
      "/milepost_3.png",
      "/milepost.png",
    ],
    fullPage: true,
  },
  {
    id: "STG-05",
    label: "TASKFLOW",
    icon: <IconTask />,
    tag: "FULL-STACK",
    tagClass: "tag-fullstack",
    status: "wip",
    statusLabel: "UNDER CONSTRUCTION",
    underConstruction: true,
    url: "https://taskflow-frontend-bay.vercel.app",
    githubUrl: "https://github.com/Kyellog-silog/Taskflow",
    tagline: "Full-stack Kanban task manager with real-time collaboration.",
    desc: "Full-stack task management app with drag-and-drop Kanban boards, real-time updates, and team collaboration features built with React and Laravel.",
    client: "Personal Project",
    year: "2025",
    role: "Full-Stack Dev",
    tech: ["React", "Laravel", "PostgreSQL", "Tailwind"],
    achievements: [
      "Drag-and-drop Kanban board",
      "Real-time team collaboration",
      "JWT authentication system",
      "Full REST API with Laravel",
    ],
    screenshots: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-T2ZmVX1LjOs9O6JoiUCPfe57PiYhqe.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uQfGUaKAG4KAG6acYgWXFks9lsMqom.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-C4RhwEYf2BOpIVFYhCku4UwkUDb07y.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2QDEBOQiI7WwVJOgb6z6SAy6phRBML.png",
    ],
  },
  {
    id: "STG-06",
    label: "BAGANET",
    icon: <IconLung />,
    tag: "THESIS",
    tagClass: "tag-ai",
    status: "done",
    statusLabel: "COMPLETE",
    githubUrl: "https://github.com/Kyellog-silog/BagaNet",
    tagline: "Privacy-preserving lung disease classification via federated learning.",
    desc: "Privacy-preserving lung disease classification using federated learning. Enables client-side model training with TensorFlow.js without sharing raw medical data.",
    client: "Thesis",
    year: "2025",
    role: "ML Engineer",
    tech: ["Python", "TensorFlow.js", "Flask", "React"],
    achievements: [
      "Federated learning architecture",
      "Privacy-preserving ML flow",
      "ONNX model conversion",
      "Docker containerization",
    ],
    thumb: "/federated-learning-medical-ai-dashboard.jpg",
  },
  {
    id: "STG-07",
    label: "WORKOUT TRACKER",
    icon: <IconBarbell />,
    tag: "FITNESS APP",
    tagClass: "tag-fitness",
    status: "wip",
    statusLabel: "IN PROGRESS",
    url: "https://ppl-tracker-tau.vercel.app",
    githubUrl: "https://github.com/Kyellog-silog/Workout-Tracker",
    tagline: "Customizable Push/Pull/Legs workout progress tracker.",
    desc: "Workout progress tracker with customizable Push/Pull/Legs split routines. Users can tailor exercises per day, log sets and reps, and monitor gains over time.",
    client: "Personal Project",
    year: "2026",
    role: "Full-Stack Dev",
    tech: ["React", "TypeScript", "Tailwind", "REST API"],
    achievements: [
      "Customizable PPL split routines",
      "Per-day workout configuration",
      "Progress tracking over time",
      "Live on Vercel",
    ],
    screenshots: [
      "/screencapture-ppl-tracker-tau-vercel-app-2026-06-10-19_12_54.png",
      "/screencapture-ppl-tracker-tau-vercel-app-2026-06-10-19_13_27.png",
      "/screencapture-ppl-tracker-tau-vercel-app-2026-06-10-19_13_33.png",
      "/screencapture-ppl-tracker-tau-vercel-app-2026-06-10-19_13_38.png",
      "/screencapture-ppl-tracker-tau-vercel-app-2026-06-10-19_13_45.png",
    ],
    thumb: "/screencapture-ppl-tracker-tau-vercel-app-2026-06-10-19_12_54.png",
    fullPage: true,
  },
]

// ── Component ────────────────────────────────────────────────────────────────
export function Portfolio() {
  const [activeMain, setActiveMain] = useState<number | null>(null)
  const [activeSide, setActiveSide] = useState<number | null>(null)
  const [slideIndex, setSlideIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSlides, setModalSlides] = useState<string[]>([])
  const [modalIndex, setModalIndex] = useState(0)
  const [modalFullPage, setModalFullPage] = useState(false)
  const [modalUrl, setModalUrl] = useState("")

  // Track each grid's live column count so the details panel can be inserted
  // after the active card's row (the grid uses auto-fit, so columns vary).
  const mainGridRef = useRef<HTMLDivElement | null>(null)
  const sideGridRef = useRef<HTMLDivElement | null>(null)
  const [mainCols, setMainCols] = useState(3)
  const [sideCols, setSideCols] = useState(3)

  useEffect(() => {
    const grids: Array<[HTMLDivElement | null, (n: number) => void]> = [
      [mainGridRef.current, setMainCols],
      [sideGridRef.current, setSideCols],
    ]
    const measure = () => {
      for (const [el, setCols] of grids) {
        if (el) setCols(getComputedStyle(el).gridTemplateColumns.split(" ").length)
      }
    }
    const obs = new ResizeObserver(measure)
    grids.forEach(([el]) => { if (el) obs.observe(el) })
    measure()
    return () => obs.disconnect()
  }, [])

  // Scroll-reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible") }),
      { threshold: 0.1 }
    )
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  function toggleDetails(group: "main" | "side", idx: number) {
    const isOpen = group === "main" ? activeMain === idx : activeSide === idx
    if (isOpen) {
      group === "main" ? setActiveMain(null) : setActiveSide(null)
      return
    }
    if (group === "main") setActiveMain(idx)
    else setActiveSide(idx)
    setSlideIndex(0)
  }

  function navPanel(group: "main" | "side", dir: "prev" | "next") {
    const stages = group === "main" ? MAIN_STAGES : SIDE_STAGES
    const active = group === "main" ? activeMain : activeSide
    if (active === null) return
    const next =
      dir === "prev"
        ? (active - 1 + stages.length) % stages.length
        : (active + 1) % stages.length
    if (group === "main") setActiveMain(next)
    else setActiveSide(next)
    setSlideIndex(0)
  }

  function openModal(slides: string[], startIndex: number, fullPage = false, url = "") {
    setModalSlides(slides)
    setModalIndex(startIndex)
    setModalFullPage(fullPage)
    setModalUrl(url)
    setModalOpen(true)
  }

  // Keyboard navigation for modal
  useEffect(() => {
    if (!modalOpen) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") setModalIndex((i) => (i - 1 + modalSlides.length) % modalSlides.length)
      else if (e.key === "ArrowRight") setModalIndex((i) => (i + 1) % modalSlides.length)
      else if (e.key === "Escape") setModalOpen(false)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [modalOpen, modalSlides.length])

  function renderGrid(stages: Stage[], group: "main" | "side") {
    const active = group === "main" ? activeMain : activeSide
    const gridRef = group === "main" ? mainGridRef : sideGridRef
    const cols = Math.max(1, group === "main" ? mainCols : sideCols)
    // Index of the last card in the active card's row — the panel slots in
    // after it, keeping the row intact instead of splitting it mid-row.
    const panelAfter =
      active === null
        ? -1
        : Math.min(Math.floor(active / cols) * cols + cols - 1, stages.length - 1)
    return (
      <div className="proj-grid" ref={gridRef}>
        {stages.map((s, i) => {
          const thumb = s.thumb ?? s.screenshots?.[0]
          const isOpen = active === i
          return (
            <Fragment key={s.id}>
            <article className={`proj-card${isOpen ? " active" : ""}`}>
              <div className="card-corner-px tl" />
              <div className="card-corner-px tr" />
              <div className="card-corner-px bl" />
              <div className="card-corner-px br" />

              {/* Media — real screenshot when available, icon fallback otherwise */}
              <div className="proj-media">
                {thumb ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="proj-thumb" src={thumb} alt={`${s.label} preview`} loading="lazy" />
                ) : (
                  <div className="proj-media-icon">{s.icon}</div>
                )}
                <div className="card-scanlines" aria-hidden="true" />
                {s.underConstruction && (
                  <div className="construction-banner">
                    <span>▲ UNDER CONSTRUCTION ▲</span>
                  </div>
                )}
                <span className="proj-id">{s.id}</span>
                <div className={`card-status ${s.status}`}>
                  {s.status === "live" && <span className="status-dot" aria-hidden="true" />}
                  {s.statusLabel}
                </div>
              </div>

              {/* Body — everything readable without a click */}
              <div className="proj-body">
                <h3 className="proj-name">{s.label}</h3>
                <div className={`proj-tag ${s.tagClass}`}>{s.tag}</div>
                <p className="proj-tagline">{s.tagline}</p>
                <div className="proj-tech">
                  {s.tech.map((t) => (
                    <span className="tech-chip" key={t}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="proj-actions">
                {s.url && (
                  <a className="proj-link primary" href={s.url} target="_blank" rel="noopener noreferrer">
                    LIVE ↗
                  </a>
                )}
                {s.githubUrl && (
                  <a className="proj-link" href={s.githubUrl} target="_blank" rel="noopener noreferrer">
                    CODE ↗
                  </a>
                )}
                <button
                  className="proj-details-btn"
                  onClick={() => toggleDetails(group, i)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${group}`}
                >
                  {isOpen ? "HIDE ▴" : "DETAILS ▾"}
                </button>
              </div>
            </article>
            {/* Details panel opens on its own row, below the active card's row */}
            {i === panelAfter && renderPanel(group)}
            </Fragment>
          )
        })}
      </div>
    )
  }

  function renderPanel(group: "main" | "side") {
    const active = group === "main" ? activeMain : activeSide
    if (active === null) return null
    const stages = group === "main" ? MAIN_STAGES : SIDE_STAGES
    const stage = stages[active]
    return (
      <div className="mission-panel" id={`panel-${group}`}>
        {/* Panel Header */}
        <div className="panel-header">
          <div className="panel-header-left">
            <span className={`panel-track ${group}`}>
              {group === "main" ? "CLIENT WORK" : "SIDE PROJECT"}
            </span>
            <span className="panel-id">{stage.id}</span>
            <span className="panel-name">{stage.label}</span>
          </div>
          <div className="panel-header-right">
            <span className={`panel-status ${stage.status}`}>
              {stage.status === "live" && <span className="status-dot" aria-hidden="true" />}
              {stage.statusLabel}
            </span>
            <button
              className="panel-close"
              onClick={() => group === "main" ? setActiveMain(null) : setActiveSide(null)}
              aria-label="Close panel"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Panel Body — 2 columns (overview + achievements) */}
        <div className="panel-body">
          <div className="panel-col">
            <div className="panel-col-title">OVERVIEW</div>
            <p className="panel-overview">{stage.desc}</p>
            <div className="panel-meta">
              <div className="panel-meta-row">
                <span className="meta-key">CLIENT</span>
                <span className="meta-val">{stage.client}</span>
              </div>
              <div className="panel-meta-row">
                <span className="meta-key">YEAR</span>
                <span className="meta-val">{stage.year}</span>
              </div>
              <div className="panel-meta-row">
                <span className="meta-key">ROLE</span>
                <span className="meta-val">{stage.role}</span>
              </div>
              <div className="panel-meta-row">
                <span className="meta-key">STACK</span>
                <span className="meta-val">{stage.tech.join(" · ")}</span>
              </div>
            </div>
          </div>

          <div className="panel-col">
            <div className="panel-col-title">KEY ACHIEVEMENTS</div>
            <ul className="achievement-list">
              {stage.achievements.map((a, i) => (
                <li className="achievement-item" key={i}>
                  <span className="achievement-bullet" aria-hidden="true">▶</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Screenshots */}
        {stage.screenshots && stage.screenshots.length > 0 && (
          <div className="panel-screenshots">
            {stage.fullPage ? (
              <>
                <div className="slide-wrap">
                  <button
                    className="slide-arrow"
                    onClick={() =>
                      setSlideIndex((i) => (i - 1 + stage.screenshots!.length) % stage.screenshots!.length)
                    }
                    aria-label="Previous screenshot"
                  >
                    ◀
                  </button>
                  <div
                    className="browser-mockup"
                    onClick={() => openModal(stage.screenshots!, slideIndex, true, stage.url || "")}
                  >
                    <div className="browser-chrome">
                      <span className="browser-dot red" />
                      <span className="browser-dot yellow" />
                      <span className="browser-dot green" />
                      <span className="browser-url">{stage.url || "kraftstories.com"}</span>
                    </div>
                    <div className="browser-viewport">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="browser-scroll-img"
                        src={stage.screenshots[slideIndex]}
                        alt={`${stage.label} page ${slideIndex + 1}`}
                      />
                    </div>
                  </div>
                  <button
                    className="slide-arrow"
                    onClick={() => setSlideIndex((i) => (i + 1) % stage.screenshots!.length)}
                    aria-label="Next screenshot"
                  >
                    ▶
                  </button>
                </div>
                <div className="slide-dots">
                  {stage.screenshots.map((_, i) => (
                    <button
                      key={i}
                      className={`slide-dot${i === slideIndex ? " active" : ""}`}
                      onClick={() => setSlideIndex(i)}
                      aria-label={`Page ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="slide-wrap">
                  <button
                    className="slide-arrow"
                    onClick={() =>
                      setSlideIndex((i) => (i - 1 + stage.screenshots!.length) % stage.screenshots!.length)
                    }
                    aria-label="Previous screenshot"
                  >
                    ◀
                  </button>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="panel-slide-img"
                    src={stage.screenshots[slideIndex]}
                    alt={`${stage.label} screenshot ${slideIndex + 1}`}
                    onClick={() => openModal(stage.screenshots!, slideIndex)}
                    style={{ cursor: "pointer" }}
                  />
                  <button
                    className="slide-arrow"
                    onClick={() => setSlideIndex((i) => (i + 1) % stage.screenshots!.length)}
                    aria-label="Next screenshot"
                  >
                    ▶
                  </button>
                </div>
                <div className="slide-dots">
                  {stage.screenshots.map((_, i) => (
                    <button
                      key={i}
                      className={`slide-dot${i === slideIndex ? " active" : ""}`}
                      onClick={() => setSlideIndex(i)}
                      aria-label={`Screenshot ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Panel Footer */}
        <div className="panel-footer">
          <div className="panel-footer-links">
            {stage.url && (
              <a
                href={stage.url}
                className="retro-btn primary panel-action"
                target="_blank"
                rel="noopener noreferrer"
              >
                VIEW PROJECT →
              </a>
            )}
            {stage.githubUrl && (
              <a
                href={stage.githubUrl}
                className="retro-btn panel-action"
                target="_blank"
                rel="noopener noreferrer"
              >
                VIEW CODE →
              </a>
            )}
          </div>
          <div className="panel-nav">
            <button
              className="panel-nav-btn"
              onClick={() => navPanel(group, "prev")}
              aria-label="Previous project"
            >
              ◀ PREV
            </button>
            <button
              className="panel-nav-btn"
              onClick={() => navPanel(group, "next")}
              aria-label="Next project"
            >
              NEXT ▶
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <section id="portfolio" className="section-wrap ch3-section">
        <div className="ch3-inner">
          <div className="chapter-title reveal">CHAPTER 3 : PROJECTS</div>

          {/* ── CLIENT WORK ── */}
          <div className="ch3-block reveal">
            <div className="ch3-section-label">
              <span className="ch3-label-badge main">CLIENT WORK</span>
              <span className="ch3-label-sub">— Shipped &amp; maintained for real businesses —</span>
            </div>
            {renderGrid(MAIN_STAGES, "main")}
          </div>

          {/* ── SIDE PROJECTS ── */}
          <div className="ch3-block reveal">
            <div className="ch3-section-label">
              <span className="ch3-label-badge tutorial">SIDE PROJECTS</span>
              <span className="ch3-label-sub">— Experiments, thesis &amp; learning —</span>
            </div>
            {renderGrid(SIDE_STAGES, "side")}
          </div>
        </div>
      </section>

      {/* ── IMAGE MODAL (portaled to body to escape ancestor transforms) ── */}
      {modalOpen && modalSlides.length > 0 && createPortal(
        <div
          className="modal-overlay"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot preview"
        >
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="modal-titlebar">
              <span className="modal-title">
                SCREENSHOT PREVIEW — {modalIndex + 1} / {modalSlides.length}
              </span>
              <button
                className="modal-close"
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
              >
                CLOSE ✕
              </button>
            </div>
            <div className="modal-body modal-body-slider">
              <button
                className="modal-nav-arrow"
                onClick={() => setModalIndex((i) => (i - 1 + modalSlides.length) % modalSlides.length)}
                aria-label="Previous screenshot"
              >
                ◀
              </button>
              {modalFullPage ? (
                <div className="modal-browser-mockup">
                  <div className="browser-chrome">
                    <span className="browser-dot red" />
                    <span className="browser-dot yellow" />
                    <span className="browser-dot green" />
                    <span className="browser-url">{modalUrl || "kraftstories.com"}</span>
                  </div>
                  <div className="modal-browser-viewport">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="modal-browser-scroll-img"
                      src={modalSlides[modalIndex]}
                      alt={`Screenshot ${modalIndex + 1} of ${modalSlides.length}`}
                    />
                  </div>
                </div>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={modalSlides[modalIndex]}
                  alt={`Screenshot ${modalIndex + 1} of ${modalSlides.length}`}
                  className="modal-img"
                />
              )}
              <button
                className="modal-nav-arrow"
                onClick={() => setModalIndex((i) => (i + 1) % modalSlides.length)}
                aria-label="Next screenshot"
              >
                ▶
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
