import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Brain, Cloud, Network, Code, Award, Calendar, Hash, Download, Eye, X, FileText } from "lucide-react";
import { certifications } from "@/data/portfolio";
import PDFViewer from "@/components/PDFViewer";

const iconMap: Record<string, typeof Cpu> = {
  Cpu, Brain, Cloud, Network, Code,
};

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<(typeof certifications)[0] | null>(null);
  const [viewingPdf, setViewingPdf] = useState<{ url: string; title: string } | null>(null);

  return (
    <section id="certifications" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">Credentials</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 text-foreground mb-4">
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Industry-recognized certifications validating expertise in AI, machine learning, and cloud technologies.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => {
            const IconComp = iconMap[cert.icon] || Award;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, boxShadow: `0 0 40px ${cert.color}20` }}
                onClick={() => setSelectedCert(cert)}
                className="group cursor-pointer glass rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: `${cert.color}15` }}>
                    <IconComp className="w-7 h-7" style={{ color: cert.color }} />
                  </div>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-muted text-muted-foreground border border-border">{cert.date}</span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{cert.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{cert.description}</p>

                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-3.5 h-3.5 text-muted-foreground/50" />
                  <span className="text-xs text-muted-foreground">{cert.issuer}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground/60 font-mono">{cert.id}</span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setViewingPdf({ url: cert.pdf, title: cert.title });
                      }}
                      className="p-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={cert.pdf}
                      download
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Cert Detail Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg glass rounded-2xl p-8 border border-border"
            >
              <button onClick={() => setSelectedCert(null)} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-primary/10 transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ background: `${selectedCert.color}15` }}>
                  {(iconMap[selectedCert.icon] || Award)({ className: "w-8 h-8", style: { color: selectedCert.color } })}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{selectedCert.title}</h3>
                  <p className="text-sm text-muted-foreground">{selectedCert.issuer}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{selectedCert.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Hash className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-mono text-muted-foreground">{selectedCert.id}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{selectedCert.skills}</span>
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{selectedCert.description}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => setViewingPdf({ url: selectedCert.pdf, title: selectedCert.title })}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Eye className="w-4 h-4" /> View Certificate
                </button>
                <a
                  href={selectedCert.pdf}
                  download
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition-colors border border-border"
                >
                  <Download className="w-4 h-4" /> Download
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF Viewer */}
      <AnimatePresence>
        {viewingPdf && (
          <PDFViewer url={viewingPdf.url} title={viewingPdf.title} onClose={() => setViewingPdf(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
