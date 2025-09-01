"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send, Github, Linkedin } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">Get In Touch</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            I'm always interested in new opportunities and collaborations. Let's connect and build something amazing
            together!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl lg:text-3xl font-semibold text-foreground mb-8">Let's Connect</h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Whether you have a project in mind, want to discuss opportunities, or just want to say hello, I'd love
                to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 group">
                <div className="bg-primary/10 p-4 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-lg">Email</p>
                  <a
                    href="mailto:kyelldimatatac2@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors text-lg"
                  >
                    kyelldimatatac2@gmail.com
                  </a>
                </div>
              </div>


              <div className="flex items-center space-x-4 group">
                <div className="bg-primary/10 p-4 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-lg">Location</p>
                  <p className="text-muted-foreground text-lg">Laguna, Philippines</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-semibold text-foreground mb-4 text-lg">Follow Me</h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/Kyellog-silog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 p-3 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                >
                  <Github className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                </a>
                <a
                  href="https://www.linkedin.com/in/kyell-dimatatac-58882517a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 p-3 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                >
                  <Linkedin className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                </a>
              </div>
            </div>
          </div>

          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl lg:text-3xl">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12 text-lg"
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 text-lg"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="text-lg resize-none"
                  />
                </div>
                
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-sm font-medium">
                      ✅ Message sent successfully! I'll get back to you soon.
                    </p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm font-medium">
                      ❌ Failed to send message. Please try again or contact me directly.
                    </p>
                  </div>
                )}
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-lg font-semibold hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="mr-2 h-5 w-5" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
