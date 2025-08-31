import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Award, MapPin, Calendar } from "lucide-react"

export function About() {
  const skills = [
    "Python",
    "JavaScript",
    "Django",
    "React.js",
    "Flask",
    "Express.js",
    "TensorFlow.js",
    "Docker",
    "MongoDB",
    "PostgreSQL",
    "Azure",
    "Git",
  ]

  const experiences = [
    {
      title: "AI and Security Intern",
      company: "Rakso CT",
      period: "2024",
      description:
        "Delivered technical presentations on Azure OpenAI and contributed to security awareness campaigns and CRM development.",
    },
    {
      title: "Computer Engineering Student",
      company: "Batangas State University",
      period: "2021-2025",
      description: "Focused on backend systems, machine learning, and federated learning platforms.",
    },
  ]

  return (
    <section id="about" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 lg:mb-24">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">About Me</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Computer Engineering graduate with a passion for backend systems and AI
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start mb-16">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-3xl lg:text-4xl font-semibold text-foreground mb-6 flex items-center">
                <Award className="mr-3 h-8 w-8 text-primary" />
                Background
              </h3>
              <div className="space-y-6 text-muted-foreground text-lg lg:text-xl leading-relaxed">
                <p>
                  I'm a Computer Engineering graduate from Batangas State University, passionate about building scalable
                  backend systems and deploying machine learning models. My experience spans from developing federated
                  learning platforms to creating community management systems.
                </p>
                <p>
                  Currently working on exciting projects including a coffee shop e-commerce website and a Roblox game,
                  while actively seeking opportunities in backend development and machine learning engineering.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl lg:text-3xl font-semibold text-foreground mb-6 flex items-center">
                <Calendar className="mr-3 h-7 w-7 text-primary" />
                Experience
              </h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="border-l-2 border-primary pl-6 pb-6 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h4 className="font-semibold text-foreground text-lg">{exp.title}</h4>
                      <Badge variant="outline" className="w-fit">
                        {exp.period}
                      </Badge>
                    </div>
                    <p className="text-primary font-medium mb-2">{exp.company}</p>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Card className="lg:sticky lg:top-8">
            <CardContent className="p-8 lg:p-10">
              <h3 className="text-2xl lg:text-3xl font-semibold text-foreground mb-6">Technical Skills</h3>
              <div className="flex flex-wrap gap-3 mb-8">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="text-base px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3 text-lg flex items-center">
                    <Award className="mr-2 h-5 w-5 text-primary" />
                    Education
                  </h4>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Bachelor of Science in Computer Engineering
                    <br />
                    Batangas State University (2021-2025)
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3 text-lg flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-primary" />
                    Location
                  </h4>
                  <p className="text-base text-muted-foreground">Nagcarlan, Laguna, Philippines</p>
                </div>
              </div>

              <Button className="w-full mt-8 bg-transparent" variant="outline" asChild>
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
