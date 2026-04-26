import { motion } from "framer-motion";
import { GraduationCap, Brain, Globe, Lightbulb, Target, Heart } from "lucide-react";

const highlights = [
  { icon: GraduationCap, title: "Gold Medalist", desc: "BS Computer Science with highest academic honors" },
  { icon: Brain, title: "AI/ML Specialization", desc: "Deep expertise in machine learning and deep learning" },
  { icon: Target, title: "Problem Solver", desc: "Real-world AI solutions with measurable impact" },
  { icon: Globe, title: "Global Vision", desc: "Building AI for worldwide accessibility" },
  { icon: Heart, title: "Ethical AI", desc: "Committed to responsible and fair AI deployment" },
  { icon: Lightbulb, title: "NLP & Predictive", desc: "Natural language and predictive system specialist" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">About Me</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 text-foreground">
            Driven by Intelligence,<br />
            <span className="gradient-text">Powered by Purpose</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="glass rounded-2xl p-8 lg:p-10 border border-border">
              <p className="text-foreground/80 text-lg leading-relaxed mb-6">
                I'm a <strong className="text-foreground">Gold Medalist in BS Computer Science</strong> with a specialization in Artificial Intelligence and Machine Learning. My academic journey has been defined by a relentless pursuit of knowledge and a passion for building intelligent systems.
              </p>
              <p className="text-foreground/70 leading-relaxed mb-6">
                My work sits at the intersection of <strong className="text-primary">real-world problem solving</strong> and cutting-edge AI research. I've developed predictive systems for healthcare, aviation, cybersecurity, and consumer analytics — always with a focus on accuracy, ethics, and deployability.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                My core interests span <strong className="text-violet-500">Natural Language Processing</strong>, <strong className="text-violet-500">Predictive Analytics</strong>, and <strong className="text-violet-500">Intelligent Automation</strong>. I believe AI should not just perform well — it should be fair, transparent, and accessible to all.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="glass rounded-xl p-5 text-center group hover:bg-primary/5 transition-colors border border-border"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-foreground font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-violet-600/10 dark:from-blue-600/20 dark:to-violet-600/20" />
          <div className="absolute inset-0 glass" />
          <div className="relative px-8 py-10 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">My Vision</h3>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              "To build AI systems that create <span className="text-primary font-semibold">global impact</span> — making healthcare more accessible, operations more efficient, and decisions more intelligent. I envision a world where AI serves humanity ethically, transparently, and equitably."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
