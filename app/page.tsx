"use client"

import { useEffect, useState } from "react"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Portfolio } from "@/components/portfolio"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"

const WAVE_CHARS = "LOADING...".split("")
const LOADER_DELAY = 600

export default function Home() {
  const [loaderHidden, setLoaderHidden] = useState(false)
  const [mainVisible, setMainVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => {
      setLoaderHidden(true)
      const t2 = setTimeout(() => setMainVisible(true), 120)
      return () => clearTimeout(t2)
    }, LOADER_DELAY)
    return () => clearTimeout(t1)
  }, [])

  return (
    <>
      {/* LOADER */}
      <div className={`loader-screen${loaderHidden ? " hidden" : ""}`} aria-hidden="true">
        <div className="wave-text">
          {WAVE_CHARS.map((ch, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.08}s` }}>
              {ch}
            </span>
          ))}
        </div>
        <div className="loader-bar-wrap">
          <div className="loader-bar-fill" />
        </div>
        <div className="loader-sub">PLEASE WAIT ▋</div>
      </div>

      {/* MAIN */}
      <div id="main-content" className={`main-content${mainVisible ? " visible" : ""}`}>
        <Navigation />
        <Hero subtitleDelay={LOADER_DELAY + 300} />
        <About />
        <Portfolio />
        <Contact />
        <footer className="retro-footer">
          <div className="footer-links">
            <a href="https://github.com/Kyellog-silog" target="_blank" rel="noopener noreferrer">GITHUB</a>
            <a href="https://www.linkedin.com/in/kyell-dimatatac-58882517a" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
            <a href="mailto:kyelldimatatac2@gmail.com">EMAIL</a>
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              ↑ TOP
            </button>
          </div>
          <div className="footer-legal">
            © {new Date().getFullYear()} KYELL DIMATATAC &nbsp;|&nbsp; MADE WITH{" "}
            <span className="hl">♥</span> &nbsp;|&nbsp; ALL RIGHTS RESERVED
          </div>
        </footer>
      </div>
    </>
  )
}
