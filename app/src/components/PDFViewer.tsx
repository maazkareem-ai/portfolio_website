import { useState } from "react";
import { motion } from "framer-motion";
import { X, Download, ZoomIn, ZoomOut, FileText } from "lucide-react";

interface PDFViewerProps {
  url: string;
  title: string;
  onClose: () => void;
}

export default function PDFViewer({ url, title, onClose }: PDFViewerProps) {
  const [scale, setScale] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex flex-col bg-black/90 backdrop-blur-md"
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 glass border-b border-white/10">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-blue-400" />
          <h3 className="text-white font-semibold text-sm truncate max-w-[200px] sm:max-w-md">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale(Math.max(0.5, scale - 0.25))}
            className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-white/40 text-xs w-12 text-center">{Math.round(scale * 100)}%</span>
          <button
            onClick={() => setScale(Math.min(3, scale + 0.25))}
            className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <a
            href={url}
            download
            className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-blue-400 transition-colors ml-2"
          >
            <Download className="w-4 h-4" />
          </a>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto p-4 flex justify-center">
        <iframe
          src={`${url}#toolbar=0`}
          title={title}
          className="w-full h-full max-w-4xl rounded-lg border border-white/10"
          style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
        />
      </div>
    </motion.div>
  );
}
