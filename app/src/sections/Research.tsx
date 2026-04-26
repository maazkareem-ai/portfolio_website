import { motion } from "framer-motion";
import { BookOpen, FlaskConical, BarChart3, Shield, Rocket } from "lucide-react";
import { research } from "@/data/portfolio";

export default function Research() {
  const sections = [
    { id: "abstract", icon: BookOpen, title: "Abstract", content: research.abstract },
    { id: "methodology", icon: FlaskConical, title: "Methodology", items: research.methodology },
    { id: "results", icon: BarChart3, title: "Results", items: research.results },
    { id: "ethics", icon: Shield, title: "Ethics & Compliance", items: research.ethics },
    { id: "future", icon: Rocket, title: "Future Work", items: research.futureWork },
  ];

  return (
    <section id="research" className="relative py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">Research</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 text-foreground mb-4">
            Academic <span className="gradient-text">Publication</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Rigorous research at the intersection of machine learning, healthcare, and ethical AI deployment.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8 mb-8 border border-primary/20"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">{research.title}</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">Machine Learning</span>
                <span className="px-3 py-1 rounded-full text-xs bg-violet-500/10 text-violet-500 border border-violet-500/20">Healthcare AI</span>
                <span className="px-3 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Ethical AI</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          {sections.map((section, i) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 sm:p-8 border border-border"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{section.title}</h3>
              </div>

              {section.content ? (
                <p className="text-muted-foreground leading-relaxed pl-13">{section.content}</p>
              ) : (
                <ul className="space-y-3 pl-13">
                  {section.items?.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
