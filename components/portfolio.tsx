"use client"

import { useState, useEffect, useRef } from "react"
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
function IconBook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" aria-hidden="true">
      <path d="M18 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2zm-5 14H7v-2h6v2zm3-4H7v-2h9v2zm0-4H7V6h9v2z" />
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
  desc: string
  client: string
  year: string
  role: string
  stack: { name: string; pct: number }[]
  achievements: string[]
  screenshots?: string[]
  fullPage?: boolean
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
    desc: "End-to-end Shopify store ownership — translating Figma designs into a fully operational storefront with product catalog, content management, inventory setup, and booking flow across 4 US locations.",
    client: "Kraftstories",
    year: "2025",
    role: "Shopify Developer",
    stack: [
      { name: "Shopify", pct: 85 },
      { name: "Figma → UI", pct: 78 },
      { name: "SEO / Content", pct: 72 },
      { name: "Web Operations", pct: 70 },
    ],
    achievements: [
      "Translated Figma designs to live Shopify theme",
      "Managed product catalog across 4 US locations",
      "Created and maintained content strategy",
      "Full store ownership from setup to daily ops",
    ],
    screenshots: [
      "/kraftstories-home.png",
      "/Kraftstories-classes.png",
      "/Kraftstories-NYC.png",
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
    desc: "Wix website maintenance, SEO optimization, and ongoing web design updates for a NYC-based art & craft event company. Responsible for site performance, layout updates, and local search visibility.",
    client: "Kraft Universe",
    year: "2026",
    role: "Wix Dev / SEO",
    stack: [
      { name: "Wix", pct: 82 },
      { name: "SEO", pct: 76 },
      { name: "Web Design", pct: 72 },
      { name: "UI/UX Ops", pct: 66 },
    ],
    achievements: [
      "Ongoing maintenance and content updates",
      "SEO strategy for NYC local search",
      "Web design and layout modifications",
      "Responsive cross-device performance",
    ],
      screenshots: [
        "/Kraftuniverse-home.png",
        "/Kraftuniverse-public_workshop.png",
      ],
    fullPage: true,
  },
  {
    id: "STG-03",
    label: "ONSITE CRAFT",
    icon: <IconWrench />,
    tag: "SERVICE",
    tagClass: "tag-service",
    status: "live",
    statusLabel: "LIVE",
    url: "https://onsitecraftworkshops.com",
    desc: "Built the Onsite Craft Workshops website from the ground up on Wix — full UI/UX design, platform setup, SEO strategy, and ongoing operations. Connects workshop facilitators with clients across the NYC area.",
    client: "Onsite Craft",
    year: "2026",
    role: "Wix Dev / SEO",
    stack: [
      { name: "Wix", pct: 82 },
      { name: "UI/UX Design", pct: 76 },
      { name: "SEO", pct: 72 },
      { name: "Web Operations", pct: 68 },
    ],
    achievements: [
      "Full website build from design to launch",
      "UI/UX design and platform configuration",
      "SEO strategy and local search setup",
      "Ongoing maintenance and operations",
    ],
  },
]

const TUTORIAL_STAGES: Stage[] = [
  {
    id: "STG-04",
    label: "TASKFLOW",
    icon: <IconTask />,
    tag: "FULL-STACK",
    tagClass: "tag-fullstack",
    status: "live",
    statusLabel: "LIVE",
    url: "https://taskflow-frontend-production-9467.up.railway.app",
    githubUrl: "https://github.com/Kyellog-silog/Taskflow",
    desc: "Full-stack task management app with drag-and-drop Kanban boards, real-time updates, and team collaboration features built with React and Laravel.",
    client: "Personal Project",
    year: "2025",
    role: "Full-Stack Dev",
    stack: [
      { name: "React", pct: 86 },
      { name: "Laravel", pct: 74 },
      { name: "PostgreSQL", pct: 68 },
      { name: "Tailwind CSS", pct: 78 },
    ],
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
    id: "STG-05",
    label: "BAGANET",
    icon: <IconLung />,
    tag: "THESIS",
    tagClass: "tag-ai",
    status: "done",
    statusLabel: "COMPLETE",
    githubUrl: "https://github.com/Kyellog-silog/BagaNet",
    desc: "Privacy-preserving lung disease classification using federated learning. Enables client-side model training with TensorFlow.js without sharing raw medical data.",
    client: "Thesis",
    year: "2025",
    role: "ML Engineer",
    stack: [
      { name: "Python", pct: 84 },
      { name: "TensorFlow.js", pct: 76 },
      { name: "Flask", pct: 65 },
      { name: "React", pct: 70 },
    ],
    achievements: [
      "Federated learning architecture",
      "Privacy-preserving ML flow",
      "ONNX model conversion",
      "Docker containerization",
    ],
  },
  {
    id: "STG-06",
    label: "Workout TRACKER",
    icon: <IconBarbell />,
    tag: "FITNESS APP",
    tagClass: "tag-fitness",
    status: "wip",
    statusLabel: "IN PROGRESS",
    url: "https://ppl-tracker-tau.vercel.app",
    githubUrl: "https://github.com/Kyellog-silog/Workout-Tracker",
    desc: "Workout progress tracker with customizable Push/Pull/Legs split routines. Users can tailor exercises per day, log sets and reps, and monitor gains over time.",
    client: "Personal Project",
    year: "2026",
    role: "Full-Stack Dev",
    stack: [
      { name: "React", pct: 80 },
      { name: "TypeScript", pct: 74 },
      { name: "Tailwind CSS", pct: 72 },
      { name: "Backend API", pct: 60 },
    ],
    achievements: [
      "Customizable PPL split routines",
      "Per-day workout configuration",
      "Progress tracking over time",
      "Live on Vercel",
    ],
  },
]

// ── Component ────────────────────────────────────────────────────────────────
export function Portfolio() {
  const [activeMain, setActiveMain] = useState<number | null>(null)
  const [activeTutorial, setActiveTutorial] = useState<number | null>(null)
  const [barWidths, setBarWidths] = useState<number[]>([])
  const [slideIndex, setSlideIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSlides, setModalSlides] = useState<string[]>([])
  const [modalIndex, setModalIndex] = useState(0)
  const [modalFullPage, setModalFullPage] = useState(false)
  const [modalUrl, setModalUrl] = useState("")
  const barTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // Scroll-reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible") }),
      { threshold: 0.1 }
    )
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  function selectCard(group: "main" | "tutorial", idx: number) {
    const isToggle = group === "main" ? activeMain === idx : activeTutorial === idx
    if (isToggle) {
      group === "main" ? setActiveMain(null) : setActiveTutorial(null)
      setBarWidths([])
      return
    }
    if (group === "main") setActiveMain(idx)
    else setActiveTutorial(idx)
    setSlideIndex(0)
    setBarWidths([])
    clearTimeout(barTimer.current)
    barTimer.current = setTimeout(() => {
      const stages = group === "main" ? MAIN_STAGES : TUTORIAL_STAGES
      setBarWidths(stages[idx].stack.map((s) => s.pct))
    }, 80)
  }

  function navPanel(group: "main" | "tutorial", dir: "prev" | "next") {
    const stages = group === "main" ? MAIN_STAGES : TUTORIAL_STAGES
    const active = group === "main" ? activeMain : activeTutorial
    if (active === null) return
    const next =
      dir === "prev"
        ? (active - 1 + stages.length) % stages.length
        : (active + 1) % stages.length
    selectCard(group, next)
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

  function renderStageRow(stages: Stage[], group: "main" | "tutorial") {
    const active = group === "main" ? activeMain : activeTutorial
    return (
      <div className="ch3-stage-row">
        {stages.map((s, i) => (
          <div key={s.id} style={{ display: "contents" }}>
            <div
              className={`mission-card${active === i ? " active" : ""}`}
              onClick={() => selectCard(group, i)}
              role="button"
              tabIndex={0}
              aria-pressed={active === i}
              aria-label={`Select project ${s.label}`}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && selectCard(group, i)}
            >
              <div className="card-corner-px tl" />
              <div className="card-corner-px tr" />
              <div className="card-corner-px bl" />
              <div className="card-corner-px br" />
              <div className={`card-status ${s.status}`}>
                {s.status === "live" && <span className="status-dot" aria-hidden="true" />}
                {s.statusLabel}
              </div>
              <div className="card-icon-zone">
                {s.icon}
                <div className="card-scanlines" aria-hidden="true" />
              </div>
              <div className="card-id">{s.id}</div>
              <div className="card-name">{s.label}</div>
              <div className="card-tag">{s.tag}</div>
            </div>
            {i < stages.length - 1 && (
              <div className="ch3-connector" aria-hidden="true">
                <span className="conn-dot" />
                <span className="conn-dot" />
                <span className="conn-dot" />
                <span className="conn-dot" />
                <span className="conn-arrow" />
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  function renderPanel(group: "main" | "tutorial") {
    const active = group === "main" ? activeMain : activeTutorial
    if (active === null) return null
    const stages = group === "main" ? MAIN_STAGES : TUTORIAL_STAGES
    const stage = stages[active]
    return (
      <div className="mission-panel">
        {/* Panel Header */}
        <div className="panel-header">
          <div className="panel-header-left">
            <span className={`panel-track ${group}`}>
              {group === "main" ? "MAIN STAGE" : "TUTORIAL STAGE"}
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
              onClick={() => group === "main" ? setActiveMain(null) : setActiveTutorial(null)}
              aria-label="Close panel"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Panel Body — 3 columns */}
        <div className="panel-body">
          {/* Col 1: Mission Overview */}
          <div className="panel-col">
            <div className="panel-col-title">MISSION OVERVIEW</div>
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
            </div>
          </div>

          {/* Col 2: Tech Stack */}
          <div className="panel-col">
            <div className="panel-col-title">TECH STACK</div>
            <div className="tech-bar-list">
              {stage.stack.map((item, i) => (
                <div className="tech-bar-row" key={item.name}>
                  <span className="tech-bar-name">{item.name}</span>
                  <div className="tech-bar-track">
                    <div
                      className="tech-bar-fill"
                      style={{ width: barWidths[i] !== undefined ? `${barWidths[i]}%` : "0%" }}
                    />
                  </div>
                  <span className="tech-bar-pct">{item.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Key Achievements */}
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

          {/* ── MAIN STAGES ── */}
          <div className="ch3-block reveal">
            <div className="ch3-section-label">
              <span className="ch3-label-badge main">MAIN STAGES</span>
              <span className="ch3-label-sub">— Featured Client Work —</span>
            </div>
            {renderStageRow(MAIN_STAGES, "main")}
            {renderPanel("main")}
          </div>

          {/* ── TUTORIAL STAGES ── */}
          <div className="ch3-block reveal">
            <div className="ch3-section-label">
              <span className="ch3-label-badge tutorial">TUTORIAL STAGES</span>
              <span className="ch3-label-sub">— Innovation &amp; Learning —</span>
            </div>
            {renderStageRow(TUTORIAL_STAGES, "tutorial")}
            {renderPanel("tutorial")}
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


