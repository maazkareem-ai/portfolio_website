import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { X, Github, ExternalLink, ChevronRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ProjectModal({ project, onClose }: { project: (typeof projects)[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl glass scrollbar-hide border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 glass border-b border-border">
          <div>
            <span className="text-primary text-xs font-semibold tracking-wider uppercase">{project.category}</span>
            <h2 className="text-2xl font-bold text-foreground mt-1">{project.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-primary/10 transition-colors">
            <X className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <img src={project.image} alt={project.title} className="w-full h-56 object-cover rounded-xl" />

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full bg-muted border border-border mb-6">
              <TabsTrigger value="overview" className="flex-1 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Overview</TabsTrigger>
              <TabsTrigger value="tech" className="flex-1 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Technology</TabsTrigger>
              <TabsTrigger value="results" className="flex-1 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Results</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div>
                <h3 className="text-foreground font-semibold mb-2">Problem Statement</h3>
                <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
              </div>
              <div>
                <h3 className="text-foreground font-semibold mb-2">Datasets</h3>
                <p className="text-muted-foreground leading-relaxed">{project.datasets}</p>
              </div>
              <div>
                <h3 className="text-foreground font-semibold mb-2">Models Used</h3>
                <p className="text-muted-foreground leading-relaxed">{project.models}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.highlights.map((h) => (
                  <span key={h} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">{h}</span>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tech" className="space-y-6">
              <div>
                <h3 className="text-foreground font-semibold mb-3">Technologies & Tools</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.technologies.map((tech) => (
                    <div key={tech} className="flex items-center gap-2 p-3 rounded-lg bg-muted border border-border">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-foreground/80 text-sm">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              <div>
                <h3 className="text-foreground font-semibold mb-2">Key Results</h3>
                <p className="text-muted-foreground leading-relaxed">{project.results}</p>
              </div>
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={project.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "12px",
                        color: "hsl(var(--foreground))",
                      }}
                    />
                    {Object.keys(project.chartData[0]).filter((k) => k !== "name").map((key, i) => (
                      <Bar key={key} dataKey={key} fill={["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"][i % 4]} radius={[4, 4, 0, 0]} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 pt-4 border-t border-border">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground text-sm font-medium transition-colors border border-border">
              <Github className="w-4 h-4" />View Code
            </a>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors">
              <ExternalLink className="w-4 h-4" />Live Demo
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  return (
    <section id="projects" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">Portfolio</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 text-foreground mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-world AI solutions with measurable impact. Each project represents a deep dive into solving complex problems with intelligent systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer glass rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 border border-border"
            >
              <div className="h-48 relative overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/20">{project.category}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded text-xs text-muted-foreground bg-muted">{tech}</span>
                    ))}
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </section>
  );
}
