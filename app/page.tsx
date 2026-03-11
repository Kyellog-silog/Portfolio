"use client"

import { useEffect, useState } from "react"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Portfolio } from "@/components/portfolio"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"

const WAVE_CHARS = "LOADING...".split("")
const LOADER_DELAY = 2900

export default function Home() {
  const [loaderHidden, setLoaderHidden] = useState(false)
  const [mainVisible, setMainVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => {
      setLoaderHidden(true)
      const t2 = setTimeout(() => setMainVisible(true), 250)
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
      <div className={`main-content${mainVisible ? " visible" : ""}`}>
        <Navigation />
        <Hero loaderDelay={LOADER_DELAY + 400} />
        <About />
        <Portfolio />
        <Contact />
        <footer className="retro-footer">
          © 2025 KYELL DIMATATAC &nbsp;|&nbsp; MADE WITH{" "}
          <span className="hl">♥</span> &nbsp;|&nbsp; ALL RIGHTS RESERVED
        </footer>
      </div>
    </>
  )
}
