"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

const PILLS = [
  {
    id: "email",
    orbLabel: "MAIL",
    label: "EMAIL",
    orbColor: "var(--gold)",
    detail: "kyelldimatatac2@gmail.com",
    href: "mailto:kyelldimatatac2@gmail.com",
  },
  {
    id: "location",
    orbLabel: "LOC",
    label: "LOCATION",
    orbColor: "var(--red)",
    detail: "Laguna, Philippines",
    href: null,
  },
  {
    id: "github",
    orbLabel: "GIT",
    label: "GITHUB",
    orbColor: "#9ca3af",
    detail: "github.com/Kyellog-silog",
    href: "https://github.com/Kyellog-silog",
  },
  {
    id: "linkedin",
    orbLabel: "in",
    label: "LINKEDIN",
    orbColor: "#60a5fa",
    detail: "linkedin.com/in/kyell-dimatatac",
    href: "https://www.linkedin.com/in/kyell-dimatatac-58882517a",
  },
]

export function Contact() {
  const [openPills, setOpenPills] = useState<Record<string, boolean>>({})
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const abortRef = useRef<AbortController | null>(null)
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // Close all pills on Escape
  useEffect(() => {
    function onKeyUp(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenPills({})
    }
    document.addEventListener("keyup", onKeyUp)
    return () => document.removeEventListener("keyup", onKeyUp)
  }, [])

  function togglePill(id: string) {
    setOpenPills((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (submitStatus !== "idle") setSubmitStatus("idle")
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    abortRef.current?.abort()
    abortRef.current = new AbortController()
    const timeoutId = setTimeout(() => abortRef.current?.abort(), 30000)
    setIsSubmitting(true)
    setSubmitStatus("idle")
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: abortRef.current.signal,
      })
      clearTimeout(timeoutId)
      if (res.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch {
      clearTimeout(timeoutId)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      clearTimeout(dismissTimer.current)
      dismissTimer.current = setTimeout(() => setSubmitStatus("idle"), 5000)
    }
  }

  return (
    <section id="contact" className="section-wrap">
      <div className="chapter-title reveal">CHAPTER 4 : LET&apos;S CONNECT</div>

      {/* ── Contact Pills ── */}
      <div className="cpills reveal">
        {PILLS.map((pill) => (
          <div
            key={pill.id}
            className={`cpill${openPills[pill.id] ? " open" : ""}`}
            onClick={() => togglePill(pill.id)}
            role="button"
            tabIndex={0}
            aria-expanded={openPills[pill.id] ?? false}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && togglePill(pill.id)}
          >
            <div className="porb" style={{ borderColor: pill.orbColor, color: pill.orbColor }}>
              {pill.orbLabel}
            </div>
            <div className="pspot" aria-hidden="true" />
            <div className="ptxt">{pill.label}</div>
            <div className="pcontent">
              <div className="pdet">
                {pill.href ? (
                  <a
                    href={pill.href}
                    target={pill.id !== "email" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="pill-link"
                  >
                    {pill.detail}
                  </a>
                ) : (
                  <span>{pill.detail}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Send a Message ── */}
      <div className="cform-wrap reveal">
        <form className="cform" onSubmit={handleSubmit} noValidate>
          <div className="tfield">
            <label className="tprompt" htmlFor="ct-name">&gt; NAME:</label>
            <input
              id="ct-name"
              className="tinput"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              placeholder="your name_"
            />
          </div>

          <div className="tfield">
            <label className="tprompt" htmlFor="ct-email">&gt; EMAIL:</label>
            <input
              id="ct-email"
              className="tinput"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              placeholder="your@email.com_"
            />
          </div>

          <div className="tfield">
            <label className="tprompt" htmlFor="ct-msg">&gt; MSG:</label>
            <textarea
              id="ct-msg"
              className="ttarea"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="your message here_"
            />
          </div>

          {submitStatus === "success" && (
            <div className="terminal-status success" role="status">
              ▶ TRANSMISSION SENT — I will respond within 24hrs.
            </div>
          )}
          {submitStatus === "error" && (
            <div className="terminal-status error" role="alert">
              ✕ TRANSMISSION FAILED — Please retry or contact directly.
            </div>
          )}

          <button
            type="submit"
            className="retro-btn primary terminal-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "SENDING..." : "▶ SEND TRANSMISSION"}
          </button>
        </form>
      </div>
    </section>
  )
}
