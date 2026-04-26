import { useState } from "react";
import { motion } from "framer-motion";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import { Code, Brain, Cpu, Wrench } from "lucide-react";
import { skills } from "@/data/portfolio";

type SkillCategory = "programming" | "ml" | "dl" | "tools";

const categoryConfig: Record<SkillCategory, { icon: typeof Code; label: string; color: string }> = {
  programming: { icon: Code, label: "Programming", color: "#3b82f6" },
  ml: { icon: Brain, label: "Machine Learning", color: "#8b5cf6" },
  dl: { icon: Cpu, label: "Deep Learning", color: "#f59e0b" },
  tools: { icon: Wrench, label: "Tools & Platforms", color: "#10b981" },
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("programming");
  const currentSkills = skills[activeCategory];
  const radarData = currentSkills.map((s) => ({ skill: s.name, level: s.level, fullMark: 100 }));

  return (
    <section id="skills" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">Expertise</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 text-foreground mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit spanning programming, machine learning, deep learning, and production deployment.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(categoryConfig) as SkillCategory[]).map((cat) => {
                const config = categoryConfig[cat];
                const isActive = activeCategory === cat;
                return (
                  <motion.button
                    key={cat}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${
                      isActive ? "bg-primary/10 border-primary/30" : "bg-muted border-border hover:bg-muted/80"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${config.color}15` }}>
                      <config.icon className="w-5 h-5" style={{ color: config.color }} />
                    </div>
                    <span className={`font-semibold text-sm ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                      {config.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <div className="space-y-4">
              {currentSkills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground/80 text-sm font-medium">{skill.name}</span>
                    <span className="text-muted-foreground text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted overflow-hidden border border-border">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-2xl p-6 flex items-center justify-center border border-border"
          >
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                  <Radar name={categoryConfig[activeCategory].label} dataKey="level" stroke={categoryConfig[activeCategory].color} fill={categoryConfig[activeCategory].color} fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
