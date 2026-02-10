"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Download, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToPortfolio = () => {
    const element = document.getElementById("portfolio")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToAbout = () => {
    const element = document.getElementById("about")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background"></div>

        {/* Floating product/craft elements */}
        <div className="absolute top-20 left-20 opacity-5 text-primary font-mono text-sm animate-float">
          {"<component />"}
        </div>
        <div className="absolute top-40 right-32 opacity-5 text-primary font-mono text-sm animate-float delay-300">
          {"{data}"}
        </div>
        <div className="absolute bottom-32 left-16 opacity-5 text-primary font-mono text-sm animate-float delay-700">
          {"<deploy>"}
        </div>
        <div className="absolute bottom-20 right-20 opacity-5 text-primary font-mono text-sm animate-float delay-500">
          {"/build"}
        </div>

        {/* Warm accent color accents */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/8 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/6 rounded-full blur-3xl animate-pulse-glow delay-500"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center space-y-12 lg:space-y-16 relative z-10">
        <div
          className={`space-y-6 lg:space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground text-balance leading-tight">
              Kyell Dimatatac
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <h2
            className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-muted-foreground transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Full Stack Web Developer & <span className="text-primary font-bold">Problem Solver</span>
          </h2>
        </div>

        <div
          className={`space-y-6 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto text-pretty leading-relaxed">
            I build production-ready <span className="text-primary font-semibold">e-commerce platforms</span>, <span className="text-primary font-semibold">event booking systems</span>, and <span className="text-primary font-semibold">service management applications</span> that scale with real clients.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            Combining technical expertise with practical business solutions to create digital experiences that matter.
          </p>
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Button
            onClick={scrollToPortfolio}
            size="lg"
            className="w-full sm:w-auto px-8 py-3 text-lg font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
          >
            View My Work
            <ChevronDown className="ml-2 h-5 w-5" />
          </Button>
          <Button
            onClick={scrollToAbout}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto px-8 py-3 text-lg font-semibold hover:scale-105 transition-all duration-300 bg-transparent"
          >
            Learn More
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto px-8 py-3 text-lg font-semibold hover:scale-105 transition-all duration-300"
            asChild
          >
            <a href="/resume.pdf" download>
              <Download className="mr-2 h-5 w-5" />
              Resume
            </a>
          </Button>
        </div>

        <div
          className={`flex justify-center space-x-8 lg:space-x-12 pt-8 transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <a
            href="https://github.com/Kyellog-silog"
            target="_blank"
            rel="noopener noreferrer"
            className="group text-muted-foreground hover:text-primary transition-all duration-300"
            aria-label="GitHub Profile"
          >
            <Github className="h-8 w-8 lg:h-10 lg:w-10 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />
          </a>
          <a
            href="https://www.linkedin.com/in/kyell-dimatatac-58882517a"
            target="_blank"
            rel="noopener noreferrer"
            className="group text-muted-foreground hover:text-primary transition-all duration-300"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-8 w-8 lg:h-10 lg:w-10 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />
          </a>
          <button
            onClick={scrollToContact}
            className="group text-muted-foreground hover:text-primary transition-all duration-300"
            aria-label="Contact Me"
          >
            <Mail className="h-8 w-8 lg:h-10 lg:w-10 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  )
}
