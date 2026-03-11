"use client"

import { useEffect, useRef } from "react"
import type { JSX } from "react"

// ── SVG skill icons ──────────────────────────────────────────────────────────
const Icons: Record<string, () => JSX.Element> = {
  Python: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.25 2.26c-4.1-.49-7.74.89-7.74 3.15v1.68h7.74v1.12H6.5C4.25 8.21 2.26 9.5 2.01 12.4a8.94 8.94 0 000 .19c-.28 3.21 1.76 4.19 3.96 4.19h1.12v-2.01c0-2.53 2.19-3.71 4.19-3.71h6.67c1.82 0 3.03-1.25 3.03-2.91V6.45c0-1.69-1.68-2.72-3.92-2.99zm-3.64 2.1a.91.91 0 110 1.82.91.91 0 010-1.82z" />
      <path d="M21.99 11.79c.26-3.04-1.79-4.19-4.19-4.19h-1.12v1.96c0 2.65-2.27 3.76-4.19 3.76H5.82c-1.84 0-3.03 1.27-3.03 2.91v2.65c0 1.76 1.77 2.71 3.92 2.99 4.06.49 7.41-.9 7.41-3.15v-1.68H7.38v-1.12h7.74c2.25 0 4.24-1.29 4.49-4.19.03-.38.04-.76.04-1.14h-.01c.15-.35.24-.7.35-.8zm-9.38 7.85a.91.91 0 110-1.82.91.91 0 010 1.82z" />
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
  Django: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.5 2H14v8.56l-2.5.8V2zm0 18.09c0 1.06-.86 1.91-1.91 1.91s-1.91-.85-1.91-1.91v-6.83l-1.91.6V20.09C5.77 22.24 7.53 24 9.59 24s3.82-1.76 3.82-3.91V9.81L11.5 10.6v9.49zM14 7h-2.5V2H14v5zm-5.59 2.46L5.77 10.4V18c0 2.15 1.76 3.91 3.82 3.91.64 0 1.25-.16 1.78-.45v-1.8a2.29 2.29 0 01-1.78.84 2.33 2.33 0 01-2.3-2.3v-7.08l1.12-.36v-1.3z" />
    </svg>
  ),
  PostgreSQL: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.13 12.86a4.78 4.78 0 00.54-1.86c.13-.89.08-1.83-.05-2.61a5.69 5.69 0 00-3.07-4.17 5.63 5.63 0 00-5.31.02A5.69 5.69 0 006.17 8.4a7.2 7.2 0 00-.05 2.61 4.78 4.78 0 00.54 1.86C5.38 13.88 5 15.01 5 16c0 1.57.5 3 2.04 3.77V21a1 1 0 002 0v-1.5h5.92V21a1 1 0 002 0v-1.23C18.5 19 19 17.57 19 16c0-.99-.38-2.12-1.87-3.14zM12 5c2.16 0 3.67 1.3 3.67 1.3C17 7.7 17 9.37 17 10c0 .67-.1 1.24-.3 1.71-.44-.81-.91-1.57-1.37-2.15C14.3 8.31 13 7.5 12 7.5s-2.3.81-3.33 2.06c-.46.58-.93 1.34-1.37 2.15-.2-.47-.3-1.04-.3-1.71 0-.63 0-2.3 1.33-3.7C8.33 6.3 9.84 5 12 5z" />
    </svg>
  ),
  JavaScript: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h18v18H3V3zm9.73 14.96c.39.65 1.05 1.08 2.03 1.08 1.07 0 1.77-.54 1.77-1.28 0-.88-.71-1.2-1.9-1.71l-.65-.28c-1.88-.8-3.13-1.8-3.13-3.92 0-1.95 1.49-3.44 3.81-3.44 1.65 0 2.84.58 3.69 2.08l-2.02 1.3c-.44-.8-.92-1.12-1.67-1.12-.76 0-1.25.48-1.25 1.12 0 .78.48 1.1 1.6 1.58l.65.28c2.21.95 3.47 1.91 3.47 4.08 0 2.34-1.84 3.62-4.3 3.62-2.42 0-3.98-1.15-4.74-2.65l2.64-1.54zm-7.66.28c.28.5.54.93 1.15.93.59 0 .96-.23.96-1.13v-6.1h2.4v6.17c0 1.86-1.09 2.71-2.68 2.71-1.44 0-2.27-.74-2.69-1.64l.86-.94z" />
    </svg>
  ),
  Docker: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.98 11H12v-1.98h1.98V11zm-3.97 0h-1.98V9.02H10V11zm7.94 0h-1.98V9.02H17.95V11zm-3.97 0h-1.98V9.02H14V11zm-7.95 0H4.07V9.02H6.05V11zm3.97 0H8.04V9.02H10V11zm3.98-2.99h-1.98V6.03h1.98v1.98zm-3.98 0h-1.98V6.03H10v1.98zM23 11.67c-.5-.37-1.67-.51-2.58-.33-.13-1.04-.67-1.95-1.56-2.64L18.3 8.5l-.23.57a4.02 4.02 0 00-.23 1.42c0 .64.15 1.25.42 1.75-.2.12-.58.28-1.1.28H1.35l-.04.24a6.55 6.55 0 00.24 2.69 4.74 4.74 0 001.74 2.39C4.01 18.4 5.23 18.72 7 18.72c.95 0 2.04-.16 3.08-.54 1.57-.56 2.87-1.57 3.87-2.84a10.65 10.65 0 001.37-2.44h.17c1.07 0 2 .02 2.69-.91l.19-.28-.26-.19z" />
    </svg>
  ),
  TensorFlow: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 6.5v11l10.5 6V12.5L1.5 6.5zM13 5.31V1L22.5 6.5l-4.67 2.7L13 5.31zm0 13.38l4.83-2.79 4.17 2.4V12.5L13 6.5v12.19z" />
    </svg>
  ),
  MongoDB: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C9.89 2 7 5.26 7 10.05c0 3.64 1.56 6.23 3.85 7.41l.15 3.54h1.98l.16-3.54C15.44 16.28 17 13.69 17 10.05 17 5.26 14.11 2 12 2zm0 8.5c-.83 0-1.5-.67-1.5-1.5S11.17 7.5 12 7.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  ),
  Flask: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 2v2.68l4.33 7.55A7 7 0 017.67 20.5 7 7 0 012 13.68a6.97 6.97 0 014-6.28V2h8zm-2 1H8v4.93l-.62.33a5.98 5.98 0 00-3.28 5.42 6 6 0 006 6 5.98 5.98 0 006-6 5.97 5.97 0 00-.97-3.27L12 8.28V3zm0 7.5l2.5 4.36A3.5 3.5 0 0112 16.5a3.5 3.5 0 01-2.5-5.97L12 10.5z" />
    </svg>
  ),
  Azure: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.96 2.29L8.07 13.14l6.28 1.1L5.73 21.71H19.5L12.96 2.29zm-1.42 2.13l-3.01 7.13 5.17.9-2.16-8.03z" />
    </svg>
  ),
}

const SKILLS = [
  { name: "Python",     rarity: "legendary" as const, xp: 95, desc: "Core language\nMax proficiency" },
  { name: "React",      rarity: "legendary" as const, xp: 90, desc: "Frontend mastery\nSPA wizardry" },
  { name: "Django",     rarity: "legendary" as const, xp: 88, desc: "Backend fortress\nPower unlocked" },
  { name: "PostgreSQL", rarity: "rare"      as const, xp: 78, desc: "Data guardian\nQuery champion" },
  { name: "JavaScript", rarity: "rare"      as const, xp: 82, desc: "Web sorcery\nES6+ equipped" },
  { name: "Docker",     rarity: "rare"      as const, xp: 72, desc: "Container mage\nShip anything" },
  { name: "TensorFlow", rarity: "epic"      as const, xp: 65, desc: "Neural craft\nAI unlocked" },
  { name: "MongoDB",    rarity: "epic"      as const, xp: 68, desc: "NoSQL shaman\nFlexible data" },
  { name: "Flask",      rarity: "common"    as const, xp: 55, desc: "Micro server\nLight & fast" },
  { name: "Azure",      rarity: "common"    as const, xp: 50, desc: "Cloud novice\nLevel it up!" },
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

  useEffect(() => {
    if (!gridRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            document.querySelectorAll<HTMLElement>(".xp-fill").forEach((bar) => {
              bar.style.width = (bar.dataset.xp ?? "0") + "%"
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(gridRef.current)
    return () => observer.disconnect()
  }, [])

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
            <span className="inv-label">▶ EQUIPPED SKILLS [10/10]</span>
            <span className="inv-cursor" aria-hidden="true">█</span>
          </div>

          <div className="inv-grid" ref={gridRef}>
            {SKILLS.map((s) => {
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

          <div className="inv-footer">
            <div className="inv-stat">
              <span className="inv-stat-label">CLASS</span>
              <span className="inv-stat-value">WEB DEV</span>
            </div>
            <div className="inv-stat">
              <span className="inv-stat-label">LEGENDARY</span>
              <span className="inv-stat-value" style={{ color: "var(--gold)" }}>3</span>
            </div>
            <div className="inv-stat">
              <span className="inv-stat-label">RARE</span>
              <span className="inv-stat-value" style={{ color: "#60a5fa" }}>3</span>
            </div>
            <div className="inv-stat">
              <span className="inv-stat-label">EPIC</span>
              <span className="inv-stat-value" style={{ color: "#c084fc" }}>2</span>
            </div>
            <div className="inv-stat">
              <span className="inv-stat-label">COMMON</span>
              <span className="inv-stat-value" style={{ color: "#9ca3af" }}>2</span>
            </div>
          </div>
        </div>

        <div className="inv-hint" aria-hidden="true">▼ HOVER TO INSPECT ITEM ▼</div>
      </div>
    </section>
  )
}
