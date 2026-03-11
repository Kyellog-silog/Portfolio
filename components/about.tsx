"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import type { JSX } from "react"

// ── SVG skill icons ──────────────────────────────────────────────────────────
const Icons: Record<string, () => JSX.Element> = {
  "Next.js": () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1.5 14.66V7.34l7.19 4.66-7.19 4.66z" />
    </svg>
  ),
  React: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="11.95" r="2.15" />
      <path d="M12 6.67C7.61 6.67 4 9.04 4 11.95S7.61 17.23 12 17.23 20 14.86 20 11.95 16.39 6.67 12 6.67zm0 9.1c-3.62 0-6.55-1.87-6.55-4.17S8.38 7.43 12 7.43s6.55 1.87 6.55 4.17-2.93 4.17-6.55 4.17z" />
      <path d="M6.89 4.49A2.63 2.63 0 004.28 5.7c-.73 1.27-.18 3.09 1.33 4.72-.19.37-.37.74-.52 1.12C3.64 8.34 3.5 5.97 4.72 3.87a3.97 3.97 0 013.48-1.97c1.6 0 3.44.88 5.15 2.56l-.55.55C11.17 3.36 9.14 4.49 6.89 4.49z" />
      <path d="M17.11 19.41a2.63 2.63 0 002.61-1.21c.73-1.27.18-3.09-1.33-4.72.19-.37.37-.74.52-1.12 1.45 3.2 1.59 5.57.37 7.67a3.97 3.97 0 01-3.48 1.97c-1.6 0-3.44-.88-5.15-2.56l.55-.55c1.63 1.65 3.66 2.52 5.91 2.52z" />
      <path d="M4.28 18.2c.73 1.27 2.38 1.64 4.28 1.09 1.03 1.01 2.24 1.73 3.44 2.1-2.56.27-4.97-.5-6.4-2.94a4.71 4.71 0 01-.52-2.72 7.78 7.78 0 01.83-3.38c.27.41.56.81.87 1.19-.68 1.54-.87 3.42-.5 4.66zm14.78-12.4c-.73-1.27-2.38-1.64-4.28-1.09A12.89 12.89 0 0011.34 2.7c2.56-.27 4.97.5 6.4 2.94.61 1.06.72 2.27.52 3.56a13.06 13.06 0 01-.87-1.19 7.78 7.78 0 00.67-2.21z" />
    </svg>
  ),
  "Node.js": () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 1.8l7.2 4v8.4L12 20.2l-7.2-4V7.8L12 3.8zm-1 5.2v6l-3-1.73V9.53L11 9zm2 0l3 1.73v3.74L13 16.2v-6z" />
    </svg>
  ),
  JavaScript: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h18v18H3V3zm9.73 14.96c.39.65 1.05 1.08 2.03 1.08 1.07 0 1.77-.54 1.77-1.28 0-.88-.71-1.2-1.9-1.71l-.65-.28c-1.88-.8-3.13-1.8-3.13-3.92 0-1.95 1.49-3.44 3.81-3.44 1.65 0 2.84.58 3.69 2.08l-2.02 1.3c-.44-.8-.92-1.12-1.67-1.12-.76 0-1.25.48-1.25 1.12 0 .78.48 1.1 1.6 1.58l.65.28c2.21.95 3.47 1.91 3.47 4.08 0 2.34-1.84 3.62-4.3 3.62-2.42 0-3.98-1.15-4.74-2.65l2.64-1.54zm-7.66.28c.28.5.54.93 1.15.93.59 0 .96-.23.96-1.13v-6.1h2.4v6.17c0 1.86-1.09 2.71-2.68 2.71-1.44 0-2.27-.74-2.69-1.64l.86-.94z" />
    </svg>
  ),
  TypeScript: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h18v18H3V3zm10.17 13.24v1.54c.26.13.57.24.93.32.36.08.74.12 1.14.12.39 0 .75-.04 1.08-.13.33-.09.61-.22.85-.4.24-.18.42-.41.55-.68.13-.27.2-.59.2-.95 0-.26-.04-.49-.12-.68a1.92 1.92 0 00-.35-.54 2.58 2.58 0 00-.54-.44c-.21-.13-.45-.26-.7-.38-.19-.09-.35-.18-.49-.27a1.78 1.78 0 01-.35-.27.97.97 0 01-.21-.3.86.86 0 01-.07-.35c0-.12.03-.23.08-.33.05-.1.13-.18.22-.25.1-.07.21-.12.35-.16.13-.03.28-.05.44-.05.12 0 .24.01.37.03.13.02.26.06.39.1.13.05.25.1.37.17.12.07.22.14.32.23V10.6a2.97 2.97 0 00-.82-.22 5.3 5.3 0 00-.88-.07c-.39 0-.74.05-1.06.14-.32.1-.6.23-.83.41-.23.18-.41.4-.54.66-.13.26-.19.55-.19.88 0 .43.11.8.33 1.1.22.3.56.57 1.01.8.19.1.37.19.53.28.16.09.3.18.42.28.12.1.21.2.27.32.07.12.1.25.1.4 0 .12-.02.22-.07.32-.05.1-.12.18-.22.25-.1.07-.22.12-.36.15-.15.04-.31.05-.5.05-.34 0-.67-.07-.99-.2-.32-.14-.6-.33-.85-.58zm-4.4-4.82v1.35h2.15v6.63h1.63v-6.63h2.15V11.42H8.77z" />
    </svg>
  ),
  "Tailwind CSS": () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C13.35 10.82 14.52 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.65 7.18 14.48 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.35 16.82 9.52 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.65 13.18 9.48 12 7 12z" />
    </svg>
  ),
  Shopify: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.34 3.8a.2.2 0 00-.18-.15c-.07 0-1.41-.1-1.41-.1s-.94-.93-1.04-1.03a.35.35 0 00-.25-.1l-.05 0-.36.11L11.7 1.3c-.19-.57-.52-1.1-1.1-1.1h-.05c-.33-.27-.73-.2-1.08.1A3.71 3.71 0 008.3 2.61l-1.05.33c-.33.1-.34.11-.38.42l-.82 6.28 6.15 1.15L15.34 3.8zM11.57 1.73l-.52 1.6a3.33 3.33 0 00-1.41-.37l.1-.75c.33-.5.7-.73 1.02-.73.33 0 .58.1.81.25zm-1.62-.6l-.12.93a2.52 2.52 0 00-1.05.15c.18-.54.54-.96.87-1.16.11-.06.2-.03.3.08zm-.76 4.59c.04.66 1.79.81 1.89 2.38.07 1.23-.66 2.08-1.71 2.14-1.27.08-1.96-.67-1.96-.67l.27-1.13s.7.52 1.25.49c.36-.02.5-.32.48-.52-.06-.87-1.47-.82-1.56-2.26-.08-1.2.72-2.43 2.46-2.54.67-.04 1.02.13 1.02.13l-.4 1.47s-.44-.2-.97-.17c-.78.05-.78.54-.76.66z" />
      <path d="M15.16 3.65s-.35-.19-.78-.19c-.64 0-.67.4-.67.5 0 .54.07.85.07.85l1.99.54-.61-1.7zM12.72 22l3.57-.95s-1.53-10.38-1.54-10.45a.17.17 0 00-.16-.14c-.07 0-1.38-.03-1.38-.03L12.72 22z" />
    </svg>
  ),
  Wix: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 7l2.5 10L8 10l2.5 7L13 7m3 0l2.5 10L21 7" />
    </svg>
  ),
  SEO: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  ),
  Supabase: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.7 21.15c-.46.56-1.37.2-1.38-.54L12 12h7.17c.97 0 1.52 1.1.92 1.85L13.7 21.15zM10.3 2.85c.46-.56 1.37-.2 1.38.54L12 12H4.83c-.97 0-1.52-1.1-.92-1.85L10.3 2.85z" />
    </svg>
  ),
  PostgreSQL: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.13 12.86a4.78 4.78 0 00.54-1.86c.13-.89.08-1.83-.05-2.61a5.69 5.69 0 00-3.07-4.17 5.63 5.63 0 00-5.31.02A5.69 5.69 0 006.17 8.4a7.2 7.2 0 00-.05 2.61 4.78 4.78 0 00.54 1.86C5.38 13.88 5 15.01 5 16c0 1.57.5 3 2.04 3.77V21a1 1 0 002 0v-1.5h5.92V21a1 1 0 002 0v-1.23C18.5 19 19 17.57 19 16c0-.99-.38-2.12-1.87-3.14zM12 5c2.16 0 3.67 1.3 3.67 1.3C17 7.7 17 9.37 17 10c0 .67-.1 1.24-.3 1.71-.44-.81-.91-1.57-1.37-2.15C14.3 8.31 13 7.5 12 7.5s-2.3.81-3.33 2.06c-.46.58-.93 1.34-1.37 2.15-.2-.47-.3-1.04-.3-1.71 0-.63 0-2.3 1.33-3.7C8.33 6.3 9.84 5 12 5z" />
    </svg>
  ),
}

const SKILLS = [
  // Page 1 (6)
  { name: "Next.js",      rarity: "rare"      as const, xp: 78, desc: "React framework\nSSR + routing" },
  { name: "React",        rarity: "legendary" as const, xp: 90, desc: "Frontend mastery\nSPA wizardry" },
  { name: "Node.js",      rarity: "epic"      as const, xp: 72, desc: "Server runtime\nBackend power" },
  { name: "JavaScript",   rarity: "legendary" as const, xp: 85, desc: "Web sorcery\nES6+ equipped" },
  { name: "TypeScript",   rarity: "epic"      as const, xp: 74, desc: "Typed JS\nSafe & scalable" },
  { name: "Tailwind CSS", rarity: "epic"      as const, xp: 76, desc: "Utility CSS\nRapid styling" },
  // Page 2 (5)
  { name: "Shopify",      rarity: "legendary" as const, xp: 88, desc: "E-commerce craft\nStore mastery" },
  { name: "Wix",          rarity: "rare"      as const, xp: 80, desc: "Site builder\nClient ready" },
  { name: "SEO",          rarity: "rare"      as const, xp: 75, desc: "Search tactics\nRank climber" },
  { name: "Supabase",     rarity: "common"    as const, xp: 60, desc: "BaaS platform\nPostgres power" },
  { name: "PostgreSQL",   rarity: "common"    as const, xp: 65, desc: "Data guardian\nQuery champion" },
]

const EXPERIENCES = [
  {
    badge: "✓ QUEST COMPLETE",
    badgeStyle: {} as React.CSSProperties,
    period: "2025–NOW",
    title: "FULL STACK WEB DEVELOPER",
    company: "⚔ Freelance",
    desc: "Delivered 3 live client websites: Kraftstories full Shopify build (Figma → UI, content & ops), Kraft Universe Wix maintenance + SEO + redesign, and Onsite Craft full Wix build with UI/UX, SEO, and platform operations.",
    questStyle: {} as React.CSSProperties,
  },
  {
    badge: "✓ QUEST COMPLETE",
    badgeStyle: {} as React.CSSProperties,
    period: "2024",
    title: "AI AND SECURITY INTERN",
    company: "🛡 Rakso CT",
    desc: "Azure OpenAI presentations, security awareness campaigns, CRM development.",
    questStyle: {} as React.CSSProperties,
  },
  {
    badge: "🎓 ACHIEVEMENT UNLOCKED",
    badgeStyle: { background: "var(--navy)" } as React.CSSProperties,
    period: "2021–25",
    title: "B.S. COMPUTER ENGINEERING",
    company: "📍 Batangas State University",
    desc: "Software engineering, networks, and embedded systems foundations.",
    questStyle: { borderLeftColor: "var(--red)" } as React.CSSProperties,
  },
]

export function About() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [skillPage, setSkillPage] = useState(0)

  const PAGES = [SKILLS.slice(0, 6), SKILLS.slice(6)]
  const totalPages = PAGES.length

  // Rarity counts (computed from full array)
  const rarityCounts = SKILLS.reduce(
    (acc, s) => { acc[s.rarity] = (acc[s.rarity] || 0) + 1; return acc },
    {} as Record<string, number>,
  )

  const animateXp = useCallback(() => {
    if (!gridRef.current) return
    gridRef.current.querySelectorAll<HTMLElement>(".xp-fill").forEach((bar) => {
      bar.style.width = "0%"
      requestAnimationFrame(() => {
        bar.style.width = (bar.dataset.xp ?? "0") + "%"
      })
    })
  }, [])

  // Initial XP animation on scroll
  useEffect(() => {
    if (!gridRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateXp()
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(gridRef.current)
    return () => observer.disconnect()
  }, [animateXp])

  // Re-animate XP bars on page change
  useEffect(() => {
    animateXp()
  }, [skillPage, animateXp])

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible")
        }),
      { threshold: 0.1 }
    )
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" className="section-wrap">
      <div className="chapter-title reveal">CHAPTER 1 : ABOUT ME</div>

      <div className="about-grid reveal">
        {/* Left — Dialogue boxes */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div className="dialogue">
            <span className="dialogue-label">▶ BACKGROUND</span>
            Aspiring full-stack developer with hands-on experience delivering complete web solutions
            for real clients. Computer Engineering graduate from Batangas State University — I handle
            everything from design handoff to launch, specializing in Shopify, Wix, SEO, and
            ongoing site operations.
            <span className="dcursor" aria-hidden="true" />
          </div>
          <div className="dialogue">
            <span className="dialogue-label">▶ MISSION</span>
            I build web experiences that creative businesses can depend on — from translating Figma
            designs into live Shopify stores, to maintaining and growing Wix platforms with SEO and
            content strategy. My next goal: expand into full-stack product engineering with React,
            Django, and PostgreSQL at scale.
            <span className="dcursor" aria-hidden="true" />
          </div>
        </div>

        {/* Right — Quest log */}
        <div className="quest-log">
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className="quest" style={exp.questStyle}>
              <span className="quest-badge" style={exp.badgeStyle}>{exp.badge}</span>
              <span className="quest-period">{exp.period}</span>
              <div className="quest-title">{exp.title}</div>
              <div className="quest-company">{exp.company}</div>
              <div className="quest-desc">{exp.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SKILL INVENTORY ── */}
      <div className="skills-wrap reveal">
        <div className="skills-screen-title">— SKILL INVENTORY —</div>
        <div className="skills-divider">▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓</div>

        <div className="inv-window">
          <div className="inv-corner-tr" aria-hidden="true" />
          <div className="inv-corner-bl" aria-hidden="true" />

          <div className="inv-header">
            <span className="inv-label">▶ EQUIPPED SKILLS [11/11]</span>
            <span className="inv-cursor" aria-hidden="true">█</span>
          </div>

          <div className="inv-grid" ref={gridRef}>
            {PAGES[skillPage].map((s) => {
              const Icon = Icons[s.name]
              return (
                <div key={s.name} className={`inv-slot ${s.rarity}`} tabIndex={0} role="button" aria-label={`${s.name} — ${s.rarity}`}>
                  <span className="rarity-tag">{s.rarity.slice(0, 3).toUpperCase()}</span>
                  <div className="slot-icon">
                    {Icon && <Icon />}
                  </div>
                  <div className="slot-name">{s.name}</div>
                  <div className="xp-wrap">
                    <div className="xp-fill" data-xp={s.xp} />
                  </div>
                  <div className="inv-tooltip" role="tooltip">
                    <div className="tt-name">{s.name}</div>
                    <div className="tt-rarity">[{s.rarity.toUpperCase()}]</div>
                    <div className="tt-desc">{s.desc.split("\n").map((line, i) => (<span key={i}>{line}{i < s.desc.split("\n").length - 1 && <br />}</span>))}</div>
                    <div className="tt-xp">XP: {s.xp}/100</div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="inv-page-nav">
            <button
              className="inv-page-btn"
              onClick={() => setSkillPage((p) => Math.max(0, p - 1))}
              disabled={skillPage === 0}
              aria-label="Previous skill page"
            >
              ◀ PREV
            </button>
            <span className="inv-page-label">PAGE {skillPage + 1}/{totalPages}</span>
            <button
              className="inv-page-btn"
              onClick={() => setSkillPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={skillPage === totalPages - 1}
              aria-label="Next skill page"
            >
              NEXT ▶
            </button>
          </div>

          <div className="inv-footer">
            <div className="inv-stat">
              <span className="inv-stat-label">CLASS</span>
              <span className="inv-stat-value">WEB DEV</span>
            </div>
            <div className="inv-stat">
              <span className="inv-stat-label">LEGENDARY</span>
              <span className="inv-stat-value" style={{ color: "var(--gold)" }}>{rarityCounts.legendary ?? 0}</span>
            </div>
            <div className="inv-stat">
              <span className="inv-stat-label">RARE</span>
              <span className="inv-stat-value" style={{ color: "#60a5fa" }}>{rarityCounts.rare ?? 0}</span>
            </div>
            <div className="inv-stat">
              <span className="inv-stat-label">EPIC</span>
              <span className="inv-stat-value" style={{ color: "#c084fc" }}>{rarityCounts.epic ?? 0}</span>
            </div>
            <div className="inv-stat">
              <span className="inv-stat-label">COMMON</span>
              <span className="inv-stat-value" style={{ color: "#9ca3af" }}>{rarityCounts.common ?? 0}</span>
            </div>
          </div>
        </div>

        <div className="inv-hint" aria-hidden="true">▼ HOVER TO INSPECT ITEM ▼</div>
      </div>
    </section>
  )
}
