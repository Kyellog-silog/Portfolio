"use client"

import { useState } from "react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false)
  }

  return (
    <nav className="retro-nav">
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          KD.EXE
        </button>

        <div className="nav-links">
          <button onClick={() => scrollTo("about")}>ABOUT</button>
          <button onClick={() => scrollTo("portfolio")}>WORK</button>
          <button onClick={() => scrollTo("contact")}>CONTACT</button>
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
        <button style={{ fontFamily: "var(--font-press-start)", fontSize: "8px", color: "var(--cream)", background: "none", border: "none", cursor: "pointer", letterSpacing: "2px" }} onClick={() => scrollTo("about")}>ABOUT</button>
        <button style={{ fontFamily: "var(--font-press-start)", fontSize: "8px", color: "var(--cream)", background: "none", border: "none", cursor: "pointer", letterSpacing: "2px" }} onClick={() => scrollTo("portfolio")}>WORK</button>
        <button style={{ fontFamily: "var(--font-press-start)", fontSize: "8px", color: "var(--cream)", background: "none", border: "none", cursor: "pointer", letterSpacing: "2px" }} onClick={() => scrollTo("contact")}>CONTACT</button>
      </div>
    </nav>
  )
}
