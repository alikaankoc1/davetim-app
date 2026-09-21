"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { PhonePreview } from "@/components/editor/PhonePreview";

export function PreviewDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-foreground/45 p-4 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="relative w-full max-w-md rounded-[2rem] bg-background px-4 py-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between px-2">
              <p className="font-heading text-lg font-semibold">Önizleme</p>
              <button
                type="button"
                aria-label="Önizlemeyi kapat"
                onClick={onClose}
                className="flex size-9 items-center justify-center rounded-full border border-border/80 bg-card"
              >
                <X className="size-4" />
              </button>
            </div>
            <PhonePreview />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
