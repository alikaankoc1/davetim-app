"use client";

import { useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { signOutAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function confirmSignOut() {
    startTransition(async () => {
      await signOutAction();
    });
  }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        className="h-9 rounded-full px-3 text-sm"
        onClick={() => setOpen(true)}
      >
        Çıkış
      </Button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/45 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !pending && setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="sign-out-title"
              aria-describedby="sign-out-desc"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              className="w-full max-w-sm rounded-[2rem] border border-border/70 bg-card p-6 shadow-[0_24px_50px_-24px_rgba(40,20,16,0.45)]"
              onClick={(event) => event.stopPropagation()}
            >
              <p className="text-xs font-medium tracking-[0.28em] text-primary uppercase">
                Hesap
              </p>
              <h2
                id="sign-out-title"
                className="font-heading mt-3 text-2xl font-semibold tracking-tight"
              >
                Çıkış yapmak istiyor musunuz?
              </h2>
              <p id="sign-out-desc" className="mt-2 text-sm text-muted-foreground">
                Oturumunuz kapanır. Panele tekrar girmek için giriş yapmanız
                gerekir.
              </p>

              <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  disabled={pending}
                  className="h-11 rounded-full px-5"
                  onClick={() => setOpen(false)}
                >
                  Vazgeç
                </Button>
                <Button
                  type="button"
                  disabled={pending}
                  className="h-11 rounded-full px-5"
                  onClick={confirmSignOut}
                >
                  {pending ? "Çıkış yapılıyor…" : "Evet, çıkış yap"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
