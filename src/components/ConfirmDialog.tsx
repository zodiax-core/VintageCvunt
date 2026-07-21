import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
}

export function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmLabel = "Confirm", cancelLabel = "Cancel", variant = "danger" }: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-graphite border border-chrome/20 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className={`rounded-full p-2 shrink-0 ${variant === "danger" ? "bg-red-500/20" : "bg-yellow-500/20"}`}>
                <AlertTriangle size={20} className={variant === "danger" ? "text-red-400" : "text-yellow-400"} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg mb-1 text-foreground">{title}</h3>
                <p className="font-mono text-[12px] text-chrome-dim leading-relaxed">{message}</p>
              </div>
              <button onClick={onClose} className="p-1 shrink-0 hover:bg-foreground/5 rounded-lg transition-colors">
                <X size={16} className="text-chrome-dim" />
              </button>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button onClick={onClose} className="rounded-xl border border-chrome/20 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim hover:text-foreground hover:bg-foreground/5 transition-colors">
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                className={`rounded-xl px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors ${
                  variant === "danger" ? "bg-red-600 hover:bg-red-700" : "bg-yellow-600 hover:bg-yellow-700"
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
