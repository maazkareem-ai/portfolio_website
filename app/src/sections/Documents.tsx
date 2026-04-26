import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, BookOpen, ScrollText, Download, Eye } from "lucide-react";
import { documents } from "@/data/portfolio";
import PDFViewer from "@/components/PDFViewer";

const iconMap = { FileText, BookOpen, ScrollText };

export default function Documents() {
  const [viewingPdf, setViewingPdf] = useState<{ url: string; title: string } | null>(null);

  return (
    <section id="documents" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">Resources</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 text-foreground mb-4">
            <span className="gradient-text">Documents</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            View and download professional documents including CV, resume, thesis, and research proposals.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {documents.map((doc, i) => {
            const IconComp = iconMap[doc.icon as keyof typeof iconMap] || FileText;
            return (
              <motion.div
                key={doc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-6 group hover:border-primary/30 transition-all duration-300 border border-border"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <IconComp className="w-6 h-6 text-primary" />
                  </div>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-muted text-muted-foreground border border-border">{doc.type}</span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-1">{doc.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{doc.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground/50 text-xs">{doc.size}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewingPdf({ url: doc.path, title: doc.title })}
                      className="p-2 rounded-lg bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all border border-border"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <a
                      href={doc.path}
                      download
                      className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary transition-all"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {viewingPdf && <PDFViewer url={viewingPdf.url} title={viewingPdf.title} onClose={() => setViewingPdf(null)} />}
      </AnimatePresence>
    </section>
  );
}
