import { motion } from "framer-motion";
import { Trophy, Award, FileText, GitBranch } from "lucide-react";
import { achievements } from "@/data/portfolio";

const iconMap = { Trophy, Award, FileText, GitBranch };

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">Recognition</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 text-foreground mb-4">
            <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Milestones that reflect dedication, excellence, and impact in the field of AI and machine learning.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, i) => {
            const IconComp = iconMap[achievement.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, boxShadow: "0 0 40px rgba(59,130,246,0.2)" }}
                className="glass rounded-2xl p-6 text-center group cursor-default transition-all duration-300 border border-border"
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center mx-auto mb-5 group-hover:from-primary/30 group-hover:to-violet-500/30 transition-all"
                >
                  <IconComp className="w-8 h-8 text-primary" />
                </motion.div>
                <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">{achievement.year}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{achievement.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{achievement.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
