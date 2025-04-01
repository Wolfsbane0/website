"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { MathJax, MathJaxContext } from "better-react-mathjax"
import { Menu, X, Github, Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import MathBackground from "@/components/math-background"
import TeamMember from "@/components/team-member"
import EventCard from "@/components/event-card"
import ProjectCard from "@/components/project-card"
import BlogPost from "@/components/blog-post"
import ResearchItem from "@/components/research-item"
import ResourceCard from "@/components/resource-card"
import TestimonialCard from "@/components/testimonial-card"
import MathVisualizer from "@/components/math-visualizer"
import { teamMembers, events, projects, blogPosts, faqs, research, resources, testimonials } from "@/lib/data"

const mathConfig = {
  tex: {
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
  },
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const headerRef = useRef<HTMLElement>(null)
  const [activeSection, setActiveSection] = useState("home")

  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95])

  useEffect(() => {
    const sections = [
      "home",
      "team",
      "events",
      "projects",
      "research",
      "resources",
      "blogs",
      "testimonials",
      "about",
      "faq",
    ]

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (!element) continue

        const offsetTop = element.offsetTop
        const offsetHeight = element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
      closeMenu()
    }
  }

  return (
    <MathJaxContext config={mathConfig}>
      <div className="relative min-h-screen bg-background">
        <MathBackground />

        <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10 bg-primary/90 rounded-full flex items-center justify-center text-primary-foreground font-bold">
                VM
              </div>
              <span className="font-bold text-xl tracking-tight">VITMAS</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {["home", "team", "events", "projects", "research", "resources", "blogs", "about"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
              <Button onClick={() => scrollToSection("contact")} className="bg-primary/90 hover:bg-primary">
                Contact Us
              </Button>
            </nav>

            <button className="md:hidden" onClick={toggleMenu}>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </header>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 bg-background md:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
                    <div className="relative w-10 h-10 bg-primary/90 rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      VM
                    </div>
                    <span className="font-bold text-xl tracking-tight">VITMAS</span>
                  </Link>
                  <button onClick={closeMenu}>
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <nav className="flex flex-col p-4 gap-4">
                  {[
                    "home",
                    "team",
                    "events",
                    "projects",
                    "research",
                    "resources",
                    "blogs",
                    "testimonials",
                    "about",
                    "faq",
                  ].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className="text-lg font-medium py-2 border-b border-border flex justify-between items-center"
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </button>
                  ))}
                  <Button
                    onClick={() => {
                      scrollToSection("contact")
                      closeMenu()
                    }}
                    className="mt-4"
                  >
                    Contact Us
                  </Button>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main>
          {/* Hero Section */}
          <section id="home" className="relative min-h-screen pt-20 flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <MathVisualizer />
            </div>
            <div className="container mx-auto px-4 py-20 relative z-10">
              <motion.div style={{ opacity, scale }} className="max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center text-center mb-8"
                >
                  <div className="inline-block bg-primary/10 px-4 py-1 rounded-full text-primary text-sm font-medium mb-4">
                    Empowering Mathematical Minds
                  </div>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    VIT Mathematical Association
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                    Exploring the boundaries of understanding through the universal language of mathematics
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
                >
                  <Button
                    size="lg"
                    className="bg-primary/90 hover:bg-primary text-lg px-8 py-6"
                    onClick={() => scrollToSection("events")}
                  >
                    Explore Events
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-6"
                    onClick={() => scrollToSection("about")}
                  >
                    Learn More
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="mt-24 max-w-5xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card className="bg-background/80 backdrop-blur-sm border border-primary/20 shadow-lg overflow-hidden">
                    <CardContent className="p-8">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                        <svg
                          className="w-6 h-6 text-primary"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 4.75L19.25 9L12 13.25L4.75 9L12 4.75Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9.25 11.5L4.75 14L12 18.25L19.25 14L14.75 11.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Research-Based Learning</h3>
                      <p className="text-muted-foreground">
                        Explore the frontiers of mathematical knowledge through hands-on research and collaborative
                        projects
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-background/80 backdrop-blur-sm border border-primary/20 shadow-lg overflow-hidden">
                    <CardContent className="p-8">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                        <svg
                          className="w-6 h-6 text-primary"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 7.5L12 2L3 7.5M21 7.5L12 13M21 7.5V16.5L12 22M12 13L3 7.5M12 13V22M3 7.5V16.5L12 22"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Beyond Classrooms</h3>
                      <p className="text-muted-foreground">
                        Taking mathematics beyond traditional learning environments with real-world applications
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-background/80 backdrop-blur-sm border border-primary/20 shadow-lg overflow-hidden">
                    <CardContent className="p-8">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                        <svg
                          className="w-6 h-6 text-primary"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M3 12C3 12 7 4 12 4C17 4 21 12 21 12" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M21 12C21 12 17 20 12 20C7 20 3 12 3 12" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Quantum Thinking</h3>
                      <p className="text-muted-foreground">
                        Applying mathematical principles to quantum physics and exploring interdisciplinary connections
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Team Section */}
          <section id="team" className="py-24 bg-gradient-to-b from-background to-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center mb-16"
              >
                <div className="inline-block bg-primary/10 px-4 py-1 rounded-full text-primary text-sm font-medium mb-4">
                  The Brilliant Minds
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Team</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Meet the passionate mathematicians and educators behind VITMAS who are dedicated to advancing
                  mathematical understanding
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <TeamMember {...member} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Events Section */}
          <section id="events" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-5">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center mb-16"
              >
                <div className="inline-block bg-primary/10 px-4 py-1 rounded-full text-primary text-sm font-medium mb-4">
                  Join Us
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Upcoming Events</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Participate in our exciting mathematical adventures and expand your horizons
                </p>
              </motion.div>

              <Tabs defaultValue="upcoming" className="max-w-5xl mx-auto">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                  <TabsTrigger value="upcoming" className="text-base">
                    Upcoming
                  </TabsTrigger>
                  <TabsTrigger value="past" className="text-base">
                    Past Events
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {events
                      .filter((e) => e.upcoming)
                      .map((event, index) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <EventCard {...event} />
                        </motion.div>
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="past" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {events
                      .filter((e) => !e.upcoming)
                      .map((event, index) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <EventCard {...event} />
                        </motion.div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-12 text-center">
                <Button variant="outline" size="lg" className="px-8">
                  View All Events
                </Button>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-24 bg-gradient-to-b from-muted/30 to-background">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center mb-16"
              >
                <div className="inline-block bg-primary/10 px-4 py-1 rounded-full text-primary text-sm font-medium mb-4">
                  Innovations
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Projects</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Exploring the boundaries of mathematical understanding through innovative projects
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <ProjectCard {...project} />
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Button variant="outline" size="lg" className="px-8">
                  View All Projects
                </Button>
              </div>
            </div>
          </section>

          {/* Research Section */}
          <section id="research" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <svg className="w-full h-full opacity-5" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M400,100 C550,100 650,200 650,350 C650,500 550,600 400,600 C250,600 150,500 150,350 C150,200 250,100 400,100 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <path
                  d="M400,150 C525,150 600,225 600,350 C600,475 525,550 400,550 C275,550 200,475 200,350 C200,225 275,150 400,150 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <path
                  d="M400,200 C500,200 550,250 550,350 C550,450 500,500 400,500 C300,500 250,450 250,350 C250,250 300,200 400,200 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center mb-16"
              >
                <div className="inline-block bg-primary/10 px-4 py-1 rounded-full text-primary text-sm font-medium mb-4">
                  Advancing Knowledge
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Research Initiatives</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Pushing the boundaries of mathematical understanding through rigorous research
                </p>
              </motion.div>

              <div className="max-w-5xl mx-auto">
                {research.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ResearchItem {...item} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Resources Section */}
          <section id="resources" className="py-24 bg-gradient-to-b from-background to-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center mb-16"
              >
                <div className="inline-block bg-primary/10 px-4 py-1 rounded-full text-primary text-sm font-medium mb-4">
                  Learning Materials
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Mathematical Resources</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Curated resources to help you explore and master mathematical concepts
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <ResourceCard {...resource} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Blogs Section */}
          <section id="blogs" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-5">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dots)" />
              </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center mb-16"
              >
                <div className="inline-block bg-primary/10 px-4 py-1 rounded-full text-primary text-sm font-medium mb-4">
                  Insights
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Latest Blogs</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Insights and discoveries from our mathematical journey
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <BlogPost {...post} />
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Button variant="outline" size="lg" className="px-8">
                  View All Posts
                </Button>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="py-24 bg-gradient-to-b from-muted/30 to-background">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center mb-16"
              >
                <div className="inline-block bg-primary/10 px-4 py-1 rounded-full text-primary text-sm font-medium mb-4">
                  What People Say
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Testimonials</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Hear from students and faculty about their experiences with VITMAS
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <TestimonialCard {...testimonial} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full z-0 opacity-10">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="currentColor"
                  d="M45.5,-76.2C59.9,-69.2,73.3,-58.8,79.7,-45.1C86.1,-31.4,85.5,-15.7,83.2,-1.3C80.9,13,77,26.1,70.6,38.5C64.2,50.9,55.3,62.6,43.5,70.9C31.7,79.1,15.8,83.9,0.2,83.6C-15.5,83.3,-31,77.9,-43.7,69.2C-56.4,60.5,-66.3,48.5,-73.3,34.8C-80.3,21.1,-84.5,5.7,-83.2,-9.2C-81.9,-24.1,-75.1,-38.6,-65.3,-49.9C-55.6,-61.2,-42.8,-69.3,-29.6,-76.5C-16.3,-83.7,-2.7,-90,9.8,-87.1C22.3,-84.2,31.1,-83.2,45.5,-76.2Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="inline-block bg-primary/10 px-4 py-1 rounded-full text-primary text-sm font-medium mb-4">
                      Our Story
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">About VITMAS</h2>
                    <div className="space-y-4 text-lg">
                      <p>
                        VIT Mathematical Association's student chapter is aimed at empowering students by extending
                        their boundaries of understanding and equipping them with the knowledge and skill to appreciate
                        the most powerful tool in the world - Mathematics.
                      </p>
                      <p>
                        We hope to achieve our aim of improving the understanding of mathematics among the student
                        population of VIT through a program of research-based learning and change how Mathematics is
                        taught and learned.
                      </p>
                      <p>
                        In simpler terms, VITMAS seeks to rekindle students' love for numbers with events and workshops
                        to enliven mathematics for the skeptics, strategies to understand probabilities and forecasts of
                        industries and with an ambition to take mathematics beyond classrooms.
                      </p>
                    </div>
                    <div className="mt-8">
                      <Button size="lg" className="bg-primary/90 hover:bg-primary px-8">
                        Join VITMAS
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="relative h-[500px] rounded-2xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-3/4 h-3/4 relative">
                          <svg viewBox="0 0 800 800" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M400,100 C550,100 650,200 650,350 C650,500 550,600 400,600 C250,600 150,500 150,350 C150,200 250,100 400,100 Z"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="text-primary/60"
                            />
                            <path
                              d="M400,150 C525,150 600,225 600,350 C600,475 525,550 400,550 C275,550 200,475 200,350 C200,225 275,150 400,150 Z"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="text-primary/60"
                            />
                            <path
                              d="M400,200 C500,200 550,250 550,350 C550,450 500,500 400,500 C300,500 250,450 250,350 C250,250 300,200 400,200 Z"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="text-primary/60"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background to-transparent">
                      <div className="flex justify-center gap-6">
                        <div className="bg-background/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                          <MathJax>{"$y = \\sin(x)$"}</MathJax>
                        </div>
                        <div className="bg-background/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                          <MathJax>{"$\\oint_{C} \\vec{F} \\cdot d\\vec{r} = 0$"}</MathJax>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-24 bg-gradient-to-b from-background to-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center mb-16"
              >
                <div className="inline-block bg-primary/10 px-4 py-1 rounded-full text-primary text-sm font-medium mb-4">
                  Questions & Answers
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Find answers to common questions about VITMAS
                </p>
              </motion.div>

              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <AccordionItem
                        value={`item-${index}`}
                        className="border border-primary/10 mb-4 rounded-lg overflow-hidden"
                      >
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 data-[state=open]:bg-muted/50">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 py-4 text-muted-foreground">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-5">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid-contact" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-contact)" />
              </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="inline-block bg-primary/10 px-4 py-1 rounded-full text-primary text-sm font-medium mb-4">
                      Get In Touch
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                      Have questions or want to join VITMAS? Reach out to us!
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M22 12C22 10.6868 21.7413 9.38647 21.2388 8.1731C20.7362 6.95996 19.9997 5.85742 19.0711 4.92896C18.1425 4.00024 17.0401 3.26367 15.8268 2.76123C14.6136 2.25854 13.3132 2 12 2C10.6868 2 9.38647 2.25854 8.1731 2.76123C6.95996 3.26367 5.85742 4.00024 4.92896 4.92896C3.26367 6.59424 2 8.95345 2 12C2 15.0461 3.26367 17.4058 4.92896 19.0711C5.85742 19.9997 6.95996 20.7362 8.1731 21.2388C9.38647 21.7413 10.6868 22 12 22C13.3132 22 14.6136 21.7413 15.8268 21.2388C17.0401 20.7362 18.1425 19.9997 19.0711 19.0711C19.9997 18.1425 20.7362 17.0401 21.2388 15.8268C21.7413 14.6136 22 13.3132 22 12Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">Email</h3>
                          <p className="text-muted-foreground">vitmas@example.com</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M20 10C20 14.4183 16.4183 18 12 18C7.58172 18 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 18V22"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 22H16"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">Location</h3>
                          <p className="text-muted-foreground">VIT University, Vellore, Tamil Nadu, India</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M8 10H16"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 14H16"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 18H12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10 3H14L16.29 5.29C16.3851 5.38505 16.4972 5.46146 16.6203 5.51599C16.7434 5.57052 16.8751 5.60195 17.0085 5.60836C17.1419 5.61478 17.2756 5.59605 17.4032 5.55317C17.5307 5.51028 17.6496 5.44417 17.753 5.357L19 4.414V17.5C19 18.0304 18.7893 18.5391 18.4142 18.9142C18.0391 19.2893 17.5304 19.5 17 19.5H7C6.46957 19.5 5.96086 19.2893 5.58579 18.9142C5.21071 18.5391 5 18.0304 5 17.5V4.414L6.247 5.357C6.35038 5.44417 6.46925 5.51028 6.59677 5.55317C6.72429 5.59605 6.85809 5.61478 6.99148 5.60836C7.12488 5.60195 7.25656 5.57052 7.37968 5.51599C7.5028 5.46146 7.61487 5.38505 7.71 5.29L10 3Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">Social Media</h3>
                          <div className="flex gap-4 mt-2">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                              <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                              <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                              <Linkedin className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                              <Github className="h-5 w-5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-background rounded-2xl p-8 shadow-lg border border-primary/10"
                  >
                    <h3 className="text-xl font-bold mb-6">Send us a message</h3>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <input
                            id="name"
                            className="w-full px-4 py-3 border border-primary/10 rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-colors"
                            placeholder="Your name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="w-full px-4 py-3 border border-primary/10 rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-colors"
                            placeholder="Your email"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </label>
                        <input
                          id="subject"
                          className="w-full px-4 py-3 border border-primary/10 rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-colors"
                          placeholder="Subject"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full px-4 py-3 border border-primary/10 rounded-lg bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-colors"
                          placeholder="Your message"
                        />
                      </div>
                      <Button type="submit" className="w-full bg-primary/90 hover:bg-primary py-6">
                        Send Message
                      </Button>
                    </form>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-background border-t py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="space-y-6">
                <Link href="/" className="flex items-center gap-2">
                  <div className="relative w-10 h-10 bg-primary/90 rounded-full flex items-center justify-center text-primary-foreground font-bold">
                    VM
                  </div>
                  <span className="font-bold text-xl tracking-tight">VITMAS</span>
                </Link>
                <p className="text-muted-foreground">Empowering students through the beauty of mathematics</p>
                <div className="flex gap-4">
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Instagram className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Github className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg">Quick Links</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="#home" className="text-muted-foreground hover:text-primary transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="#events" className="text-muted-foreground hover:text-primary transition-colors">
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link href="#blogs" className="text-muted-foreground hover:text-primary transition-colors">
                      Blogs
                    </Link>
                  </li>
                  <li>
                    <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg">Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Math Resources
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Research Papers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Workshops
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Competitions
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg">Newsletter</h3>
                <p className="text-muted-foreground">
                  Subscribe to our newsletter for updates on events and activities
                </p>
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-2 border border-primary/10 rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-colors"
                  />
                  <Button type="submit" variant="outline" className="border-primary/20 hover:bg-primary/5">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t text-center text-muted-foreground">
              <p>© {new Date().getFullYear()} VITMAS. All rights reserved.</p>
              <div className="mt-4 flex justify-center gap-6 text-sm">
                <Link href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </MathJaxContext>
  )
}

