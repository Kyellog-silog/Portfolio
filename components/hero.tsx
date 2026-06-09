"use client"

import { useEffect, useRef, useState } from "react"

const NAME1 = "KYELL"
const NAME2 = "DIMATATAC"
const PHRASES = ["FULL-STACK DEVELOPER", "SHOPIFY & WIX DEVELOPER", "SEO & WEB OPERATIONS", "CODE CRAFTSMAN"]

interface HeroProps {
  /** Delay before the rotating subtitle begins typing (ms). Does NOT gate the rest of the hero. */
  subtitleDelay?: number
}

export function Hero({ subtitleDelay = 700 }: HeroProps) {
  const [subText, setSubText] = useState("")
  const abortRef = useRef(false)

  // Rotating subtitle typewriter. The name, description, buttons and socials are
  // rendered immediately below — only this decorative role-rotation is animated.
  useEffect(() => {
    abortRef.current = false
    const wait = (ms: number) => new Promise<void>((res) => setTimeout(res, ms))

    async function run() {
      await wait(subtitleDelay)
      let pi = 0
      let ci = 0
      let del = false
      while (!abortRef.current) {
        const p = PHRASES[pi]
        if (!del) {
          ci++
          setSubText(p.slice(0, ci))
          if (ci === p.length) {
            del = true
            await wait(1900)
            continue
          }
        } else {
          ci--
          setSubText(p.slice(0, ci))
          if (ci === 0) {
            del = false
            pi = (pi + 1) % PHRASES.length
          }
        }
        await wait(del ? 55 : 100)
      }
    }

    run()
    return () => { abortRef.current = true }
    // subtitleDelay intentionally excluded — only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <section className="hero-section" id="hero">
      <div className="hero-inner reveal">
        <div className="hero-badge">★ PLAYER ONE HAS ENTERED ★</div>

        <h1 className="hero-name">
          <span>{NAME1}</span>
          <br />
          <span className="hi">{NAME2}</span>
        </h1>

        <div className="hero-sub">
          {/* Animated text is hidden from assistive tech to avoid per-keystroke spam... */}
          <span aria-hidden="true">{subText}</span>
          <span className="cursor-blink" aria-hidden="true" />
          {/* ...the full role list is exposed statically instead. */}
          <span className="sr-only">
            Roles: full-stack developer, Shopify and Wix developer, SEO and web operations, code craftsman.
          </span>
        </div>

        <p className="hero-desc">
          From Figma to live Shopify stores and Wix platforms — I build, maintain, and optimize
          web experiences for creative businesses, while growing into full-stack product engineering.
        </p>

        <div className="hero-btns">
          <button className="retro-btn btn-red" onClick={() => scrollTo("portfolio")}>
            ▶ VIEW MY WORK
          </button>
          <button className="retro-btn btn-gold" onClick={() => scrollTo("about")}>
            ABOUT ME
          </button>
          <a href="/Kyell_resume.pdf" download className="retro-btn btn-cream">
            ⬇ RESUME
          </a>
        </div>

        <div className="hero-socials">
          <a
            href="https://github.com/Kyellog-silog"
            target="_blank"
            rel="noopener noreferrer"
            className="social-coin"
            aria-label="GitHub Profile"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.203 2.394.1 2.646.64.698 1.028 1.591 1.028 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/kyell-dimatatac-58882517a"
            target="_blank"
            rel="noopener noreferrer"
            className="social-coin"
            aria-label="LinkedIn Profile"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <button
            className="social-coin"
            onClick={() => scrollTo("contact")}
            aria-label="Contact Me"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
