"use client"

import { useState, useEffect, useRef } from "react"

const LINKS = [
  { id: "about", label: "ABOUT" },
  { id: "portfolio", label: "WORK" },
  { id: "contact", label: "CONTACT" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState<string>("")
  const navRef = useRef<HTMLElement>(null)

  // Scrollspy — highlight the section currently in view.
  useEffect(() => {
    const sections = LINKS
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  // Close the mobile menu on Escape or outside click.
  useEffect(() => {
    if (!isOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false)
    }
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("click", onClick)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("click", onClick)
    }
  }, [isOpen])

  return (
    <nav className="retro-nav" ref={navRef}>
      <a href="#main-content" className="skip-link">Skip to content</a>

      <div className="nav-inner">
        <a className="nav-logo" href="#hero">KD.EXE</a>

        <div className="nav-links">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? "active" : undefined}
              aria-current={active === l.id ? "true" : undefined}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="nav-hud" aria-hidden="true">♥ ♥ ♥ &nbsp;|&nbsp; SCORE: 9999</div>

        <button
          className="nav-mobile-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      <div className={`nav-mobile-menu${isOpen ? " open" : ""}`} role="menu">
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            role="menuitem"
            className={`nav-mobile-link${active === l.id ? " active" : ""}`}
            aria-current={active === l.id ? "true" : undefined}
            onClick={() => setIsOpen(false)}
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
