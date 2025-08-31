"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ExternalLink, Github, Filter } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filters = ["All", "Full-Stack", "Backend", "AI/ML", "APIs"]

  const projects = [
    {
      title: "Rustique Café - Modern Coffee Shop Experience",
      description:
        "A modern, full-stack web application for a coffee shop featuring a beautiful user interface, comprehensive menu management, and advanced admin capabilities with real-time updates and secure authentication.",
      screenshots: [
        "/rustique-cafe-hero.png",
        "/rustique-cafe-menu.png",
        "/rustique-cafe-admin.png",
        "/rustique-cafe-cart.png",
      ],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
      category: "Full-Stack",
      liveUrl: "#",
      githubUrl: "https://github.com/yourusername/rustique-cafe",
    },
    {
      title: "TaskFlow - Task Management Platform",
      description:
        "A modern, full-stack task management application with real-time updates, drag-and-drop Kanban boards, and team collaboration features.",
      screenshots: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-T2ZmVX1LjOs9O6JoiUCPfe57PiYhqe.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uQfGUaKAG4KAG6acYgWXFks9lsMqom.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-C4RhwEYf2BOpIVFYhCku4UwkUDb07y.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2QDEBOQiI7WwVJOgb6z6SAy6phRBML.png",
      ],
      technologies: ["React", "Laravel", "PostgreSQL", "Tailwind CSS", "JWT"],
      category: "Full-Stack",
      liveUrl: "https://taskflow-frontend-production-9467.up.railway.app",
      githubUrl: "https://github.com/Kyellog-silog",
    },
    {
      title: "BagaNet - Federated Learning Platform",
      description:
        "Privacy-preserving lung disease classification using federated learning. Enables client-side model training with TensorFlow.js.",
      technologies: ["Python", "TensorFlow.js", "Flask", "React", "Docker", "ONNX.js"],
      category: "AI/ML",
      githubUrl: "https://github.com/Kyellog-silog",
    },
    {
      title: "Bayan Track - Community Management",
      description:
        "Centralized record management platform for local communities. Built secure APIs with Django for handling community data.",
      technologies: ["Django", "Python", "PostgreSQL", "REST API"],
      category: "Backend",
      githubUrl: "https://github.com/Kyellog-silog",
    },
    {
      title: "Skill Odyssey - Learning Platform",
      description:
        "Educational platform guiding students through frontend and backend development tracks with progress tracking systems.",
      technologies: ["Express.js", "MongoDB", "Node.js", "JavaScript"],
      category: "APIs",
      githubUrl: "https://github.com/Kyellog-silog",
    },
  ]

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter)

  return (
    <section id="portfolio" className="py-24 lg:py-32 px-6 sm:px-8 lg:px-12">
      <div className="max-w-full mx-auto">
        <div className="text-center mb-20 lg:mb-24">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">Portfolio</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto text-pretty leading-relaxed">
            A showcase of my recent projects in backend development, AI, and full-stack applications
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Filter className="h-5 w-5 text-muted-foreground mr-2 mt-2" />
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className="transition-all duration-300"
            >
              {filter}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 lg:gap-12 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group h-full border-2 hover:border-primary/20">
                  <CardHeader className="pb-6 p-10">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {project.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl lg:text-3xl font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-8 flex flex-col h-full p-10 pt-0">
                    <p className="text-lg lg:text-xl text-muted-foreground line-clamp-4 flex-grow leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-base lg:text-lg px-4 py-2">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-base lg:text-lg px-4 py-2">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full bg-transparent mt-auto text-lg lg:text-xl py-4"
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </DialogTrigger>

              <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto w-[95vw]">
                <DialogHeader className="pb-6">
                  <DialogTitle className="text-3xl lg:text-5xl font-bold">{project.title}</DialogTitle>
                </DialogHeader>

                <div className="space-y-10">
                  {project.screenshots ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {project.screenshots.map((screenshot, idx) => (
                        <Dialog key={idx}>
                          <DialogTrigger asChild>
                            <div className="relative aspect-video overflow-hidden rounded-lg border cursor-pointer hover:scale-[1.02] transition-transform">
                              <Image
                                src={screenshot || "/placeholder.svg"}
                                alt={`${project.title} screenshot ${idx + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </DialogTrigger>
                          <DialogContent className="max-w-[95vw] max-h-[95vh] p-2">
                            <div className="relative w-full h-[90vh]">
                              <Image
                                src={screenshot || "/placeholder.svg"}
                                alt={`${project.title} screenshot ${idx + 1}`}
                                fill
                                className="object-contain"
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="max-w-2xl mx-auto">
                        <h3 className="text-3xl lg:text-4xl font-semibold mb-8">{project.title}</h3>
                        <p className="text-muted-foreground mb-10 text-xl lg:text-2xl leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-8">
                    {project.screenshots && (
                      <p className="text-muted-foreground text-xl lg:text-2xl leading-relaxed">{project.description}</p>
                    )}

                    <div>
                      <h4 className="font-semibold mb-6 text-2xl lg:text-3xl">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-4">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-lg lg:text-xl px-6 py-3">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-6 pt-8">
                      {project.liveUrl && (
                        <Button asChild size="lg" className="text-lg lg:text-xl px-8 py-4">
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-6 w-6 mr-3" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="text-lg lg:text-xl px-8 py-4 bg-transparent"
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-6 w-6 mr-3" />
                          View Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="text-center mt-20 lg:mt-24">
          <p className="text-muted-foreground mb-8 text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto">
            Currently working on exciting new projects including a coffee shop e-commerce website and a Roblox game.
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-lg lg:text-xl px-8 py-4 bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <a href="https://github.com/Kyellog-silog" target="_blank" rel="noopener noreferrer">
              <Github className="h-6 w-6 mr-3" />
              View All Projects
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
